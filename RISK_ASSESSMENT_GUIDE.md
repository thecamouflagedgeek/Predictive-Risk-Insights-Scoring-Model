# Risk Assessment Feature - Implementation Guide

## Overview

The Risk Assessment feature provides lenders with a comprehensive analysis of borrower risk profiles. It combines credit score, employment stability, payment history, sentiment analysis, and document verification to calculate an overall risk level with actionable recommendations.

## Architecture

### Backend Implementation

#### 1. Risk Assessment Service

**Location:** `backend/services/risk_assessment.py`

**Key Functions:**

- `calculate_risk_assessment()` - Main function that calculates comprehensive risk assessment
- `get_risk_color()` - Maps risk level to UI color codes
- `generate_risk_summary()` - Creates human-readable risk summaries
- `generate_recommendations()` - Produces actionable recommendations

**Risk Levels:**

- **CRITICAL** (Risk Score 76-100): Significant concerns requiring immediate review
- **HIGH** (Risk Score 51-75): Substantial concerns requiring additional documentation
- **MEDIUM** (Risk Score 26-50): Moderate concerns requiring standard verification
- **LOW** (Risk Score 0-25): Favorable profile with minimal concerns

**Risk Factors Analyzed:**

1. Credit Score (0-35 points)
2. Employment Stability (0-20 points)
3. Payment History (0-22 points)
4. Sentiment Analysis (0-15 points)
5. Document Verification (0-18 points)

#### 2. Risk Assessment API Router

**Location:** `backend/routers/risk_assessment.py`

**Endpoints:**

- **POST `/risk/assess`**
  - Full borrower application data
  - Returns: Complete risk assessment with factors and recommendations

- **POST `/risk/assess-full`**
  - Pre-calculated score and sentiment data
  - Parameters: user_id, lender_id, score, epfo_months, utility_repayment_rate, sentiment, document_risk_level
  - Returns: Risk assessment with detailed analysis

**Response Format:**

```json
{
  "user_id": "string",
  "lender_id": "string",
  "risk_assessment": {
    "risk_level": "LOW|MEDIUM|HIGH|CRITICAL",
    "risk_score": 0-100,
    "risk_color": "#hex_color",
    "risk_factors": [
      {
        "category": "string",
        "status": "string",
        "description": "string",
        "impact": "Very Low|Low|Medium|High"
      }
    ],
    "recommendations": [
      {
        "priority": "LOW|MEDIUM|HIGH|CRITICAL",
        "action": "string",
        "reason": "string"
      }
    ],
    "summary": "string",
    "metrics": {
      "credit_score": number,
      "employment_months": number,
      "payment_rate": "string",
      "sentiment": "string"
    }
  }
}
```

### Frontend Implementation

#### 1. Risk Assessment Component

**Location:** `frontend/src/components/RiskAssessment.jsx`

**Features:**

- Interactive gauge visualization
- Risk level badge with dynamic coloring
- Risk factors breakdown with expandable details
- Key metrics display
- Actionable recommendations
- Responsive design for all screen sizes

**Props:**

- `riskData` (object) - Risk assessment data from API
- `isLoading` (boolean) - Loading state indicator

**Styling:**

- Modern glassmorphism design
- Color-coded risk levels
- Smooth animations and transitions
- Mobile-responsive layout

#### 2. API Integration

**Location:** `frontend/src/api/api.js`

**Function:**

```javascript
export async function assessRisk(payload)
```

**Usage:**

```javascript
const response = await assessRisk({
  user_id: "borrower_id",
  lender_id: "lender_id",
  score: 650,
  epfo_months: 12,
  utility_repayment_rate: 0.95,
  sentiment: "positive",
  document_risk_level: "low",
});
```

#### 3. Dashboard Integration

**Location:** `frontend/src/pages/Dashboard.jsx`

**Changes Made:**

- Added Risk Assessment component import
- Added state management for risk data and loading
- Added `loadRiskAssessment()` function
- Added effect hook to load risk data for lender role
- Risk Assessment component displays only for lender view
- Borrower view continues to show Risk Signals

**Data Flow:**

1. Lender loads Dashboard with shared borrower data
2. Component extracts scoring and document data
3. API call made to `/risk/assess-full` endpoint
4. Risk assessment data loaded into component
5. Risk Assessment component renders with visual gauge and analysis

## Color Coding System

| Risk Level | Color Code | Gauge Color | Usage                |
| ---------- | ---------- | ----------- | -------------------- |
| LOW        | #22c55e    | Green       | Favorable profile    |
| MEDIUM     | #eab308    | Yellow      | Moderate concerns    |
| HIGH       | #ea580c    | Orange-Red  | Substantial concerns |
| CRITICAL   | #dc2626    | Red         | Severe concerns      |

