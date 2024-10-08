/**
 * This file exports all zustand stores
 */

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { MessageDTO, type MemberFilters, type PagingResult } from "@/types"
import {
  defaultAgeRange,
  defaultGenders,
  defaultOrderBy,
} from "./storeDefaultStates"

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
  resetMessages: () => void
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
      set: messages =>
        set(state => {
          // remove dup messages
          const map = new Map([...state.messages, ...messages].map(m => [m.id, m]))
          const uniqMessages = Array.from(map.values())
          return { messages: uniqMessages }
        }),
      updateUnreadCount: n =>
        set(state => ({ unreadCount: state.unreadCount + n })),
      resetMessages: () => set({ messages: [] }),
    }),
    {
      name: "messages_store",
    }
  )
)

type FiltersState = {
  filters: MemberFilters
  setFilters: (filterName: keyof MemberFilters, value: any) => void
}

export const useFiltersStore = create<FiltersState>()(
  devtools(
    set => ({
      filters: {
        ageRange: defaultAgeRange,
        orderBy: defaultOrderBy,
        gender: defaultGenders,
        hasPhotos: false,
      },
      setFilters: (filterName, value) => {
        set(state => ({ filters: { ...state.filters, [filterName]: value } }))
      },
    }),
    {
      name: "filters_store",
    }
  )
)

type PaginationState = {
  pagination: PagingResult
  setTotalCount: (totalCount: number) => void // set total count and re-calculate total pages based new total count and existing page size
  setPageNumber: (page: number) => void
  setPageSize: (size: number) => void //set page size and re-calculate total pages based on new size and existing total count
}

/**
 * Pagination is based on this formula: TC(total count) = PS(page size) * TP(total pages). Whenever any element in this formula changes, store sets the change, keeps one elemnt fixed, and recalulates the third. 
 */
export const usePaginationStore = create<PaginationState>()(
  devtools(
    set => ({
      pagination: {
        pageNumber: 1,
        pageSize: 12,
        totalPages: 1,
        totalCount: 0,
      },
      setTotalCount: totalCount =>
        set(state => ({
          pagination: {
            pageNumber: 1, // whenever totalCount changes, go back to page 1
            pageSize: state.pagination.pageSize,
            totalCount,
            totalPages: Math.ceil(totalCount / state.pagination.pageSize),
          },
        })),
      setPageNumber: (page: number) =>
        set(state => ({
          pagination: {
            ...state.pagination,
            pageNumber: page,
          },
        })),
      setPageSize: (size: number) =>
        set(state => ({
          pagination: {
            ...state.pagination,
            pageSize: size,
            pageNumber: 1, // whenever page size changes, go back to page 1
            totalPages: Math.ceil(state.pagination.totalCount / size),
          },
        })),
    }),
    {
      name: "pagination_store",
    }
  )
)