def calculate_score_logic(epfo_months: int, utility_rate: float) -> tuple[int, list[str]]:
    """
    Core business logic for Feature 1.
    Returns: (final_score, list_of_reasons)
    """
    score = 300  # Base score for thin-file
    reasons = []

    # 1. EPFO Logic
    if epfo_months >= 12:
        score += 70
        reasons.append("Excellent job stability (12+ months)")
    elif epfo_months >= 6:
        score += 40
        reasons.append("Good job stability (6+ months)")
    else:
        reasons.append("Low employment history impact")

    # 2. Utility Logic
    if utility_rate >= 0.95:
        score += 30
        reasons.append("Perfect utility payment record")
    elif utility_rate >= 0.80:
        score += 15
        reasons.append("Consistent utility payments")

    # Ensure we stay within standard credit score limits
    final_score = min(score, 850)
    
    return final_score, reasons