def generate_explanations(data: dict):
    reasons = []

    if data.get("income", 0) < 20000:
        reasons.append("Income is below the preferred threshold")

    if data.get("employment_tenure", 0) < 12:
        reasons.append("Employment tenure is less than one year")

    if data.get("utility_delay", 0) > 2:
        reasons.append("Repeated utility payment delays observed")

    if data.get("credit_history", 0) < 2:
        reasons.append("Limited credit history available")

    if not reasons:
        reasons.append("All key financial indicators are within acceptable limits")

    return reasons
