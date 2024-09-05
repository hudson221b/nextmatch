import { auth } from "@/auth"
import LinkButton from "@/components/LinkButton"
import { GiMatchTip } from "react-icons/gi"

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6 text-secondary">
      <GiMatchTip size={100} />
      <h1 className="text-3xl font-semibold">Welcome to NextMatch</h1>
      {session ? (
        <LinkButton text="Continue" href="/members" />
      ) : (
        <div className="flex gap-10">
          <LinkButton text="Sign In" href="/login" />
          <LinkButton text="Register" href="/register" />
        </div>
      )}
    </div>
  )
}
