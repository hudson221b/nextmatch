import { useEffect, useRef } from "react"
import { usePresenceStore } from "./useStores"
import type { Channel, Members } from "pusher-js"
import { pusherClient } from "@/lib/pusher"

/**
 * Subscribes a logged in user to the presence channel immediately. It is called in the most top level client component - UIProviders. After successful subscription, sets redux state members to the channel members
 */
export const usePresenceChannel = () => {
  // we would expect the three methods not changed by members state in the store
  const { add, remove, set } = usePresenceStore(state => ({
    add: state.addMember,
    remove: state.removeMember,
    set: state.setMembers,
  }))

  // To prevent subscribing to the same channel multiple times in useEffect (useEffect intentionally runs twice in React strict mode in development), we need to assign the channel to a ref
  const channelRef = useRef<Channel | null>(null)

  useEffect(() => {
    if (!pusherClient) {
      console.error("Pusher client is not initialized")
      return
    }

    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("presence-online-members")

      // read more about members param here https://pusher.com/docs/channels/using_channels/presence-channels/#accessing-channel-members. Or you can log it out and see its structure
      channelRef.current.bind(
        "pusher:subscription_succeeded",
        (members: Members) => {
          set(Object.keys(members.members))
        }
      )

      // this member param has two properties: id and info; both are set during server authorization
      channelRef.current.bind(
        "pusher:member_added",
        (member: Record<string, any>) => {
          add(member.id)
        }
      )

      channelRef.current.bind(
        "pusher:member_removed",
        (member: Record<string, any>) => {
          remove(member.id)
        }
      )
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        console.log("ref is not null, cleaning up", channelRef.current)
        channelRef.current.unbind_all()
        pusherClient.unsubscribe("presence-online-members")
      }
    }
  }, [add, remove, set])
}
