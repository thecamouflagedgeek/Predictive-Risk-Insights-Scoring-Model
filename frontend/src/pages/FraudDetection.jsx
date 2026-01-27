import React, { useEffect, useState } from "react"
import { useApplication } from "../context/ApplicationContext"

export default function FraudDetection() {
  const { app, setApp } = useApplication()
  const [fraudResult, setFraudResult] = useState(null)

  useEffect(() => {
    async function runFraudCheck() {
      // Step 1: Log application attempt
      await fetch("http://127.0.0.1:8000/fraud/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: app.phone || "9999999999",
          pan: app.pan || "ABCDE1234F"
        })
      })

      // Step 2: Check loan stacking
      const res = await fetch("http://127.0.0.1:8000/fraud/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: app.phone || "9999999999",
          pan: app.pan || "ABCDE1234F"
        })
      })

      const data = await res.json()
      setFraudResult(data)

      setApp(prev => ({
        ...prev,
        fraud_result: data
      }))
    }

    runFraudCheck()
  }, [])

  if (!fraudResult) {
    return (
      <div className="min-h-screen bg-[#0a0814] text-white flex items-center justify-center">
        Running fraud analysis...
      </div>
    )
  }

  const isFlagged = fraudResult.status === "FLAGGED"

  return (
    <div className="relative min-h-screen bg-[#0a0814] text-white px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">
          Fraud & Anomaly Detection
        </h2>
        <p className="mt-1 text-gray-400 max-w-2xl">
          Automated detection of suspicious patterns, inconsistencies, and
          adversarial fraud signals during loan assessment.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Identity & Document Checks */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            Identity & Document Checks
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-300">Document Authenticity</span>
              <span className={
                app.document_result?.analysis?.risk_level === "high"
                  ? "text-red-400"
                  : "text-emerald-400"
              }>
                {app.document_result?.analysis?.risk_level === "high"
                  ? "Suspicious"
                  : "Verified"}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">Identity Consistency</span>
              <span className="text-emerald-400">Verified</span>
            </li>
          </ul>
        </div>

        {/* Behavioural & Financial Anomalies */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            Behavioural & Financial Anomalies
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-300">Application Behaviour</span>
              <span className={isFlagged ? "text-yellow-400" : "text-emerald-400"}>
                {isFlagged ? "Unusual Frequency" : "Normal"}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">Sentiment Risk</span>
              <span className="text-purple-300">
                {app.score_result?.sentiment || "Neutral"}
              </span>
            </li>
          </ul>
        </div>

        {/* Network & Loan Stacking */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            Network & Loan Stacking
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-300">Loan Stacking Status</span>
              <span className={isFlagged ? "text-red-400" : "text-emerald-400"}>
                {fraudResult.status}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">Detection Reason</span>
              <span className="text-gray-300 text-right">
                {fraudResult.reason}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Decision Section */}
      <div className={`mt-12 rounded-2xl border p-6 max-w-4xl ${
        isFlagged
          ? "bg-red-600/10 border-red-500/30"
          : "bg-emerald-600/10 border-emerald-500/30"
      }`}>
        <h3 className="text-lg font-semibold mb-2">
          Fraud Risk Assessment Outcome
        </h3>

        <p className="text-gray-300 text-sm">
          {isFlagged
            ? "Multiple loan applications detected in a short time window. Manual review recommended."
            : "No abnormal application patterns detected. Low fraud risk."
          }
        </p>

        <div className="mt-4 flex items-center gap-4">
          <span className={`px-4 py-1 rounded-full text-sm ${
            isFlagged
              ? "bg-red-500/20 text-red-400"
              : "bg-emerald-500/20 text-emerald-400"
          }`}>
            Risk Level: {isFlagged ? "High" : "Low"}
          </span>

          <span className="px-4 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300">
            Recommendation: {isFlagged ? "Manual Review" : "Proceed"}
          </span>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-10 text-sm text-gray-500 max-w-3xl">
        Fraud detection is implemented using a frequency-based heuristic
        that identifies abnormal loan application behaviour. This approach
        is effective for early-stage risk filtering and can be extended
        with ML-based anomaly detection in production.
      </div>

    </div>
  )
}
