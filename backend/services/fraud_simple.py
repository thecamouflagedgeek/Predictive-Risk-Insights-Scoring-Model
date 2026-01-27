from datetime import datetime, timedelta

loan_applications = []

def log_application(phone: str, pan: str):
    loan_applications.append({
        "phone": phone,
        "pan": pan,
        "time": datetime.now()
    })

def check_loan_stacking(phone: str, pan: str):
    cutoff = datetime.now() - timedelta(hours=24)

    recent = [
        app for app in loan_applications
        if app["phone"] == phone
        and app["pan"] == pan
        and app["time"] > cutoff
    ]

    if len(recent) >= 2:
        return {
            "status": "FLAGGED",
            "reason": "Multiple loan applications detected within 24 hours"
        }

    return {
        "status": "CLEAR",
        "reason": "No abnormal application frequency detected"
    }
