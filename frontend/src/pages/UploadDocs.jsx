import { useNavigate } from "react-router-dom"

export default function UploadDocs() {
  const nav = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center text-white">

      {/* Base background */}
      <div className="absolute inset-0 bg-[#0a0814]" />

      {/* Static purple system glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at top right,
              rgba(147,51,234,0.25),
              transparent 55%
            )
          `
        }}
      />

      {/* Document verification card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      shadow-2xl p-8 overflow-hidden">

        {/* Scanning line (inside card only) */}
        <div
          className="pointer-events-none absolute inset-0 animate-scanLine"
          style={{
            background: `
              linear-gradient(
                to bottom,
                transparent,
                rgba(147,51,234,0.35),
                transparent
              )
            `
          }}
        />

        <h2 className="text-3xl font-bold text-center">
          Upload KYC Documents
        </h2>

        <p className="mt-2 text-center text-gray-400">
          Documents are verified using AI-based authenticity checks.
        </p>

        <div className="relative mt-8 flex flex-col gap-4">

          <label className="block">
            <span className="text-sm text-gray-300">
              Government ID (Aadhaar / PAN)
            </span>
            <input
              type="file"
              className="
                mt-2 w-full px-4 py-3 rounded-lg
                bg-white/10 border border-white/10
                text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-purple-600 file:text-white
                hover:file:bg-purple-500
                transition
              "
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">
              Income / Address Proof
            </span>
            <input
              type="file"
              className="
                mt-2 w-full px-4 py-3 rounded-lg
                bg-white/10 border border-white/10
                text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-purple-600 file:text-white
                hover:file:bg-purple-500
                transition
              "
            />
          </label>

        </div>

        <button
          onClick={() => nav("/processing")}
          className="
            mt-8 w-full py-3 rounded-xl
            bg-[#b25dfc]
            text-white font-semibold
            shadow-lg shadow-[#6d5dfc]/40
            hover:bg-[#c600fd]
            transition
          "
        >
          Verify Documents
        </button>

        <p className="mt-6 text-center text-xs text-gray-500">
          Files are processed securely and never stored permanently.
        </p>
      </div>
    </div>
  )
}
