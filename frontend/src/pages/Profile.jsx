import { useNavigate } from "react-router-dom"
import { useApplication } from "../context/ApplicationContext"

export default function Profile() {

  const nav = useNavigate()
  const { app, setApp } = useApplication()

  const handleContinue = () => {

    // Basic validation
    if (!app.phone || !app.income || !app.employment_tenure) {
      alert("Please complete mandatory fields")
      return
    }

    nav("/upload")
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center text-white">

      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0a0814]" />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at top left, rgba(147,51,234,0.25), transparent 55%),
            radial-gradient(circle at bottom right, rgba(34,197,94,0.18), transparent 60%)
          `
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center">
          Financial Profile Setup
        </h2>

        <p className="mt-2 text-center text-gray-400">
          Used for personalized credit risk analysis
        </p>

        {/* SECTION — PERSONAL ID */}
        <div className="mt-6">

          <p className="text-sm text-purple-300 mb-2">
            Identity Information
          </p>

          <input
            placeholder="Mobile Number"
            type="tel"
            onChange={e =>
              setApp(prev => ({
                ...prev,
                phone: e.target.value
              }))
            }
            className="input-style"
          />
        </div>

        {/* SECTION — TRADITIONAL CREDIT */}
        <div className="mt-6">

          <p className="text-sm text-purple-300 mb-2">
            Traditional Credit Information
          </p>

          <input
            placeholder="CIBIL / Credit Score (if available)"
            type="number"
            onChange={e =>
              setApp(prev => ({
                ...prev,
                credit_score: Number(e.target.value)
              }))
            }
            className="input-style"
          />

          <input
            placeholder="Active Loans Count"
            type="number"
            onChange={e =>
              setApp(prev => ({
                ...prev,
                active_loans: Number(e.target.value)
              }))
            }
            className="input-style mt-3"
          />
        </div>

        {/* SECTION — FINANCIAL STABILITY */}
        <div className="mt-6">

          <p className="text-sm text-green-300 mb-2">
            Income & Employment
          </p>

          <input
            placeholder="Monthly Income (₹)"
            type="number"
            onChange={e =>
              setApp(prev => ({
                ...prev,
                income: Number(e.target.value)
              }))
            }
            className="input-style"
          />

          <input
            placeholder="Employment Tenure (Months)"
            type="number"
            onChange={e =>
              setApp(prev => ({
                ...prev,
                employment_tenure: Number(e.target.value),
                epfo_months: Number(e.target.value)
              }))
            }
            className="input-style mt-3"
          />
        </div>

        {/* SECTION — NON TRADITIONAL DATA */}
        <div className="mt-6">

          <p className="text-sm text-blue-300 mb-2">
            Alternative Data Signals
          </p>

          <input
            placeholder="Utility Bill Payment Delay (Avg days)"
            type="number"
            onChange={e => {
              const delay = Number(e.target.value)
              setApp(prev => ({
                ...prev,
                utility_delay: delay,
                utility_repayment_rate: Math.max(
                  0,
                  Math.min(1, 1 - delay / 10)
                )
              }))
            }}
            className="input-style"
          />

          <input
            placeholder="Monthly Rent (₹) (if applicable)"
            type="number"
            onChange={e =>
              setApp(prev => ({
                ...prev,
                rent_amount: Number(e.target.value)
              }))
            }
            className="input-style mt-3"
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleContinue}
          className="
            mt-8 w-full py-3 rounded-xl
            bg-[#b25dfc]
            text-white font-semibold
            shadow-lg shadow-[#6d5dfc]/40
            hover:bg-[#c600fd]
            transition
          "
        >
          Continue to Verification
        </button>

        <p className="mt-5 text-center text-xs text-gray-500">
          Data protected under DPDPA 2023 guidelines
        </p>

      </div>
    </div>
  )
}