"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"
import { loginSchema, type LoginSchema } from "@/lib/zod-schemas/auth-schema"
import { signInUser } from "@/app/actions/authActions"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  })

  const router = useRouter()

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data)

    if (result.status === "success") {
      router.push("./members")
      // force page refresh after sign in to re-render TopNav server component
      router.refresh()
    } else {
      console.log(result.error)
      toast.error(result.error as string,{hideProgressBar: true});
      
    }
  }

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...register("email")}
              label="Email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              {...register("password")}
              type="password"
              label="Password"
              variant="bordered"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button
              fullWidth
              color="secondary"
              type="submit"
              isDisabled={!isValid}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default LoginForm
