export const explainData = {
  creditScore: 742,
  riskLevel: "Low",

  factors: [
    {
      name: "Monthly Income",
      impact: 28,
      direction: "positive"
    },
    {
      name: "Employment Stability",
      impact: 22,
      direction: "positive"
    },
    {
      name: "Utility Payment Delays",
      impact: -15,
      direction: "negative"
    },
    {
      name: "Credit History Length",
      impact: 7,
      direction: "positive"
    }
  ],

  whatIf: [
    {
      change: "Increase monthly income by ₹8,000",
      scoreGain: "+18 points"
    },
    {
      change: "Reduce utility payment delays",
      scoreGain: "+12 points"
    }
  ]
}
