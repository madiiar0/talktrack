import { ArrowRight, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

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
        'transition-[opacity,transform] duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function WaitlistPill() {
  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#cfe8ef] bg-white/75 px-4 py-2 text-[13px] font-semibold text-[#101820]/68 backdrop-blur-sm sm:text-[14px]">
      <Users size={15} strokeWidth={2.4} aria-hidden="true" className="shrink-0 text-[#248eb1]" />
      47 people are already on the waitlist.
    </div>
  )
}

export default function FinalCTASection() {
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
        threshold: 0.18,
      },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="early-access"
      className="relative overflow-hidden bg-[#f7fbfc] px-6 py-20 text-[#071014] sm:px-8 lg:px-[56px] lg:py-28 xl:px-[90px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 bottom-0 h-52 rounded-full bg-[#5dc8ea]/12 blur-[100px]"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        <div className="overflow-hidden rounded-[34px] border border-[#cfe8ef]/90 bg-gradient-to-br from-white/90 via-[#fafdff]/90 to-[#dbf4f8]/50 px-6 py-14 text-center shadow-[0_24px_88px_-76px_rgba(52,116,138,0.48)] backdrop-blur-sm sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <Reveal isVisible={isVisible} delay={0}>
            <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.18em] text-[#248eb1]">
              GET EARLY ACCESS
            </p>
          </Reveal>

          <Reveal isVisible={isVisible} delay={100}>
            <h2
              className="mx-auto max-w-[980px] text-[clamp(42px,5.4vw,88px)] font-normal italic leading-[0.95] tracking-[-0.035em] text-[#050708]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Build a personal AI memory for your life.
            </h2>
          </Reveal>

          <Reveal isVisible={isVisible} delay={210} className="mt-8">
            <WaitlistPill />
          </Reveal>

          <Reveal isVisible={isVisible} delay={320} className="mt-7">
            <a
              href="/waitlist"
              className="inline-flex min-h-[56px] items-center justify-center rounded-full border border-[#050708]/80 bg-gradient-to-r from-[#5dc8ea] to-[#dbf4f8] px-9 text-[14px] font-bold uppercase tracking-[0.05em] text-[#050708] shadow-[0_18px_44px_-30px_rgba(38,114,143,0.55)] transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#5dc8ea] hover:shadow-[0_18px_42px_-30px_rgba(93,200,234,0.72)] active:translate-y-0 sm:min-h-[62px] sm:px-11 sm:text-[15px]"
            >
              JOIN EARLY ACCESS
              <ArrowRight size={17} strokeWidth={2.6} aria-hidden="true" className="ml-2" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
