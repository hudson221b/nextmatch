"use client"
import { registerUser } from "@/app/actions/authActions"
import {
  userSchema,
  memberSchema,
  type RegisterSchema,
} from "@/lib/zod-schemas/auth-schema"
import { handleFormServerErrors } from "@/lib/client-utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react"
import { FormProvider, useForm } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"
import UserDetailsForm from "./UserDetailsForm"
import { useCallback, useState } from "react"
import MemberDetailsForm from "./MemberDetailsForm"
import { useRouter } from "next/navigation"

const stepSchemas = [userSchema, memberSchema]
const totalSteps = stepSchemas.length
/**
 * Two-step form
 */
const RegisterForm: React.FC = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const schemaToUse = stepSchemas[currentStep]

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(schemaToUse),
    mode: "onTouched",
  })

  const {
    handleSubmit,
    getValues,
    setError,
    formState: { isValid, isSubmitting, errors },
  } = methods

  const onNext = async () => {
    if (currentStep !== totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      await onSubmit()
    }
  }

  const onSubmit = async () => {
    const result = await registerUser(getValues())
    if (result.status === "success") {
      router.push("/register/success")
    } else {
      handleFormServerErrors(result, setError)
    }
  }

  const getForm = useCallback((step: number) => {
    if (step === 0) {
      return <UserDetailsForm />
    } else if (step === totalSteps - 1) {
      return <MemberDetailsForm />
    }
  }, [])

  return (
    <Card className="w-2/5 mx-auto vertical-center">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Welcome to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <FormProvider {...methods}>
          <form action="" onSubmit={handleSubmit(onNext)}>
            <div className="space-y-4">
              {getForm(currentStep)}
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
                  {currentStep !== totalSteps - 1 ? "Continue" : "Register"}
                </Button>
                {currentStep !== 0 && (
                  <Button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    fullWidth
                  >
                    Back
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  )
}

export default RegisterForm
