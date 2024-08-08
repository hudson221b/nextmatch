

/**
 * Creates a unique channel name between the current user and the recipient. It's alphabetically sorted so to ensure only one channel name between two users.
 */
export function getChannelName(userId: string, recipientId: string) {
  return userId > recipientId
    ? `${recipientId}-${userId}`
    : `${userId}-${recipientId}`
}
