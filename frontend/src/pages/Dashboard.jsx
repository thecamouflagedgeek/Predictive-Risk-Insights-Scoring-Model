import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const nav = useNavigate()

  return (
    <div className="dashboard">
      <h2>Risk Dashboard</h2>

      <div className="card">
        Credit Score: 742
      </div>

      <button onClick={() => nav("/explain")}>
        View Explanation
      </button>

      <button onClick={() => nav("/simulate")}>
        Simulate Risk
      </button>
    </div>
  )
}