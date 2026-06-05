import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Problems', href: '#problems' },
  { label: 'Key Features', href: '#features' },
  { label: 'What you can track', href: '#commands' },
  { label: 'FAQ', href: '#faq' },
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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <nav
        className={[
          'relative flex w-full items-center justify-between border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? 'mt-3 max-w-[min(1180px,calc(100%-28px))] rounded-full border-white/10 bg-[#161616]/85 px-5 py-2.5 shadow-[0_20px_50px_-22px_rgba(0,0,0,0.95)] backdrop-blur-xl lg:px-7'
            : 'mt-0 max-w-full rounded-none border-transparent border-b-white/15 bg-[#101010]/50 px-6 py-4 backdrop-blur-md lg:px-[100px]',
        ].join(' ')}
      >
        {/* Logo */}
        <a
          href="#top"
          aria-label="TalkTrack home"
          className="relative z-10 flex shrink-0 flex-col items-start leading-[0.42] tracking-[-0.01em]"
        >
          <span className="block text-[20px] font-black text-white">Talk</span>
          <span className="-mt-[2px] block text-[20px] font-black text-mint">
            Track
          </span>
        </a>

        {/* Center links — desktop, absolutely centered */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-10">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="whitespace-nowrap text-[14px] font-semibold text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: CTA + hamburger */}
        <div className="relative z-10 flex items-center gap-2.5">
          <a
            href="/waitlist"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-mint to-mint-light px-4 py-2 text-[12px] font-extrabold text-black shadow-[0_0_18px_-10px_rgba(36,255,174,0.5)] transition-transform duration-200 hover:scale-[1.04] sm:px-5 sm:text-[13px]"
          >
            I need this!
            <ArrowRight size={14} strokeWidth={2.8} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/5 lg:hidden"
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={`absolute left-0 block h-[2px] w-full rounded bg-white transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 rounded bg-white transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-full rounded bg-white transition-all duration-300 ${
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
        className={`absolute left-1/2 top-[74px] w-[calc(100%-24px)] max-w-[420px] -translate-x-1/2 rounded-3xl border border-white/10 bg-[#141414]/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 ease-out lg:hidden ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <ul className="flex flex-col">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block rounded-2xl px-4 py-3 text-[16px] font-semibold text-white/85 transition-colors hover:bg-white/5 hover:text-white"
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
