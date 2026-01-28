import { useState, useEffect } from "react"
import "./RiskAssessment.css"

export default function RiskAssessment({ riskData, isLoading = false }) {
  const [expandedFactor, setExpandedFactor] = useState(null)

  if (isLoading) {
    return (
      <div className="risk-assessment-container">
        <div className="risk-skeleton">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    )
  }

  if (!riskData) {
    return null
  }

  const {
    risk_level,
    risk_score,
    risk_color,
    risk_factors = [],
    recommendations = [],
    summary,
    metrics
  } = riskData

  // Get gauge position based on risk score
  const gaugeRotation = (risk_score / 100) * 180 - 90

  return (
    <div className="risk-assessment-container">
      {/* Header */}
      <div className="risk-header">
        <h3 className="risk-title">Risk Assessment</h3>
        <p className="risk-subtitle">Comprehensive borrower risk analysis</p>
      </div>

      {/* Risk Gauge and Level */}
      <div className="risk-main-section">
        <div className="risk-gauge-wrapper">
          <div className="risk-gauge">
            {/* Modern Circular Gauge */}
            <svg viewBox="0 0 240 240" className="gauge-svg-modern">
              <defs>
                <linearGradient id="lowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="mediumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="highGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
                <linearGradient id="criticalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle cx="120" cy="120" r="95" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

              {/* Low Risk Arc (90 degrees = 25 points) */}
              <path
                d="M 120 30 A 90 90 0 0 1 183.6 56.4"
                fill="none"
                stroke="url(#lowGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Medium Risk Arc (90 degrees = 25 points) */}
              <path
                d="M 183.6 56.4 A 90 90 0 0 1 210 120"
                fill="none"
                stroke="url(#mediumGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* High Risk Arc (90 degrees = 25 points) */}
              <path
                d="M 210 120 A 90 90 0 0 1 183.6 183.6"
                fill="none"
                stroke="url(#highGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Critical Risk Arc (90 degrees = 25 points) */}
              <path
                d="M 183.6 183.6 A 90 90 0 0 1 120 210"
                fill="none"
                stroke="url(#criticalGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Needle */}
              <g transform={`rotate(${gaugeRotation} 120 120)`}>
                <line
                  x1="120"
                  y1="120"
                  x2="120"
                  y2="35"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                />
                <circle cx="120" cy="120" r="8" fill="#fff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
              </g>

              {/* Center circle */}
              <circle cx="120" cy="120" r="6" fill="#1f2937" />
            </svg>

            {/* Risk Level Badge */}
            <div className="risk-level-modern" style={{ borderColor: risk_color }}>
              <span className="risk-level-value" style={{ color: risk_color }}>
                {risk_score}
              </span>
              <span className="risk-level-label">Score</span>
              <span className="risk-level-text" style={{ color: risk_color }}>
                {risk_level}
              </span>
            </div>
          </div>
        </div>

        {/* Risk Summary */}
        <div className="risk-summary" style={{ borderLeftColor: risk_color }}>
          <p className="summary-text">{summary}</p>
        </div>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="risk-metrics">
          <h4 className="metrics-title">Key Metrics</h4>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">Credit Score</span>
              <span className="metric-value">{metrics.credit_score}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Employment</span>
              <span className="metric-value">{metrics.employment_months}m</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Payment Rate</span>
              <span className="metric-value">{metrics.payment_rate}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Sentiment</span>
              <span className="metric-value">{metrics.sentiment}</span>
            </div>
          </div>
        </div>
      )}

      {/* Risk Factors */}
      {risk_factors.length > 0 && (
        <div className="risk-factors-section">
          <h4 className="factors-title">Risk Factors Breakdown</h4>
          <div className="risk-factors-list">
            {risk_factors.map((factor, idx) => (
              <div
                key={idx}
                className={`risk-factor-item factor-${factor.status.toLowerCase()}`}
                onClick={() => setExpandedFactor(expandedFactor === idx ? null : idx)}
              >
                <div className="factor-header">
                  <div className="factor-category-badge">
                    <span className="factor-status">{factor.status}</span>
                    <span className="factor-category">{factor.category}</span>
                  </div>
                  <span className={`impact-badge impact-${factor.impact.toLowerCase().replace(" ", "-")}`}>
                    {factor.impact}
                  </span>
                </div>

                {expandedFactor === idx && (
                  <div className="factor-details">
                    <p className="factor-description">{factor.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h4 className="recommendations-title">
            Recommended Actions
          </h4>
          <div className="recommendations-list">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`recommendation-item priority-${rec.priority.toLowerCase()}`}
              >
                <div className="recommendation-content">
                  <div className="recommendation-header">
                    <span className="priority-badge">{rec.priority}</span>
                    <span className="recommendation-action">{rec.action}</span>
                  </div>
                  <p className="recommendation-reason">{rec.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
