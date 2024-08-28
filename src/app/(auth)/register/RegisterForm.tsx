"use client"
import { registerUser } from "@/app/actions/authActions"
import {
  profileSchema,
  type RegisterSchema,
  registerSchema,
} from "@/lib/zod-schemas/auth-schema"
import { handleFormServerErrors } from "@/lib/client-utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react"
import { FormProvider, useForm } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"
import { toast } from "react-toastify"
import UserDetailsForm from "./UserDetailsForm"
import { useState } from "react"
import ProfileForm from "./ProfileForm"

const stepSchemas = [registerSchema, profileSchema]
const totalSteps = stepSchemas.length
/**
 * Two-step form
 */
const RegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const schemaToUse = stepSchemas[currentStep]

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(schemaToUse),
    mode: "onTouched",
  })

  const {
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting, errors },
  } = methods

  // handles next when at non-last step, handles submmit on the last step
  const onNext = (data: RegisterSchema) => {
    // const result = await registerUser(data)
    // if (result.status === "success") {
    //   toast.success("User registered successfully")
    // } else {
    //   handleFormServerErrors(result, setError)
    // }
    if (currentStep == totalSteps - 1) {
      console.log(getValues())
    } else {
      console.log("heehoe")
      setCurrentStep(prev => prev + 1)
    }
  }

  const onBack = () => {
    setCurrentStep(prev => prev - 1)
  }

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
              {currentStep === 0 ? <UserDetailsForm /> : <ProfileForm />}
              {errors.root?.serverError && (
                <p className="text-danger text-sm">
                  {errors.root.serverError.message}
                </p>
              )}
              <div className="flex flex-col items-center gap-4">
                <Button
                  color="secondary"
                  type="submit"
                  isDisabled={!isValid}
                  isLoading={isSubmitting}
                  fullWidth
                >
                  {currentStep === totalSteps - 1 ? "Register" : "Continue"}
                </Button>
                {currentStep !== 0 && (
                  <Button onClick={onBack} fullWidth>
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
