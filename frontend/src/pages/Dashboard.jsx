
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApplication } from "../context/ApplicationContext"
import RiskAssessment from "../components/RiskAssessment"
import { assessRisk } from "../api/api"

export default function Dashboard() {
  const nav = useNavigate()
  const { app, setApp } = useApplication()
  const [riskData, setRiskData] = useState(null)
  const [loadingRisk, setLoadingRisk] = useState(false)

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
          document_result: parsed.document_result,
          epfo_months: parsed.epfo_months || 6,
          utility_repayment_rate: parsed.utility_repayment_rate || 0.85
        }))
      }
    }
  }, [])

  /* -------- Load Risk Assessment -------- */
  useEffect(() => {
    if (scoreData && app.role === "lender") {
      loadRiskAssessment()
    }
  }, [scoreData, app.role])

  async function loadRiskAssessment() {
    try {
      setLoadingRisk(true)
      const payload = {
        user_id: scoreData.user_id || "borrower_001",
        lender_id: scoreData.lender_id || "lender_001",
        score: scoreData.score || 600,
        epfo_months: app.epfo_months || 6,
        utility_repayment_rate: app.utility_repayment_rate || 0.85,
        sentiment: scoreData.sentiment || "neutral",
        document_risk_level: app.document_result?.analysis?.risk_level || "low"
      }

      const response = await assessRisk(payload)
      if (response.risk_assessment) {
        setRiskData(response.risk_assessment)
      }
    } catch (error) {
      console.error("Error loading risk assessment:", error)
    } finally {
      setLoadingRisk(false)
    }
  }

  /* -------- BORROWER: Share with lender -------- */
  function shareWithLender() {
    const payload = {
      sharedAt: new Date().toISOString(),
      score_result: app.score_result,
      document_result: app.document_result,
      epfo_months: app.epfo_months,
      utility_repayment_rate: app.utility_repayment_rate
    }

    localStorage.setItem(
      "sharedBorrowerApplication",
      JSON.stringify(payload)
    )

    alert("Your application has been shared with the lender.")
  }

  /* -------- LOGOUT -------- */
  function handleLogout() {
    setApp({
      role: null,
      name: "",
      email: "",
      score_result: null,
      document_result: null,
      epfo_months: 0,
      utility_repayment_rate: 0
    })
    localStorage.removeItem("sharedBorrowerApplication")
    nav("/")
  }

  /* -------- LENDER: Load demo data for testing -------- */
  function loadDemoData() {
    const demoPayload = {
      sharedAt: new Date().toISOString(),
      score_result: {
        user_id: "demo_borrower_001",
        lender_id: "demo_lender_001",
        score: 685,
        sentiment: "positive",
        transparency_report: [
          "Excellent job stability (12+ months)",
          "Perfect utility payment record",
          "Positive application sentiment"
        ]
      },
      document_result: {
        analysis: {
          risk_level: "low",
          message: "All documents verified and authentic"
        }
      },
      epfo_months: 18,
      utility_repayment_rate: 0.98
    }

    localStorage.setItem(
      "sharedBorrowerApplication",
      JSON.stringify(demoPayload)
    )

    setApp(prev => ({
      ...prev,
      score_result: demoPayload.score_result,
      document_result: demoPayload.document_result,
      epfo_months: demoPayload.epfo_months,
      utility_repayment_rate: demoPayload.utility_repayment_rate
    }))
  }

  if (!scoreData) {
    if (app.role === "lender") {
      return (
        <div className="min-h-screen bg-[#0a0814] text-white px-8 py-10">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold">Risk Dashboard</h2>
              <p className="mt-1 text-gray-400">
                Consolidated borrower risk overview
              </p>
            </div>

            {/* Empty State */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-12">
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-block p-4 rounded-full bg-blue-500/20 border border-blue-500/30">
                    <svg
                      className="w-12 h-12 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">No Applications Shared</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Waiting for borrowers to share their applications. Once a borrower
                  shares their data, you'll be able to review their risk assessment
                  and make lending decisions.
                </p>

                {/* Instructions */}
                <div className="bg-white/5 rounded-xl p-6 mb-8 text-left border border-white/10">
                  <h4 className="font-semibold mb-3">How to get started:</h4>
                  <ol className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-blue-400">1</span>
                      <span>A borrower completes their profile and uploads documents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-blue-400">2</span>
                      <span>The system generates a credit score</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-blue-400">3</span>
                      <span>They share their application with you</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-blue-400">4</span>
                      <span>You'll see their risk assessment on this dashboard</span>
                    </li>
                  </ol>
                </div>

                {/* Demo Button */}
                <button
                  onClick={loadDemoData}
                  className="
                    px-8 py-3 rounded-xl
                    bg-blue-600
                    text-white font-semibold
                    shadow-lg shadow-blue-600/30
                    hover:bg-blue-500
                    transition
                    mb-4
                  "
                >
                  Load Demo Data
                </button>

                <p className="text-xs text-gray-500">
                  Use demo data to see how the risk assessment feature works
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="min-h-screen bg-[#0a0814] text-white flex items-center justify-center">
          No score data available. Please complete your profile first.
        </div>
      )
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0a0814] text-white px-8 py-10">

      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Risk Dashboard
          </h2>
          <p className="mt-1 text-gray-400">
            Consolidated borrower risk overview
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="
            px-6 py-3 rounded-xl
            bg-gray-700
            text-white font-semibold
            hover:bg-gray-600
            transition
          "
        >
          Logout
        </button>
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

        {/* Risk Summary - Borrower View */}
        {app.role === "borrower" && (
          <div className="rounded-2xl
                          bg-white/5 backdrop-blur-xl
                          border border-white/10
                          shadow-xl p-6">

            <p className="text-sm text-gray-400 mb-4">
              Risk Signals
            </p>

            <div className="space-y-3 text-sm">
              {scoreData.transparency_report && scoreData.transparency_report.map((reason, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-gray-300">{reason}</span>
                  <span className="text-green-400">✔</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Risk Assessment Component - Lender Only */}
      {app.role === "lender" && (
        <div className="mt-8">
          <RiskAssessment riskData={riskData} isLoading={loadingRisk} />
        </div>
      )}

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
        Simulate What if Analysis
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

      {/*<button
        onClick={handleLogout}
        className="
          px-6 py-3 rounded-xl
          bg-gray-700
          text-white font-semibold
          hover:bg-gray-600
          transition
        "
      >
        Logout
      </button>*/}
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

      {/*<button
        onClick={handleLogout}
        className="
          px-6 py-3 rounded-xl
          bg-gray-700
          text-white font-semibold
          hover:bg-gray-600
          transition
        "
      >
        Logout
      </button>*/}
    </>
  )}

</div>

    </div>
  )
}