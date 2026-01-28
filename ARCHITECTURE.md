# Risk Assessment Feature - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LENDER DASHBOARD                             │
│                   (frontend/src/pages/Dashboard.jsx)                │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              Credit Score Card (Existing)                   │   │
│  │         Displays: Score 650, Sentiment, Description         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │         RISK ASSESSMENT COMPONENT (NEW)                      │   │
│  │    (frontend/src/components/RiskAssessment.jsx)             │   │
│  │                                                              │   │
│  │  ┌─────────────┐    ┌─────────────────────────────────────┐ │   │
│  │  │  GAUGE      │    │ RISK SUMMARY                        │ │   │
│  │  │             │    │ "LOW RISK: Score 10/100..."        │ │   │
│  │  │  ╱╲         │    │                                     │ │   │
│  │  │ ╱  ╲        │    └─────────────────────────────────────┘ │   │
│  │  │     ╲       │                                              │   │
│  │  │      ●═════1    ┌─────────────────────────────────────┐   │   │
│  │  │       ╲         │ KEY METRICS                         │   │   │
│  │  │        ╲        │ • Credit Score: 650                 │   │   │
│  │  │         ╲       │ • Employment: 12m                   │   │   │
│  │  │    LOW/HIGH     │ • Payment Rate: 95%                 │   │   │
│  │  │      xx/100     │ • Sentiment: Positive              │   │   │
│  │  └─────────────┘   └─────────────────────────────────────┘   │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ RISK FACTORS (Expandable)                           │   │   │
│  │  │ [▼] Credit Score         HIGH   Impact: High        │   │   │
│  │  │     Score of 550 indicates elevated credit risk      │   │   │
│  │  │ [►] Employment Stability GOOD   Impact: Low         │   │   │
│  │  │ [►] Payment History      EXCELLENT Impact: V.Low    │   │   │
│  │  │ [►] Sentiment Analysis   POSITIVE Impact: V.Low     │   │   │
│  │  │ [►] Document Verification VERIFIED Impact: V.Low    │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ RECOMMENDATIONS                                     │   │   │
│  │  │ 💡 [CRITICAL] Request detailed financial history    │   │   │
│  │  │    Due to low credit score < 400                    │   │   │
│  │  │ 💡 [HIGH] Request employment verification           │   │   │
│  │  │    Due to limited employment history                │   │   │
│  │  │ 💡 [MEDIUM] Additional verification interview       │   │   │
│  │  │    Due to negative sentiment                        │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              ↑
                              │ API Call
                    assessRisk(payload)
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      FASTAPI BACKEND                                │
│                  (backend/main.py)                                  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │         POST /risk/assess-full                              │   │
│  │     (backend/routers/risk_assessment.py)                    │   │
│  │                                                              │   │
│  │  Receives:                                                   │   │
│  │  • user_id, lender_id                                       │   │
│  │  • score, epfo_months, utility_repayment_rate              │   │
│  │  • sentiment, document_risk_level                           │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              ↓                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │    Risk Assessment Service                                  │   │
│  │  (backend/services/risk_assessment.py)                     │   │
│  │                                                              │   │
│  │  calculate_risk_assessment():                               │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ 1. ANALYZE CREDIT SCORE                            │   │   │
│  │  │    <400: CRITICAL (35pts)                           │   │   │
│  │  │    400-499: HIGH (25pts)                            │   │   │
│  │  │    500-649: MEDIUM (15pts)                          │   │   │
│  │  │    650+: GOOD (5pts)                                │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ 2. ANALYZE EMPLOYMENT STABILITY                    │   │   │
│  │  │    <3m: HIGH (20pts)                                │   │   │
│  │  │    3-5m: MEDIUM (12pts)                             │   │   │
│  │  │    6-11m: GOOD (5pts)                               │   │   │
│  │  │    12+m: EXCELLENT (0pts)                           │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ 3. ANALYZE PAYMENT HISTORY                          │   │   │
│  │  │    <70%: HIGH (22pts)                               │   │   │
│  │  │    70-84%: MEDIUM (12pts)                           │   │   │
│  │  │    85-94%: GOOD (5pts)                              │   │   │
│  │  │    95%+: EXCELLENT (0pts)                           │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ 4. ANALYZE SENTIMENT                                │   │   │
│  │  │    Negative: HIGH (15pts)                           │   │   │
│  │  │    Neutral: NEUTRAL (5pts)                          │   │   │
│  │  │    Positive: POSITIVE (0pts)                        │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ 5. ANALYZE DOCUMENT VERIFICATION                   │   │   │
│  │  │    High Risk: (18pts)                               │   │   │
│  │  │    Medium Risk: (8pts)                              │   │   │
│  │  │    Verified: (0pts)                                 │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ CALCULATE TOTAL RISK SCORE (0-100)                  │   │   │
│  │  │                                                      │   │   │
│  │  │ Total = Sum of all factors (max 100)                │   │   │
│  │  │                                                      │   │   │
│  │  │ Determine Risk Level:                               │   │   │
│  │  │ • 0-25: LOW (Green #22c55e)                         │   │   │
│  │  │ • 26-50: MEDIUM (Yellow #eab308)                    │   │   │
│  │  │ • 51-75: HIGH (Orange #ea580c)                      │   │   │
│  │  │ • 76-100: CRITICAL (Red #dc2626)                    │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ GENERATE RECOMMENDATIONS                            │   │   │
│  │  │                                                      │   │   │
│  │  │ For each CRITICAL/HIGH factor:                       │   │   │
│  │  │ • Generate specific action item                      │   │   │
│  │  │ • Set priority level                                │   │   │
│  │  │ • Provide reason/explanation                        │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              ↓                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │         Returns Complete Risk Assessment JSON:             │   │
│  │                                                              │   │
│  │  {                                                           │   │
│  │    "risk_level": "LOW|MEDIUM|HIGH|CRITICAL",              │   │
│  │    "risk_score": 0-100,                                    │   │
│  │    "risk_color": "#hex_code",                             │   │
│  │    "risk_factors": [                                        │   │
│  │      {                                                       │   │
│  │        "category": "Credit Score",                         │   │
│  │        "status": "CRITICAL|HIGH|MEDIUM|GOOD|EXCELLENT",   │   │
│  │        "description": "...",                              │   │
│  │        "impact": "Very Low|Low|Medium|High"              │   │
│  │      }                                                       │   │
│  │      ... more factors ...                                  │   │
│  │    ],                                                        │   │
│  │    "recommendations": [                                     │   │
│  │      {                                                       │   │
│  │        "priority": "LOW|MEDIUM|HIGH|CRITICAL",            │   │
│  │        "action": "Request ...",                           │   │
│  │        "reason": "Due to ..."                             │   │
│  │      }                                                       │   │
│  │      ... more recommendations ...                           │   │
│  │    ],                                                        │   │
│  │    "summary": "RISK_LEVEL RISK: Score XX/100...",         │   │
│  │    "metrics": {                                             │   │
│  │      "credit_score": 650,                                  │   │
│  │      "employment_months": 12,                             │   │
│  │      "payment_rate": "95%",                               │   │
│  │      "sentiment": "positive"                              │   │
│  │    }                                                         │   │
│  │  }                                                           │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                              ↑
                              │ Returns JSON response
                              │
                              ↓
                   Frontend processes and renders
                   Risk Assessment Component
```

## Data Flow Timeline

```
1. LENDER DASHBOARD LOADS
   └─ Check if score_result exists
      └─ If borrower role: Show score + risk signals
      └─ If lender role: Prepare to load risk assessment

2. RISK ASSESSMENT TRIGGERED
   └─ useEffect detects scoreData + lender role
   └─ Call loadRiskAssessment()

3. PREPARE REQUEST PAYLOAD
   └─ Extract from scoreData:
      ├─ user_id
      ├─ lender_id
      ├─ score
      └─ sentiment
   └─ Extract from app context:
      ├─ epfo_months
      ├─ utility_repayment_rate
      └─ document_result.analysis.risk_level

4. SEND API REQUEST
   └─ POST /risk/assess-full
   └─ Headers: {"Content-Type": "application/json"}
   └─ Body: {...all parameters...}

5. BACKEND PROCESSES
   └─ calculate_risk_assessment() called
   └─ Analyze all 5 risk factors
   └─ Calculate total risk score (0-100)
   └─ Determine risk level (LOW/MEDIUM/HIGH/CRITICAL)
   └─ Get risk color (#hex_code)
   └─ Generate recommendations
   └─ Create summary text

6. RECEIVE RESPONSE
   └─ Parse JSON response
   └─ Extract risk_assessment object
   └─ setRiskData(response.risk_assessment)

7. RENDER COMPONENT
   └─ RiskAssessment component receives riskData prop
   └─ Display gauge visualization
   └─ Show risk level badge
   └─ Render risk factors (expandable)
   └─ Display key metrics
   └─ Show recommendations (priority-sorted)

8. USER INTERACTION
   └─ Click on risk factors to expand/collapse
   └─ Read detailed descriptions
   └─ Review recommendations
   └─ Make lending decision
```

## Component Hierarchy

```
Dashboard
├─ useApplication() [Context]
├─ useNavigate() [Router]
├─ State:
│  ├─ riskData [Risk Assessment from API]
│  └─ loadingRisk [Loading indicator]
├─ Effects:
│  ├─ Load shared borrower data (lender only)
│  └─ Load risk assessment (lender + scoreData)
└─ JSX:
   ├─ Header: "Risk Dashboard"
   ├─ Credit Score Card (both roles)
   ├─ Risk Signals (borrower only)
   └─ RiskAssessment Component (lender only)
      ├─ props: riskData, isLoading
      └─ Internal State:
         └─ expandedFactor [Expanded factor index]

RiskAssessment (Child Component)
├─ Props:
│  ├─ riskData [Complete risk assessment object]
│  └─ isLoading [Boolean loading state]
├─ Sections:
│  ├─ Header
│  ├─ Gauge Section (Interactive SVG)
│  ├─ Risk Summary
│  ├─ Key Metrics Grid
│  ├─ Risk Factors List (Expandable)
│  └─ Recommendations List
└─ Styling:
   └─ RiskAssessment.css [All styles]
```

## Technology Stack

```
BACKEND:
├─ Framework: FastAPI (Python)
├─ Port: 8000
├─ Route: POST /risk/assess-full
└─ Response: JSON

FRONTEND:
├─ Framework: React with Vite
├─ Port: 5173
├─ Component: RiskAssessment.jsx (React Functional Component)
├─ Styling: TailwindCSS + Custom CSS
├─ State: useState hooks
├─ Side Effects: useEffect hooks
└─ HTTP Client: Fetch API

COMMUNICATION:
├─ Protocol: HTTP/HTTPS
├─ Format: JSON
├─ CORS: Enabled (*)
└─ Auth: (Can be added for production)
```

## File Dependencies

```
frontend/src/pages/Dashboard.jsx
├─ imports: RiskAssessment component
├─ imports: assessRisk API function
├─ uses: useApplication context
├─ uses: useNavigate router
└─ uses: useState, useEffect hooks

frontend/src/components/RiskAssessment.jsx
├─ imports: React hooks
├─ imports: RiskAssessment.css
├─ uses: props (riskData, isLoading)
└─ uses: useState for expandedFactor

frontend/src/api/api.js
├─ defines: assessRisk function
├─ calls: POST /risk/assess-full
└─ returns: risk assessment response

backend/main.py
├─ imports: risk_assessment router
├─ includes: risk_assessment router
└─ enables: /risk/* endpoints

backend/routers/risk_assessment.py
├─ imports: risk assessment service
├─ defines: /risk/assess-full endpoint
└─ calls: calculate_risk_assessment()

backend/services/risk_assessment.py
├─ implements: core logic
├─ functions: calculate_risk_assessment()
│            get_risk_color()
│            generate_risk_summary()
│            generate_recommendations()
└─ logic: 5-factor risk analysis
```

This architecture ensures:
✅ Separation of concerns
✅ Modular code organization
✅ Easy to test and maintain
✅ Scalable for future enhancements
✅ Clean data flow between frontend and backend
