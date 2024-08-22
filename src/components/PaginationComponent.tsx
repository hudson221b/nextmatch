"use client"
import { Pagination } from "@nextui-org/react"
import React, { useState } from "react"

export default function PaginationComponent() {
  const [pageSize, setPageSize] = useState(4)
  return (
    <div
      id="pagination-wrapper"
      className="flex justify-between py-2 border-t-2 mt-5 w-full"
    >
      <div id="pagination-showing-result-container">
        Showing 1-10 of 23 results
      </div>
      <div id="pagination-page-selector-container">
        <Pagination
          total={20}
          initialPage={1}
          variant="bordered"
          color="secondary"
        />
      </div>
      <div
        id="pagination-size-selector-container"
        className="flex gap-1 items-center"
      >
        Results per page:
        {[4, 8, 12].map(size => (
          <div
            className={`page-size-box ${
              pageSize === size
                ? "bg-secondary text-white"
                : "hover:bg-gray-100"
            }`}
            key={`page-size-${size}`}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  )
}
