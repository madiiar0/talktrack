import { useEffect, useRef, useState } from 'react'

const PROBLEMS = [
  {
    title: 'Your history is scattered',
    body: 'Mood apps, habit trackers, sleep logs, notes, and memories all live in different places, so no one system understands the whole picture.',
  },
  {
    title: 'Journals do not become data',
    body: 'Writing can help, but most entries stay as plain text. You cannot easily ask them for trends, averages, charts, or changes over time.',
  },
  {
    title: 'Manual tracking breaks',
    body: 'Spreadsheets and rigid forms require too much maintenance. The moment life gets busy, the system stops being useful.',
  },
  {
    title: 'Generic AI lacks memory',
    body: 'Most AI tools can answer a prompt, but they do not know what happened in your life yesterday, last week, or last month.',
  },
  {
    title: 'You cannot query your life',
    body: 'You should be able to ask how your sleep, anxiety, mood, focus, and habits changed without building another personal database yourself.',
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
      className="relative overflow-hidden bg-[#fff] px-6 py-20 text-[#071014] sm:px-8 lg:px-[56px] lg:py-28 xl:px-[90px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-[#dbf4f8]/55 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[#5dc8ea]/20 blur-[150px]"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#248eb1]">
            THE PROBLEM
          </p>
          <h2
            className="text-[clamp(42px,5.2vw,86px)] font-normal italic leading-[0.95] tracking-[-0.035em] text-[#050708]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Your life is hard to track manually.
          </h2>
          <p className="mx-auto mt-6 max-w-[760px] text-[clamp(16px,1.18vw,20px)] font-medium leading-[1.6] text-[#101820]/70">
            You want useful patterns and answers, but the current tools force
            you to maintain the data by hand.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-6 xl:gap-5">
          {PROBLEMS.map((problem, index) => (
            <article
              key={problem.title}
              style={{
                transitionDelay: hasRevealed
                  ? `${REVEAL_ORDER.indexOf(index) * REVEAL_DELAY_MS}ms`
                  : '0ms',
              }}
              className={[
                'group relative overflow-hidden rounded-[24px] border border-[#cfe8ef]/80 bg-white/75 p-6 shadow-[0_20px_70px_-62px_rgba(52,116,138,0.42)] backdrop-blur-sm transition-[opacity,transform,border-color,background-color,box-shadow] duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none hover:-translate-y-1 hover:border-[#5dc8ea]/60 hover:bg-[#fafdff] hover:shadow-[0_24px_82px_-64px_rgba(93,200,234,0.42)]',
                hasRevealed
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-6 scale-[0.96] opacity-0',
                index < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
              ].join(' ')}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5dc8ea]/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-7 flex items-center justify-between gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#5dc8ea]/35 bg-[#dbf4f8]/70 text-[13px] font-bold text-[#248eb1] transition-colors duration-300 group-hover:border-[#5dc8ea]/70 group-hover:bg-[#dbf4f8]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-[clamp(21px,1.5vw,28px)] font-semibold leading-[1.13] tracking-[-0.018em] text-[#071014]">
                {problem.title}
              </h3>
              <p className="mt-4 text-[15px] font-medium leading-[1.68] text-[#101820]/65 sm:text-[16px]">
                {problem.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
