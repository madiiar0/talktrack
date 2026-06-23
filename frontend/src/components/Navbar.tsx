import { useEffect, useState } from 'react'
import AppStoreButton from './AppStoreButton'

const LINKS = [
  { label: 'Problems', href: '#problems' },
  { label: 'Key Features', href: '#features' },
  { label: 'How it works', href: '#commands' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Support', href: '/support' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-6">
      <nav
        className={[
          'relative flex w-full items-center justify-between border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? 'mt-3 max-w-[min(1180px,calc(100vw-28px))] rounded-full border-[var(--tt-accent-border)] bg-white/86 px-5 py-2 shadow-[var(--tt-nav-shadow)] backdrop-blur-xl lg:px-7'
            : 'mt-3 max-w-[1500px] rounded-full border-[var(--tt-accent-border)] bg-white/70 px-4 py-3 shadow-[var(--tt-shadow)] backdrop-blur-xl sm:px-5 lg:px-7',
        ].join(' ')}
      >
        {/* Logo */}
        <a
            href="#top"
            aria-label="TalkTrack home"
            className="relative z-10 flex shrink-0 flex-col items-start py-0.5 leading-none"
        >
          <span className="tt-logo-talk relative z-10 block text-[20px] font-black leading-none">
    Talk
  </span>

          <span
              className="tt-logo-track relative z-20 -mt-2.5 block text-[24px] font-bold italic leading-none"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
    Track
  </span>
        </a>

        {/* Center links — desktop */}
        <ul className="mx-4 hidden flex-1 items-center justify-center gap-7 xl:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="whitespace-nowrap text-[14px] font-semibold text-[color:var(--tt-ink)] transition-colors hover:text-[color:var(--tt-accent-strong)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: CTA + hamburger */}
        <div className="relative z-10 flex items-center gap-2.5">
          <AppStoreButton compact />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--tt-accent-border)] text-[color:var(--tt-ink-deep)] transition-colors hover:bg-[var(--tt-accent-50)] xl:hidden"
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={`absolute left-0 block h-[2px] w-full rounded bg-[var(--tt-ink-deep)] transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 rounded bg-[var(--tt-ink-deep)] transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-full rounded bg-[var(--tt-ink-deep)] transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu (CSS enter/exit, always mounted) */}
      <div
        aria-hidden={!open}
        style={{
          opacity: open ? 1 : 0,
          transform: open
            ? 'translate3d(-50%, 0, 0)'
            : 'translate3d(-50%, -8px, 0)',
          visibility: open ? 'visible' : 'hidden',
        }}
        className="absolute left-1/2 top-[82px] w-[calc(100%-24px)] max-w-[420px] rounded-3xl border border-[var(--tt-accent-border)] bg-white/92 p-2 shadow-[var(--tt-nav-shadow)] backdrop-blur-xl transition-[opacity,transform] duration-200 ease-out xl:hidden"
      >
        <ul className="flex flex-col">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block rounded-2xl px-4 py-3 text-[16px] font-semibold text-[color:var(--tt-ink)] transition-colors hover:bg-[var(--tt-accent-50)] hover:text-[color:var(--tt-accent-strong)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
