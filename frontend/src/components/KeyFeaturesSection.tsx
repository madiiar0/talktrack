import {
  BarChart3,
  Bot,
  Gamepad2,
  User,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const STATS = ['Health', 'Money', 'Freedom', 'Relationships', 'Faith']
const BADGE_SRC = '/assets/badges/iron/iron2.png'
const CURRENT_EXP = 210
const MAX_EXP = 300
const RING_RADIUS = 92
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const RING_PROGRESS = CURRENT_EXP / MAX_EXP
const RING_OFFSET = RING_CIRCUMFERENCE * (1 - RING_PROGRESS)

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
        'transition-[opacity,transform] duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none',
        isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-[0.98] opacity-0',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function MiniRadar() {
  return (
    <svg viewBox="0 0 150 150" className="h-[132px] w-[132px]" aria-hidden="true">
      <polygon
        points="75,17 130,57 109,122 41,122 20,57"
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeDasharray="4 5"
      />
      <polygon
        points="75,38 110,63 97,103 53,103 40,63"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeDasharray="4 5"
      />
      <polygon
        points="75,27 118,61 101,110 46,116 34,60"
        fill="rgba(36,255,174,0.14)"
        stroke="#24ffae"
        strokeWidth="2.5"
      />
      {[['75', '27'], ['118', '61'], ['101', '110'], ['46', '116'], ['34', '60']].map(
        ([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#24ffae" />
        ),
      )}
    </svg>
  )
}

function LifeDashboardVisual() {
  return (
    <div className="grid w-full gap-5">
      <div className="flex w-full items-center justify-between gap-6 max-[430px]:flex-col">
        <div className="-translate-y-1 sm:-translate-y-2">
          <MiniRadar />
        </div>
        <div className="grid w-full min-w-0 flex-1 gap-3">
          {STATS.slice(0, 3).map((stat, index) => (
            <div key={stat}>
              <div className="mb-1.5 flex items-center justify-between gap-4 text-[11px] font-bold text-white/60">
                <span>{stat}</span>
                <span>{72 + index * 6}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-mint"
                  style={{ width: `${72 + index * 6}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdvisorVisual() {
  return (
    <div className="mt-4 grid gap-2.5 sm:mt-5">
      <div className="ml-auto flex max-w-[88%] items-start gap-3">
        <div className="rounded-[18px] rounded-tr-[6px] border border-white/10 bg-white/[0.07] px-4 py-3">
          <p className="text-[14px] font-bold leading-[1.45] text-white sm:text-[15px]">
            Should I move to a new city?
          </p>
        </div>
        <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/75">
          <User size={16} strokeWidth={2.4} aria-hidden="true" />
        </span>
      </div>

      <div className="mr-auto flex max-w-[92%] items-start gap-3">
        <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint text-black">
          <Bot size={16} strokeWidth={2.6} aria-hidden="true" />
        </span>
        <div className="rounded-[18px] rounded-tl-[6px] border border-mint/20 bg-mint/10 px-4 py-3">
          <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-mint">
            TalkTrack AI
          </p>
          <p className="text-[13px] font-semibold leading-[1.55] text-white/85 sm:text-[14px]">
            Your best weeks came from new people plus steady routines. Move if
            the city supports both, not just an escape.
          </p>
        </div>
      </div>
    </div>
  )
}

function GamificationVisual() {
  return (
    <div className="mt-9 flex flex-col items-center justify-center">
      <div className="relative grid h-[210px] w-[210px] place-items-center sm:h-[230px] sm:w-[230px]">
        <svg
          viewBox="0 0 220 220"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <circle
            cx="110"
            cy="110"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="14"
          />
          <circle
            cx="110"
            cy="110"
            r={RING_RADIUS}
            fill="none"
            stroke="#24ffae"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_OFFSET}
            className="origin-center -rotate-90"
          />
        </svg>

        <img
          src={BADGE_SRC}
          alt=""
          className="relative z-10 h-[128px] w-[128px] object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.52)] sm:h-[146px] sm:w-[146px]"
        />
      </div>
      <p className="mt-3 text-[15px] font-semibold leading-none text-white sm:text-[16px]">
        {CURRENT_EXP} / {MAX_EXP}
        <span className="ml-1 font-black text-mint">EXP</span>
      </p>
    </div>
  )
}

function FeatureCard({
  eyebrow,
  title,
  text,
  isMain = false,
  centerVisual = false,
  children,
}: {
  eyebrow: string
  title: string
  text: string
  isMain?: boolean
  centerVisual?: boolean
  children: ReactNode
}) {
  return (
    <article
      className={[
        'group flex h-full flex-col rounded-[24px] border p-6 text-left backdrop-blur-md transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_78px_-58px_rgba(36,255,174,0.24)] sm:p-7',
        isMain
          ? 'min-h-[500px] border-mint/30 bg-mint/10 shadow-[0_24px_88px_-74px_rgba(36,255,174,0.52)] hover:border-mint/45 hover:bg-mint/12 hover:shadow-[0_28px_92px_-74px_rgba(36,255,174,0.3)] lg:min-h-[600px] lg:p-8'
          : 'min-h-[430px] border-white/10 bg-white/[0.045] shadow-[0_20px_64px_-56px_rgba(0,0,0,0.72)] hover:border-white/18 hover:bg-white/[0.06] lg:min-h-[500px]',
      ].join(' ')}
    >
      <div className="mb-4 flex items-center gap-2 text-mint">
        {eyebrow === 'AI Advisor' ? (
          <Bot size={16} strokeWidth={2.6} aria-hidden="true" />
        ) : eyebrow === 'Personal stats' ? (
          <BarChart3 size={16} strokeWidth={2.6} aria-hidden="true" />
        ) : (
          <Gamepad2 size={16} strokeWidth={2.6} aria-hidden="true" />
        )}
        <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-mint-light">
          {eyebrow}
        </p>
      </div>
      <h3
        className={[
          'font-extrabold leading-[1.05] tracking-[-0.018em] text-white transition-colors duration-300 group-hover:text-white',
          isMain ? 'text-[28px] sm:text-[36px]' : 'text-[23px] sm:text-[27px]',
        ].join(' ')}
      >
        {title}
      </h3>
      <p
        className={[
          'mt-4 font-medium leading-[1.58] text-white/65 transition-colors duration-300 group-hover:text-white/72',
          isMain ? 'text-[15px] sm:text-[17px]' : 'text-[14px] sm:text-[15px]',
        ].join(' ')}
      >
        {text}
      </p>
      <div
        className={
          centerVisual || isMain ? 'mt-8 flex flex-1 items-center' : 'mt-auto'
        }
      >
        {children}
      </div>
    </article>
  )
}

export default function KeyFeaturesSection() {
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
      id="features"
      className="relative px-6 py-24 sm:px-8 lg:px-[56px] lg:py-32 xl:px-[90px]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <Reveal
          isVisible={isVisible}
          delay={0}
          className="mx-auto max-w-[980px] text-center"
        >
          <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-mint">
            KEY FEATURES
          </p>
          <h2 className="mx-auto max-w-[900px] text-[clamp(32px,4vw,62px)] font-black leading-[1] tracking-[-0.025em] text-white">
            The parts that make TalkTrack useful every day.
          </h2>
          <p className="mx-auto mt-6 max-w-[820px] text-[clamp(16px,1.12vw,20px)] font-medium leading-[1.55] text-white/70">
            TalkTrack is not just a place to save entries. It becomes a
            personal system for understanding your life, asking better
            questions, and staying consistent.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:items-center xl:gap-6">
          <Reveal isVisible={isVisible} delay={120} className="lg:order-2">
            <FeatureCard
              eyebrow="AI Advisor"
              title="AI Advisor that knows your context"
              text="Ask questions about your days, habits, patterns, emotions, and decisions. TalkTrack can answer based on your actual history, not generic advice."
              isMain
            >
              <AdvisorVisual />
            </FeatureCard>
          </Reveal>

          <Reveal isVisible={isVisible} delay={240} className="lg:order-1">
            <FeatureCard
              eyebrow="Personal stats"
              title="Life stats that make progress visible"
              text="See your patterns through dashboards, radar charts, weekly trends, and personal progress signals."
              centerVisual
            >
              <LifeDashboardVisual />
            </FeatureCard>
          </Reveal>

          <Reveal isVisible={isVisible} delay={360} className="lg:order-3">
            <FeatureCard
              eyebrow="Gamification"
              title="Gamification that keeps you consistent"
              text="Build the habit with XP, streaks, badges, levels, and progress loops that make daily reflection easier to maintain."
            >
              <GamificationVisual />
            </FeatureCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
