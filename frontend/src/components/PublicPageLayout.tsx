import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

function PublicLogo() {
  return (
    <a
      href="/"
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
  )
}

const PUBLIC_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Support', href: '/support' },
]

export function PageLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className="tt-link font-bold underline underline-offset-4 transition-colors"
    >
      {children}
    </a>
  )
}

export default function PublicPageLayout({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="tt-page relative isolate min-h-screen overflow-x-hidden text-[color:var(--tt-ink)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-3 h-[34vh] min-h-[300px] overflow-hidden rounded-[30px] bg-white/70 sm:inset-x-6 sm:top-6 sm:min-h-[330px] sm:rounded-[38px]"
      >
        <img
          src="/assets/hero_background.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[25vh] h-64 bg-[linear-gradient(180deg,rgba(238,244,250,0)_0%,var(--tt-bg)_88%)]"
      />

      <header className="relative z-10 px-6 py-7 sm:px-8 lg:px-[56px] xl:px-[90px]">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between">
          <PublicLogo />
          <div className="flex items-center gap-2">
            <nav
              aria-label="Legal pages"
              className="hidden items-center gap-3 rounded-full border border-[var(--tt-accent-border)] bg-white/60 px-4 py-2 text-[12px] font-bold text-[color:var(--tt-muted)] shadow-[var(--tt-shadow)] backdrop-blur-sm md:flex"
            >
              {PUBLIC_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-[color:var(--tt-accent-strong)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="/"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[var(--tt-accent-border)] bg-white/75 px-4 text-[13px] font-bold text-[color:var(--tt-ink)] shadow-[var(--tt-shadow)] backdrop-blur-sm transition-colors hover:bg-[var(--tt-accent-50)] hover:text-[color:var(--tt-accent-strong)]"
            >
              <ArrowLeft size={15} strokeWidth={2.5} aria-hidden="true" />
              Home
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-6 pb-20 pt-10 sm:px-8 lg:px-[56px] xl:px-[90px]">
        <div className="mx-auto w-full max-w-[1180px]">
          <section className="max-w-[820px]">
            <p className="tt-eyebrow mb-4">
              {eyebrow}
            </p>
            <h1 className="max-w-[900px] text-[42px] font-extrabold leading-[1.02] text-[color:var(--tt-ink-deep)] sm:text-[58px] lg:text-[72px]">
              {title}
            </h1>
            <p className="mt-6 max-w-[720px] text-[16px] font-medium leading-[1.65] text-[color:var(--tt-muted)] sm:text-[18px]">
              {description}
            </p>
          </section>

          {children}
        </div>
      </main>
    </div>
  )
}
