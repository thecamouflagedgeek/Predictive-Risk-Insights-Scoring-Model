import React from "react"
import { useNavigate } from "react-router-dom"

export default function Explainability() {
  const nav = useNavigate()

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
            Positive Signals
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-300">
                High Monthly Income
              </span>
              <span className="text-emerald-400">
                + Strong Impact
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">
                Employment Continuity
              </span>
              <span className="text-emerald-400">
                + Moderate Impact
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">
                Credit History Length
              </span>
              <span className="text-emerald-400">
                + Mild Impact
              </span>
            </li>
          </ul>
        </div>

        {/* ================= RISK SIGNALS ================= */}
        <div className="
          rounded-2xl bg-white/5 backdrop-blur-xl
          border border-white/10 shadow-xl p-6
        ">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            Risk-Increasing Signals
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-300">
                Utility Payment Delays
              </span>
              <span className="text-yellow-400">
                − Mild Impact
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">
                Irregular Monthly Cash Flow
              </span>
              <span className="text-yellow-400">
                − Low Impact
              </span>
            </li>
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
                None Detected
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
      </div>

      {/* ================= COUNTERFACTUAL / WHAT-IF ================= */}
      <div className="mt-12 max-w-3xl">
        <h3 className="text-xl font-semibold mb-4">
          How can this score improve?
        </h3>

        <div className="space-y-3 text-sm">
          <div className="
            bg-purple-600/10 border border-purple-500/30
            rounded-xl p-4 text-purple-200
          ">
            Increase monthly income by ₹8,000 → Estimated +18 score points
          </div>

          <div className="
            bg-purple-600/10 border border-purple-500/30
            rounded-xl p-4 text-purple-200
          ">
            Reduce utility payment delays → Estimated +12 score points
          </div>
        </div>
      </div>

      {/* ================= FRAUD TRANSITION ================= */}
      <div className="mt-16 max-w-4xl rounded-2xl
                      bg-white/5 border border-white/10
                      backdrop-blur-xl p-6">

        <h3 className="text-xl font-semibold mb-2">
          Fraud & Anomaly Detection
        </h3>

        <p className="text-gray-400 text-sm mb-4">
          Beyond creditworthiness, PRISM continuously evaluates fraud risk
          using adversarial learning and anomaly detection to identify
          synthetic identities, income manipulation, and loan stacking.
        </p>

        <button
          onClick={() => nav("/fraud")}
          className="
            px-6 py-3 rounded-xl
            bg-[#b25dfc]
            text-white font-semibold
            shadow-lg shadow-[#6d5dfc]/30
            hover:bg-[#c600fd]
            transition
          "
        >
          View Fraud Detection Analysis
        </button>
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <div className="mt-12 max-w-4xl text-sm text-gray-500">
        This explanation is generated using an explainable AI framework.
        Feature contributions are derived from model-level attribution
        techniques (e.g., SHAP), combined with counterfactual analysis to
        support transparency, auditability, and regulatory alignment.
      </div>

    </div>
  )
}
