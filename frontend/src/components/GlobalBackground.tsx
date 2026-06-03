export default function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0b0b0b]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(36,255,174,0.12) 0, transparent 30rem), radial-gradient(circle at 14% 34%, rgba(36,255,174,0.08) 0, transparent 34rem), radial-gradient(circle at 82% 58%, rgba(175,255,226,0.07) 0, transparent 36rem), linear-gradient(180deg, #111111 0%, #0b0b0b 42%, #101010 100%)',
        }}
      />
      <div className="absolute left-1/2 top-[-10rem] h-[12rem] w-[min(34rem,110vw)] -translate-x-1/2 rounded-full bg-mint/10 blur-[130px]" />
      <div className="absolute left-[-12rem] top-[44rem] h-[38rem] w-[38rem] rounded-full bg-[rgba(36,255,174,0.08)] blur-[150px]" />
      <div className="absolute right-[-14rem] top-[92rem] h-[42rem] w-[42rem] rounded-full bg-[rgba(175,255,226,0.08)] blur-[160px]" />
      <div className="absolute left-1/2 top-[140rem] h-[46rem] w-[min(76rem,112vw)] -translate-x-1/2 rounded-full bg-[rgba(36,255,174,0.07)] blur-[170px]" />
      <div className="grain-overlay" style={{ opacity: 0.14 }} />
    </div>
  )
}
