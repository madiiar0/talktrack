import { Mail } from 'lucide-react'
import { useEffect } from 'react'
import PublicPageLayout, { PageLink } from './PublicPageLayout'

const SUPPORT_EMAIL = 'support@talktrack.life'
const MAILTO = `mailto:${SUPPORT_EMAIL}`

const HELP_SECTIONS = [
  {
    title: 'Account login',
    text: 'Use the email/password, Google, or Apple sign-in method you used for your account. Email/password accounts may need email verification before profile sync.',
  },
  {
    title: 'Delete account',
    text: 'In the app, open Account and choose Delete account. The app asks you to type DELETE before removing app-owned backend data and signing you out.',
  },
  {
    title: 'Subscription and restore',
    text: 'Use Restore Purchases in the app if you already subscribed through Apple. Prices, trials, and plans are shown by the App Store for your region.',
  },
  {
    title: 'Cancel subscription',
    text: 'Manage or cancel subscriptions in Apple ID / App Store subscription settings. Deleting TalkTrack or deleting your account does not cancel an Apple subscription.',
  },
  {
    title: 'Data and privacy requests',
    text: 'For privacy, deletion, or data access questions, email support@talktrack.life from the email address connected to your account. For a full data export, use the data request page.',
  },
  {
    title: 'AI and wellness',
    text: 'TalkTrack helps with personal reflection and life tracking. It is not medical advice, mental health treatment, therapy, diagnosis, or crisis support. If you are in danger or crisis, contact local emergency services or qualified professional support.',
  },
]

export default function ContactPage() {
  useEffect(() => {
    document.title = 'TalkTrack Support'
  }, [])

  return (
    <PublicPageLayout
      eyebrow="Support"
      title="Contact support."
      description="Help and contact information for TalkTrack: AI Life Journal, a personal reflection and life-tracking app."
    >
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="tt-card-solid p-6 sm:p-8">
          <div className="tt-icon-bubble mb-5">
            <Mail size={24} strokeWidth={2.4} aria-hidden="true" />
          </div>
          <p className="tt-eyebrow">
            TalkTrack: AI Life Journal
          </p>
          <h2 className="mt-4 text-[32px] font-extrabold leading-[1.08] text-[color:var(--tt-ink-deep)] sm:text-[42px]">
            Contact support.
          </h2>
          <div className="mt-5 grid gap-4 text-[15px] font-medium leading-[1.7] text-[color:var(--tt-muted)]">
            <p>
              For support, account, subscription, privacy, or data requests,
              contact us at{' '}
              <a
                href={MAILTO}
                className="tt-link font-bold underline underline-offset-4 transition-colors"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
            <p>
              For a copy of your data, use the{' '}
              <PageLink href="/export-data">data request page</PageLink>.
            </p>
            <p>
              Read the <PageLink href="/privacy">Privacy Policy</PageLink> and{' '}
              <PageLink href="/terms">Terms of Service</PageLink>.
            </p>
          </div>

          <a
            href={MAILTO}
            className="tt-primary mt-7 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full px-6 text-[14px] font-bold uppercase transition-[transform,box-shadow,opacity] duration-200"
          >
            <Mail size={17} strokeWidth={2.6} aria-hidden="true" />
            Email support
          </a>

          <div className="mt-7 rounded-[20px] border border-[var(--tt-accent-border)] bg-[var(--tt-accent-50)] p-4 text-[14px] font-bold leading-[1.55] text-[color:var(--tt-accent-deep)]">
            Deleting your TalkTrack account does not cancel your Apple
            subscription. Manage or cancel subscriptions in Apple ID settings.
          </div>
        </div>

        <div className="tt-card-solid p-5 sm:p-6">
          <p className="tt-eyebrow mb-4">Common help</p>
          <div className="grid gap-4">
            {HELP_SECTIONS.map((section) => (
              <section
                key={section.title}
                className="rounded-[18px] border border-[var(--tt-accent-border)] bg-white/70 p-4"
              >
                <h3 className="text-[15px] font-bold text-[color:var(--tt-ink-deep)]">
                  {section.title}
                </h3>
                <p className="mt-2 text-[14px] font-medium leading-[1.65] text-[color:var(--tt-muted)]">
                  {section.text}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </PublicPageLayout>
  )
}
