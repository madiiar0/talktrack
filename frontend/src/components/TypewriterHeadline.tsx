import { useTypewriter } from '../hooks/useTypewriter'

const PHRASES = ['life patterns', 'hidden habits', 'personal stats', 'real progress']

export default function TypewriterHeadline() {
  const text = useTypewriter(PHRASES, {
    typeSpeed: 72,
    deleteSpeed: 36,
    pauseAfterType: 1600,
    pauseAfterDelete: 380,
  })

  return (
    <h1
      className="font-black leading-[0.95] tracking-[-0.025em] text-[clamp(36px,4.85vw,90px)]"
      aria-label="Talk for 2 minutes. See your life patterns, hidden habits, personal stats, and real progress."
    >
      <span
        aria-hidden="true"
        className="block bg-gradient-to-b from-white to-[#d4d4d4] bg-clip-text text-transparent"
      >
        Talk for 2&nbsp;min.
      </span>
      {/* min-height reserves 2 lines so the wrapping phrase never shifts the content below */}
      <span aria-hidden="true" className="block min-h-[1.9em]">
        <span className="bg-gradient-to-b from-white to-[#d4d4d4] bg-clip-text text-transparent">
          See your{' '}
        </span>
        <span className="text-mint">{text}</span>
        {/* blinking caret */}
        <span className="ml-[0.04em] inline-block h-[0.74em] w-[0.075em] translate-y-[0.04em] animate-blink bg-white align-baseline" />
      </span>
    </h1>
  )
}
