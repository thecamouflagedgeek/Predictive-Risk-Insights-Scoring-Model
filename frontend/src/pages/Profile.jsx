import { useNavigate } from "react-router-dom"

export default function Profile() {
  const nav = useNavigate()

  return (
    <div className="card">
      <h2>Financial Profile</h2>

      <input placeholder="Monthly Income" />
      <input placeholder="Employment Tenure (months)" />
      <input placeholder="Utility Payment Delay Avg" />

      <button onClick={() => nav("/upload")}>
        Next
      </button>
    </div>
  )
}