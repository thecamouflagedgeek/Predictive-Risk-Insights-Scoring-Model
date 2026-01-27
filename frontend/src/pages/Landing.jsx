import { useNavigate } from "react-router-dom"
import PrismEnergy from "../components/PrismEnergy"
import { useApplication } from "../context/ApplicationContext"

export default function Landing() {
  const nav = useNavigate()
  const { setApp } = useApplication()

  const continueAsBorrower = () => {
    setApp(prev => ({
      ...prev,
      role: "borrower"
    }))
    nav("/login")
  }

  const continueAsLender = () => {
    setApp(prev => ({
      ...prev,
      role: "lender"
    }))
    nav("/lender/dashboard")
  }

  return (
    <div className="relative min-h-screen text-white bg-[#05030c]">

      {/* ===== Ambient Energy Background ===== */}
      <PrismEnergy />

      {/* ===== CONTENT ===== */}
      <main className="relative z-10">

        {/* ================= HERO ================= */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            PRISM
          </h1>

          <p className="mt-2 text-lg md:text-xl text-purple-400 font-medium">
            Predictive Risk Insights & Scoring Model
          </p>

          <p className="mt-6 max-w-xl text-gray-400 text-lg">
            AI-powered credit risk intelligence for transparent,
            explainable, and responsible lending.
          </p>

          {/* ===== ROLE SELECTION ===== */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            {/* Borrower */}
            <button
              onClick={continueAsBorrower}
              className="
                px-8 py-3 rounded-xl
                bg-purple-600
                text-white font-semibold
                shadow-lg shadow-purple-600/30
                hover:bg-purple-500
                transition
              "
            >
              Continue as Borrower
            </button>

            {/* Lender */}
            <button
              onClick={continueAsLender}
              className="
                px-8 py-3 rounded-xl
                bg-purple-600
                text-white font-semibold
                shadow-lg shadow-purple-600/30
                hover:bg-purple-500
                transition
              "
            >
              Continue as Lender
            </button>
          </div>

          <p className="mt-16 text-sm text-gray-500">
            Built for NBFCs, lenders, and new-to-credit borrowers
          </p>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="px-6 py-28 max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center">
            How PRISM Works
          </h2>

          <p className="mt-2 text-center text-gray-400">
            A transparent, step-by-step credit risk assessment process
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              ["Step 1", "Secure Consent", "Borrowers explicitly approve financial data usage."],
              ["Step 2", "Risk Analysis", "Signals analyze income, behaviour, and stability."],
              ["Step 3", "Explainable Score", "Clear factors behind every score are shown."],
              ["Step 4", "Better Decisions", "Lenders act confidently, borrowers understand outcomes."]
            ].map(([step, title, desc]) => (
              <div
                key={step}
                className="
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  backdrop-blur-[2px]
                  p-6
                "
              >
                <p className="text-purple-400 font-semibold mb-2">
                  {step}
                </p>
                <h3 className="font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BENEFITS ================= */}
        <section className="px-6 pb-32 max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center">
            Why PRISM
          </h2>

          <p className="mt-2 text-center text-gray-400">
            Designed for fairness, transparency, and scale
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6">
              <h3 className="font-semibold text-emerald-400">
                Fair Credit Access
              </h3>
              <p className="mt-3 text-sm text-gray-400">
                Enables thin-file and new-to-credit borrowers using real behavioural signals.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6">
              <h3 className="font-semibold text-purple-400">
                Lower Lending Risk
              </h3>
              <p className="mt-3 text-sm text-gray-400">
                Early risk indicators and explainability reduce defaults.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6">
              <h3 className="font-semibold text-teal-400">
                Regulatory Trust
              </h3>
              <p className="mt-3 text-sm text-gray-400">
                Transparent scoring aligned with KYC, AML, and DPDPA expectations.
              </p>
            </div>

          </div>
        </section>

      </main>
    </div>
  )
}
