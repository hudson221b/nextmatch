"use client"
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { format, subYears } from "date-fns"
import { useFormContext } from "react-hook-form"

const genders = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
].map(g => (
  <SelectItem key={g.value} value={g.value}>
    {g.label}
  </SelectItem>
))

/**
 * Form to collect info for setting up Member fields
 */
export default function MemberDetailsForm() {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <Select
        {...register("gender")}
        label="Gender"
        variant="bordered"
        isInvalid={!!errors.gender}
        errorMessage={errors.gender?.message as string}
        defaultSelectedKeys={new Set([getValues("gender")])}
        onChange={e => setValue("gender", e.target.value)}
      >
        {genders}
      </Select>
      <Input
        {...register("dateOfBirth")}
        type="date"
        label="Date of Birth"
        variant="bordered"
        isInvalid={!!errors.dateOfBirth}
        errorMessage={errors.dateOfBirth?.message as string}
      />
      <Textarea
        {...register("description")}
        label="Description"
        variant="bordered"
        defaultValue={getValues("description")}
      />
      <Input
        {...register("city")}
        label="City"
        variant="bordered"
        isInvalid={!!errors.city}
        errorMessage={errors.city?.message as string}
        defaultValue={getValues("city")}
      />
      <Input
        {...register("country")}
        label="Country"
        defaultValue={getValues("country")}
        variant="bordered"
        isInvalid={!!errors.country}
        errorMessage={errors.country?.message as string}
      />
    </>
  )
}
