"use client"

import { Button } from "@nextui-org/button"
import { SelectItem } from "@nextui-org/react"
import { Select } from "@nextui-org/select"
import { Slider } from "@nextui-org/slider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useCallback, useMemo } from "react"
import { FaFemale, FaMale } from "react-icons/fa"

export default function Filters() {
  const path = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const genderItems = useMemo(
    () => [
      {
        value: "male",
        icon: FaMale,
      },
      {
        value: "female",
        icon: FaFemale,
      },
    ],
    []
  )

  const orderByItems = useMemo(
    () => [
      {
        label: "Last active",
        value: "updated",
      },
      {
        label: "Newest members",
        value: "created",
      },
    ],
    []
  )

  const handleAgeSelect = useCallback(
    (value: number[]) => {
      const params = new URLSearchParams(searchParams)
      params.set("ageRange", value.join("-"))
      router.replace(`${path}?${params}`)
    },
    [searchParams]
  )

  if (path !== "/members") return null

  return (
    <div
      id="filters-wrapper"
      className="flex justify-around items-center shadow-md py-2"
    >
      <div
        id="result-container"
        className="text-secondary font-semibold text-xl"
      >
        Results: 10
      </div>
      <div
        id="gender-selection-buttons-container"
        className="flex gap-2 items-center"
      >
        <div>Gender:</div>
        {genderItems.map(({ value, icon: Icon }) => (
          <Button
            isIconOnly
            aria-label={value}
            key={`${value}-button`}
            color="secondary"
            size="sm"
          >
            <Icon size={24} />
          </Button>
        ))}
      </div>
      <div id="age-slider-container" className="flex flex-row w-1/4">
        <Slider
          label="Age range"
          step={1}
          maxValue={100}
          minValue={18}
          defaultValue={[25, 55]}
          size="sm"
          color="secondary"
          onChangeEnd={value => handleAgeSelect(value as number[])}
        />
      </div>
      <div id="order-by-selector-container" className="w-1/4">
        <Select label="Order by" size="sm" variant="bordered">
          {orderByItems.map(item => (
            <SelectItem key={`${item.value}-option`} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
