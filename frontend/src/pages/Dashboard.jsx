import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const nav = useNavigate()

  return (
    <div className="relative min-h-screen bg-[#0a0814] text-white px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">
          Risk Dashboard
        </h2>
        <p className="mt-1 text-gray-400">
          Consolidated borrower risk overview
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Credit Score Card */}
        <div className="col-span-1 md:col-span-2 rounded-2xl
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        shadow-xl p-8">

          <p className="text-sm text-gray-400">
            Composite Credit Score
          </p>

          <div className="mt-4 flex items-end gap-4">
            <span className="text-6xl font-extrabold text-green-400">
              742
            </span>
            <span className="mb-2 text-sm text-gray-400">
              Low Risk
            </span>
          </div>

          <p className="mt-6 text-sm text-gray-300 max-w-xl">
            Score generated using credit history, transaction behaviour,
            employment continuity, and utility payment signals.
          </p>
        </div>

        {/* Risk Summary */}
        <div className="rounded-2xl
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        shadow-xl p-6">

          <p className="text-sm text-gray-400 mb-4">
            Risk Signals
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Income Stability</span>
              <span className="text-green-400">Strong</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Employment Tenure</span>
              <span className="text-green-400">Stable</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Utility Payments</span>
              <span className="text-yellow-400">Moderate Delays</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Fraud Indicators</span>
              <span className="text-green-400">None Detected</span>
            </div>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="mt-10 flex gap-4">

        <button
          onClick={() => nav("/explain")}
          className="
            px-6 py-3 rounded-xl
           bg-[#b25dfc]
            text-white font-semibold
            shadow-lg shadow-[#6d5dfc]/30
            hover:bg-[#c600fd]
            transition
          "
        >
          View Score Explanation
        </button>

        <button
          onClick={() => nav("/simulate")}
          className="
            px-6 py-3 rounded-xl
           bg-[#d4ac26]
            text-white font-semibold
         
            hover:bg-[#ad9e14]
            transition
          "
        >
          Simulate Risk Scenarios
        </button>

        {/* Compliance */}
  <button
    onClick={() => nav("/compliance")}
    className="
      px-6 py-3 rounded-xl
      bg-indigo-600
      text-white font-semibold
      shadow-lg shadow-indigo-600/30
      hover:bg-indigo-500
      transition
    "
  >
    View Compliance Status
  </button>

      </div>
    </div>
  )
}
