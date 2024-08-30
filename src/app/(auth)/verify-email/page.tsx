import { verifyEmail } from "@/app/actions/authActions"
import { ResultMessage } from "@/components/CardWrappers"
import { Card, CardBody } from "@nextui-org/react"

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  const tokenString = searchParams.token

  const result = await verifyEmail(tokenString)
  
  return (
    <Card className="w-2/5 mx-auto">
      <CardBody>
        <ResultMessage result={result} />
      </CardBody>
    </Card>
  )
}
