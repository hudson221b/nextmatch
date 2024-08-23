import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition, useEffect } from "react"
import { usePaginationStore } from "./useStores"

export default function usePagination() {
  const path = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { pagination } = usePaginationStore(state => ({
    pagination: state.pagination,
  }))

  const { pageNumber, pageSize } = pagination

  const [_isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      params.set("pageSize", pageSize.toString())
      params.set("page", pageNumber.toString())

      router.replace(`${path}?${params}`)
    })
  }, [pageNumber, pageSize, path, router, searchParams])
}
