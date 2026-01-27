from datetime import datetime

consent_log = []

def log_consent(user_id: str, ip: str):
    consent_log.append({
        "user_id": user_id,
        "timestamp": datetime.now(),
        "ip": ip
    })

def has_consent(user_id: str):
    return any(c["user_id"] == user_id for c in consent_log)
