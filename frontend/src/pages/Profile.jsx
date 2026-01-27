import { useNavigate } from "react-router-dom"
import { useApplication } from "../context/ApplicationContext"

export default function Profile() {
  const nav = useNavigate()
  const { app, setApp } = useApplication()

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center text-white">

      {/* Base background */}
      <div className="absolute inset-0 bg-[#0a0814]" />

      {/* Purple system glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at top left,
              rgba(147,51,234,0.25),
              transparent 55%
            )
          `
        }}
      />

      {/* Green financial health accent */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at bottom right,
              rgba(34,197,94,0.18),
              transparent 60%
            )
          `
        }}
      />

      {/* Profile card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center">
          Financial Profile
        </h2>

        <p className="mt-2 text-center text-gray-400">
          Help us understand your financial stability.
        </p>

        <div className="mt-8 flex flex-col gap-4">

          {/* Monthly Income */}
          <input
            placeholder="Monthly Income"
            type="number"
            onChange={e =>
              setApp(prev => ({
                ...prev,
                income: Number(e.target.value)
              }))
            }
            className="
              w-full px-4 py-3 rounded-lg
              bg-white/10 border border-white/10
              text-white placeholder-gray-400
              focus:outline-none focus:border-purple-400
              transition
            "
          />

          {/* Employment Tenure */}
          <input
            placeholder="Employment Tenure (months)"
            type="number"
            onChange={e =>
              setApp(prev => ({
                ...prev,
                employment_tenure: Number(e.target.value),
                epfo_months: Number(e.target.value)
              }))
            }
            className="
              w-full px-4 py-3 rounded-lg
              bg-white/10 border border-white/10
              text-white placeholder-gray-400
              focus:outline-none focus:border-purple-400
              transition
            "
          />

          {/* Utility Payment Delay */}
          <input
            placeholder="Utility Payment Delay Avg"
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
            className="
              w-full px-4 py-3 rounded-lg
              bg-white/10 border border-white/10
              text-white placeholder-gray-400
              focus:outline-none focus:border-green-400
              transition
            "
          />

        </div>

        <button
          onClick={() => nav("/upload")}
          className="
            mt-8 w-full py-3 rounded-xl
            bg-[#b25dfc]
            text-white font-semibold
            shadow-lg shadow-[#6d5dfc]/40
            hover:bg-[#c600fd]
            transition
          "
        >
          Continue
        </button>

        <p className="mt-6 text-center text-xs text-gray-500">
          This information improves score accuracy.
        </p>
      </div>
    </div>
  )
}
