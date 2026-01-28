"""
Risk Assessment Service
Analyzes borrower data to categorize risk levels and provide detailed risk insights.
"""

def calculate_risk_assessment(
    score: int,
    epfo_months: int,
    utility_repayment_rate: float,
    sentiment: str,
    document_risk_level: str = None
) -> dict:
    """
    Comprehensive risk assessment based on multiple factors.
    
    Args:
        score: Credit score (300-850)
        epfo_months: Months of employment consistency
        utility_repayment_rate: Payment consistency (0.0-1.0)
        sentiment: Sentiment analysis result
        document_risk_level: Document authenticity risk level
    
    Returns:
        Dictionary with risk assessment details
    """
    
    # Initialize risk factors
    risk_factors = []
    risk_score = 0  # 0-100 scale (lower is better)
    risk_level = "LOW"  # LOW, MEDIUM, HIGH, CRITICAL
    
    # ===== CREDIT SCORE ANALYSIS =====
    if score < 400:
        risk_score += 35
        risk_factors.append({
            "category": "Credit Score",
            "status": "CRITICAL",
            "description": f"Score of {score} is below acceptable threshold",
            "impact": "High"
        })
        risk_level = "CRITICAL"
    elif score < 500:
        risk_score += 25
        risk_factors.append({
            "category": "Credit Score",
            "status": "HIGH",
            "description": f"Score of {score} indicates elevated credit risk",
            "impact": "High"
        })
        if risk_level == "LOW":
            risk_level = "HIGH"
    elif score < 650:
        risk_score += 15
        risk_factors.append({
            "category": "Credit Score",
            "status": "MEDIUM",
            "description": f"Score of {score} is moderate with room for improvement",
            "impact": "Medium"
        })
        if risk_level in ["LOW"]:
            risk_level = "MEDIUM"
    else:
        risk_score += 5
        risk_factors.append({
            "category": "Credit Score",
            "status": "GOOD",
            "description": f"Strong score of {score}",
            "impact": "Low"
        })
    
    # ===== EMPLOYMENT STABILITY ANALYSIS =====
    if epfo_months < 3:
        risk_score += 20
        risk_factors.append({
            "category": "Employment Stability",
            "status": "HIGH",
            "description": f"Only {epfo_months} months employment history - very new to job",
            "impact": "High"
        })
        if risk_level != "CRITICAL":
            risk_level = "HIGH"
    elif epfo_months < 6:
        risk_score += 12
        risk_factors.append({
            "category": "Employment Stability",
            "status": "MEDIUM",
            "description": f"{epfo_months} months employment history - relatively new",
            "impact": "Medium"
        })
        if risk_level == "LOW":
            risk_level = "MEDIUM"
    elif epfo_months < 12:
        risk_score += 5
        risk_factors.append({
            "category": "Employment Stability",
            "status": "GOOD",
            "description": f"{epfo_months} months employment history - reasonable tenure",
            "impact": "Low"
        })
    else:
        risk_score += 0
        risk_factors.append({
            "category": "Employment Stability",
            "status": "EXCELLENT",
            "description": f"{epfo_months}+ months employment history - strong tenure",
            "impact": "Very Low"
        })
    
    # ===== PAYMENT HISTORY ANALYSIS =====
    if utility_repayment_rate < 0.70:
        risk_score += 22
        risk_factors.append({
            "category": "Payment History",
            "status": "HIGH",
            "description": f"Only {utility_repayment_rate*100:.1f}% on-time utility payments - poor payment discipline",
            "impact": "High"
        })
        if risk_level not in ["CRITICAL", "HIGH"]:
            risk_level = "HIGH"
    elif utility_repayment_rate < 0.85:
        risk_score += 12
        risk_factors.append({
            "category": "Payment History",
            "status": "MEDIUM",
            "description": f"{utility_repayment_rate*100:.1f}% on-time utility payments - moderate consistency",
            "impact": "Medium"
        })
        if risk_level == "LOW":
            risk_level = "MEDIUM"
    elif utility_repayment_rate < 0.95:
        risk_score += 5
        risk_factors.append({
            "category": "Payment History",
            "status": "GOOD",
            "description": f"{utility_repayment_rate*100:.1f}% on-time utility payments - good track record",
            "impact": "Low"
        })
    else:
        risk_score += 0
        risk_factors.append({
            "category": "Payment History",
            "status": "EXCELLENT",
            "description": f"{utility_repayment_rate*100:.1f}% on-time utility payments - excellent discipline",
            "impact": "Very Low"
        })
    
    # ===== SENTIMENT ANALYSIS =====
    if sentiment and sentiment.lower() in ["negative", "hostile"]:
        risk_score += 15
        risk_factors.append({
            "category": "Sentiment Analysis",
            "status": "HIGH",
            "description": f"Negative sentiment detected - potential behavioral risk",
            "impact": "Medium"
        })
        if risk_level in ["LOW", "MEDIUM"]:
            risk_level = "MEDIUM" if risk_level == "LOW" else "HIGH"
    elif sentiment and sentiment.lower() == "neutral":
        risk_score += 5
        risk_factors.append({
            "category": "Sentiment Analysis",
            "status": "NEUTRAL",
            "description": "Neutral sentiment - no behavioral risk detected",
            "impact": "Low"
        })
    elif sentiment and sentiment.lower() == "positive":
        risk_score += 0
        risk_factors.append({
            "category": "Sentiment Analysis",
            "status": "POSITIVE",
            "description": "Positive sentiment - good behavioral indicators",
            "impact": "Very Low"
        })
    
    # ===== DOCUMENT VERIFICATION =====
    if document_risk_level == "high":
        risk_score += 18
        risk_factors.append({
            "category": "Document Verification",
            "status": "HIGH",
            "description": "Document authenticity concerns - potential fraud risk",
            "impact": "High"
        })
        if risk_level != "CRITICAL":
            risk_level = "HIGH"
    elif document_risk_level == "medium":
        risk_score += 8
        risk_factors.append({
            "category": "Document Verification",
            "status": "MEDIUM",
            "description": "Some document verification issues detected",
            "impact": "Medium"
        })
        if risk_level == "LOW":
            risk_level = "MEDIUM"
    else:
        risk_score += 0
        risk_factors.append({
            "category": "Document Verification",
            "status": "VERIFIED",
            "description": "Documents verified and authentic",
            "impact": "Very Low"
        })
    
    # Normalize risk score (cap at 100)
    risk_score = min(risk_score, 100)
    
    # Generate risk color coding
    risk_color = get_risk_color(risk_level)
    
    # Generate recommendations
    recommendations = generate_recommendations(risk_level, risk_factors)
    
    return {
        "risk_level": risk_level,
        "risk_score": risk_score,
        "risk_color": risk_color,
        "risk_factors": risk_factors,
        "recommendations": recommendations,
        "summary": generate_risk_summary(risk_level, risk_score),
        "metrics": {
            "credit_score": score,
            "employment_months": epfo_months,
            "payment_rate": f"{utility_repayment_rate*100:.1f}%",
            "sentiment": sentiment or "N/A"
        }
    }


