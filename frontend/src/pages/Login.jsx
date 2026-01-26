import { useNavigate } from "react-router-dom"

export default function Login() {
  const nav = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center text-white">

      {/* Base background */}
      <div className="absolute inset-0 bg-[#0a0814]" />

      {/* Vertical animated glow (login-specific) */}
      {/* Strong vertical animated glow */}
<div
  className="absolute inset-0 animate-loginGlow"
  style={{
    background: `
      radial-gradient(
        ellipse 35% 60% at center,
        rgba(147,51,234,0.75),
        transparent 70%
      )
    `
  }}
/>


      {/* Login card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10 
                      shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center">
          Welcome back
        </h2>

        <p className="mt-2 text-center text-gray-400">
          Sign in to continue to PRISM
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <input
            placeholder="Email"
            className="
              w-full px-4 py-3 rounded-lg
              bg-white/10 border border-white/10
              text-white placeholder-gray-400
              focus:outline-none focus:border-purple-400
              transition
            "
          />

          <input
            placeholder="Password"
            type="password"
            className="
              w-full px-4 py-3 rounded-lg
              bg-white/10 border border-white/10
              text-white placeholder-gray-400
              focus:outline-none focus:border-purple-400
              transition
            "
          />
        </div>

        <button
          onClick={() => nav("/consent")}
          className="
            mt-8 w-full py-3 rounded-xl
            bg-[#b25dfc]
            text-white font-semibold
            shadow-lg shadow-[#6d5dfc]/40
            hover:bg-[#c600fd]
            transition
          "
        >
          Continue
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Secure, consent-based access
        </p>
      </div>
    </div>
  )
}
