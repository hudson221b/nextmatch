import { Button } from "@nextui-org/react"
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"


export default function SocialLogin() {
  const onClick = async (provider: "google" | "github") => {
    await signIn(provider)
  }
  return (
    <div className="flex gap-2 items-center">
      <Button
        fullWidth
        variant="bordered"
        size="lg"
        onClick={() => onClick("google")}
      >
        <FcGoogle size={22} />
      </Button>
      <Button
        fullWidth
        variant="bordered"
        size="lg"
        onClick={() => onClick("github")}
      >
        <FaGithub size={22} />
      </Button>
    </div>
  )
}
