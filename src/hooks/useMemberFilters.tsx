import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, } from "react"
import { useFiltersStore } from "./useStores"
import type { MemberFilters } from "@/types"
import type { Selection } from "@nextui-org/react"

export const useMemberFilters = () => {
  const path = usePathname()
  const router = useRouter()

  const { filters, setFilters } = useFiltersStore()

  const { ageRange, gender, orderBy } = filters

  useEffect(() => {
    const params = new URLSearchParams()
    params.set("ageRange", ageRange.join("-"))
    params.set("orderBy", orderBy)

    // special treatment of gender state before setting params
    if (!gender.length) {
      params.set("gender", "")
    } else {
      params.set("gender", gender.join("&"))
    }

    router.replace(`${path}?${params}`)
  }, [ageRange, gender, orderBy, path, router])

  // below three handlers update states only
  const handleAgeFilter = useCallback(
    (value: MemberFilters["ageRange"]) => {
      setFilters("ageRange", value)
    },
    [setFilters]
  )

  const handleGenderFilter = useCallback(
    (value: string) => {
      if (gender.includes(value)) {
        setFilters(
          "gender",
          gender.filter(g => g !== value)
        )
      } else {
        setFilters("gender", [...gender, value])
      }
    },
    [gender, setFilters]
  )

  const handleOrderByFilter = useCallback(
    (value: Selection) => {
      if (value instanceof Set) {
        setFilters("orderBy", value.values().next().value)
      }
    },
    [setFilters]
  )
  return {
    filters,
    handleAgeFilter,
    handleGenderFilter,
    handleOrderByFilter,
  }
}
