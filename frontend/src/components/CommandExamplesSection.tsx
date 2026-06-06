import {
  BarChart3,
  MessageSquareText,
  SlidersHorizontal,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const TRACKING_CARDS = [
  {
    title: 'Daily check-ins',
    text: 'Log sleep, mood, focus, energy, workouts, or anything else through natural AI conversation.',
    icon: MessageSquareText,
  },
  {
    title: 'Charts & analytics',
    text: 'Ask for averages, weekly trends, comparisons, summaries, and compact charts from your history.',
    icon: BarChart3,
  },
  {
    title: 'Flexible tracking',
    text: 'Start, pause, or change what TalkTrack follows over time without forms, spreadsheets, or setup screens.',
    icon: SlidersHorizontal,
  },
]

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

function Reveal({
  children,
  isVisible,
  delay,
  className = '',
}: {
  children: ReactNode
  isVisible: boolean
  delay: number
  className?: string
}) {
  return (
    <div
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
      className={[
        'transition-[opacity,transform] duration-[540ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export default function CommandExamplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    if (isVisible) return

    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      {
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.14,
      },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="commands"
      className="relative overflow-hidden bg-[#f7fbfc] px-6 py-20 text-[#071014] sm:px-8 lg:px-[56px] lg:py-28 xl:px-[90px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[#E7F6FB]/45 blur-[140px]"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <Reveal
          isVisible={isVisible}
          delay={0}
          className="mx-auto max-w-[980px] text-center"
        >
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#147BA6]">
            WHAT YOU CAN TRACK
          </p>
          <h2
            className="mx-auto max-w-[960px] text-[clamp(42px,5.2vw,86px)] font-normal italic leading-[0.95] tracking-[-0.035em] text-[#050708]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            One agent for check-ins, trends, and changing goals.
          </h2>
          <p className="mx-auto mt-6 max-w-[760px] text-[clamp(16px,1.18vw,20px)] font-medium leading-[1.6] text-[#101820]/70">
            TalkTrack handles the structure behind the conversation, so your
            life data can grow with what you actually care about.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[1180px] gap-4 sm:mt-14 md:grid-cols-3 xl:gap-5">
          {TRACKING_CARDS.map((card, index) => {
            const Icon = card.icon
            return (
              <Reveal
                key={card.title}
                isVisible={isVisible}
                delay={120 + index * 70}
              >
                <article className="group flex h-full min-h-[220px] flex-col rounded-[24px] border border-[#B7E3F2]/80 bg-white/75 p-6 text-left shadow-[0_20px_70px_-62px_rgba(52,116,138,0.38)] backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#2498C7]/60 hover:bg-[#fafdff] hover:shadow-[0_24px_82px_-64px_rgba(36,152,199,0.42)] sm:p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#2498C7]/35 bg-[#E7F6FB]/70 text-[#147BA6] transition-colors group-hover:border-[#2498C7]/70 group-hover:bg-[#E7F6FB]">
                    <Icon
                      size={18}
                      strokeWidth={2.3}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-6 text-[22px] font-semibold leading-[1.12] tracking-[-0.018em] text-[#071014] sm:text-[24px]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[14px] font-medium leading-[1.65] text-[#101820]/65 sm:text-[15px]">
                    {card.text}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
