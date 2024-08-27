import { differenceInYears, formatDistanceToNow } from "date-fns"

/**
 * Creates a unique channel name between the current user and the recipient. It's alphabetically sorted so to ensure only one channel name between two users.
 */
export function generateChatChannelName(userId: string, recipientId: string) {
  return userId > recipientId
    ? `${recipientId}-${userId}`
    : `${userId}-${recipientId}`
}

/**
 * Calculates the distance of a given date string to now
 * @returns a string in the format of "xx minutes/hours/days/weeks ago"
 */
export const timeAgo = (date: string) => {
  return formatDistanceToNow(date) + " ago"
}

/**
 * @return number of full years
 */
export const calculateAge = (date: Date) => {
  const today = new Date()
  return differenceInYears(today, date)
}
