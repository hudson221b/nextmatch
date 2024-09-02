"use client"

import { CardWrapper } from "@/components/CardWrappers"
import { RiProfileLine } from "react-icons/ri"
import MemberDetailsForm from "../register/MemberDetailsForm"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "@nextui-org/react"
import { memberSchema, type MemberSchema } from "@/lib/zod-schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"

export default function CompleteProfileForm() {
  const methods = useForm<MemberSchema>({
    resolver: zodResolver(memberSchema),
    mode: "onTouched",
  })

  const {
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = methods

  const onSubmit = async (data: any) => {
    console.log(data)
  }
  return (
    <CardWrapper
      headerText="About you"
      headerIcon={RiProfileLine}
      body={
        <FormProvider {...methods}>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <MemberDetailsForm />
              {errors.root?.serverError && (
                <p className="text-danger text-sm">
                  {errors.root.serverError.message}
                </p>
              )}
              <div className="flex flex-col items-center gap-4">
                <Button
                  type="submit"
                  color="secondary"
                  isDisabled={!isValid}
                  isLoading={isSubmitting}
                  fullWidth
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      }
    />
  )
}
