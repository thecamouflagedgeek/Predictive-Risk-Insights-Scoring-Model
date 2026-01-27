import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useApplication } from "../context/ApplicationContext"

export default function Dashboard() {
  const nav = useNavigate()
  const { app, setApp } = useApplication()

  const scoreData = app.score_result

  /* -------- LENDER: Load shared borrower data -------- */
  useEffect(() => {
    if (app.role === "lender" && !app.score_result) {
      const shared = localStorage.getItem("sharedBorrowerApplication")
      if (shared) {
        const parsed = JSON.parse(shared)
        setApp(prev => ({
          ...prev,
          score_result: parsed.score_result,
          document_result: parsed.document_result
        }))
      }
    }
  }, [])

  /* -------- BORROWER: Share with lender -------- */
  function shareWithLender() {
    const payload = {
      sharedAt: new Date().toISOString(),
      score_result: app.score_result,
      document_result: app.document_result
    }

    localStorage.setItem(
      "sharedBorrowerApplication",
      JSON.stringify(payload)
    )

    alert("Your application has been shared with the lender.")
  }

  if (!scoreData) {
    return (
      <div className="min-h-screen bg-[#0a0814] text-white flex items-center justify-center">
        No score data available.
      </div>
    )
  }

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
              {scoreData.score}
            </span>
            <span className="mb-2 text-sm text-gray-400">
              {scoreData.sentiment}
            </span>
          </div>

          <p className="mt-6 text-sm text-gray-300 max-w-xl">
            Score generated using employment consistency,
            utility repayment behavior, and sentiment signals.
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
            {scoreData.transparency_report.map((reason, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-gray-300">{reason}</span>
                <span className="text-green-400">✔</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Document Status */}
      {app.document_result && (
        <div className="mt-8 rounded-2xl
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        shadow-xl p-6 max-w-xl">

          <p className="text-sm text-gray-400 mb-2">
            Document Authenticity
          </p>

          <p className={`text-sm ${
            app.document_result.analysis?.risk_level === "high"
              ? "text-red-400"
              : "text-green-400"
          }`}>
            {app.document_result.analysis?.message}
          </p>
        </div>
      )}

      {/* Actions */}
<div className="mt-10 flex gap-4 flex-wrap">

  {/* Borrower-only actions */}
  {app.role === "borrower" && (
    <>
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

      <button
        onClick={shareWithLender}
        className="
          px-6 py-3 rounded-xl
          bg-emerald-600
          text-white font-semibold
          shadow-lg shadow-emerald-600/30
          hover:bg-emerald-500
          transition
        "
      >
        Share with Lender
      </button>
    </>
  )}

  {/* Lender-only actions */}
  {app.role === "lender" && (
    <>
      <button
        onClick={() => nav("/fraud")}
        className="
          px-6 py-3 rounded-xl
          bg-red-600
          text-white font-semibold
          shadow-lg shadow-red-600/30
          hover:bg-red-500
          transition
        "
      >
        View Fraud Analysis
      </button>

      <button
        onClick={() => nav("/lender/compliance")}
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
    </>
  )}

</div>

    </div>
  )
}
