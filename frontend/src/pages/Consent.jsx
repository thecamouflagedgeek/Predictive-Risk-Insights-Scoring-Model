import { useNavigate } from "react-router-dom"

export default function Consent() {
  const nav = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center text-white">

      {/* Base background */}
      <div className="absolute inset-0 bg-[#0a0814]" />

      <div
  className="absolute inset-0 animate-shimmer"
  style={{
    background: `
      radial-gradient(
        circle at center,
        rgba(147,51,234,0.30),
        transparent 65%
      )
    `
  }}
/>


      {/* Consent card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center">
          Data Consent
        </h2>

        <p className="mt-4 text-center text-gray-400">
          We access your financial and identity data only to generate
          your credit risk score and meet regulatory requirements.
        </p>

        <div className="mt-6 space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <span className="text-purple-400">•</span>
            Bank statements & transaction summaries
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-400">•</span>
            Utility payment history & employment verification
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-400">•</span>
            Identity verification for fraud prevention
          </div>
        </div>

        <button
          onClick={() => nav("/profile")}
          className="
            mt-8 w-full py-3 rounded-xl
            bg-[#b25dfc]
            text-white font-semibold
            shadow-lg shadow-[#6d5dfc]/40
           hover:bg-[#c600fd]
            transition
          "
        >
          I Agree & Continue
        </button>

        <p className="mt-6 text-center text-xs text-gray-500">
          You can revoke access at any time.
        </p>
      </div>
    </div>
  )
}
