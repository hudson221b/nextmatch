import { getMembers } from "../actions/memberActions"
import {
  fetchLikesForCurrentUser,
} from "../actions/likeActions"
import MemberCard from "./memberCard"
import PaginationComponent from "@/components/PaginationComponent"
import EmptyResult from "@/components/EmptyResult"
import type { GetMembersParams } from "@/types"

const MembersPage = async ({
  searchParams,
}: {
  searchParams: GetMembersParams
}) => {
  const { items: members, totalCount } = await getMembers(searchParams)

  // members that the current user has liked
  const likeIds = (await fetchLikesForCurrentUser("source", "id")) as string[]

  return !members || members.length === 0 ? (
    <EmptyResult />
  ) : (
    <>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 *:max-w-[300px] gap-8">
        {members &&
          members.map(member => {
            return (
              <MemberCard
                member={member}
                key={`${member.id}-member-card`}
                likeIds={likeIds}
              />
            )
          })}
      </div>
      <PaginationComponent totalCount={totalCount} />
    </>
  )
}
export default MembersPage
