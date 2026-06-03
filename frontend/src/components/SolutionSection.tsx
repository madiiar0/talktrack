import { ArrowDown, CheckCircle2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const OUTPUTS = [
  {
    title: 'Life stats',
    text: 'Dashboards, radar charts, and progress signals.',
  },
  {
    title: 'Insights',
    text: 'Hidden habits, repeated patterns, and changes you may miss.',
  },
  {
    title: 'Structured records',
    text: 'Every day saved clearly, so you can search and look back.',
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

function SimpleArrow({ isVisible, delay }: { isVisible: boolean; delay: number }) {
  return (
    <Reveal isVisible={isVisible} delay={delay} className="py-3 sm:py-4">
      <div className="flex justify-center text-white/75">
        <ArrowDown size={28} strokeWidth={2.6} aria-hidden="true" />
      </div>
    </Reveal>
  )
}

function FlowCard({
  kicker,
  title,
  text,
  isVisible,
  delay,
  featured = false,
  children,
}: {
  kicker?: string
  title: string
  text?: string
  isVisible: boolean
  delay: number
  featured?: boolean
  children?: ReactNode
}) {
  return (
    <Reveal isVisible={isVisible} delay={delay}>
      <article
        className={[
          'group rounded-[22px] border p-5 text-left shadow-[0_20px_64px_-56px_rgba(0,0,0,0.72)] backdrop-blur-md transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_78px_-58px_rgba(36,255,174,0.24)] sm:p-6',
          featured
            ? 'border-mint/30 bg-mint/10 hover:border-mint/45 hover:bg-mint/12 hover:shadow-[0_28px_84px_-58px_rgba(36,255,174,0.3)]'
            : 'border-white/12 bg-white/[0.045] hover:border-white/18 hover:bg-white/[0.06]',
        ].join(' ')}
      >
        {kicker ? (
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.15em] text-mint transition-colors duration-300 group-hover:text-mint-light">
            {kicker}
          </p>
        ) : null}
        <h3
          className={[
            'font-extrabold leading-[1.08] tracking-[-0.015em] text-white transition-colors duration-300 group-hover:text-white',
            featured ? 'text-[25px] sm:text-[30px]' : 'text-[22px] sm:text-[25px]',
          ].join(' ')}
        >
          {title}
        </h3>
        {text ? (
          <p className="mt-3 text-[14px] font-medium leading-[1.55] text-white/60 transition-colors duration-300 group-hover:text-white/70 sm:text-[15px]">
            {text}
          </p>
        ) : null}
        {children}
      </article>
    </Reveal>
  )
}

function OutputRow({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="grid gap-3 py-5 sm:grid-cols-[minmax(170px,0.45fr)_1fr] sm:gap-8 sm:py-6">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint/10 text-mint">
          <CheckCircle2 size={17} strokeWidth={2.4} aria-hidden="true" />
        </span>
        <h4 className="text-[16px] font-extrabold leading-tight text-white sm:text-[17px]">
          {title}
        </h4>
      </div>
      <p className="text-[14px] font-medium leading-[1.55] text-white/60 sm:text-[15px]">
        {text}
      </p>
    </div>
  )
}

export default function SolutionSection() {
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
        threshold: 0.16,
      },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="relative px-6 py-24 sm:px-8 lg:px-[56px] lg:py-32 xl:px-[90px]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <Reveal
          isVisible={isVisible}
          delay={0}
          className="mx-auto max-w-[980px] text-center"
        >
          <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-mint">
            Solution
          </p>
          <h2 className="mx-auto max-w-[920px] text-[clamp(32px,4.15vw,64px)] font-black leading-[1] tracking-[-0.025em] text-white">
            From a 2-minute check-in to a system that understands your life.
          </h2>
          <p className="mx-auto mt-6 max-w-[820px] text-[clamp(16px,1.16vw,20px)] font-medium leading-[1.55] text-white/70">
            Speak or write what happened today. TalkTrack organizes it into
            records, stats, insights, and personalized guidance.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 w-full max-w-[880px] sm:mt-16">
          <FlowCard
            kicker="Input"
            title="Speak or write"
            text="A quick daily check-in in your own words."
            isVisible={isVisible}
            delay={120}
          />

          <SimpleArrow isVisible={isVisible} delay={220} />

          <FlowCard
            kicker="Engine"
            title="TalkTrack Engine"
            text="Structures your day, detects patterns, and updates your personal memory."
            isVisible={isVisible}
            delay={320}
            featured
          />

          <SimpleArrow isVisible={isVisible} delay={420} />

          <FlowCard
            title="What TalkTrack produces"
            isVisible={isVisible}
            delay={520}
          >
            <div className="mt-6 divide-y divide-white/10 border-t border-white/10">
              {OUTPUTS.map((output) => (
                <OutputRow
                  key={output.title}
                  title={output.title}
                  text={output.text}
                />
              ))}
            </div>
          </FlowCard>
        </div>
      </div>
    </section>
  )
}
