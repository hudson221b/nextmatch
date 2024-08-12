/**
 * This file exports all zustand stores
 */

import { create } from "zustand"
import { devtools } from "zustand/middleware"

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
