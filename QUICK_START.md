# Risk Assessment Feature - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Start the Backend

```bash
cd backend
python -m uvicorn main:app --reload
```

You should see: `Uvicorn running on http://127.0.0.1:8000`

### Step 2: Start the Frontend

```bash
cd frontend
npm run dev
```

You should see: `Local: http://localhost:5173`

### Step 3: Access the Lender Dashboard

1. Open http://localhost:5173 in your browser
2. Login or navigate to lender dashboard
3. Load a borrower's shared application
4. Risk Assessment component will automatically load below the credit score

---

## 📊 What You'll See

### Risk Gauge Component

```
    ╔═══════════════════╗
    ║   Risk Gauge      ║
    ║                   ║
    ║   GREEN-YELLOW    ║
    ║   RED-ORANGE      ║
    ║   ────────────    ║
    ║     LOW/HIGH      ║
    ║      xx/100       ║
    ╚═══════════════════╝
```

### Risk Factors Section

- **Credit Score** - Impact on overall risk
- **Employment Stability** - Job tenure analysis
- **Payment History** - Utility payment consistency
- **Sentiment Analysis** - Behavioral signals
- **Document Verification** - Authenticity checks

### Recommendations

- Priority-ranked actions for lender
- Specific reasons for each recommendation
- Guided decision-making

---

## 🧪 Testing with Sample Data

### Method 1: API Direct Test

```bash
curl -X POST http://127.0.0.1:8000/risk/assess-full \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "borrower_sample_001",
    "lender_id": "lender_sample_001",
    "score": 650,
    "epfo_months": 12,
    "utility_repayment_rate": 0.95,
    "sentiment": "positive",
    "document_risk_level": "low"
  }'
```

