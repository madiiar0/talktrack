import { useEffect } from 'react'
import PublicPageLayout, { PageLink } from './PublicPageLayout'

type PolicyLink = {
  label: string
  href: string
}

type PolicySubsection = {
  heading: string
  body?: string[]
  bullets?: string[]
  links?: PolicyLink[]
}

type PolicySection = {
  id: string
  title: string
  intro?: string[]
  subsections: PolicySubsection[]
}

const EFFECTIVE_DATE = 'July 1, 2026'
const SUPPORT_EMAIL = 'support@talktrack.life'

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    intro: [
      'TalkTrack is a personal reflection, check-in, tracking, and analytics app. It helps users turn daily check-ins, trackers, logs, and AI conversations into structured personal data, summaries, charts, and reflection prompts.',
      'TalkTrack is not a medical app, healthcare provider, therapy service, diagnosis tool, or emergency service. You choose what to track and what to write.',
    ],
    subsections: [
      {
        heading: 'Data we collect',
        bullets: [
          'Account and authentication data, such as Firebase user ID, email address, display name, profile photo URL when provided by your sign-in provider, authentication provider, email verification status, onboarding status, subscription status, and last login time.',
          'Onboarding and preference data, such as what you want to understand better, what feels hardest right now, preferred check-in method, reminder preference, reminder time, notification permission status, and feature-card progress.',
          'Tracker data, such as tracker names, questions, descriptions, types, units, options, scale or number settings, active or archived status, sort order, and whether a tracker was created by the system, you, or an AI proposal you confirmed.',
          'Check-in and daily log data, such as date, timezone, raw check-in text, cleaned summaries, tracker answers, display values, answer source, AI confidence, draft check-in sessions, reflection answers, completed dates, streaks, XP, levels, and chart-ready derived values.',
          'Main AI data, such as chat prompts, assistant responses, chat titles and previews, message history, sections, AI usage events, pending or resolved tracker action proposals, and backend-validated visual blocks such as stat cards and charts.',
          'Voice dictation data when you choose to use it. The iOS app uses microphone and speech recognition APIs to turn speech into editable text. TalkTrack sends or stores the resulting text only if you submit or save it in a check-in, reflection, or AI chat.',
          'Notification and widget data, such as local reminder settings stored on your device and a small widget cache with tracker names, tracker types, recent dates, numeric or yes/no values, streak counts, and check-in counts.',
          'Website and support request data, such as waitlist name/contact/payment preference/suggestions submitted on the website before launch, and the name, email address, and message content of any email you send to support@talktrack.life for support, privacy, deletion, or data export requests.',
          'Technical metadata needed to operate the service, such as request timestamps, server logs, rate-limit state, Firebase authentication metadata, app store or subscription status metadata, and provider diagnostics.',
        ],
      },
      {
        heading: 'Health-related information you choose to record',
        body: [
          'TalkTrack is not a medical app and has no Apple Health or HealthKit integration. It never reads data from Apple Health, HealthKit, wearables, or any device health sensors.',
          'You may choose to record health-related information yourself through trackers and check-ins — for example mood, anxiety, depression, stress, sleep, and self-reported activity such as steps. This information is self-reported: you type or dictate it, and it is stored as part of the tracker and check-in data described above. TalkTrack does not collect it automatically from your phone or any health data source.',
          'Because you decide what to record, you control whether any health-related information is entered at all.',
        ],
      },
      {
        heading: 'Sensitive information in free-form entries',
        body: [
          'Check-ins, reflections, and journal-style entries are free-form, so you may choose to write content that could include sensitive categories — for example health details, religious or philosophical beliefs, race or ethnicity, sexual orientation, or similar information.',
          'TalkTrack does not ask for or require any of these categories. Any such content is provided entirely by you and is stored and processed under this Privacy Policy like your other entry content. Because free-form entries can be sent to our AI service providers when you use AI features, we advise you not to enter sensitive information you do not want processed by AI.',
        ],
      },
      {
        heading: 'How we use data',
        bullets: [
          'Authenticate users, sync profiles, and keep account data associated with the correct Firebase user.',
          'Save trackers, check-in drafts, daily logs, AI chat history, chart data, gamification state derived from logs, and account preferences.',
          'Generate AI-assisted check-in extraction, optional reflection questions, Main AI answers, summaries, action proposals, and charts grounded in your own TalkTrack data.',
          'Enforce AI prompt limits, AI usage limits, rate limits, abuse controls, account deletion rules, and security checks.',
          'Respond to support, contact, data export, privacy, and account requests.',
          'Manage subscription status, restore purchases, and premium feature entitlements.',
          'Operate, debug, secure, and improve reliability of the app and website.',
        ],
      },
      {
        heading: 'AI Processing and Third-Party AI Services',
        body: [
          'TalkTrack uses third-party AI services to power features such as check-in extraction, reflection questions, summaries, tracker extraction, insights, and Main AI chat responses. These features send personal data to a third-party AI service, so TalkTrack asks for your permission in the app before sending that data. The first time you use a feature that requires AI processing, TalkTrack shows an AI Processing Permission screen that explains what is sent and where it goes. If you do not give permission, AI features that require third-party AI processing will not run and will not send your data.',
          'When you use these AI features and give permission, TalkTrack sends the relevant inputs from its backend to the Google Gemini API (paid tier) for processing. Depending on the feature, this content can include your raw check-in or reflection text, voice transcripts you have saved into an entry, your active tracker schema and tracker answers, tags, Main AI chat messages, recent completed logs, computed analytics, recent chat context, and pending tracker proposals — the related entry context needed to generate the response.',
          'TalkTrack uses the paid Google Gemini API tier. Under the terms that apply to the paid Gemini API, the content TalkTrack sends is not used to train or improve Google AI models; Google processes it only to generate a response for TalkTrack.',
          'Gemini responses are validated, sanitized, and constrained by the backend before the app uses them. Main AI chat does not silently write trackers, logs, reminders, account data, or settings. Tracker changes are written only after you confirm a proposal.',
          'AI outputs can be wrong, incomplete, or based on limited data. You should not enter emergency information or highly sensitive information you do not want processed by TalkTrack and its AI service providers.',
        ],
      },
      {
        heading: 'Sharing, sale, and advertising',
        body: [
          'TalkTrack shares data with service providers only as needed to run authentication, backend storage, AI processing, subscriptions, support requests, hosting, security, and app platform features.',
          'Every third party TalkTrack shares data with — including Google (Gemini / Google AI), Firebase/Google, Apple, RevenueCat, MongoDB hosting, and Vercel — is contractually required to protect that data to a standard at least equivalent to this Privacy Policy and to the requirements Apple sets for apps. Each may use the data only to provide its services to TalkTrack, and may not use it for its own purposes.',
          'TalkTrack does not sell personal data. The current app behavior does not include third-party advertising tracking.',
        ],
      },
      {
        heading: 'Voice, notifications, and widgets',
        body: [
          'Voice input is optional. Audio is handled through Apple iOS microphone and speech recognition APIs; TalkTrack does not send raw microphone audio to the TalkTrack backend. The transcript is editable before you save or send it.',
          'Daily reminders are local device notifications. TalkTrack does not currently use backend push notifications. You can turn reminders off in the app or iOS settings.',
          'Widgets use a local App Group cache so the widget can show lightweight summaries. The widget cache is designed not to include raw check-in text, cleaned summaries, reflection text, Main AI chat content, Firebase tokens, or your email address.',
        ],
      },
      {
        heading: 'Subscriptions and payments',
        body: [
          'If you buy a TalkTrack subscription, purchases are processed by Apple App Store / StoreKit and charged through your Apple ID. RevenueCat helps TalkTrack manage subscription status, offerings, purchases, restores, and the premium entitlement. TalkTrack does not store your full payment card details.',
          'Prices, currencies, renewal periods, and any free-trial details are shown in the app from App Store and RevenueCat product metadata and may vary by region or currency.',
          'Deleting your TalkTrack account does not cancel an Apple subscription. You must manage or cancel subscriptions through Apple ID / App Store subscription settings.',
        ],
      },
      {
        heading: 'Service providers',
        bullets: [
          'Firebase Auth and Firebase Admin SDK for authentication and verified identity.',
          'Google Sign-In for Google OAuth sign-in.',
          'Sign in with Apple for Apple account authentication.',
          'MongoDB or MongoDB-compatible hosting for backend data storage.',
          'Google Gemini API (paid tier) for AI extraction, reflection questions, and Main AI responses.',
          'Apple iOS services, including microphone/speech recognition APIs, UserNotifications, StoreKit, and App Store subscription management.',
          'RevenueCat for subscription entitlement, offering, purchase, restore, and status management.',
          'Vercel for hosting the landing website or serverless website API routes, if deployed there.',
          'Firebase/Google, Apple, RevenueCat, Vercel, MongoDB, and similar infrastructure providers may process limited device, app, request, or diagnostic metadata needed to operate, secure, bill, or troubleshoot their services. The current app code does not include custom analytics event logging or a separate crash-reporting SDK.',
        ],
      },
      {
        heading: 'Storage and security',
        body: [
          'TalkTrack stores app data in MongoDB-backed backend collections and uses Firebase Auth for credentials and sessions. The iOS app fetches Firebase ID tokens for authenticated requests and does not intentionally persist raw ID tokens.',
          'The backend scopes data access to the verified Firebase user, validates inputs, applies prompt and body length limits, and requires HTTPS backend URLs for release iOS builds. These are practical safeguards, not a guarantee that any system is perfectly secure.',
        ],
      },
      {
        heading: 'Retention, deletion, and export',
        body: [
          'We keep account and app data while your account is active or as needed to provide the service. Some operational data, such as Main AI usage events, is short-lived and bounded by backend retention rules.',
          'In the app, account deletion removes the user profile, trackers, daily logs, check-in sessions, Main AI chats, and Main AI messages from the app backend. TalkTrack may keep a minimal deletion tombstone, currently Firebase UID and deletion timestamp, to prevent accidental account resurrection. Some temporary usage records, support requests, export requests, or records needed for security, legal, fraud-prevention, or operational reasons may remain for a limited period.',
          'Account deletion signs you out and resets local app state, but it does not cancel App Store subscriptions. Cancel subscriptions separately in Apple ID settings.',
          'To request a data export, email support@talktrack.life from the email address connected to your account, with "Data Request" in the subject. We may need to verify account ownership before preparing or sending an export, and we do not automatically send sensitive account data.',
        ],
        links: [{ label: 'Request your data export', href: '/export-data' }],
      },
      {
        heading: 'Your choices',
        bullets: [
          'You can edit your display name, trackers, daily logs, and check-in content in the app where those features are available.',
          'You can pause or archive trackers; archived trackers may remain available for historical log readability until account deletion.',
          'You can turn local reminders off in the app or iOS settings.',
          'You can choose not to use voice dictation or AI features, and you can decline AI processing permission when TalkTrack asks. Declining means features that require third-party AI processing will not send your data.',
          'You can withdraw consent for AI processing by choosing not to use AI features going forward, and you can email TalkTrack with questions about your AI processing consent. Requests that need third-party AI processing run only after you have granted permission.',
          'You can request a data export through the export page and contact TalkTrack for privacy or support questions.',
          'You can delete your TalkTrack account from the app Account tab.',
        ],
      },
      {
        heading: 'Children and international processing',
        body: [
          'TalkTrack is not directed to children under 13. If you are under the age required to use online services in your location, use TalkTrack only with permission from a parent or legal guardian.',
          'Your information may be processed in countries where TalkTrack and its service providers operate. Privacy and data protection rules may differ from those in your location.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          `For privacy, support, export, deletion, or account questions, email ${SUPPORT_EMAIL}. You can also use the support page.`,
        ],
        links: [{ label: 'Contact TalkTrack', href: '/support' }],
      },
    ],
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    intro: [
      'These Terms govern your use of TalkTrack. By creating an account, using the app, submitting a support request, or using the website, you agree to these Terms.',
    ],
    subsections: [
      {
        heading: 'Eligibility and account responsibility',
        bullets: [
          'You must be at least 13 years old, or the minimum age required in your jurisdiction, to use TalkTrack. If you are under the age of majority, you must have permission from a parent or legal guardian.',
          'You are responsible for the accuracy of information you submit and for keeping access to your account secure.',
          'Firebase Auth and supported sign-in providers handle credentials. TalkTrack may refuse or terminate access if an account is used in a way that violates these Terms or harms the service.',
        ],
      },
      {
        heading: 'Subscriptions, trials, billing, and refunds',
        body: [
          'TalkTrack may offer free features, free trials, and paid subscriptions. Exact pricing, trial duration, renewal period, and included features will be shown in the app or App Store purchase sheet before you confirm a purchase.',
          'Purchases are processed through Apple App Store / StoreKit and charged through your Apple ID. RevenueCat helps TalkTrack read and manage subscription status and entitlements. TalkTrack does not process or store full card numbers.',
          'Subscriptions renew automatically unless canceled through your Apple ID subscription settings. If a free trial is shown for your selected App Store product, it converts to a paid subscription unless you cancel before the trial ends.',
          'Prices shown in the app come from App Store and RevenueCat product metadata and may vary by region or currency. Restore Purchases is available in the app.',
          'Deleting the app or deleting your TalkTrack account does not automatically cancel an App Store subscription.',
          'Refund requests and billing disputes for App Store purchases are handled by Apple, subject to Apple policies.',
        ],
      },
      {
        heading: 'AI limits and prompt limits',
        body: [
          'Main AI chat queries are subject to server-enforced usage limits. Current trial-level limits are 20 Main AI chat queries per rolling 24 hours and 100 per rolling 7 days. The paid-plan seam currently maps active subscriptions to 30 per rolling 24 hours and 100 per rolling 7 days. These numbers may change as the product and subscription offering changes.',
          'The Main AI prompt length limit is 300 words, with a 4000-character safety backstop. Over-limit prompts are rejected before they are sent to the AI provider and before usage is reserved.',
          'These limits apply to Main AI chat. Normal check-ins, tracker CRUD, logs, widgets, local notifications, and charts from existing data are not Main AI chat queries.',
        ],
      },
      {
        heading: 'Acceptable use',
        bullets: [
          'Do not use TalkTrack for unlawful, abusive, harassing, deceptive, or harmful activity.',
          'Do not submit content you do not have the right to share.',
          'Do not attempt to bypass authentication, usage limits, billing, rate limits, or security controls.',
          'Do not reverse engineer, scrape, overload, attack, or interfere with TalkTrack or its service providers.',
          'Do not use TalkTrack to generate or store content that promotes violence, self-harm instructions, exploitation, or other harmful conduct.',
        ],
      },
      {
        heading: 'User content and license',
        body: [
          'You keep your rights to the check-ins, notes, tracker answers, chat prompts, and other content you submit.',
          'You grant TalkTrack the limited permission needed to host, store, transmit, process, format, analyze, display, and send your content to service providers so the app can function, generate AI features, provide support, enforce these Terms, and operate the service.',
        ],
      },
      {
        heading: 'AI outputs and personal decisions',
        body: [
          'AI outputs are informational and may be incomplete, outdated, or wrong. You are responsible for deciding how to use any summary, chart, reflection question, action plan, or suggestion.',
          'TalkTrack may propose tracker changes, but app data changes happen only when you confirm the proposal through the app flow.',
        ],
      },
      {
        heading: 'Account deletion',
        body: [
          'You can delete your account from the app. Deletion is intended to remove app-owned profile, tracker, log, draft, and AI chat data from the TalkTrack backend, with limited retained records as described in the Privacy Policy.',
          'Deleting your TalkTrack account does not cancel an Apple subscription. Manage or cancel subscriptions through Apple ID / App Store subscription settings.',
        ],
      },
      {
        heading: 'Service availability and changes',
        body: [
          'TalkTrack is evolving. Features, limits, models, providers, pricing, and availability may change. We may suspend, limit, or discontinue features when needed for maintenance, security, abuse prevention, legal reasons, provider outages, or product changes.',
          'We do not guarantee that TalkTrack will be uninterrupted, error-free, or available at all times.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'To the fullest extent allowed by law, TalkTrack is provided as is and as available. TalkTrack is not liable for indirect, incidental, special, consequential, or punitive damages, or for losses resulting from reliance on AI outputs, data loss, service interruption, provider outages, or user-submitted content.',
          'Some jurisdictions do not allow certain limitations, so some of these terms may not apply to you.',
        ],
      },
      {
        heading: 'Changes and contact',
        body: [
          'We may update these Terms and policies as TalkTrack changes. When we make material changes, we will update the effective date and may provide additional notice where appropriate.',
          `For support or legal questions, email ${SUPPORT_EMAIL}. You can also use the support page.`,
        ],
        links: [{ label: 'Contact TalkTrack', href: '/support' }],
      },
    ],
  },
  {
    id: 'ai-wellness-disclaimer',
    title: 'AI & Wellness Disclaimer',
    intro: [
      'TalkTrack is for personal reflection and self-tracking. It is not a healthcare provider and does not provide medical care, therapy, diagnosis, crisis response, or professional advice.',
    ],
    subsections: [
      {
        heading: 'Not medical, therapy, diagnosis, or emergency support',
        bullets: [
          'TalkTrack does not diagnose, treat, prevent, or cure any disease, condition, or mental health issue.',
          'TalkTrack AI responses may be incomplete, incorrect, or based on limited data.',
          'TalkTrack charts and correlations describe logged patterns only. They do not prove cause and effect.',
          'For medical, mental health, legal, financial, or safety concerns, contact qualified professionals.',
          'For emergencies or immediate danger, contact local emergency services or crisis resources. Do not rely on TalkTrack for emergency support.',
        ],
      },
    ],
  },
  {
    id: 'subscription-terms',
    title: 'Subscription Terms',
    intro: [
      'This section applies when TalkTrack offers in-app purchases, free trials, or subscriptions through the Apple App Store.',
    ],
    subsections: [
      {
        heading: 'How subscriptions work',
        bullets: [
          'Apple App Store / StoreKit processes purchases and renewals, and payment is charged through your Apple ID.',
          'RevenueCat helps TalkTrack manage subscription status and entitlements.',
          'TalkTrack does not store your full card details.',
          'The exact price, currency, duration, trial terms, renewal period, and included features are shown before purchase confirmation and may vary by region or currency.',
          'Unless canceled through Apple subscription settings, subscriptions renew automatically under Apple terms.',
          'If a free trial is available and shown for the selected product, it converts to a paid subscription unless you cancel before the trial ends.',
          'You can manage or cancel subscriptions in Apple ID settings. Uninstalling TalkTrack or deleting your TalkTrack account does not cancel a subscription.',
          'Restore Purchases is available in the app.',
          'Refund requests are handled through Apple where applicable.',
        ],
      },
      {
        heading: 'Access and limits',
        body: [
          'Subscription status may affect access to paid features, entitlements, or AI usage limits. If subscription status cannot be verified, TalkTrack may temporarily show the safest available access state until status is refreshed.',
        ],
      },
    ],
  },
]

