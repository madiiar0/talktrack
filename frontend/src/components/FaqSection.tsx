import { Minus, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const FAQS = [
  {
    question: 'What is TalkTrack?',
    answer:
      'TalkTrack is a personal AI agent that tracks your life through normal conversation. You just talk to it, and it turns what you say into structured personal data, charts, and insights — no forms, no manual logging.',
  },
  {
    question: 'How is this different from journaling?',
    answer:
      'Journaling gives you text you have to re-read to find anything. TalkTrack turns your conversations into structured data, so you get the benefits of journaling, habit tracking, and analytics in one place — without doing the manual work.',
  },
  {
    question: 'Do I need to manually log everything?',
    answer:
      'No. That is the whole point. You talk naturally and TalkTrack handles the structure behind the scenes — capturing your mood, sleep, focus, and anything else you mention, automatically.',
  },
  {
    question: 'What can TalkTrack track?',
    answer:
      'Mood, sleep, energy, anxiety, focus, productivity, workouts, habits, routines, goals, and any custom topic you ask it to watch. If you can talk about it, TalkTrack can track it.',
  },
  {
    question: 'Can I stop or change what it tracks?',
    answer:
      'Anytime, in plain English. Say "Start tracking my anxiety," "Stop tracking sleep," or "Track how often I work out," and your AI updates instantly. You stay in full control of what it follows.',
  },
  {
    question: 'Will TalkTrack show charts and insights?',
    answer:
      'Yes. Ask for trends, averages, comparisons, or summaries and TalkTrack answers with clear charts and insights drawn from your own history — so you can actually see your patterns and progress over time.',
  },
  {
    question: 'Is this available on iOS and Android?',
    answer:
      'TalkTrack is preparing early access now, with native iOS and Android apps coming soon. Join the waitlist to be among the first to get in.',
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
          'overflow-hidden rounded-[20px] border bg-white/[0.045] backdrop-blur-md transition-colors duration-300',
          isOpen ? 'border-mint/25' : 'border-white/10 hover:border-white/20',
        ].join(' ')}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
        >
          <span className="text-[16px] font-extrabold leading-[1.25] text-white sm:text-[18px]">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={[
              'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300',
              isOpen
                ? 'border-mint/30 bg-mint/10 text-mint'
                : 'border-white/10 text-white/70',
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
                'px-5 pb-5 pr-14 text-[14px] font-medium leading-[1.65] text-white/65 transition-opacity duration-300 sm:px-6 sm:pb-6 sm:text-[15px]',
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
      className="relative px-6 py-24 sm:px-8 lg:px-[56px] lg:py-32 xl:px-[90px]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        <Reveal
          isVisible={isVisible}
          delay={0}
          className="mx-auto max-w-[920px] text-center"
        >
          <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-mint">
            FAQ
          </p>
          <h2 className="mx-auto max-w-[860px] text-[clamp(32px,4vw,62px)] font-black leading-[1] tracking-[-0.025em] text-white">
            Questions before your AI starts tracking.
          </h2>
          <p className="mx-auto mt-6 max-w-[820px] text-[clamp(16px,1.12vw,20px)] font-medium leading-[1.55] text-white/70">
            Everything you need to know about natural-language tracking,
            personal memory, privacy, and asking questions about your own data.
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
