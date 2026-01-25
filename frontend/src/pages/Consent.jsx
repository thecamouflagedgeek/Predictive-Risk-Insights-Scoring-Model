import { useNavigate } from "react-router-dom"

export default function Consent() {
  const nav = useNavigate()

  return (
    <div className="card">
      <h2>Data Consent</h2>

      <p>
        We collect financial and identity data only for
        credit scoring and regulatory compliance.
      </p>

      <button onClick={() => nav("/profile")}>
        I Agree
      </button>
    </div>
  )
}