import { renderHook, act } from "@testing-library/react"
import { usePresenceChannel } from "@/hooks/usePresenceChannel"
import { pusherClient } from "@/lib/pusher"

// Mock pusherClient
jest.mock("@/lib/pusher", () => ({
  pusherClient: {
    subscribe: jest.fn().mockReturnValue({
      bind: jest.fn(),
      unbind_all: jest.fn(),
      subscribed: true,
    }),
    unsubscribe: jest.fn(),
  },
}))

// Mock the usePresenceStore
jest.mock("@/hooks/useStores", () => ({
  usePresenceStore: () => [jest.fn(), jest.fn(), jest.fn()],
}))

describe("usePresenceChannel", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Scenario 1: Not signed-in user opens the app
  it("does not subscribe when user is not signed in", () => {
    renderHook(() => usePresenceChannel(null))
    expect(pusherClient.subscribe).not.toHaveBeenCalled()
  })

  // Scenario 2: User signs in and navigates
  it("subscribes when user signs in and maintains subscription across pages", () => {
    const { rerender } = renderHook<void, { userId: string | null }>(
      ({ userId }) => usePresenceChannel(userId),
      {
        initialProps: { userId: null },
      }
    )

    // User signs in
    act(() => {
      rerender({ userId: "user123" })
    })

    expect(pusherClient.subscribe).toHaveBeenCalledWith(
      "presence-online-members"
    )
    expect(pusherClient.subscribe).toHaveBeenCalledTimes(1)

    // Simulate page navigation
    act(() => {
      rerender({ userId: "user123" })
    })

    // Should not subscribe again
    expect(pusherClient.subscribe).toHaveBeenCalledTimes(1)
  })

  // Scenario 3: User signs out
  it("unsubscribes when user signs out", () => {
    const { rerender } = renderHook<void, { userId: string | null }>(
      ({ userId }) => usePresenceChannel(userId),
      {
        initialProps: { userId: "user123" },
      }
    )

    // User signs out
    act(() => {
      rerender({ userId: null })
    })

    expect(pusherClient!.unsubscribe).toHaveBeenCalledWith(
      "presence-online-members"
    )
  })

  // Scenario 4: Signed-in user closes the app
  it("unsubscribes when signed-in user closes the app", () => {
    const { unmount } = renderHook(() => usePresenceChannel("user123"))

    // Simulate app closure
    unmount()

    expect(pusherClient.unsubscribe).toHaveBeenCalledWith(
      "presence-online-members"
    )
  })
})
