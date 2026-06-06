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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-6">
      <nav
        className={[
          'relative flex w-full items-center justify-between border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? 'mt-3 max-w-[min(1180px,calc(100vw-28px))] rounded-full border-[#9ccbd8]/45 bg-white/80 px-5 py-2 shadow-[0_18px_45px_-30px_rgba(35,96,118,0.5)] backdrop-blur-xl lg:px-7'
            : 'mt-0 max-w-[1500px] rounded-none border-transparent bg-[#f7fbfc]/92 px-2 py-5 shadow-none backdrop-blur-sm sm:px-4 lg:px-8',
        ].join(' ')}
      >
        {/* Logo */}
        <a
            href="#top"
            aria-label="TalkTrack home"
            className="relative z-10 flex shrink-0 flex-col items-start py-0.5 leading-none tracking-[-0.02em]"
        >
          {/* "Talk" - Kept at your original 20px size with a solid, vibrant blue/cyan gradient */}
          <span className="relative z-10 block bg-gradient-to-r from-[#2498C7] to-[#B7E3F2] bg-clip-text text-[20px] font-black leading-none text-transparent">
    Talk
  </span>

          {/* "Track" - Pulled upward using a negative top margin to overlap "Talk" from above */}
          <span
              className="relative z-20 -mt-2.5 block text-[24px] font-normal italic leading-none text-[#050708]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
    Track
  </span>
        </a>

        {/* Center links — desktop, absolutely centered */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-10">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="whitespace-nowrap text-[14px] font-medium tracking-[0.01em] text-[#050708]/80 transition-colors hover:text-[#147BA6]"
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
            className="inline-flex min-h-10 items-center justify-center rounded-[12px] border border-[#050708]/85 bg-gradient-to-r from-[#2498C7] to-[#147BA6] px-5 text-[12px] font-semibold tracking-[0.04em] text-white shadow-[0_12px_28px_-24px_rgba(31,112,145,0.7)] transition-[border-color,transform] duration-200 hover:scale-[1.03] hover:border-[#147BA6] sm:px-8 sm:text-[13px]"
          >
            I Need This
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#050708]/15 text-[#050708] transition-colors hover:border-[#2498C7]/70 hover:bg-[#E7F6FB]/50 lg:hidden"
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={`absolute left-0 block h-[2px] w-full rounded bg-[#050708] transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 rounded bg-[#050708] transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-full rounded bg-[#050708] transition-all duration-300 ${
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
        className="absolute left-1/2 top-[82px] w-[calc(100%-24px)] max-w-[420px] rounded-3xl border border-[#9ccbd8]/45 bg-white/90 p-2 shadow-[0_22px_60px_-34px_rgba(35,96,118,0.55)] backdrop-blur-xl transition-[opacity,transform] duration-200 ease-out lg:hidden"
      >
        <ul className="flex flex-col">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block rounded-2xl px-4 py-3 text-[16px] font-medium text-[#050708]/80 transition-colors hover:bg-[#E7F6FB]/65 hover:text-[#147BA6]"
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
