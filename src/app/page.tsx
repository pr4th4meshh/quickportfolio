import Hero from "@/components/Hero"
import { getUserFromToken } from "@/hooks/getUser"

export default async function Home() {
  let user, error

  try {
    // Call the function to extract the user
    user = await getUserFromToken()
  } catch (err) {
    error = "You are not logged in."
  }

  return (
    <div className="">
      <Hero user={user} />
    </div>
  )
}
