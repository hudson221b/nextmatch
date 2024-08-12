// "use client"

import { useEffect, useRef } from "react"
import { usePresenceStore } from "./useStores"
import type { Channel, Members } from "pusher-js"
import { pusherClient } from "@/lib/pusher"

/**
 * Changes in pusher presence channel will update the presence store
 */
export const usePresenceChannel = () => {

  // we would like these three methods to stay the same when members state changes
  const { add, remove, set } = usePresenceStore(state => ({
    add: state.addMember,
    remove: state.removeMember,
    set: state.setMembers,
  }))

  // To prevent more than once channel subscription in useEffect (useEffect running twice in React strict mode in development), we need to assign channel object to a ref
  const channelRef = useRef<Channel | null>(null)

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("presence-online-members")

      // pusher:subscription_succeeded is one of the pre-defined events
      // see members iterator doc here https://pusher.com/docs/channels/using_channels/presence-channels/#the-members-parameter
      channelRef.current.bind(
        "pusher:subscription_succeeded",
        (members: Members) => {
          console.log("#####🚀🚀🚀 ~ useEffect ~ members👉👉", members)
          // upon successful subscription, set members in store using the members param from this pusher callback
        }
      )

      // the member object has two properties: id and info; both are set during server authorization
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
      if (channelRef.current) {
        channelRef.current.unsubscribe()

        channelRef.current.unbind("pusher:subscription_succeeded")
        channelRef.current.unbind("pusher:member_added")
        channelRef.current.unbind("pusher:member_removed")
      }
    }
  }, [add, remove])
}
