import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Processing() {
  const nav = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      nav("/dashboard")
    }, 2500)
  }, [])

  return (
    <div className="center">
      <h2>Analyzing Risk Profile...</h2>
    </div>
  )
}