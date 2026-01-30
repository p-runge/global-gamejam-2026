import { useEffect, useState, type ReactNode } from "react"
import "./Menu.css"

type MenuProps = {
  children: ReactNode
}

export default function Menu({ children }: MenuProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        setIsPlaying(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (isPlaying) {
    return <>{children}</>
  }

  return (
    <div className='menu'>
      <p>Press space to start</p>
    </div>
  )
}
