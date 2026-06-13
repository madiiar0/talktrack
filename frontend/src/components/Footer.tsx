import { ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Problems', href: '#problems' },
  { label: 'Key Features', href: '#features' },
  { label: 'What you can track', href: '#commands' },
  { label: 'FAQ', href: '#faq' },
]

const UTILITY_LINKS = [
  { label: 'Policies', href: '/policies' },
  { label: 'Contact', href: '/contact' },
  { label: 'Export Data', href: '/export-data' },
]

function FooterLogo() {
  return (
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
  )
}

function FooterLinkList({
  title,
  links,
}: {
  title: string
  links: Array<{ label: string; href: string }>
}) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#147BA6]">
        {title}
      </p>
      <ul className="grid gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#101820]/62 transition-colors hover:text-[#147BA6]"
            >
              {link.label}
              <ArrowRight
                size={13}
                strokeWidth={2.5}
                aria-hidden="true"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-[#f7fbfc] px-6 pb-10 pt-8 text-[#071014] sm:px-8 lg:px-[56px] xl:px-[90px]">
      <div className="relative z-10 mx-auto w-full max-w-[1500px] border-t border-[#B7E3F2]/80 pt-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="max-w-[440px]">
            <FooterLogo />
            <p className="mt-5 text-[14px] font-medium leading-[1.65] text-[#101820]/60 sm:text-[15px]">
              A personal AI agent that turns conversations into structured life
              data, charts, summaries, and insights.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:justify-self-end md:gap-16">
            <FooterLinkList title="Navigate" links={NAV_LINKS} />
            <FooterLinkList title="Legal" links={UTILITY_LINKS} />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#B7E3F2]/80 pt-6 text-[13px] font-medium text-[#101820]/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 TalkTrack. All rights reserved.</p>
          <p>Built for private personal tracking.</p>
        </div>
      </div>
    </footer>
  )
}
