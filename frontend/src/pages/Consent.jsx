import { useNavigate } from "react-router-dom"
import { useApplication } from "../context/ApplicationContext.jsx"
import { giveConsent } from "../api/api"

export default function Consent() {
  const nav = useNavigate()
  const { app, setApp } = useApplication()

  const handleConsent = async () => {
    await giveConsent(app.user_id)

    setApp(prev => ({
      ...prev,
      consent_given: true
    }))

    nav("/profile")
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0814]" />

      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(147,51,234,0.30),
              transparent 65%
            )
          `
        }}
      />

      {/* Consent Card */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center">
          Data Consent & Privacy Agreement
        </h2>

        <p className="mt-4 text-center text-gray-400 text-sm">
          This platform complies with the Digital Personal Data Protection Act (DPDPA), 2023.
        </p>

        {/* English Section */}
        <div className="mt-6 space-y-3 text-sm text-gray-300">

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            Collection of financial, employment and identity data strictly for credit risk evaluation
          </div>

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            Secure processing using encrypted storage (AES-256) and secure transmission (TLS 1.3)
          </div>

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            Use of alternative data sources including EPFO, banking APIs and utility records
          </div>

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            AI-based fraud detection and explainable credit scoring
          </div>

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            Your data will never be sold or shared with unauthorized third parties
          </div>

        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/10" />

        {/* Hindi Section */}
        <div className="space-y-3 text-sm text-gray-300">

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            आपकी वित्तीय, रोजगार और पहचान संबंधी जानकारी केवल क्रेडिट मूल्यांकन के लिए उपयोग की जाएगी
          </div>

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            सभी डेटा को सुरक्षित एन्क्रिप्शन और सुरक्षित नेटवर्क के माध्यम से प्रोसेस किया जाएगा
          </div>

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            EPFO, बैंकिंग और यूटिलिटी डेटा का उपयोग वैकल्पिक क्रेडिट प्रोफाइल बनाने हेतु किया जाएगा
          </div>

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            आपकी अनुमति के बिना किसी भी थर्ड पार्टी को डेटा साझा नहीं किया जाएगा
          </div>

          <div className="flex gap-2">
            <span className="text-purple-400">•</span>
            आप कभी भी अपनी सहमति वापस ले सकते हैं
          </div>

        </div>

        <button
          onClick={handleConsent}
          className="
            mt-8 w-full py-3 rounded-xl
            bg-[#b25dfc]
            text-white font-semibold
            shadow-lg shadow-[#6d5dfc]/40
            hover:bg-[#c600fd]
            transition
          "
        >
          I Agree / मैं सहमत हूँ
        </button>

        <p className="mt-5 text-center text-xs text-gray-500">
          By continuing, you acknowledge informed consent under DPDPA 2023.
          <br />
          आगे बढ़कर आप डिजिटल पर्सनल डेटा प्रोटेक्शन अधिनियम 2023 के अंतर्गत सहमति प्रदान करते हैं।
        </p>

      </div>
    </div>
  )
}