**Expected Risk Level:** LOW (Score ~5-10)
**Color:** Green (#22c55e)

### Method 2: Frontend Testing

1. Go to lender dashboard
2. Share a borrower application first
3. The risk assessment will auto-load
4. Check browser console for any errors

---

## 📈 Sample Risk Scores

### LOW RISK ✅

```
Score: 550 | Employment: 12+ months | Payment: 95% | Sentiment: Positive
→ Risk Score: ~10/100 (GREEN) → Approve
```

### MEDIUM RISK ⚠️

```
Score: 600 | Employment: 6 months | Payment: 85% | Sentiment: Neutral
→ Risk Score: ~35/100 (YELLOW) → Verify Additional Docs
```

### HIGH RISK 🔴

```
Score: 450 | Employment: 3 months | Payment: 70% | Sentiment: Neutral
→ Risk Score: ~60/100 (ORANGE) → Request More Documentation
```

### CRITICAL RISK 🚨

```
Score: 350 | Employment: 2 months | Payment: 50% | Sentiment: Negative
→ Risk Score: ~85/100 (RED) → Escalate for Review
```

---

## 🔧 Configuration

### Adjust Risk Thresholds

Edit `backend/services/risk_assessment.py`:

```python
# Change point values for different factors
if epfo_months >= 12:
    score += 70  # Adjust this value
    reasons.append("Excellent job stability (12+ months)")
```

### Customize Colors

Edit `backend/services/risk_assessment.py`:

```python
def get_risk_color(risk_level: str) -> str:
    color_map = {
        "CRITICAL": "#dc2626",  # Change color here
        "HIGH": "#ea580c",
        "MEDIUM": "#eab308",
        "LOW": "#22c55e"
    }
```

### Adjust Component Styling

Edit `frontend/src/components/RiskAssessment.css`:

```css
.risk-assessment-container {
  border-radius: 1.5rem; /* Adjust border radius */
  padding: 1.5rem; /* Adjust padding */
  /* ... more styles ... */
}
```

---

## ✅ Verification Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can navigate to lender dashboard
- [ ] Risk Assessment component appears
- [ ] Gauge visualization loads
- [ ] Risk factors are expandable
- [ ] Recommendations display
- [ ] Colors match risk levels
- [ ] Component is responsive on mobile
- [ ] No console errors

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot POST /risk/assess-full"

**Solution:**

- Check backend is running on port 8000
- Check `main.py` has `app.include_router(risk_assessment.router)`
- Restart backend

### Issue: "Risk Assessment component not showing"

**Solution:**

- Verify you're logged in as lender
- Check browser console for errors
- Make sure borrower data is shared first
- Check network tab for failed API calls

### Issue: "CORS errors"

**Solution:**

- Check CORS is enabled in `main.py`
- Verify frontend URL is correct (http://localhost:5173)
- Clear browser cache

### Issue: "Incorrect risk scores"

**Solution:**

- Check input data is correct
- Verify `risk_assessment.py` logic
- Test with known good data
- Check metric values are in valid ranges

### Issue: "Styling looks broken"

**Solution:**

- Check CSS file is imported in component
- Clear browser cache
- Check for CSS framework conflicts
- Verify Tailwind is properly configured

---

## 📱 Mobile Testing

The Risk Assessment component is fully responsive:

**Desktop:** Full gauge, 2-column layout
**Tablet:** Stacked layout, optimized spacing
**Mobile:** Single column, touch-friendly buttons

Test on mobile by:

```bash
# Access from phone on same network
# Find your computer's IP: ipconfig (Windows) or ifconfig (Mac/Linux)
# Then navigate to: http://YOUR_IP:5173
```

---

## 🔗 API Reference

### Endpoint: POST /risk/assess-full

**Required Parameters:**

- `user_id` (string) - Unique borrower identifier
- `lender_id` (string) - Unique lender identifier
- `score` (integer) - Credit score (300-850)
- `epfo_months` (integer) - Employment months (0+)
- `utility_repayment_rate` (float) - Payment rate (0.0-1.0)

**Optional Parameters:**

- `sentiment` (string) - "positive", "neutral", "negative"
- `document_risk_level` (string) - "low", "medium", "high"

**Response Time:** < 100ms

**Error Handling:**

- Returns 400 if parameters invalid
- Returns 500 if calculation fails
- Check response status before using data

---

## 📚 Documentation Files

1. **IMPLEMENTATION_SUMMARY.md** - High-level overview
2. **RISK_ASSESSMENT_GUIDE.md** - Detailed technical guide
3. **QUICK_START.md** - This file

---

## 💡 Pro Tips

1. **Dashboard Refresh:** Risk assessment automatically reloads with new borrower data
2. **Gauge Accuracy:** More decimal points in input metrics = better precision
3. **Recommendations:** Sorted by priority - focus on CRITICAL first
4. **Mobile First:** Test on mobile early to ensure UX
5. **API Caching:** Consider caching risk assessments for same borrower

---

## 🎓 Learning Resources

**Understanding Risk Assessment:**

- Review `backend/services/risk_assessment.py` for calculation logic
- Check `generate_recommendations()` for recommendation rules
- Look at color mapping in `get_risk_color()`

**Frontend Development:**

- Study `RiskAssessment.jsx` for React patterns
- Review CSS for responsive design techniques
- Check Dashboard.jsx for integration patterns

**API Integration:**

- See `api.js` for fetch patterns
- Review `Dashboard.jsx` for error handling
- Check state management in useEffect hooks

---

## 🚀 Next Steps

1. **Customize Risk Thresholds** - Adjust for your lending criteria
2. **Add Risk History** - Track how risk scores change over time
3. **Implement Exports** - Allow lenders to export risk assessments
4. **Add Analytics** - Track which factors most impact decisions
5. **Machine Learning** - Use historical data to improve predictions

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review detailed guide: `RISK_ASSESSMENT_GUIDE.md`
3. Check browser console for JavaScript errors
4. Check backend logs for API errors
5. Verify all files are created correctly

---

**Enjoy using the Risk Assessment feature! 🎉**
