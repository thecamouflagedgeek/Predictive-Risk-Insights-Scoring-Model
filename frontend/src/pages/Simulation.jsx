export default function Simulation() {
  return (
    <div className="relative min-h-screen bg-[#0a0814] text-white px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">
          Risk Simulation & Optimization
        </h2>
        <p className="mt-1 text-gray-400 max-w-2xl">
          Explore how changes in financial behaviour can impact approval outcomes.
        </p>
      </div>

      {/* Simulation grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">

        {/* Scenario Input */}
        <div className="rounded-2xl
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        shadow-xl p-6">

          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            Scenario Adjustments
          </p>

          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex justify-between">
              <span>Increase Monthly Income</span>
              <span className="text-teal-400">+ ₹8,000</span>
            </li>

            <li className="flex justify-between">
              <span>Reduce Utility Payment Delays</span>
              <span className="text-teal-400">− 1.5 days</span>
            </li>

            <li className="flex justify-between">
              <span>Maintain Employment Stability</span>
              <span className="text-teal-400">No Change</span>
            </li>
          </ul>
        </div>

        {/* Outcome */}
        <div className="rounded-2xl
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        shadow-xl p-6">

          <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">
            Simulated Outcome
          </p>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Estimated Score Increase</span>
              <span className="text-emerald-400">+38 points</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Approval Probability</span>
              <span className="text-emerald-400">+18%</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Risk Category</span>
              <span className="text-emerald-400">Very Low Risk</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer explanation */}
      <div className="mt-10 text-sm text-gray-500 max-w-3xl">
        Simulations are generated using historical repayment patterns and
        sensitivity analysis on the underlying risk model.
        Actual outcomes may vary based on lender policies.
      </div>

    </div>
  )
}
