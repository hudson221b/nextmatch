import { verifyEmail } from "@/app/actions/authActions"
import { Card, CardBody } from "@nextui-org/react"
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  const tokenString = searchParams.token

  const result = await verifyEmail(tokenString)
  const isSuccess = result.status === "success"

  const icon = isSuccess ? (
    <FaCheckCircle size={24} />
  ) : (
    <FaExclamationTriangle size={24} />
  )

  const text = isSuccess ? result.data : (result.error as string)

  return (
    
      <Card className="w-2/5 mx-auto">
        <CardBody>
          <div
            className={`p-3 rounded-xl w-full flex items-center justify-center gap-x-2 ${
              isSuccess
                ? "text-success-800 bg-success-50"
                : "text-danger-800 bg-danger-50"
            }`}
          >
            {icon}
            <p>{text}</p>
          </div>
        </CardBody>
      </Card>
    
  )
}
