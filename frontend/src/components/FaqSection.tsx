import { Minus, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const FAQS = [
  {
    question: 'What is TalkTrack?',
    answer:
      'TalkTrack is your personal AI reflection companion. You can speak for 2-3 minutes, and it turns your reflection into structured logs, visible trends, insights, and noticed patterns.',
  },
  {
    question: 'How is this different from journaling?',
    answer:
      'Journaling gives you text you have to re-read to find anything. TalkTrack structures reflections using "What? So what? Now what?" so logs become easier to review over time.',
  },
  {
    question: 'Do I need to manually log everything?',
    answer:
      'No. You can talk naturally, and TalkTrack helps structure what you said. If a tracker value is missing, the app can ask a follow-up instead of making you fill out a long form.',
  },
  {
    question: 'What can TalkTrack track?',
    answer:
      'Mood, sleep, energy, focus, productivity, workouts, habits, routines, faith, health, and custom topics you choose to track. You stay in control of what belongs in your logs.',
  },
  {
    question: 'Can I stop or change what it tracks?',
    answer:
      'Yes. You can add, pause, archive, or change trackers in the app. AI may suggest tracker changes, but app data changes happen only after you confirm them.',
  },
  {
    question: 'Will TalkTrack show charts and insights?',
    answer:
      'Yes. TalkTrack can show trends, averages, comparisons, summaries, and chart-style insights drawn from your own history. AI insights can be incomplete or wrong, so they are for reflection, not professional advice.',
  },
  {
    question: 'Is this available on iOS and Android?',
    answer:
      'TalkTrack is preparing for iOS App Store launch. The App Store button is visible now but intentionally disabled until the live App Store link is available.',
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

function FaqItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
  isVisible,
}: {
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
  isVisible: boolean
}) {
  const contentId = `faq-answer-${index}`

  return (
    <Reveal isVisible={isVisible} delay={120 + index * 70}>
      <div
        className={[
          'overflow-hidden rounded-[22px] border bg-white/75 shadow-[0_20px_70px_-62px_rgba(117,106,216,0.34)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300',
          isOpen
            ? 'border-[#7D7DE8]/60 bg-[#fafdff]'
            : 'border-[#D8D6F4]/80 hover:border-[#7D7DE8]/45 hover:bg-[#fafdff]',
        ].join(' ')}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
        >
          <span className="text-[16px] font-semibold leading-[1.25] text-[#071014] sm:text-[18px]">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={[
              'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300',
              isOpen
                ? 'border-[#7D7DE8]/50 bg-[#EFEEFC] text-[#5A4FC4]'
                : 'border-[#D8D6F4] text-[#101820]/50',
            ].join(' ')}
          >
            {isOpen ? <Minus size={16} strokeWidth={2.6} /> : <Plus size={16} strokeWidth={2.6} />}
          </span>
        </button>

        <div
          id={contentId}
          className={[
            'grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          ].join(' ')}
        >
          <div className="overflow-hidden">
            <p
              className={[
                'px-5 pb-5 pr-14 text-[14px] font-medium leading-[1.68] text-[#101820]/65 transition-opacity duration-300 sm:px-6 sm:pb-6 sm:text-[15px]',
                isOpen ? 'opacity-100' : 'opacity-0 motion-reduce:opacity-100',
              ].join(' ')}
            >
              {answer}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(prefersReducedMotion)
  const [openIndex, setOpenIndex] = useState(0)

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
      id="faq"
      className="relative overflow-hidden bg-[var(--tt-bg)] px-6 py-20 text-[color:var(--tt-ink)] sm:px-8 lg:px-[56px] lg:py-28 xl:px-[90px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-20 h-[30rem] w-[30rem] rounded-full bg-[#EFEEFC]/45 blur-[140px]"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <Reveal
          isVisible={isVisible}
          delay={0}
          className="mx-auto max-w-[920px] text-center"
        >
          <p className="tt-eyebrow mb-4">
            FAQ
          </p>
          <h2
            className="mx-auto max-w-[920px] text-[clamp(42px,5.2vw,86px)] font-normal italic leading-[0.95] tracking-[-0.035em] text-[#050708]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Questions before your AI reflection companion launches.
          </h2>
          <p className="mx-auto mt-6 max-w-[820px] text-[clamp(16px,1.18vw,20px)] font-medium leading-[1.6] text-[#101820]/70">
            Everything you need to know about voice-first reflection,
            structured logs, privacy, and asking questions about your own data.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[920px] gap-3 sm:mt-14">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isOpen={openIndex === index}
              isVisible={isVisible}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? -1 : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
