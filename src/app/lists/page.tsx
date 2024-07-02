import React from "react"
import { ListTabs } from "./ListTabs"
import { fetchLikesForCurrentUser } from "../actions/likeActions"

const ListsPage: React.FC = async () => {
  const likeIds = await fetchLikesForCurrentUser()
  // need to access the query string to decide which members to fetch

  return (
    <div>
      <ListTabs />
    </div>
  )
}

export default ListsPage
