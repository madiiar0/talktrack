import { ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Problems', href: '#problems' },
  { label: 'Key Features', href: '#features' },
  { label: 'What you can track', href: '#commands' },
  { label: 'FAQ', href: '#faq' },
]

const UTILITY_LINKS = [
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
  { label: 'Contact', href: 'mailto:madiyaraskar5@gmail.com' },
]

function FooterLogo() {
  return (
    <a
      href="#top"
      aria-label="TalkTrack home"
      className="inline-flex flex-col items-start leading-[0.42] tracking-[-0.01em]"
    >
      <span className="block text-[22px] font-black text-white">Talk</span>
      <span className="-mt-[2px] block text-[22px] font-black text-mint">
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
      <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/45">
        {title}
      </p>
      <ul className="grid gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/70 transition-colors hover:text-white"
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
    <footer className="relative px-6 pb-10 pt-8 sm:px-8 lg:px-[56px] xl:px-[90px]">
      <div className="relative z-10 mx-auto w-full max-w-[1320px] border-t border-white/10 pt-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="max-w-[440px]">
            <FooterLogo />
            <p className="mt-5 text-[14px] font-medium leading-[1.65] text-white/60 sm:text-[15px]">
              A personal AI agent that turns conversations into structured life
              data, charts, summaries, and insights.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:justify-self-end md:gap-16">
            <FooterLinkList title="Navigate" links={NAV_LINKS} />
            <FooterLinkList title="Legal" links={UTILITY_LINKS} />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] font-medium text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 TalkTrack. All rights reserved.</p>
          <p>Built for private personal tracking.</p>
        </div>
      </div>
    </footer>
  )
}
