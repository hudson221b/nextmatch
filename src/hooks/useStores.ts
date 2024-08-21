/**
 * This file exports all zustand stores
 */

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { MessageDTO } from "@/types"

type PresenceState = {
  members: string[]
  addMember: (id: string) => void
  removeMember: (id: string) => void
  setMembers: (ids: string[]) => void
}

/**
 * Creates a global presence store to keep track of users connected to the app.
 */
export const usePresenceStore = create<PresenceState>()(
  devtools(
    set => ({
      members: [],
      addMember: id => set(state => ({ members: [...state.members, id] })),
      removeMember: id =>
        set(state => ({
          members: state.members.filter(member => member !== id),
        })),
      setMembers: ids => set({ members: ids }),
    }),
    {
      name: "presence_store",
    }
  )
)

type MessagesState = {
  messages: MessageDTO[]
  unreadCount: number
  add: (message: MessageDTO) => void
  remove: (id: string) => void
  set: (messages: MessageDTO[]) => void
  updateUnreadCount: (n: number) => void
}

export const useMessagesStore = create<MessagesState>()(
  devtools(
    set => ({
      messages: [],
      unreadCount: 0,
      add: message =>
        set(state => ({ messages: [message, ...state.messages] })),
      remove: id =>
        set(state => ({
          messages: state.messages.filter(m => m.id !== id),
        })),
      set: messages => set({ messages }),
      updateUnreadCount: n => set(state => ({ unreadCount: state.unreadCount + n })),
    }),
    {
      name: "messages_store",
    }
  )
)