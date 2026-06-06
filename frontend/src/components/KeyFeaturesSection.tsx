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
          className="h-full rounded-full bg-gradient-to-r from-[#5dc8ea] to-[#5dc8ea]"
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

function StaticMoodLineChart() {
  const points = [
    [6, 49],
    [24, 42],
    [42, 45],
    [60, 32],
    [78, 35],
    [96, 25],
    [114, 19],
  ] as const
  const line = points.map(([x, y]) => `${x},${y}`).join(' ')

  return (
    <div className="mt-3">
      <svg
        viewBox="0 0 120 58"
        className="h-[82px] w-full"
        role="img"
        aria-label="Mood trend line chart"
      >
        {[14, 29, 44].map((y) => (
          <line
            key={y}
            x1="4"
            x2="116"
            y1={y}
            y2={y}
            stroke="rgba(16,24,32,0.10)"
            strokeWidth="1"
          />
        ))}
        <path
          d={`M${line} L114 56 L6 56 Z`}
          fill="rgba(93,200,234,0.14)"
        />
        <polyline
          points={line}
          fill="none"
          stroke="#5dc8ea"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.3" fill="#dbf4f8" />
        ))}
      </svg>
      <div className="mt-1 grid grid-cols-7 text-center text-[8px] font-medium text-[#101820]/40">
        {['1', '5', '10', '15', '20', '25', '30'].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  )
}

function CutPhonePreview() {
  return (
    <div
      className="relative mt-5 flex h-[330px] w-full justify-center overflow-hidden sm:h-[365px]"
      style={{
        WebkitMaskImage:
          'linear-gradient(to bottom, #000 0%, #000 84%, rgba(0,0,0,0) 100%)',
        maskImage:
          'linear-gradient(to bottom, #000 0%, #000 84%, rgba(0,0,0,0) 100%)',
      }}
    >
      <div className="relative w-full max-w-[250px] sm:max-w-[270px]">
        <div className="aspect-[9/19.5] rounded-[34px] border border-[#050708]/80 bg-[#101214] p-2 shadow-[0_24px_66px_-52px_rgba(5,7,8,0.42)]">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[27px] border border-[#d5e8ee] bg-[#f7fbfc] text-[#071014]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-3 z-20 h-5 w-[76px] -translate-x-1/2 rounded-full border border-black/70 bg-[#050708]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),transparent_28%)]"
            />

            <div className="relative z-10 flex items-center justify-between px-5 pt-4 text-[10px] font-semibold text-[#071014]/70">
              <span>9:41</span>
              <span>100%</span>
            </div>

            <div className="relative z-10 flex-1 space-y-3.5 overflow-hidden px-4 pt-7">
              <div className="ml-auto max-w-[86%] rounded-[15px] rounded-tr-[5px] border border-[#b8dce5]/80 bg-[#fafdff] px-3.5 py-2.5 shadow-[0_10px_24px_-24px_rgba(35,96,118,0.34)]">
                <p className="text-[11px] font-medium leading-[1.55] text-[#071014]/82">
                  Show me my mood trend this month.
                </p>
              </div>

              <div className="mr-auto max-w-[90%] rounded-[15px] rounded-tl-[5px] border border-[#d5e8ee] bg-[#eef7fa] px-3.5 py-2.5">
                <p className="text-[11px] font-medium leading-[1.55] text-[#101820]/74">
                  Here&apos;s your mood trend for this month. It dipped
                  mid-month, then recovered over the last week.
                </p>
                <StaticMoodLineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
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
              <stop offset="0%" stopColor="#5dc8ea" />
              <stop offset="100%" stopColor="#dbf4f8" />
            </linearGradient>
          </defs>
          <circle
            cx="110"
            cy="110"
            r={RING_RADIUS}
            fill="none"
            stroke="#d8e3e7"
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
          className="relative z-10 h-[128px] w-[128px] object-contain drop-shadow-[0_14px_24px_rgba(35,96,118,0.22)] sm:h-[146px] sm:w-[146px]"
        />
      </div>
      <p className="mt-3 text-[15px] font-semibold leading-none text-[#071014] sm:text-[16px]">
        {CURRENT_EXP} / {MAX_EXP}
        <span className="ml-1 font-bold text-[#248eb1]">EXP</span>
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
        'group flex h-full flex-col rounded-[26px] border p-6 text-left backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#5dc8ea]/60 hover:bg-[#fafdff] hover:shadow-[0_24px_82px_-64px_rgba(93,200,234,0.42)] sm:p-7',
        isMain
          ? 'min-h-[500px] border-[#9ccbd8]/60 bg-gradient-to-b from-white/90 to-[#dbf4f8]/40 shadow-[0_24px_88px_-76px_rgba(52,116,138,0.48)] lg:min-h-[600px] lg:p-8'
          : 'min-h-[430px] border-[#cfe8ef]/80 bg-white/75 shadow-[0_20px_70px_-62px_rgba(52,116,138,0.38)] lg:min-h-[500px]',
      ].join(' ')}
    >
      <div className="mb-4 flex items-center gap-2 text-[#248eb1]">
        {eyebrow === 'Personal AI agent' ? (
          <Bot size={16} strokeWidth={2.3} aria-hidden="true" />
        ) : eyebrow === 'Personal stats' ? (
          <BarChart3 size={16} strokeWidth={2.3} aria-hidden="true" />
        ) : (
          <Gamepad2 size={16} strokeWidth={2.3} aria-hidden="true" />
        )}
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-300 group-hover:text-[#5dc8ea]">
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
      className="relative overflow-hidden bg-[#f7fbfc] px-6 py-20 text-[#071014] sm:px-8 lg:px-[56px] lg:py-28 xl:px-[90px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-28 h-[30rem] w-[30rem] rounded-full bg-[#dbf4f8]/50 blur-[140px]"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <Reveal
          isVisible={isVisible}
          delay={0}
          className="mx-auto max-w-[980px] text-center"
        >
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#248eb1]">
            KEY FEATURES
          </p>
          <h2
            className="mx-auto max-w-[960px] text-[clamp(42px,5.2vw,86px)] font-normal italic leading-[0.95] tracking-[-0.035em] text-[#050708]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            The agent layer your trackers are missing.
          </h2>
          <p className="mx-auto mt-6 max-w-[820px] text-[clamp(16px,1.18vw,20px)] font-medium leading-[1.6] text-[#101820]/70">
            TalkTrack is not another fixed tracker. It learns through
            conversation, structures what matters, and lets you ask your life
            data better questions.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-[1fr_1.12fr_1fr] lg:items-center xl:gap-5">
          <Reveal isVisible={isVisible} delay={120} className="lg:order-2">
            <FeatureCard
              eyebrow="Personal AI agent"
              title="Answers based on your actual history"
              text="Ask about your days, habits, emotions, decisions, and routines. TalkTrack responds from the context it has learned over time."
              isMain
            >
              <CutPhonePreview />
            </FeatureCard>
          </Reveal>

          <Reveal isVisible={isVisible} delay={240} className="lg:order-1">
            <FeatureCard
              eyebrow="Personal stats"
              title="Progress you can see and query"
              text="Turn conversation history into dashboards, weekly trends, averages, and comparisons across the trackers you choose."
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
