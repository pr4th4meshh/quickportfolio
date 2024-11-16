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
    <div className="container">
      {error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1>Welcome {user?.username}</h1>
          <p>Email: {user?.email}</p>
        </div>
      )}
    </div>
  )
}
