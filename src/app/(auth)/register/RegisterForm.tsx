"use client"
import { registerUser } from "@/app/actions/registerActions"
import { type RegisterSchema, registerSchema } from "@/lib/schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: "onTouched",
  })

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data)
    console.log({ result })
  }

  return (
    <Card className="w-2/5 mx-auto">
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
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...register("name")}
              label="Name"
              variant="bordered"
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              {...register("email")}
              label="Email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              {...register("password")}
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
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default RegisterForm
