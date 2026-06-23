import { Mail, ShieldCheck } from 'lucide-react'
import { useEffect } from 'react'
import PublicPageLayout, { PageLink } from './PublicPageLayout'

const SUPPORT_EMAIL = 'support@talktrack.life'
const DATA_REQUEST_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=Data%20Request`

export default function ExportDataPage() {
  useEffect(() => {
    document.title = 'TalkTrack Data Request'
  }, [])

  return (
    <PublicPageLayout
      eyebrow="Data Request"
      title="Request your data."
      description="Request a copy of your TalkTrack account and log data by email. We may verify account ownership before sending anything."
    >
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="tt-card-solid p-6 sm:p-8">
          <div className="tt-icon-bubble mb-5">
            <Mail size={24} strokeWidth={2.4} aria-hidden="true" />
          </div>
          <h2 className="text-[32px] font-extrabold leading-[1.08] text-[color:var(--tt-ink-deep)] sm:text-[42px]">
            Request your data.
          </h2>
          <div className="mt-5 grid gap-4 text-[15px] font-medium leading-[1.7] text-[color:var(--tt-muted)]">
            <p>
              To request a copy of your TalkTrack data, email{' '}
              <a
                href={DATA_REQUEST_MAILTO}
                className="tt-link font-bold underline underline-offset-4 transition-colors"
              >
                {SUPPORT_EMAIL}
              </a>{' '}
              from the email address connected to your TalkTrack account. Please
              include "Data Request" in the subject line.
            </p>
            <p>
              For privacy, deletion, or data access requests, email{' '}
              {SUPPORT_EMAIL} from the email address connected to your TalkTrack
              account.
            </p>
          </div>

          <a
            href={DATA_REQUEST_MAILTO}
            className="tt-primary mt-7 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full px-6 text-[14px] font-bold uppercase transition-[transform,box-shadow,opacity] duration-200"
          >
            <Mail size={17} strokeWidth={2.6} aria-hidden="true" />
            Email support
          </a>
        </div>

        <aside className="tt-card-solid p-6">
          <div className="tt-icon-bubble mb-5">
            <ShieldCheck size={24} strokeWidth={2.4} aria-hidden="true" />
          </div>
          <p className="tt-eyebrow">What happens next</p>
          <div className="mt-5 grid gap-4 text-[15px] font-medium leading-[1.7] text-[color:var(--tt-muted)]">
            <p>
              We will review your request and may need to verify account
              ownership before preparing or sending an export.
            </p>
            <p>
              Emailing from your account address helps us confirm the request is
              really yours.
            </p>
            <p>
              For broader privacy details, read the{' '}
              <PageLink href="/privacy">Privacy Policy</PageLink>. For other
              questions, see <PageLink href="/support">Support</PageLink>.
            </p>
          </div>
        </aside>
      </div>
    </PublicPageLayout>
  )
}
