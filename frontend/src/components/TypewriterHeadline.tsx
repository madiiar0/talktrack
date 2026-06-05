import { useTypewriter } from '../hooks/useTypewriter'

const PHRASES = [
  'tracking your life.',
  'mood, sleep, and focus.',
  'turning talks into charts.',
  'learning you over time.',
]

export default function TypewriterHeadline() {
  const text = useTypewriter(PHRASES, {
    typeSpeed: 72,
    deleteSpeed: 36,
    pauseAfterType: 1600,
    pauseAfterDelete: 380,
  })

  return (
    <h1
      className="h-[4.18em] font-black leading-[1.01] tracking-[-0.025em] text-[clamp(38px,5vw,92px)]"
      aria-label="Your personal AI agent for tracking your life, mood, sleep, focus, charts, and personal memory."
    >
      <span
        aria-hidden="true"
        className="block bg-gradient-to-b from-white to-[#d4d4d4] bg-clip-text text-transparent"
      >
        Your personal
      </span>
      <span
        aria-hidden="true"
        className="block bg-gradient-to-b from-white to-[#d4d4d4] bg-clip-text text-transparent"
      >
        AI agent for
      </span>
      {/* min-height reserves space so the wrapping phrase never shifts the content below */}
      <span
        aria-hidden="true"
        className="block h-[2.08em] pb-[0.12em] pt-[0.04em]"
      >
        <span className="bg-[linear-gradient(90deg,#24ffae_0%,#24ffae_64%,#afffe2_91%,rgba(255,255,255,0.78)_100%)] bg-[length:112%_100%] bg-clip-text text-transparent">
          {text}
        </span>
        {/* blinking caret */}
        <span className="ml-[0.04em] inline-block h-[0.74em] w-[0.075em] translate-y-[0.04em] animate-blink bg-white align-baseline" />
      </span>
    </h1>
  )
}
