import {
  BarChart3,
  Bot,
  Gamepad2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import AnimatedRadarChart from './AnimatedRadarChart'

const BADGE_SRC = '/assets/badges/platinum/platinum2.png'
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

const PERSONAL_STATS = [
  { label: 'Mood stability', value: 78 },
  { label: 'Focus trend', value: 64 },
  { label: 'Sleep rhythm', value: 84 },
]

function MiniProgressBar({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold text-[#101820]/60">
          {label}
        </span>
        <span className="text-[11px] font-bold text-[#101820]/75">
          {value}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#dbeef3]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7D7DE8] to-[#5A4FC4]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function LifeDashboardVisual() {
  return (
    <div className="grid w-full grid-cols-[minmax(150px,1fr)_minmax(96px,0.66fr)] items-center gap-3">
      <div className="min-w-0 self-center">
        <AnimatedRadarChart
          showLabels={false}
          showScale={false}
          className="max-w-[280px]"
        />
      </div>
      <div className="grid min-w-0 gap-4 self-center">
        {PERSONAL_STATS.map((stat) => (
          <MiniProgressBar key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  )
}

function CutPhonePreview() {
  return (
    <div
      className="relative mt-5 flex h-[300px] w-full items-start justify-center overflow-hidden sm:h-[330px] lg:h-[355px]"
      style={{
        WebkitMaskImage:
          'linear-gradient(to bottom, #000 0%, #000 80%, rgba(0,0,0,0) 100%)',
        maskImage:
          'linear-gradient(to bottom, #000 0%, #000 80%, rgba(0,0,0,0) 100%)',
      }}
    >
      <img
        src="/assets/keyfeaturespic.png"
        alt="TalkTrack structured reflection feature preview"
        className="h-auto w-full max-w-[280px] object-contain sm:max-w-[300px] lg:max-w-[318px]"
        loading="lazy"
        draggable="false"
      />
    </div>
  )
}

function GamificationVisual() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="relative grid h-[210px] w-[210px] place-items-center sm:h-[230px] sm:w-[230px]">
        <svg
          viewBox="0 0 220 220"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="featureBadgeRing" x1="28" y1="188" x2="188" y2="32">
              <stop offset="0%" stopColor="#7D7DE8" />
              <stop offset="100%" stopColor="#5A4FC4" />
            </linearGradient>
          </defs>
          <circle
            cx="110"
            cy="110"
            r={RING_RADIUS}
            fill="none"
            stroke="#E7ECF3"
            strokeWidth="14"
          />
          <circle
            cx="110"
            cy="110"
            r={RING_RADIUS}
            fill="none"
            stroke="url(#featureBadgeRing)"
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
          className="relative z-10 h-[128px] w-[128px] object-contain drop-shadow-[0_14px_24px_rgba(63,75,102,0.22)] sm:h-[146px] sm:w-[146px]"
        />
      </div>
      <p className="mt-3 text-[15px] font-semibold leading-none text-[#071014] sm:text-[16px]">
        {CURRENT_EXP} / {MAX_EXP}
        <span className="ml-1 font-bold text-[#5A4FC4]">EXP</span>
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
        'group flex h-full flex-col rounded-[26px] border p-6 text-left backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#7D7DE8]/60 hover:bg-[#fafdff] hover:shadow-[0_24px_82px_-64px_rgba(125,125,232,0.42)] sm:p-7',
        isMain
          ? 'min-h-[500px] border-[var(--tt-accent-border)] bg-gradient-to-b from-white/90 to-[var(--tt-accent-50)] shadow-[var(--tt-shadow)] lg:min-h-[600px] lg:p-8'
          : 'min-h-[430px] border-[var(--tt-accent-border)] bg-white/75 shadow-[var(--tt-shadow)] lg:min-h-[500px]',
      ].join(' ')}
    >
      <div className="mb-4 flex items-center gap-2 text-[#5A4FC4]">
        {eyebrow === 'AI companion' ? (
          <Bot size={16} strokeWidth={2.3} aria-hidden="true" />
        ) : eyebrow === 'Personal stats' ? (
          <BarChart3 size={16} strokeWidth={2.3} aria-hidden="true" />
        ) : (
          <Gamepad2 size={16} strokeWidth={2.3} aria-hidden="true" />
        )}
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 group-hover:text-[#7D7DE8]">
          {eyebrow}
        </p>
      </div>
      <h3
        className={[
          'font-semibold leading-[1.1] tracking-[-0.018em] text-[#071014] transition-colors duration-300',
          isMain ? 'text-[28px] sm:text-[36px]' : 'text-[23px] sm:text-[27px]',
        ].join(' ')}
      >
        {title}
      </h3>
      <p
        className={[
          'mt-4 font-medium leading-[1.62] text-[#101820]/65 transition-colors duration-300 group-hover:text-[#101820]/75',
          isMain ? 'text-[15px] sm:text-[17px]' : 'text-[14px] sm:text-[15px]',
        ].join(' ')}
      >
        {text}
      </p>
      <div
        className={
          centerVisual || isMain
            ? 'mt-8 flex w-full flex-1 items-center'
            : 'mt-auto'
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
      className="relative overflow-hidden bg-[var(--tt-bg)] px-6 py-20 text-[color:var(--tt-ink)] sm:px-8 lg:px-[56px] lg:py-28 xl:px-[90px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-28 h-[30rem] w-[30rem] rounded-full bg-[#EFEEFC]/50 blur-[140px]"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <Reveal
          isVisible={isVisible}
          delay={0}
          className="mx-auto max-w-[980px] text-center"
        >
          <p className="tt-eyebrow mb-4">
            KEY FEATURES
          </p>
          <h2
            className="mx-auto max-w-[960px] text-[clamp(42px,5.2vw,86px)] font-normal italic leading-[0.95] tracking-[-0.035em] text-[#050708]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Reflection that becomes useful over time.
          </h2>
          <p className="mx-auto mt-6 max-w-[820px] text-[clamp(16px,1.18vw,20px)] font-medium leading-[1.6] text-[#101820]/70">
            TalkTrack structures voice-first reflections into daily logs,
            tracker answers, trends, and gentle follow-up questions.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-[1fr_1.12fr_1fr] lg:items-center xl:gap-5">
          <Reveal isVisible={isVisible} delay={120} className="lg:order-2">
            <FeatureCard
              eyebrow="AI companion"
              title="Structured reflection using What, So what, Now what"
              text="Speak naturally about your day, then review clear reflection sections instead of a single wall of journal text."
              isMain
            >
              <CutPhonePreview />
            </FeatureCard>
          </Reveal>

          <Reveal isVisible={isVisible} delay={240} className="lg:order-1">
            <FeatureCard
              eyebrow="Personal stats"
              title="Trends, insights, and noticed patterns"
              text="See logs become visible progress across mood, habits, productivity, faith, health, and custom trackers you choose."
              centerVisual
            >
              <LifeDashboardVisual />
            </FeatureCard>
          </Reveal>

          <Reveal isVisible={isVisible} delay={360} className="lg:order-3">
            <FeatureCard
              eyebrow="Gamification"
              title="Gentle loops that support consistency"
              text="XP, streaks, badges, and daily completion states make a short reflection habit easier to maintain."
            >
              <GamificationVisual />
            </FeatureCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
