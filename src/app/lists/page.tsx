import { ListTabs } from "./ListTabs"
import {
  fetchLikesForCurrentUser,
  type LikeTypes,
} from "../actions/likeActions"
import type { Member } from "@prisma/client"

const ListsPage = async ({
  searchParams,
}: {
  searchParams: { type: string }
}) => {
  const likeIds = (await fetchLikesForCurrentUser()) as string[]
  const type = searchParams?.type?.toString() as LikeTypes
  const membersToDisplay = (await fetchLikesForCurrentUser(
    type,
    "member"
  )) as Member[]

  return (
    <div>
      <ListTabs members={membersToDisplay} likeIds={likeIds} />
    </div>
  )
}

export default ListsPage