## Risk Calculation Logic

### Credit Score Analysis

- < 400: CRITICAL (35 points)
- 400-499: HIGH (25 points)
- 500-649: MEDIUM (15 points)
- 650+: GOOD (5 points)

### Employment Stability

- < 3 months: HIGH (20 points)
- 3-5 months: MEDIUM (12 points)
- 6-11 months: GOOD (5 points)
- 12+ months: EXCELLENT (0 points)

### Payment History

- < 70%: HIGH (22 points)
- 70-84%: MEDIUM (12 points)
- 85-94%: GOOD (5 points)
- 95%+: EXCELLENT (0 points)

### Sentiment Analysis

- Negative/Hostile: HIGH (15 points)
- Neutral: NEUTRAL (5 points)
- Positive: POSITIVE (0 points)

### Document Verification

- High Risk: HIGH (18 points)
- Medium Risk: MEDIUM (8 points)
- Verified: VERIFIED (0 points)

## Recommendations Engine

The system generates recommendations based on detected risk factors:

1. **Low Credit Score** → Request detailed financial history
2. **Limited Employment** → Request employment verification and contract
3. **Poor Payment History** → Request explanation for missed payments
4. **Document Concerns** → Escalate to fraud investigation
5. **Negative Sentiment** → Consider additional verification interview

## Usage Examples

### For Lenders

1. Navigate to `/lender/dashboard`
2. Select a borrower's shared application
3. View Risk Assessment section showing:
   - Interactive gauge with risk score
   - Risk level badge
   - Detailed risk factors
   - Key metrics summary
   - Actionable recommendations

### For Integration

```javascript
// In any component that needs risk assessment:
import RiskAssessment from "../components/RiskAssessment"
import { assessRisk } from "../api/api"

const [riskData, setRiskData] = useState(null)

// Load risk data
const response = await assessRisk({
  user_id: "user123",
  lender_id: "lender456",
  score: 700,
  epfo_months: 24,
  utility_repayment_rate: 0.98,
  sentiment: "positive",
  document_risk_level: "low"
})

// Render component
<RiskAssessment riskData={response.risk_assessment} />
```

## Testing the Feature

### Backend Testing

```bash
# Test the risk assessment endpoint
curl -X POST http://127.0.0.1:8000/risk/assess-full \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "borrower_001",
    "lender_id": "lender_001",
    "score": 550,
    "epfo_months": 5,
    "utility_repayment_rate": 0.75,
    "sentiment": "neutral",
    "document_risk_level": "medium"
  }'
```

### Frontend Testing

1. Run development server: `npm run dev` (in frontend directory)
2. Navigate to lender dashboard
3. Load borrower data
4. Verify Risk Assessment component renders
5. Check interactive gauge and expandable factors

## Performance Considerations

- Risk calculation is fast (< 50ms)
- No external API calls required
- Component lazy-loads only for lender role
- CSS animations are GPU-accelerated
- Responsive design scales well on all devices

## Future Enhancements

1. Add historical risk tracking
2. Implement risk prediction trends
3. Add more granular risk sub-categories
4. Integration with external credit bureaus
5. Machine learning-based risk modeling
6. Risk scoring audit trail
7. Bulk risk assessment export
8. Risk thresholds configuration by lender

## Troubleshooting

### Risk Assessment Not Loading

- Check browser console for API errors
- Verify Backend is running on http://127.0.0.1:8000
- Check CORS configuration in main.py
- Verify score data is available before loading risk

### Visual Issues

- Clear browser cache
- Verify CSS file is imported
- Check for CSS framework conflicts
- Test in different browsers

### Incorrect Risk Scores

- Verify input data is correct
- Check risk_assessment.py calculation logic
- Review risk factor weights
- Test with known good data

## File Structure

```
backend/
├── services/
│   └── risk_assessment.py (NEW)
├── routers/
│   └── risk_assessment.py (NEW)
└── main.py (UPDATED - Added risk_assessment import and router)

frontend/
├── src/
│   ├── components/
│   │   ├── RiskAssessment.jsx (NEW)
│   │   └── RiskAssessment.css (NEW)
│   ├── pages/
│   │   └── Dashboard.jsx (UPDATED - Integrated Risk Assessment)
│   └── api/
│       └── api.js (UPDATED - Added assessRisk function)
```

## Security Considerations

- Risk assessment data tied to user_id and lender_id
- No sensitive personal data exposed in risk assessment
- API validates all input parameters
- CORS enabled for frontend communication
- Consider adding authentication in production

## Support

For issues or questions:

1. Check this documentation
2. Review the risk calculation logic in services/risk_assessment.py
3. Verify API responses with curl
4. Check browser console for frontend errors
5. Review component props and state management
