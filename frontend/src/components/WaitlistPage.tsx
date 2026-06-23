import { ArrowLeft, Mail } from 'lucide-react'
import AppStoreButton from './AppStoreButton'

export default function WaitlistPage() {
  return (
    <div className="tt-page relative isolate min-h-screen overflow-x-hidden text-[color:var(--tt-ink)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-3 h-[42vh] rounded-[30px] bg-[linear-gradient(180deg,var(--tt-gradient-top),var(--tt-gradient-bottom))] opacity-90 sm:inset-x-6 sm:top-6 sm:rounded-[38px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[30vh] h-44 bg-[linear-gradient(180deg,rgba(238,244,250,0)_0%,var(--tt-bg)_100%)]"
      />
      <main className="relative z-10 flex min-h-screen px-6 py-8 sm:px-8 lg:px-[56px] xl:px-[90px]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col">
          <a
            href="/"
            className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--tt-accent-border)] bg-white/72 px-4 py-2 text-[14px] font-semibold text-[color:var(--tt-ink)] shadow-[var(--tt-shadow)] backdrop-blur-sm transition-colors hover:bg-[var(--tt-accent-50)] hover:text-[color:var(--tt-accent-strong)]"
          >
            <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" />
            Back to landing page
          </a>

          <div className="grid flex-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-[620px]">
              <p className="tt-eyebrow mb-4">
                APP STORE
              </p>
              <h1 className="text-[42px] font-extrabold leading-[1.02] text-[color:var(--tt-ink-deep)] sm:text-[58px] lg:text-[72px]">
                TalkTrack is preparing for App Store launch.
              </h1>
              <p className="mt-6 max-w-[580px] text-[16px] font-medium leading-[1.65] text-[color:var(--tt-muted)] sm:text-[18px]">
                Reflect by speaking for 2-3 minutes. TalkTrack turns your logs
                into visible trends, insights, and noticed patterns.
              </p>
            </div>

            <div className="tt-card-solid p-6 sm:p-8">
              <p className="tt-eyebrow">Coming soon on the App Store</p>
              <h2 className="mt-4 text-[32px] font-extrabold leading-[1.08] text-[color:var(--tt-ink-deep)] sm:text-[46px]">
                Download button reserved for launch.
              </h2>
              <p className="mt-4 text-[15px] font-medium leading-[1.65] text-[color:var(--tt-muted)]">
                The App Store link will be added after approval. Until then,
                this button is intentionally disabled and does not redirect.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <AppStoreButton className="w-full sm:w-auto" />
                <a
                  href="mailto:support@talktrack.life"
                  className="tt-secondary inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full px-7 text-[14px] font-bold uppercase transition-[background-color,transform] duration-200 sm:min-h-[62px]"
                >
                  <Mail size={17} strokeWidth={2.6} aria-hidden="true" />
                  Contact support
                </a>
              </div>

              <p className="mt-5 text-[13px] font-semibold leading-[1.6] text-[color:var(--tt-muted)]">
                TalkTrack helps with personal reflection and tracking. It is not
                therapy, medical advice, diagnosis, or emergency support.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
