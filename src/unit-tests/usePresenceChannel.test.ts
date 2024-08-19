import { renderHook, act } from '@testing-library/react-hooks';
import { usePresenceChannel } from './usePresenceChannel';
import { mockPusherClient } from './mockPusherClient';

// Mock the usePresenceStore
jest.mock('./usePresenceStore', () => ({
  usePresenceStore: () => ({
    addMember: jest.fn(),
    removeMember: jest.fn(),
    setMembers: jest.fn(),
  }),
}));

describe('usePresenceChannel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Scenario 1: Not signed-in user opens the app
  it('does not subscribe when user is not signed in', () => {
    renderHook(() => usePresenceChannel(null));
    expect(mockPusherClient.subscribe).not.toHaveBeenCalled();
  });

  // Scenario 2: User signs in and navigates
  it('subscribes when user signs in and maintains subscription across pages', () => {
    const { rerender } = renderHook(({ userId }) => usePresenceChannel(userId), {
      initialProps: { userId: null },
    });

    // User signs in
    act(() => {
      rerender({ userId: 'user123' });
    });

    expect(mockPusherClient.subscribe).toHaveBeenCalledWith('presence-online-members');
    expect(mockPusherClient.subscribe).toHaveBeenCalledTimes(1);

    // Simulate page navigation
    act(() => {
      rerender({ userId: 'user123' });
    });

    // Should not subscribe again
    expect(mockPusherClient.subscribe).toHaveBeenCalledTimes(1);
  });

  // Scenario 3: User signs out
  it('unsubscribes when user signs out', () => {
    const { rerender } = renderHook(({ userId }) => usePresenceChannel(userId), {
      initialProps: { userId: 'user123' },
    });

    // User signs out
    act(() => {
      rerender({ userId: null });
    });

    expect(mockPusherClient.unsubscribe).toHaveBeenCalledWith('presence-online-members');
  });

  // Scenario 4: Signed-in user closes the app
  it('unsubscribes when signed-in user closes the app', () => {
    const { unmount } = renderHook(() => usePresenceChannel('user123'));

    // Simulate app closure
    unmount();

    expect(mockPusherClient.unsubscribe).toHaveBeenCalledWith('presence-online-members');
  });
});