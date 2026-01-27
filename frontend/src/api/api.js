const BASE_URL = "http://127.0.0.1:8000"

// ---------------- CONSENT ----------------
export async function giveConsent(userId) {
  const res = await fetch(`${BASE_URL}/consent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id: userId })
  })

  return res.json()
}

// ---------------- SCORING ----------------
export async function calculateScore(payload) {
  const res = await fetch(`${BASE_URL}/scoring/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  return res.json()
}

// ---------------- DOCUMENT CHECK ----------------
export async function checkDocument(formData) {
  const res = await fetch(`${BASE_URL}/document/check-pdf`, {
    method: "POST",
    body: formData
  })

  return res.json()
}
