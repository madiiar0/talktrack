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
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-[13px] font-bold text-white/70 backdrop-blur-md sm:text-[14px]">
      <Users size={15} strokeWidth={2.4} aria-hidden="true" className="shrink-0 text-mint" />
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
      className="relative px-6 py-28 sm:px-8 lg:px-[56px] lg:py-36 xl:px-[90px]"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center text-center">
        <Reveal isVisible={isVisible} delay={0}>
          <p className="mb-5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-mint">
            GET EARLY ACCESS
          </p>
        </Reveal>

        <Reveal isVisible={isVisible} delay={100}>
          <h2 className="mx-auto max-w-[980px] text-[clamp(38px,5.4vw,86px)] font-black leading-[0.98] tracking-[-0.03em] text-white">
            Start understanding yourself in{' '}
            <span className="bg-gradient-to-r from-mint to-mint-light bg-clip-text text-transparent">
              2 minutes
            </span>{' '}
            a day.
          </h2>
        </Reveal>

        <Reveal isVisible={isVisible} delay={210} className="mt-8">
          <WaitlistPill />
        </Reveal>

        <Reveal isVisible={isVisible} delay={320} className="mt-7">
          <a
            href="/waitlist"
            className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-gradient-to-r from-mint to-mint-light px-9 text-[14px] font-black uppercase tracking-[0.05em] text-black shadow-[0_14px_42px_-20px_rgba(36,255,174,0.55)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_54px_-22px_rgba(36,255,174,0.68)] active:translate-y-0 sm:min-h-[62px] sm:px-11 sm:text-[15px]"
          >
            GET EARLY ACCESS
            <ArrowRight size={17} strokeWidth={2.6} aria-hidden="true" className="ml-2" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
