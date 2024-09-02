import { useEffect, useRef } from "react"
import { usePresenceStore } from "./useStores"
import type { Channel, Members } from "pusher-js"
import { pusherClient } from "@/lib/pusher"
import { updateLastActive } from "@/app/actions/memberActions"

/**
 *
 * This hook is in charge of the following scenarios:
 * 1) when a not signed-in user opens the app, does not subscribe
 * 2) when a user signs in, subscribes to the presence channel, and maintains the same subscription across pages in the app as long as the user stays signed-in
 * 3) when a user signs out, unsubscribes
 * 4) when a signed user closes the app, unsubscribes
 */
export const usePresenceChannel = (
  userId: string | null,
  profileCompleted: boolean | null,
  isAdmin: boolean
) => {
  const [add, remove, set] = usePresenceStore(state => [
    state.addMember,
    state.removeMember,
    state.setMembers,
  ])

  const channelRef = useRef<Channel | null>(null)

  useEffect(() => {
    if (!pusherClient) {
      console.log("Pusher client is not initialized")
      return
    }

    if (!profileCompleted || isAdmin) {
      return
    }

    // when a not signed-in user opens app, no subscription
    if (!userId && !channelRef.current?.subscribed) {
      return
    }

    // when a signed-in signs out, unsubscribe
    if (!userId && channelRef.current?.subscribed) {
      channelRef.current.unbind_all()
      pusherClient.unsubscribe("presence-online-members")
      return
    }

    // when a user signs in
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("presence-online-members")

      // read more about members param here https://pusher.com/docs/channels/using_channels/presence-channels/#accessing-channel-members. Or you can log it out and see its structure
      channelRef.current.bind(
        "pusher:subscription_succeeded",
        async (members: Members) => {
          set(Object.keys(members.members))
          await updateLastActive()
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
  }, [userId, profileCompleted])

  // unsubscribe when a signed-in user closes the app
  useEffect(() => {
    return () => {
      if (channelRef.current?.subscribed) {
        channelRef.current.unbind_all()
        pusherClient.unsubscribe("presence-online-members")
      }
    }
  }, [])
}
