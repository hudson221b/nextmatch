"use client"

import { CardWrapper } from "@/components/CardWrappers"
import { RiProfileLine } from "react-icons/ri"
import MemberDetailsForm from "../register/MemberDetailsForm"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "@nextui-org/react"
import { memberSchema, type MemberSchema } from "@/lib/zod-schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { completeSocialLoginProfile } from "@/app/actions/authActions"
import { signIn } from "next-auth/react"

export default function CompleteProfileForm() {
  const methods = useForm<MemberSchema>({
    resolver: zodResolver(memberSchema),
    mode: "onTouched",
  })

  const {
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = methods

  const onSubmit = async (data: MemberSchema) => {
    const result = await completeSocialLoginProfile(data)

    // signs in user again to update user token
    if (result.status === "success") {
      signIn(result.data, { callbackUrl: "/members" })
    }
  }

  return (
    <CardWrapper
      headerText="About you"
      headerIcon={RiProfileLine}
      subheaderText="Please complete your profile to continue to the app"
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
