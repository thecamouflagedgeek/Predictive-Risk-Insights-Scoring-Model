export default function PrismEnergy() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* Primary prism sweep */}
      <div className="prism-sweep sweep-1" />

      {/* Secondary softer sweep */}
      <div className="prism-sweep sweep-2" />

      {/* Rare accent sweep */}
      <div className="prism-sweep sweep-3" />

    </div>
  )
}
