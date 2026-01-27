import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApplication } from "../context/ApplicationContext"
import { calculateScore } from "../api/api"

export default function Processing() {
  const nav = useNavigate()
  const { app, setApp } = useApplication()
  const [step, setStep] = useState(0)

  useEffect(() => {
    async function runProcessing() {
      // STEP 1: Document verification already done in UploadDocs
      setStep(1)
      await new Promise(r => setTimeout(r, 800))

      // STEP 2: Financial + sentiment scoring
      setStep(2)

      const scoreResult = await calculateScore({
        user_id: app.user_id,
        lender_id: app.lender_id,
        epfo_months: app.epfo_months,
        utility_repayment_rate: app.utility_repayment_rate,
        consent_given: app.consent_given,
        comments: app.comments || "General loan application"
      })

      setApp(prev => ({
        ...prev,
        score_result: scoreResult
      }))

      await new Promise(r => setTimeout(r, 800))

      // STEP 3: Explainable score ready
      setStep(3)
      await new Promise(r => setTimeout(r, 800))

      // DONE → Dashboard
      nav("/dashboard")
    }

    runProcessing()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center text-white">

      {/* Base background */}
      <div className="absolute inset-0 bg-[#0a0814]" />

      {/* Static system glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(147,51,234,0.25),
              transparent 60%
            )
          `
        }}
      />

      {/* Processing card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center">
          Analyzing Risk Profile
        </h2>

        <p className="mt-2 text-center text-gray-400">
          Running multi-source risk evaluation
        </p>

        <div className="mt-8 space-y-4 text-sm">

          <div className={`flex items-center gap-3 ${step >= 1 ? "text-purple-300" : "text-gray-500"}`}>
            <span className={step === 1 ? "animate-progressPulse" : ""}>●</span>
            Verifying identity & documents
          </div>

          <div className={`flex items-center gap-3 ${step >= 2 ? "text-purple-300" : "text-gray-500"}`}>
            <span className={step === 2 ? "animate-progressPulse" : ""}>●</span>
            Analyzing financial behaviour
          </div>

          <div className={`flex items-center gap-3 ${step >= 3 ? "text-purple-300" : "text-gray-500"}`}>
            <span className={step === 3 ? "animate-progressPulse" : ""}>●</span>
            Generating explainable risk score
          </div>

        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          This typically takes a few seconds
        </p>
      </div>
    </div>
  )
}
