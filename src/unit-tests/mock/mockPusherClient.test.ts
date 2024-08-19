
// mockPusherClient.ts
const mockChannel = {
  bind: jest.fn(),
  unbind_all: jest.fn(),
  subscribed: true,
}

export const mockPusherClient = {
  subscribe: jest.fn().mockReturnValue(mockChannel),
  unsubscribe: jest.fn(),
}

jest.mock("path-to-your-pusher-client", () => mockPusherClient)
