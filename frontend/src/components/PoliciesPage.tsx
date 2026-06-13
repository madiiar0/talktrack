import PublicPageLayout, { PageLink } from './PublicPageLayout'

const POLICY_SECTIONS = [
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    body: [
      'TalkTrack is a productivity, reflection, and personal tracking app. We collect the information needed to provide daily check-ins, tracker management, logs, AI summaries, charts, trends, and account support.',
      'Your TalkTrack data can include account details, tracker names and settings, check-in answers, daily logs, mood or habit entries, productivity reflections, health-like self-tracking information you choose to enter, AI-generated summaries, and support requests.',
    ],
  },
  {
    id: 'terms',
    title: 'Terms of Use',
    body: [
      'By using TalkTrack, you agree to use it for lawful personal tracking, reflection, and productivity purposes. You are responsible for the information you submit and for deciding how to use any insights shown in the app.',
      'TalkTrack may change or improve features over time. We may update these terms when the product, infrastructure, or legal requirements change.',
    ],
  },
  {
    id: 'data-collection',
    title: 'Data Collection',
    body: [
      'We collect account identifiers such as email address and display name, authentication provider data, tracker configuration, check-in responses, daily logs, app usage metadata needed to operate the service, and messages or requests submitted through support forms.',
      'TalkTrack does not ask users to submit information they do not want tracked. Users control what trackers they create, pause, edit, or delete inside the product.',
    ],
  },
  {
    id: 'data-usage',
    title: 'Data Usage',
    body: [
      'We use your data to operate the app, save your tracking history, generate charts and summaries, provide AI-powered reflections, troubleshoot support issues, prevent abuse, and improve reliability.',
      'We do not use your personal logs to make medical, legal, financial, or professional decisions about you.',
    ],
  },
  {
    id: 'ai-processing',
    title: 'AI Processing Disclaimer',
    body: [
      'TalkTrack uses AI systems to extract structure from check-ins and explain patterns in your logged data. AI responses are generated for reflection and personal tracking only.',
      'AI output may be incomplete, inaccurate, or based on limited data. TalkTrack is not a medical device, therapist, legal advisor, financial advisor, or substitute for professional judgment.',
    ],
  },
  {
    id: 'user-content',
    title: 'User Generated Content and Daily Logs',
    body: [
      'Daily logs, tracker answers, notes, and messages you submit remain your user-generated content. You should not submit content that violates the law, infringes another person\'s rights, or includes information you are not authorized to share.',
      'TalkTrack turns conversations and check-ins into structured personal data so that you can review patterns, averages, charts, and changes over time.',
    ],
  },
  {
    id: 'account-data',
    title: 'Account Data',
    body: [
      'Account data is used to authenticate you, keep your information associated with your account, provide support, and keep the app functioning across sessions.',
      'If you contact support, we may use the contact information and message you provide to respond to your request.',
    ],
  },
  {
    id: 'data-export',
    title: 'Data Export',
    body: [
      'You can request a copy of your TalkTrack account and log data through the Data Export page. We may need to verify account ownership before preparing or sending an export.',
      'Data exports are not automatic from this public page. The page creates a request for review and processing.',
    ],
    links: [{ label: 'Request your data export', href: '/export-data' }],
  },
  {
    id: 'data-deletion',
    title: 'Data Deletion',
    body: [
      'You may contact TalkTrack to request deletion of account-related data. We may retain limited records when needed for security, legal, fraud-prevention, or operational reasons.',
      'Deletion requests may require account ownership verification before processing.',
    ],
  },
  {
    id: 'payments',
    title: 'Subscription and Payments',
    body: [
      'TalkTrack may add paid plans or subscriptions in the future. Payment terms will be provided before any paid plan is charged.',
      'Until payment features are implemented, this section is a placeholder and should be updated before launch of any paid offering.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Information',
    body: [
      'For privacy, support, data export, deletion, or product questions, contact TalkTrack through the public contact page.',
    ],
    links: [{ label: 'Contact TalkTrack', href: '/contact' }],
  },
]

export default function PoliciesPage() {
  return (
    <PublicPageLayout
      eyebrow="Policies"
      title="TalkTrack policies."
      description="Draft privacy, terms, data, and AI-processing information for TalkTrack users and App Store review."
    >
      <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
        <aside className="rounded-[28px] border border-[#B7E3F2]/80 bg-white/78 p-5 shadow-[0_24px_88px_-76px_rgba(52,116,138,0.48)] backdrop-blur-sm lg:sticky lg:top-24">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#147BA6]">
            Contents
          </p>
          <nav aria-label="Policy sections">
            <ol className="grid gap-2 text-[14px] font-semibold text-[#101820]/66">
              {POLICY_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-2xl px-3 py-2 transition-colors hover:bg-[#E7F6FB]/80 hover:text-[#147BA6]"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="rounded-[32px] border border-[#B7E3F2]/85 bg-white/82 p-6 shadow-[0_24px_88px_-76px_rgba(52,116,138,0.48)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="mb-8 rounded-[22px] border border-[#B7E3F2]/80 bg-[#E7F6FB]/55 p-5 text-[14px] font-medium leading-[1.65] text-[#101820]/68">
            <p>
              <span className="font-bold text-[#071014]">Last updated:</span>{' '}
              June 13, 2026
            </p>
            <p className="mt-2">
              These policies are written for TalkTrack, a personal AI life
              tracking and reflection app. For support, use{' '}
              <PageLink href="/contact">Contact TalkTrack</PageLink>. To request
              a data export, use{' '}
              <PageLink href="/export-data">Request your TalkTrack data</PageLink>.
            </p>
          </div>

          <div className="grid gap-9">
            {POLICY_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2
                  className="text-[clamp(30px,3vw,44px)] font-normal italic leading-[1] tracking-[-0.025em] text-[#050708]"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {section.title}
                </h2>
                <div className="mt-4 grid gap-4 text-[15px] font-medium leading-[1.75] text-[#101820]/70 sm:text-[16px]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.links ? (
                    <div className="pt-1">
                      {section.links.map((link) => (
                        <PageLink key={link.href} href={link.href}>
                          {link.label}
                        </PageLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </PublicPageLayout>
  )
}
