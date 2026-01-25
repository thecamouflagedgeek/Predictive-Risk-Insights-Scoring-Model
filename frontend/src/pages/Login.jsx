import { useNavigate } from "react-router-dom"

export default function Login() {
  const nav = useNavigate()

  return (
    <div className="card">
      <h2>Login</h2>

      <input placeholder="Email" />
      <input placeholder="Password" type="password" />

      <button onClick={() => nav("/consent")}>
        Continue
      </button>
    </div>
  )
}