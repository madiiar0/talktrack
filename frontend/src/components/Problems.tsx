import { useEffect, useRef, useState } from 'react'

const PROBLEMS = [
  {
    title: 'Your days disappear',
    body: 'You live through important moments, emotions, decisions, and lessons, but most of them are forgotten by next week.',
  },
  {
    title: 'Journaling feels like work',
    body: 'Writing every night sounds useful, but in real life it feels slow, boring, and easy to skip.',
  },
  {
    title: 'You miss your own patterns',
    body: 'Your mood, habits, focus, sleep, goals, and mistakes repeat in patterns, but they are hard to notice without tracking.',
  },
  {
    title: 'AI advice feels too generic',
    body: 'Most AI tools give surface-level advice because they do not know what happened in your life yesterday, last week, or last month.',
  },
  {
    title: 'Self-improvement takes too much effort',
    body: 'You want the benefits of reflection, tracking, and personal insight, but not another complicated system to maintain.',
  },
]

const REVEAL_ORDER = [1, 0, 2, 3, 4]
const REVEAL_DELAY_MS = 135

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

export default function Problems() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasRevealed, setHasRevealed] = useState(prefersReducedMotion)

  useEffect(() => {
    if (hasRevealed) return

    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setHasRevealed(true)
        observer.disconnect()
      },
      {
        root: null,
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.22,
      },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [hasRevealed])

  return (
    <section
      ref={sectionRef}
      id="problems"
      className="relative px-6 py-24 sm:px-8 lg:px-[56px] lg:py-32 xl:px-[90px]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <div className="max-w-[850px]">
          <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-mint">
            The problem
          </p>
          <h2 className="text-[clamp(36px,5vw,78px)] font-black leading-[0.96] tracking-[-0.025em] text-white">
            Problems You Have
          </h2>
          <p className="mt-6 max-w-[760px] text-[clamp(16px,1.35vw,23px)] font-medium leading-[1.45] text-white/70">
            You want to understand your life better, but tracking it always
            feels harder than it should.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-6">
          {PROBLEMS.map((problem, index) => (
            <article
              key={problem.title}
              style={{
                transitionDelay: hasRevealed
                  ? `${REVEAL_ORDER.indexOf(index) * REVEAL_DELAY_MS}ms`
                  : '0ms',
              }}
              className={[
                'group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_64px_-54px_rgba(0,0,0,0.72)] transition-[opacity,transform,border-color,background-color] duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none hover:-translate-y-1 hover:border-mint/30 hover:bg-white/[0.052]',
                hasRevealed
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-6 scale-[0.96] opacity-0',
                index < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
              ].join(' ')}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-mint/25 bg-mint/10 text-[14px] font-black text-mint">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-[clamp(21px,1.55vw,30px)] font-extrabold leading-[1.08] tracking-[-0.015em] text-white">
                {problem.title}
              </h3>
              <p className="mt-4 text-[15px] font-medium leading-[1.6] text-white/62 sm:text-[16px]">
                {problem.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
