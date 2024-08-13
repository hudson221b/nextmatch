import {  formatDistanceToNow } from "date-fns"

/**
 * Creates a unique channel name between the current user and the recipient. It's alphabetically sorted so to ensure only one channel name between two users.
 */
export function generateChatChannelName(userId: string, recipientId: string) {
  return userId > recipientId
    ? `${recipientId}-${userId}`
    : `${userId}-${recipientId}`
}

/**
 * Calculates the distance of a given time string to now
 */
export const timeAgo = (date: string) => {
  return formatDistanceToNow(date) + " ago"
}