type PolicyPageContentProps = {
  documentTitle: string
  eyebrow: string
  title: string
  description: string
  sectionIds?: string[]
}

function PolicyPageContent({
  documentTitle,
  eyebrow,
  title,
  description,
  sectionIds,
}: PolicyPageContentProps) {
  useEffect(() => {
    document.title = documentTitle
  }, [documentTitle])

  const sections = sectionIds
    ? sectionIds
        .map((id) => POLICY_SECTIONS.find((section) => section.id === id))
        .filter((section): section is PolicySection => Boolean(section))
    : POLICY_SECTIONS

  return (
    <PublicPageLayout
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
        <aside className="tt-card-solid p-5 lg:sticky lg:top-24">
          <p className="tt-eyebrow mb-4">
            Contents
          </p>
          <nav aria-label="Policy sections">
            <ol className="grid gap-2 text-[14px] font-semibold text-[color:var(--tt-muted)]">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-2xl px-3 py-2 transition-colors hover:bg-[var(--tt-accent-50)] hover:text-[color:var(--tt-accent-strong)]"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="tt-card-solid rounded-[32px] p-6 sm:p-8 lg:p-10">
          <div className="mb-9 rounded-[22px] border border-[var(--tt-accent-border)] bg-[var(--tt-accent-50)] p-5 text-[14px] font-medium leading-[1.65] text-[color:var(--tt-muted)]">
            <p>
              <span className="font-bold text-[color:var(--tt-ink-deep)]">Effective date:</span>{' '}
              {EFFECTIVE_DATE}
            </p>
            <p className="mt-2">
              These policies are written for TalkTrack, a personal AI reflection
              and life-tracking app. For support, use{' '}
              <PageLink href="/support">Contact TalkTrack</PageLink>. To request
              a data export, use{' '}
              <PageLink href="/export-data">Request your TalkTrack data</PageLink>.
            </p>
          </div>

          <div className="grid gap-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-[30px] font-extrabold leading-[1.08] text-[color:var(--tt-ink-deep)] sm:text-[40px]">
                  {section.title}
                </h2>

                {section.intro ? (
                  <div className="mt-4 grid gap-4 text-[15px] font-medium leading-[1.75] text-[color:var(--tt-muted)] sm:text-[16px]">
                    {section.intro.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 grid gap-7">
                  {section.subsections.map((subsection) => (
                    <section key={subsection.heading}>
                      <h3 className="text-[17px] font-bold leading-[1.35] text-[color:var(--tt-ink-deep)] sm:text-[18px]">
                        {subsection.heading}
                      </h3>

                      <div className="mt-3 grid gap-4 text-[15px] font-medium leading-[1.75] text-[color:var(--tt-muted)] sm:text-[16px]">
                        {subsection.body?.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}

                        {subsection.bullets ? (
                          <ul className="grid gap-2.5 pl-5">
                            {subsection.bullets.map((item) => (
                              <li key={item} className="list-disc pl-1">
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {subsection.links ? (
                          <div className="pt-1">
                            {subsection.links.map((link) => (
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
              </section>
            ))}
          </div>
        </article>
      </div>
    </PublicPageLayout>
  )
}

export function PrivacyPage() {
  return (
    <PolicyPageContent
      documentTitle="TalkTrack Privacy Policy"
      eyebrow="Privacy"
      title="Privacy Policy."
      description="How TalkTrack collects, uses, shares, and deletes app, AI, subscription, support, and website request data."
      sectionIds={['privacy-policy']}
    />
  )
}

export function TermsPage() {
  return (
    <PolicyPageContent
      documentTitle="TalkTrack Terms of Service"
      eyebrow="Terms"
      title="Terms of Service."
      description="Plain-language terms for using TalkTrack, including subscriptions, AI outputs, account deletion, and acceptable use."
      sectionIds={['terms-of-service', 'subscription-terms', 'ai-wellness-disclaimer']}
    />
  )
}

export function AiDisclaimerPage() {
  return (
    <PolicyPageContent
      documentTitle="TalkTrack AI & Wellness Disclaimer"
      eyebrow="AI Disclaimer"
      title="AI & Wellness Disclaimer."
      description="TalkTrack supports personal reflection and tracking. It is not therapy, medical advice, diagnosis, or emergency support."
      sectionIds={['ai-wellness-disclaimer']}
    />
  )
}

export default function PoliciesPage() {
  return (
    <PolicyPageContent
      documentTitle="TalkTrack Policies"
      eyebrow="Policies"
      title="TalkTrack policies."
      description="Privacy, terms, AI-processing, wellness, subscription, export, and account information for TalkTrack users."
    />
  )
}
