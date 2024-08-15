import { auth, signOut } from "@/auth"
import { Button } from "@nextui-org/react"
import { FaRegSmile } from "react-icons/fa"

export default async function Home() {
  // auth returns the result of its callbacks. 
  // TODO: what about the results from multiple callbacks?
  const session = await auth()
  return (
    <div className="text-3xl text-red-700">
      <h1 className="text-3xl">Hello app!!</h1>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <Button
          type="submit"
          color="primary"
          variant="bordered"
          startContent={<FaRegSmile size={20} />}
          // as={Link}
          // href="/members"
        >
          Log out
        </Button>
      </form>
      <div>{session ? JSON.stringify(session) : "Not logged in"}</div>
    </div>
  )
}
