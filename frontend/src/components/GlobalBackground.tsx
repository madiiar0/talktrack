export default function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[var(--tt-bg)]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(141,150,245,0.16) 0, transparent 30rem), radial-gradient(circle at 14% 34%, rgba(125,125,232,0.10) 0, transparent 34rem), radial-gradient(circle at 82% 58%, rgba(216,214,244,0.16) 0, transparent 36rem), linear-gradient(180deg, #f3f8fc 0%, #eef4fa 48%, #eaecfa 100%)',
        }}
      />
      <div className="absolute left-1/2 top-[-10rem] h-[12rem] w-[min(34rem,110vw)] -translate-x-1/2 rounded-full bg-[rgba(125,125,232,0.14)] blur-[130px]" />
      <div className="absolute left-[-12rem] top-[44rem] h-[38rem] w-[38rem] rounded-full bg-[rgba(141,150,245,0.12)] blur-[150px]" />
      <div className="absolute right-[-14rem] top-[92rem] h-[42rem] w-[42rem] rounded-full bg-[rgba(216,214,244,0.18)] blur-[160px]" />
      <div className="absolute left-1/2 top-[140rem] h-[46rem] w-[min(76rem,112vw)] -translate-x-1/2 rounded-full bg-[rgba(125,125,232,0.10)] blur-[170px]" />
      <div className="grain-overlay" style={{ opacity: 0.14 }} />
    </div>
  )
}
