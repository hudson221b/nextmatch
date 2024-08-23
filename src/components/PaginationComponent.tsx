"use client"
import usePagination from "@/hooks/usePagination"
import { Pagination } from "@nextui-org/react"
import { useEffect, useMemo } from "react"

export default function PaginationComponent({
  totalCount,
}: {
  totalCount: number
}) {
  const { pagination, setTotalCount, setPageNumber, setPageSize } =
    usePagination()

  useEffect(() => {
    setTotalCount(totalCount)
  }, [setTotalCount, totalCount])

  const { pageNumber, pageSize, totalPages } = pagination

  const resultStart = useMemo(
    () => (pageNumber - 1) * pageSize + 1,
    [pageNumber, pageSize]
  )

  const resultEnd = useMemo(
    () => Math.min(pageSize * pageNumber, totalCount),
    [pageNumber, pageSize, totalCount]
  )

  const resultText = useMemo(
    () => `Showing ${resultStart}-${resultEnd} of ${totalCount} results`,
    [resultEnd, resultStart, totalCount]
  )

  return (
    <div
      id="pagination-wrapper"
      className="flex justify-between py-2 border-t-2 mt-5 w-full"
    >
      <div id="pagination-showing-result-container">{resultText}</div>
      <div id="pagination-page-selector-container">
        <Pagination
          total={totalPages}
          initialPage={1}
          page={pageNumber}
          variant="bordered"
          color="secondary"
          onChange={setPageNumber}
        />
      </div>
      <div
        id="pagination-size-selector-container"
        className="flex gap-1 items-center"
      >
        Results per page:
        {[3, 6, 12].map(size => (
          <div
            className={`page-size-box ${
              pageSize === size
                ? "bg-secondary text-white"
                : "hover:bg-gray-100"
            }`}
            key={`page-size-${size}`}
            onClick={() => setPageSize(size)}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  )
}
