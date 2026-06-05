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
      className="relative px-6 py-24 sm:px-8 lg:px-[56px] lg:py-32 xl:px-[90px]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        <Reveal
          isVisible={isVisible}
          delay={0}
          className="mx-auto max-w-[880px] text-center"
        >
          <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-mint">
            What you can track
          </p>
          <h2 className="mx-auto max-w-[820px] text-[clamp(32px,4.1vw,64px)] font-black leading-[1] tracking-[-0.025em] text-white">
            One agent for check-ins, trends, and changing goals.
          </h2>
          <p className="mx-auto mt-6 max-w-[760px] text-[clamp(16px,1.15vw,20px)] font-medium leading-[1.55] text-white/70">
            TalkTrack handles the structure behind the conversation, so your
            life data can grow with what you actually care about.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[1080px] gap-4 md:grid-cols-3">
          {TRACKING_CARDS.map((card, index) => {
            const Icon = card.icon
            return (
              <Reveal
                key={card.title}
                isVisible={isVisible}
                delay={120 + index * 70}
              >
                <article className="group flex h-full min-h-[220px] flex-col rounded-[24px] border border-white/10 bg-white/[0.045] p-6 text-left shadow-[0_20px_64px_-56px_rgba(0,0,0,0.72)] backdrop-blur-md transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-mint/30 hover:bg-white/[0.06] hover:shadow-[0_26px_78px_-58px_rgba(36,255,174,0.2)] sm:p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-mint/20 bg-mint/[0.08] text-mint transition-colors group-hover:border-mint/35 group-hover:bg-mint/[0.11]">
                    <Icon
                      size={18}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-6 text-[22px] font-extrabold leading-[1.08] tracking-[-0.018em] text-white sm:text-[24px]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[14px] font-medium leading-[1.6] text-white/66 sm:text-[15px]">
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
