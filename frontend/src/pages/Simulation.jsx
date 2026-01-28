import { useState } from "react"
import { useApplication } from "../context/ApplicationContext"

export default function Simulation() {
  const { app } = useApplication()

  const baseScore = app.score_result?.score || 300

  // ---- INTERACTIVE WHAT-IF INPUTS (IMPROVEMENTS, NOT CURRENT VALUES) ----
  const [incomeIncrease, setIncomeIncrease] = useState(8000)
  const [utilityDelayReduction, setUtilityDelayReduction] = useState(1.5)

  // ---- RULE-BASED, EXPLAINABLE DELTAS ----
  const incomeDelta = Math.min(Math.floor(incomeIncrease / 1000) * 2, 20)
  const utilityDelta = Math.min(Math.floor(utilityDelayReduction * 5), 15)

  const totalDelta = incomeDelta + utilityDelta
  const simulatedScore = baseScore + totalDelta

  const riskCategory =
    simulatedScore >= 750
      ? "Very Low Risk"
      : simulatedScore >= 650
      ? "Low Risk"
      : "Moderate Risk"

  return (
    <div className="relative min-h-screen bg-[#0a0814] text-white px-8 py-10">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          What-If Analysis
        </h2>
        <p className="mt-1 text-gray-400 max-w-2xl">
          This simulator shows how positive improvements in your financial
          behaviour could influence your credit risk outcome.
        </p>
      </div>

      {/* Guidance Banner (UX CLARITY) */}
      <div className="mb-10 max-w-4xl rounded-xl
                      bg-purple-600/10 border border-purple-500/20
                      p-4 text-sm text-purple-200">
        You are not entering your current details here.
        Instead, adjust the sliders to see how improvements such as earning
        more or paying bills more on time could impact your score.
      </div>

      {/* Simulation grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">

        {/* Scenario Input */}
        <div className="rounded-2xl
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        shadow-xl p-6">

          <p className="text-xs uppercase tracking-wider text-gray-500 mb-6">
            Behaviour Improvements
          </p>

          {/* Income Slider */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Increase Monthly Income</span>
              <span className="text-teal-400">+ ₹{incomeIncrease}</span>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              Example: A salary raise or additional stable income.
            </p>
            <input
              type="range"
              min="0"
              max="20000"
              step="1000"
              value={incomeIncrease}
              onChange={(e) => setIncomeIncrease(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          {/* Utility Delay Slider */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Reduction in Utility Payment Delays</span>
              <span className="text-teal-400">
                {utilityDelayReduction} days
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              Example: Paying electricity or phone bills earlier than before.
            </p>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={utilityDelayReduction}
              onChange={(e) =>
                setUtilityDelayReduction(Number(e.target.value))
              }
              className="w-full accent-purple-500"
            />
          </div>
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
              <span className="text-gray-300">Current Score</span>
              <span className="text-gray-200">{baseScore}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Estimated Improvement</span>
              <span className="text-emerald-400">
                +{totalDelta} points
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Projected Score</span>
              <span className="text-emerald-400">
                {simulatedScore}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">Projected Risk Category</span>
              <span className="text-emerald-400">
                {riskCategory}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer explanation */}
      <div className="mt-10 text-sm text-gray-500 max-w-3xl">
        This what-if analysis uses transparent, rule-based logic derived from
        the scoring system. It is intended to guide borrowers by showing
        how behavioural improvements could help, without changing the
        actual evaluated credit score.
      </div>

    </div>
  )
}