def get_risk_color(risk_level: str) -> str:
    """Map risk level to color code for UI"""
    color_map = {
        "CRITICAL": "#dc2626",  # Red
        "HIGH": "#ea580c",      # Orange-Red
        "MEDIUM": "#eab308",    # Yellow
        "LOW": "#22c55e"        # Green
    }
    return color_map.get(risk_level, "#9ca3af")


def generate_risk_summary(risk_level: str, risk_score: int) -> str:
    """Generate human-readable risk summary"""
    if risk_level == "CRITICAL":
        return f"CRITICAL RISK: Score {risk_score}/100 - Significant concerns require immediate review and possible denial"
    elif risk_level == "HIGH":
        return f"HIGH RISK: Score {risk_score}/100 - Substantial concerns require additional documentation or higher interest rate"
    elif risk_level == "MEDIUM":
        return f"MEDIUM RISK: Score {risk_score}/100 - Moderate concerns require standard verification and monitoring"
    else:  # LOW
        return f"LOW RISK: Score {risk_score}/100 - Favorable profile with minimal concerns"


def generate_recommendations(risk_level: str, risk_factors: list) -> list:
    """Generate actionable recommendations based on risk profile"""
    recommendations = []
    
    # Check for specific risk factors and generate recommendations
    critical_factors = [f for f in risk_factors if f["status"] in ["CRITICAL", "HIGH"]]
    
    for factor in critical_factors:
        if factor["category"] == "Credit Score":
            recommendations.append({
                "priority": "HIGH",
                "action": "Request detailed financial history",
                "reason": "Low credit score indicates significant past issues"
            })
        elif factor["category"] == "Employment Stability":
            recommendations.append({
                "priority": "HIGH",
                "action": "Request employment verification and contract details",
                "reason": "Limited employment history requires additional confirmation"
            })
        elif factor["category"] == "Payment History":
            recommendations.append({
                "priority": "HIGH",
                "action": "Request explanation for missed payments",
                "reason": "Poor payment history is strong default indicator"
            })
        elif factor["category"] == "Document Verification":
            recommendations.append({
                "priority": "CRITICAL",
                "action": "Escalate to fraud investigation team",
                "reason": "Document authenticity concerns must be resolved"
            })
        elif factor["category"] == "Sentiment Analysis":
            recommendations.append({
                "priority": "MEDIUM",
                "action": "Consider additional verification interview",
                "reason": "Negative sentiment may indicate behavioral risk"
            })
    
    # Add general recommendations
    if risk_level in ["LOW", "MEDIUM"]:
        recommendations.append({
            "priority": "LOW",
            "action": "Standard loan processing",
            "reason": "Profile meets basic lending criteria"
        })
    
    if not recommendations:
        recommendations.append({
            "priority": "LOW",
            "action": "Standard underwriting process",
            "reason": "No specific risk factors identified"
        })
    
    return recommendations
