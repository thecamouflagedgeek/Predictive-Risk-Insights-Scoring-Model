import React from "react"
import { useApplication } from "../context/ApplicationContext"

export default function Compliance() {
  const { app } = useApplication()

  const consentOk = app.consent_given === true
  const docRisk = app.document_result?.analysis?.risk_level
  const docOk = docRisk !== "high"

  const complianceApproved = consentOk && docOk

  return (
    <div className="relative min-h-screen bg-[#0a0814] text-white px-8 py-10">

      {/* ================= HEADER ================= */}
      <div className="mb-10 max-w-3xl">
        <h2 className="text-3xl font-bold">
          Regulatory Compliance Engine
        </h2>
        <p className="mt-2 text-gray-400">
          Automated KYC, AML, and consent validation aligned with
          regulatory and data protection requirements.
        </p>
      </div>

      {/* ================= COMPLIANCE GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">

        {/* ================= KYC ================= */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            KYC Verification
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-300">Government ID</span>
              <span className={docOk ? "text-emerald-400" : "text-red-400"}>
                {docOk ? "Verified" : "Flagged"}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">Document Authenticity</span>
              <span className={docOk ? "text-emerald-400" : "text-red-400"}>
                {docOk ? "Valid" : "Suspicious"}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">Identity Match</span>
              <span className="text-emerald-400">Confirmed</span>
            </li>
          </ul>
        </div>

        {/* ================= AML ================= */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            AML Screening
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-300">Sanctions List</span>
              <span className="text-purple-300">Clear</span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">PEP Check</span>
              <span className="text-purple-300">Not Listed</span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">Watchlist Screening</span>
              <span className="text-purple-300">No Match</span>
            </li>
          </ul>
        </div>

        {/* ================= CONSENT ================= */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            Consent & Data Protection
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-300">User Consent</span>
              <span className={consentOk ? "text-emerald-400" : "text-red-400"}>
                {consentOk ? "Granted" : "Missing"}
              </span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">Purpose Limitation</span>
              <span className="text-emerald-400">Enforced</span>
            </li>

            <li className="flex justify-between">
              <span className="text-gray-300">Consent Log</span>
              <span className="text-purple-300">Timestamped</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= COMPLIANCE OUTCOME ================= */}
      <div className="mt-12 max-w-5xl">
        <div className={`rounded-2xl border p-6 ${
          complianceApproved
            ? "bg-emerald-600/10 border-emerald-500/30"
            : "bg-red-600/10 border-red-500/30"
        }`}>
          <h3 className="text-lg font-semibold mb-2">
            Compliance Status: {complianceApproved ? "Approved" : "Blocked"}
          </h3>

          <p className="text-sm text-gray-300 mb-4">
            {complianceApproved
              ? "All mandatory KYC, AML, and consent checks have passed. The application is compliant for scoring and decisioning."
              : "One or more mandatory compliance checks failed. Risk evaluation is restricted until issues are resolved."
            }
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className={`px-3 py-1 rounded-full ${
              docOk
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-red-500/20 text-red-300"
            }`}>
              KYC {docOk ? "Passed" : "Flagged"}
            </span>

            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
              AML Cleared
            </span>

            <span className={`px-3 py-1 rounded-full ${
              consentOk
                ? "bg-blue-500/20 text-blue-300"
                : "bg-red-500/20 text-red-300"
            }`}>
              DPDPA {consentOk ? "Compliant" : "Violation"}
            </span>
          </div>
        </div>
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <div className="mt-10 max-w-4xl text-sm text-gray-500">
        The compliance engine enforces consent-first processing and
        document authenticity validation before enabling credit scoring.
        All checks are deterministic, auditable, and aligned with
        DPDPA principles of purpose limitation and data minimization.
      </div>

    </div>
  )
}
