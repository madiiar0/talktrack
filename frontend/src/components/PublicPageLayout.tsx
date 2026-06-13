import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

function PublicLogo() {
  return (
    <a
      href="/"
      aria-label="TalkTrack home"
      className="relative z-10 flex shrink-0 flex-col items-start py-0.5 leading-none tracking-[-0.02em]"
    >
      <span className="relative z-10 block bg-gradient-to-r from-[#2498C7] to-[#B7E3F2] bg-clip-text text-[20px] font-black leading-none text-transparent">
        Talk
      </span>
      <span
        className="relative z-20 -mt-2.5 block text-[24px] font-normal italic leading-none text-[#050708]"
        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
      >
        Track
      </span>
    </a>
  )
}

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
      className="font-bold text-[#147BA6] underline decoration-[#B7E3F2] underline-offset-4 transition-colors hover:text-[#2498C7]"
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
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#f7fbfc] text-[#071014]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-3 h-[34vh] rounded-[30px] bg-[#dff4fb] bg-[url('/assets/hero_background.png')] bg-cover bg-center opacity-65 sm:inset-x-6 sm:top-6 sm:rounded-[38px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[25vh] h-56 bg-gradient-to-b from-transparent to-[#f7fbfc]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[34rem] h-[30rem] w-[30rem] rounded-full bg-[#E7F6FB]/70 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-20 h-[28rem] w-[28rem] rounded-full bg-[#B7E3F2]/35 blur-[140px]"
      />

      <header className="relative z-10 px-6 py-7 sm:px-8 lg:px-[56px] xl:px-[90px]">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between">
          <PublicLogo />
          <a
            href="/"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#B7E3F2]/80 bg-white/75 px-4 text-[13px] font-bold text-[#101820]/70 shadow-[0_12px_32px_-28px_rgba(35,96,118,0.34)] backdrop-blur-sm transition-colors hover:border-[#2498C7]/60 hover:text-[#147BA6]"
          >
            <ArrowLeft size={15} strokeWidth={2.5} aria-hidden="true" />
            Home
          </a>
        </div>
      </header>

      <main className="relative z-10 px-6 pb-20 pt-10 sm:px-8 lg:px-[56px] xl:px-[90px]">
        <div className="mx-auto w-full max-w-[1180px]">
          <section className="max-w-[820px]">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#147BA6]">
              {eyebrow}
            </p>
            <h1
              className="text-[clamp(46px,6vw,92px)] font-normal italic leading-[0.95] tracking-[-0.035em] text-[#050708]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {title}
            </h1>
            <p className="mt-6 max-w-[720px] text-[clamp(16px,1.25vw,20px)] font-medium leading-[1.65] text-[#101820]/70">
              {description}
            </p>
          </section>

          {children}
        </div>
      </main>
    </div>
  )
}
