import { useNavigate } from "react-router-dom"

export default function Landing() {
  const nav = useNavigate()

  return (
    <div className="center">
      <h1>PRISM</h1>
      <p>AI Powered Credit Risk Intelligence</p>
      <button onClick={() => nav("/login")}>
        Get Started
      </button>
    </div>
  )
}