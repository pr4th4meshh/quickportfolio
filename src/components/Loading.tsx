import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react"
import { FallingLines } from "react-loader-spinner"

const Loading = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const color = resolvedTheme === "dark" ? "#fff" : "#000"
  return (
    <div>
         <FallingLines color={color} width="100" visible={true} />
         <h1 className="dark:text-white text-black text-xl">Loading...</h1>
    </div>
  )
}

export default Loading
