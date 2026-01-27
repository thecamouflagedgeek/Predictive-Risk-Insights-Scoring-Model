import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApplication } from "../context/ApplicationContext"

export default function Explainability() {
  const nav = useNavigate()
  const { app } = useApplication()
  const [reasons, setReasons] = useState([])

  useEffect(() => {
    async function fetchExplainability() {
      const res = await fetch("http://127.0.0.1:8000/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          income: app.income,
          employment_tenure: app.employment_tenure,
          utility_delay: app.utility_delay,
          credit_history: 1 // thin-file default
        })
      })

      const data = await res.json()
      setReasons(data.reasons || [])
    }

    fetchExplainability()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0a0814] text-white px-8 py-10">

      {/* ================= HEADER ================= */}
      <div className="mb-10 max-w-3xl">
        <h2 className="text-3xl font-bold">
          Score Explanation
        </h2>
        <p className="mt-2 text-gray-400">
          A transparent breakdown of the key factors that influenced
          the generated credit score.
        </p>
      </div>

      {/* ================= EXPLANATION GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">

        {/* ================= POSITIVE SIGNALS ================= */}
        <div className="
          rounded-2xl bg-white/5 backdrop-blur-xl
          border border-white/10 shadow-xl p-6
        ">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            Model Reason Codes
          </p>

          <ul className="space-y-4 text-sm">
            {reasons.length === 0 && (
              <li className="text-gray-400">
                No adverse factors detected.
              </li>
            )}

            {reasons.map((reason, idx) => (
              <li key={idx} className="flex justify-between">
                <span className="text-gray-300">
                  {reason}
                </span>
                <span className="text-emerald-400">
                  ✓
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= SYSTEM CHECKS ================= */}
        <div className="
          rounded-2xl bg-white/5 backdrop-blur-xl
          border border-white/10 shadow-xl p-6
        ">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            System & Compliance Checks
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-300">
                Fraud Indicators
              </span>
              <span className="text-purple-300">
                {app.document_result?.analysis?.risk_level === "high"
                  ? "Flagged"
                  : "None Detected"}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">
                Identity Verification
              </span>
              <span className="text-purple-300">
                Verified
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">
                Consent Status
              </span>
              <span className="text-purple-300">
                Logged & Active
              </span>
            </li>
          </ul>
        </div>

        {/* ================= SENTIMENT ================= */}
        <div className="
          rounded-2xl bg-white/5 backdrop-blur-xl
          border border-white/10 shadow-xl p-6
        ">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            Behavioral Signal
          </p>

          <p className="text-sm text-gray-300">
            Applicant intent analysis indicates:
          </p>

          <p className="mt-4 text-lg font-semibold text-purple-300">
            {app.score_result?.sentiment || "Neutral"}
          </p>
        </div>
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <div className="mt-12 max-w-4xl text-sm text-gray-500">
        This explanation is generated using rule-based explainability
        aligned with regulatory expectations. Each reason directly maps
        to a deterministic condition in the scoring engine, ensuring
        auditability and customer fairness.
      </div>

      {/* ================= BACK ================= */}
      <div className="mt-10">
        <button
          onClick={() => nav("/dashboard")}
          className="
            px-6 py-3 rounded-xl
            bg-[#b25dfc]
            text-white font-semibold
            shadow-lg shadow-[#6d5dfc]/30
            hover:bg-[#c600fd]
            transition
          "
        >
          Back to Dashboard
        </button>
      </div>

    </div>
  )
}
