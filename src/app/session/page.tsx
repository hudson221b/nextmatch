import { auth } from "@/auth"
import ClientSession from "@/components/ClientSession"

export default async function SessionPage() {
  // auth returns the result of its callbacks.
  // TODO: what about the results from multiple callbacks?
  const session = await auth()
  return (
    <div className="flex justify-around mt-20 gap-6">
      <div className="bg-green-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
        <h3 className="text-2xl font-semibold">Server session data</h3>
        {session ? (
          <pre>{JSON.stringify(session, null, 2)}</pre>
        ) : (
          "Not signed in"
        )}
      </div>
      <ClientSession />
    </div>
  )
}
