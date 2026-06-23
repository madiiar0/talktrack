import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import AppStoreButton from './AppStoreButton'

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

function LaunchPill() {
  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--tt-accent-border)] bg-white/75 px-4 py-2 text-[13px] font-semibold text-[color:var(--tt-ink)] backdrop-blur-sm sm:text-[14px]">
      Coming soon on the App Store
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
      className="tt-section relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        <div className="tt-soft-panel overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <Reveal isVisible={isVisible} delay={0}>
            <p className="tt-eyebrow mb-5">
              APP STORE LAUNCH
            </p>
          </Reveal>

          <Reveal isVisible={isVisible} delay={100}>
            <h2 className="tt-section-title mx-auto max-w-[900px]">
              Start building a calmer record of your days.
            </h2>
          </Reveal>

          <Reveal isVisible={isVisible} delay={210} className="mt-8">
            <LaunchPill />
          </Reveal>

          <Reveal isVisible={isVisible} delay={320} className="mt-7">
            <AppStoreButton />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
