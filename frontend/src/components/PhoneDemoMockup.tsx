import {
  Activity,
  Bell,
  CalendarDays,
  ChevronDown,
  CheckCircle2,
  ChevronRight,
  Crosshair,
  Download,
  Dumbbell,
  FileText,
  HelpCircle,
  Link,
  LogOut,
  Mail,
  MessageSquare,
  Mic,
  Moon,
  Shield,
  Smile,
  Trash2,
  User,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import type { ComponentType, ReactNode } from 'react'

type TabId = 'main' | 'logs' | 'tracking' | 'account'
type IconComponent = ComponentType<{
  size?: number
  strokeWidth?: number
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}>

type Tracker = {
  name: string
  icon: IconComponent
  enabled: boolean
}

const BADGE_SRC = '/assets/badges/platinum/platinum2.png'
const TRACKING_EXP = 210
const TRACKING_MAX_EXP = 300
const RING_RADIUS = 52
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const RING_OFFSET =
  RING_CIRCUMFERENCE * (1 - TRACKING_EXP / TRACKING_MAX_EXP)
const STREAK_DAYS = new Set([8, 9, 10, 11, 12, 13, 14])

const TABS: Array<{ id: TabId; label: string; icon: IconComponent }> = [
  { id: 'main', label: 'Main', icon: MessageSquare },
  { id: 'logs', label: 'Logs', icon: FileText },
  { id: 'tracking', label: 'Tracking', icon: Activity },
  { id: 'account', label: 'Account', icon: User },
]

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const CALENDAR_CELLS = [
  null,
  null,
  ...Array.from({ length: 28 }, (_, index) => index + 1),
]

const TRACKERS: Tracker[] = [
  { name: 'Sleep', icon: Moon, enabled: true },
  { name: 'Energy', icon: Zap, enabled: true },
  { name: 'Mood', icon: Smile, enabled: true },
  { name: 'Workout', icon: Dumbbell, enabled: false },
  { name: 'Focus', icon: Crosshair, enabled: true },
  { name: 'Anxiety', icon: Activity, enabled: false },
  { name: 'Productivity', icon: CheckCircle2, enabled: true },
]

const SETTINGS = [
  { label: 'Notification preferences', icon: Bell },
  { label: 'Data & Privacy', icon: Shield },
  { label: 'Connected apps', icon: Link },
  { label: 'Export data', icon: Download },
  { label: 'Help Center', icon: HelpCircle },
  { label: 'Contact us', icon: Mail },
  { label: 'Delete account', icon: Trash2, danger: true },
]

function PhoneHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="px-4 pt-3.5">
      <h2 className="text-[22px] font-bold leading-none tracking-[-0.03em] text-[#071014]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1.5 text-[11px] font-medium leading-snug text-[#101820]/50">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

function ChatBubble({
  children,
  from = 'ai',
}: {
  children: ReactNode
  from?: 'ai' | 'user'
}) {
  const isUser = from === 'user'
  return (
    <div
      className={[
        'max-w-[88%] rounded-[15px] px-3.5 py-2.5 text-[11px] font-medium leading-[1.55]',
        isUser
          ? 'ml-auto rounded-tr-[5px] border border-[#b8dce5]/80 bg-[#fafdff] text-[#071014]/82 shadow-[0_10px_26px_-24px_rgba(35,96,118,0.38)]'
          : 'mr-auto rounded-tl-[5px] border border-[#d5e8ee] bg-[#eef7fa] text-[#101820]/74',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function StructuredBlock({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children?: ReactNode
}) {
  return (
    <div className="mt-3 border-t border-[#d8e3e7] pt-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#147BA6]">
            {title}
          </p>
          <p className="mt-0.5 text-[12px] font-semibold leading-tight text-[#071014]/86">
            {subtitle}
          </p>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-[#2498C7]" />
      </div>
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  )
}

function MoodLineChart() {
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
        className="h-[72px] w-full"
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
        <polyline
          points={line}
          fill="none"
          stroke="#2498C7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`M${line} L114 56 L6 56 Z`}
          fill="rgba(36,152,199,0.14)"
        />
        {points.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.3" fill="#147BA6" />
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

function MiniBars() {
  const bars = [38, 46, 41, 54, 59, 52, 68]
  const average = 50

  return (
    <div
      className="relative flex h-[62px] items-end gap-1.5 rounded-[13px] bg-[#eaf3f6] px-2.5 py-2"
      aria-label="Seven day productivity score chart"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 right-2.5 border-t border-dashed border-[#90bdcb]/65"
        style={{ bottom: `${average}%` }}
      />
      {bars.map((height, index) => (
        <div
          key={index}
          aria-hidden="true"
          className={[
            'relative z-10 min-w-0 flex-1 rounded-t-[4px] border border-white/70',
            index === bars.length - 1
              ? 'bg-gradient-to-t from-[#147BA6] to-[#2498C7]'
              : 'bg-[#b8d8e0]',
          ].join(' ')}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

function StatusControlCard({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  const percent = ((value - 1) / 9) * 100

  return (
    <div className="mt-3 border-t border-[#d8e3e7] pt-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#101820]/48">
          Anxiety check-in
        </span>
        <span className="rounded-full border border-[#cde6ee] bg-white/70 px-2 py-0.5 text-[9px] font-semibold text-[#147BA6]">
          Level {value}/10
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-medium text-[#101820]/42">Low</span>
        <div className="relative h-2 flex-1 rounded-full bg-[#d8e3e7]">
          <span
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#2498C7] to-[#147BA6]"
            style={{ width: `${percent}%` }}
          />
          <span
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9ccbd8] bg-white shadow-[0_1px_4px_rgba(35,96,118,0.24)]"
            style={{ left: `${percent}%` }}
          />
          <input
            type="range"
            min={1}
            max={10}
            value={value}
            aria-label="Anxiety level"
            onInput={(event) => onChange(Number(event.currentTarget.value))}
            onChange={(event) => onChange(Number(event.target.value))}
            className="absolute inset-x-0 top-1/2 h-7 -translate-y-1/2 cursor-pointer opacity-0"
          />
        </div>
        <span className="text-[10px] font-medium text-[#101820]/42">High</span>
      </div>
    </div>
  )
}

function MainDemoScreen() {
  const [anxietyLevel, setAnxietyLevel] = useState(5)

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3.5 overflow-y-auto px-4 pb-3 pt-4">
        <ChatBubble from="user">
          Did my productivity improve this week?
        </ChatBubble>
        <ChatBubble>
          <p>
            Your productivity improved by 12% this week. Your strongest days
            came after 7h+ sleep and a morning workout.
          </p>
          <StructuredBlock title="Productivity score" subtitle="+12% this week">
            <MiniBars />
          </StructuredBlock>
        </ChatBubble>

        <div className="mx-auto w-fit rounded-full border border-[#d5e8ee] bg-white/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#101820]/45">
          Today, 2:30 PM
        </div>

        <ChatBubble from="user">Start tracking my anxiety.</ChatBubble>
        <ChatBubble>
          <p>
            Got it. I&apos;ll now track your anxiety level and look for
            patterns.
          </p>
          <StructuredBlock title="Tracker active" subtitle="Anxiety Levels" />
        </ChatBubble>

        <div className="mx-auto w-fit rounded-full border border-[#d5e8ee] bg-white/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#101820]/45">
          Later today
        </div>

        <ChatBubble>
          <p>
            Quick check-in: where is your anxiety level right now?
          </p>
          <StatusControlCard
            value={anxietyLevel}
            onChange={setAnxietyLevel}
          />
        </ChatBubble>
        <ChatBubble from="user">
          Show me my mood trend this month.
        </ChatBubble>
        <ChatBubble>
          <p>
            Here&apos;s your mood trend for this month. It dipped mid-month,
            then recovered over the last week.
          </p>
          <MoodLineChart />
        </ChatBubble>
      </div>
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-full border border-[#B7E3F2] bg-white/80 p-2 shadow-[0_12px_30px_-28px_rgba(35,96,118,0.26)]">
        <span className="hidden">
          <MessageSquare size={14} strokeWidth={2.4} aria-hidden="true" />
        </span>
        <p className="min-w-0 flex-1 text-[12px] font-medium text-[#101820]/42 ml-2">
          Type or speak...
        </p>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#2498C7] to-[#B7E3F2] text-[#071014]">
          <Mic size={15} strokeWidth={2.8} aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}

function MetricRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between rounded-[12px] border border-[#d5e8ee] bg-white/72 px-3 py-2">
      <span className="text-[11px] font-medium text-[#101820]/56">{label}</span>
      <span className="text-[12px] font-semibold text-[#071014]/86">{value}</span>
    </div>
  )
}

function LogsDemoScreen() {
  return (
    <div className="h-full overflow-y-auto pb-3">
      <PhoneHeader title="Life Log" subtitle="Review your daily patterns." />
      <div className="mt-4 space-y-3 px-4">
        <div className="rounded-[18px] border border-[#B7E3F2] bg-white/76 p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-[#147BA6]" strokeWidth={2.5} />
              <p className="text-[12px] font-semibold text-[#071014]">June 2026</p>
            </div>
            <p className="text-[10px] font-medium text-[#101820]/45">7 day streak</p>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-semibold uppercase tracking-[0.08em] text-[#101820]/42">
            {DAYS.map((day, index) => (
              <span key={`${day}-${index}`}>{day}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {CALENDAR_CELLS.map((day, index) => {
              if (day === null) {
                return (
                  <span
                    key={`blank-${index}`}
                    aria-hidden="true"
                    className="h-7 rounded-[9px]"
                  />
                )
              }

              const selected = day === 14
              const active = STREAK_DAYS.has(day)
              return (
                <span
                  key={day}
                  className={[
                    'grid h-7 place-items-center rounded-[9px] text-[10px] font-semibold',
                    selected
                      ? 'bg-[#2498C7] text-[#071014]'
                      : active
                        ? 'bg-[#E7F6FB] text-[#147BA6]'
                        : 'bg-[#eef4f6] text-[#101820]/42',
                  ].join(' ')}
                >
                  {day}
                </span>
              )
            })}
          </div>
        </div>

        <div className="rounded-[18px] border border-[#b9dfe8] bg-[#E7F6FB]/60 p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#147BA6]">
            Daily summary
          </p>
          <p className="mt-2 text-[12px] font-medium leading-[1.5] text-[#101820]/70">
            Strong focus day. Mood stayed steady after a workout and longer sleep.
          </p>
        </div>

        <div className="grid gap-2">
          <MetricRow label="Sleep" value="8h" />
          <MetricRow label="Energy" value="4/5" />
          <MetricRow label="Mood" value="4/5" />
          <MetricRow label="Workout" value="Yes" />
          <MetricRow label="Focus" value="7/10" />
        </div>
      </div>
    </div>
  )
}

function ProgressBadge() {
  return (
    <div className="px-1 pb-2 pt-1 text-center">
      <div className="relative mx-auto grid h-[166px] w-[166px] place-items-center">
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
          <circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            stroke="#d8e3e7"
            strokeWidth="7"
          />
          <circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            stroke="#2498C7"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_OFFSET}
            className="origin-center -rotate-90"
          />
        </svg>
        <img
          src={BADGE_SRC}
          alt=""
          className="relative h-[106px] w-[106px] object-contain drop-shadow-[0_10px_18px_rgba(35,96,118,0.24)]"
        />
      </div>
      <p className="text-[20px] font-bold tracking-[-0.03em] text-[#071014]">
        Level 12
      </p>
      <p className="mt-1 text-[10px] font-semibold text-[#101820]/48">
        {TRACKING_EXP} / {TRACKING_MAX_EXP} EXP
      </p>
    </div>
  )
}

function TrackerRow({
  name,
  icon: Icon,
  enabled,
  onToggle,
}: {
  name: string
  icon: IconComponent
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border border-[#d5e8ee] bg-white/76 px-3 py-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eef7fa] text-[#147BA6]">
        <Icon size={15} strokeWidth={2.4} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 text-[12px] font-medium text-[#071014]/82">
        {name}
      </span>
      <button
        type="button"
        onClick={onToggle}
        aria-label={`${enabled ? 'Stop' : 'Start'} tracking ${name}`}
        aria-pressed={enabled}
        className={[
          'relative h-5 w-9 rounded-full transition-colors',
          enabled ? 'bg-[#2498C7]' : 'bg-[#d8e3e7]',
        ].join(' ')}
      >
        <span
          className="absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white shadow-[0_1px_3px_rgba(35,96,118,0.28)]"
          style={{ left: enabled ? 18 : 3 }}
        />
      </button>
    </div>
  )
}

function TrackingDemoScreen() {
  const [trackerStates, setTrackerStates] = useState<Record<string, boolean>>(
    () =>
      TRACKERS.reduce<Record<string, boolean>>((states, tracker) => {
        states[tracker.name] = tracker.enabled
        return states
      }, {}),
  )

  return (
    <div className="h-full overflow-y-auto pb-3">
      <PhoneHeader title="Tracking" subtitle="Manage what TalkTrack follows." />
      <div className="mt-4 space-y-4 px-4">
        <ProgressBadge />
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#147BA6]">
            Active trackers
          </p>
          <div className="grid gap-2">
            {TRACKERS.map((tracker) => (
              <TrackerRow
                key={tracker.name}
                {...tracker}
                enabled={trackerStates[tracker.name]}
                onToggle={() =>
                  setTrackerStates((states) => ({
                    ...states,
                    [tracker.name]: !states[tracker.name],
                  }))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsRow({
  label,
  icon: Icon,
  danger = false,
}: {
  label: string
  icon: IconComponent
  danger?: boolean
}) {
  return (
    <div className="flex items-center gap-3 rounded-[13px] px-2 py-2.5">
      <Icon
        size={15}
        strokeWidth={2.4}
        aria-hidden="true"
        className={danger ? 'text-red-500/80' : 'text-[#101820]/42'}
      />
      <span
        className={[
          'min-w-0 flex-1 text-[11px] font-medium',
          danger ? 'text-red-600/85' : 'text-[#101820]/62',
        ].join(' ')}
      >
        {label}
      </span>
      <ChevronRight
        size={14}
        strokeWidth={2.4}
        aria-hidden="true"
        className="text-[#101820]/30"
      />
    </div>
  )
}

function AccountDemoScreen() {
  return (
    <div className="h-full overflow-y-auto pb-3">
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center text-[#147BA6]/75">
            <User size={30} strokeWidth={1.7} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-[20px] font-bold leading-tight tracking-[-0.03em] text-[#071014]">
              Alex Rivera
            </h2>
            <p className="truncate text-[11px] font-medium text-[#101820]/45">
              alex.rivera@example.com
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 px-4">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#147BA6]">
          Account configuration
        </p>
        <div className="grid gap-0.5">
          {SETTINGS.map((setting) => (
            <SettingsRow key={setting.label} {...setting} />
          ))}
        </div>
        <button
          type="button"
          className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-[15px] border border-red-200 bg-red-50 text-[12px] font-semibold text-red-600"
        >
          <LogOut size={14} strokeWidth={2.4} aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  )
}

function PhoneTabBar({
  activeTab,
  onChange,
  onInteract,
}: {
  activeTab: TabId
  onChange: (tab: TabId) => void
  onInteract: () => void
}) {
  return (
    <nav className="mx-3 mb-3 grid grid-cols-4 rounded-full border border-[#B7E3F2] bg-white/80 p-1.5 shadow-[0_12px_30px_-28px_rgba(35,96,118,0.22)]">
      {TABS.map((tab) => {
        const Icon = tab.icon
        const active = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              onInteract()
              onChange(tab.id)
            }}
            className={[
              'flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-full px-1.5 py-1.5 transition-colors',
              active ? 'bg-[#E7F6FB] text-[#147BA6]' : 'text-[#101820]/42 hover:text-[#147BA6]',
            ].join(' ')}
          >
            <Icon size={15} strokeWidth={2.5} aria-hidden="true" />
            <span className="text-[9px] font-semibold leading-none">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function ActiveScreen({ tab }: { tab: TabId }) {
  if (tab === 'logs') return <LogsDemoScreen />
  if (tab === 'tracking') return <TrackingDemoScreen />
  if (tab === 'account') return <AccountDemoScreen />
  return <MainDemoScreen />
}

function PhoneInteractionHint() {
  return (
    <div
      aria-hidden="true"
      className="phone-scroll-hint pointer-events-none absolute left-1/2 top-[62%] z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#B7E3F2]/70 bg-white/72 shadow-[0_16px_36px_-28px_rgba(20,123,166,0.42)] backdrop-blur-sm"
    >
      <ChevronDown size={24} strokeWidth={2.1} className="phone-scroll-arrow text-[#147BA6]" />
    </div>
  )
}

export default function PhoneDemoMockup() {
  const [activeTab, setActiveTab] = useState<TabId>('main')
  const [showHint, setShowHint] = useState(true)
  const hideHint = () => setShowHint(false)

  return (
    <div className="mx-auto w-full max-w-[286px] sm:max-w-[296px] xl:max-w-[304px]">
      <div className="relative aspect-[9/19.5] rounded-[34px] border border-[#050708]/80 bg-[#101214] p-2 shadow-[0_26px_70px_-54px_rgba(5,7,8,0.45)] sm:rounded-[42px] sm:p-2.5">
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-[27px] border border-[#d5e8ee] bg-[#f7fbfc] text-[#071014] sm:rounded-[34px]"
          onPointerDown={hideHint}
          onClick={hideHint}
          onWheel={hideHint}
          onTouchStart={hideHint}
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-3 z-20 h-5 w-[78px] -translate-x-1/2 rounded-full border border-black/70 bg-[#050708]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),transparent_30%)]"
          />

          <div className="relative z-10 flex items-center justify-between px-5 pt-4 text-[11px] font-semibold text-[#071014]/72 sm:px-6 sm:pt-5">
            <span>9:41</span>
            <span>100%</span>
          </div>

          <div className="relative z-10 min-h-0 flex-1">
            <ActiveScreen tab={activeTab} />
          </div>

          <div className="relative z-10">
            <PhoneTabBar
              activeTab={activeTab}
              onChange={setActiveTab}
              onInteract={hideHint}
            />
          </div>

          {showHint ? <PhoneInteractionHint /> : null}
        </div>
      </div>
      <p className="mt-4 text-center text-[clamp(12px,0.8vw,15px)] font-medium text-[#101820]/45">
        Tap the tabs to preview the app.
      </p>
    </div>
  )
}
