import { useTypewriter } from '../hooks/useTypewriter'

const PHRASES = [
  'tracking your life.',
  'logging your days.',
  'querying your life.',
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
      className="h-[2.16em] max-w-[1040px] text-[clamp(52px,6.15vw,106px)] font-normal italic leading-[0.96] tracking-[-0.04em] text-[#050708] max-sm:h-[3.38em] max-sm:max-w-[520px] max-sm:text-[clamp(40px,11vw,48px)] max-sm:leading-[1.02] max-sm:tracking-[-0.035em]"
      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
      aria-label="Your personal AI agent for tracking your life."
    >
      <span
        aria-hidden="true"
        className="block whitespace-nowrap max-lg:whitespace-normal"
      >
        Your personal AI agent
      </span>
      {/* min-height reserves space so the wrapping phrase never shifts the content below */}
      <span
        aria-hidden="true"
        className="block h-[1.08em] pb-[0.08em] max-sm:h-[1.18em] max-sm:pb-[0.12em]"
      >
        <span>for </span>
        <span>
          {text}
        </span>
        {/* blinking caret */}
        <span className="ml-[0.06em] inline-block h-[0.72em] w-[0.035em] translate-y-[0.04em] animate-blink bg-[#050708] align-baseline" />
      </span>
    </h1>
  )
}
