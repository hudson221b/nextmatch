import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition, useEffect } from "react"
import { usePaginationStore } from "./useStores"

export default function usePagination() {
  const path = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { pagination, setTotalCount, setPageNumber, setPageSize } =
    usePaginationStore()

  const { pageNumber, pageSize } = pagination

  const [_, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      params.set("pageSize", pageSize.toString())
      params.set("pageNumber", pageNumber.toString())

      router.replace(`${path}?${params}`)
    })
  }, [pageNumber, pageSize, path, router, searchParams])

  return {
    pagination,
    setTotalCount,
    setPageNumber,
    setPageSize,
  }
}
