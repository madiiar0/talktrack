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

const EFFECTIVE_DATE = 'August 9, 2026'
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
          'Voice data when you choose to use it. For voice transcription, the iOS app records a finalized audio clip and uploads it through the TalkTrack backend to Groq, which returns a transcript. The transcript may be inserted into an editable reflection or check-in or used as a voice or AI chat message. For voice features that speak AI responses aloud, TalkTrack processes the generated response text needed to create that audio.',
          'AI artwork data, if you use artwork features, such as your selected style, the generated artwork prompt, and the cleaned summary, emotional labels, topics, and recent scene context used to derive that prompt.',
          'Scan or photo data when you choose those features, including local reflection photo attachments and text extracted on-device from scanned pages. When you request AI scan organization, TalkTrack sends the extracted text, not the image bytes, to its backend for processing.',
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
          'Generate AI-assisted check-in extraction, optional reflection questions, Main AI answers, summaries, insights, Mirror-style analysis, action proposals, and charts grounded in your own TalkTrack data.',
          'Generate AI artwork and spoken voice responses, and personalize the Toki reflection and voice experience, when you use those features.',
          'Enforce AI prompt limits, AI usage limits, rate limits, abuse controls, account deletion rules, and security checks.',
          'Respond to support, contact, data export, privacy, and account requests.',
          'Manage subscription status, restore purchases, and premium feature entitlements.',
          'Operate, debug, secure, and improve reliability of the app and website.',
        ],
      },
      {
        heading: 'AI Processing and Third-Party AI Services',
        body: [
          'TalkTrack uses third-party AI providers to power features such as check-in and tracker extraction, reflection questions, summaries, insights, Mirror-style analysis, Main AI chat, speech transcription, AI artwork, and spoken AI responses.',
          'On the Sign Up screen, after Confirm Password, TalkTrack presents a dedicated AI-processing consent checkbox. It is unchecked by default. The checkbox text states that the user agrees to the AI processing and third-party data sharing described in the disclosure, and an underlined “AI Processing & Data Sharing” link beside the consent action opens that disclosure in the app. The user may check the box without opening the disclosure first, but the disclosure is directly available before account creation.',
          'Create Account remains unavailable until the user affirmatively checks the box. Checking the box and creating the account records the current AI consent and disclosure version as the user’s explicit permission for the third-party AI processing described there. The Privacy Policy and Terms of Service describe this mechanism; agreeing to those documents alone is not the AI-processing permission.',
          'Checking the box or creating an account does not itself transmit journal, reflection, tracker, chat, scan, photo, or voice content to an AI provider. Personal content is transmitted only later, when the user actually invokes an AI-powered feature that requires that processing. Because compatible permission was obtained and recorded during registration, the app does not present a second AI-consent popup when those features are first used. Existing users retain their previously recorded compatible AI consent or agreement state.',
          'Different AI features send different inputs; TalkTrack does not send every category on every request. For text AI features, DeepSeek may receive only the context needed for the selected feature, such as journal, check-in, or reflection text; saved voice transcripts included in submitted content; AI chat messages and recent chat context; relevant recent or older log context, titles, summaries, tags, and emotional labels; tracker names, questions, definitions, options, answers, and related values; pending tracker proposals; computed analytics; relevant profile or Toki preferences used for personalization; and text extracted on-device from scans or photos submitted for AI organization.',
          'For AI artwork, DeepSeek may first receive the cleaned reflection summary, emotional labels, topics, and recent scene context needed to derive an artwork concept; fal.ai (FLUX) then receives the resulting feature-specific image prompt. For speech transcription, Groq receives the recorded audio clip and any optional language hint needed to return a transcript. For spoken AI audio, OpenAI receives the generated AI response text and selected voice information needed to synthesize that response. Each provider receives information only when the corresponding feature is used.',
          'TalkTrack limits each request to the information needed to provide the selected feature. Each provider handles that information under the terms, privacy policy, and agreements applicable to its service, and TalkTrack does not control how a provider independently operates its systems. Do not submit highly sensitive content that you do not want processed by the relevant third-party AI service.',
          'AI responses are validated, sanitized, and constrained by the backend before the app uses them. Main AI chat does not silently write trackers, logs, reminders, account data, or settings. Tracker changes are written only after you confirm a proposal.',
          'AI outputs can be wrong, incomplete, or based on limited data. You should not enter emergency information or highly sensitive information you do not want processed by TalkTrack and its AI service providers.',
        ],
      },
      {
        heading: 'Sharing, sale, and advertising',
        body: [
          'TalkTrack shares data with service providers only as needed to run authentication, backend storage, AI processing, subscriptions, support requests, hosting, security, and app platform features.',
          'TalkTrack limits its disclosures to the services and purposes described in this Privacy Policy. The third parties involved include its AI providers (DeepSeek, fal.ai, Groq, and OpenAI), Firebase/Google, Apple, RevenueCat, MongoDB hosting, and Vercel. Each provider handles data under the terms, privacy policy, and agreements applicable to its service, and operates systems that TalkTrack does not control.',
          'TalkTrack does not sell personal data. The current app behavior does not include third-party advertising tracking.',
        ],
      },
      {
        heading: 'Voice, notifications, and widgets',
        body: [
          'Voice input is optional. When you choose voice transcription, the app records a finalized audio clip, uploads it to the TalkTrack backend, and sends it to Groq for transcription. A reflection or check-in transcript can be reviewed or edited in the app; a Call Toki transcript is used as the voice-chat message. A transcript included in an AI feature may then be sent to DeepSeek as part of that feature’s required text context.',
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
          'DeepSeek for text AI features, such as check-in and tracker extraction, reflection questions, chat, summaries, insights, Mirror-style analysis, and scan/photo text cleanup.',
          'fal.ai (FLUX) for AI artwork and image generation, if you use artwork features.',
          'Groq for speech-to-text transcription when you choose to record or upload audio for transcription.',
          'OpenAI for voice text-to-speech, if you use voice features that generate spoken audio.',
          'Apple iOS services, including microphone access, on-device Vision text recognition, on-device system text-to-speech fallback, UserNotifications, StoreKit, and App Store subscription management.',
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
          'For a new account, AI-processing permission is requested during registration through the dedicated checkbox, which is unchecked by default. You can open the linked in-app “AI Processing & Data Sharing” disclosure before creating the account.',
          'After registration, personal content is transmitted to a third-party AI provider only when you invoke a relevant AI-powered feature. You control the journal, reflection, chat, scan or photo, tracker, voice, and other content you choose to submit, and you should not submit content that you do not want processed by the relevant provider.',
          'You can choose not to use optional AI-powered features or voice transcription. There is no separate AI-permission dialog or AI opt-out setting after account creation.',
          'You can request a data export through the export page and contact TalkTrack for privacy or support questions.',
          'You can delete your TalkTrack account from the app Account tab.',
        ],
      },
      {
        heading: 'Children and international processing',
        body: [
          'TalkTrack is not directed to or intended for children under 13, and TalkTrack does not knowingly collect personal data from anyone under 13. If we learn that we have collected personal data from a child under 13, we will delete it. You must be at least 13 to use TalkTrack; if you are at least 13 but under the age of majority where you live, use TalkTrack only with the permission and involvement of a parent or legal guardian.',
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
          'You must be at least 13 years old to use TalkTrack, or older if a higher minimum age applies where you live. If you are at least 13 but under the age of majority, you must have permission from a parent or legal guardian.',
          'The App Store content rating (for example 9+) describes the content suitability of the app and comes from the Apple content questionnaire. It is separate from this eligibility requirement: whatever content rating the store shows, you must be at least 13 years old to use TalkTrack.',
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
          'AI outputs are informational and may be incomplete, outdated, or wrong. You are responsible for deciding how to use any summary, chart, reflection question, action plan, or suggestion. TalkTrack is not a medical, psychiatric, emergency, or therapy service, and you should not rely on it for crisis, diagnosis, or medical, legal, or financial decisions.',
          'TalkTrack AI features rely on third-party AI providers. During registration, the Sign Up screen requests explicit permission for the described AI processing and third-party data sharing through a dedicated checkbox that is unchecked by default. Create Account remains unavailable until the user affirmatively checks the box. The underlined “AI Processing & Data Sharing” link beside the checkbox opens an in-app disclosure explaining what personal data may be sent, which providers receive it, why it is sent, and when it is sent. The checkbox, not these Terms or the Privacy Policy alone, is how the app obtains the permission.',
          'Checking the box and creating the account records the current AI consent and disclosure version. Account creation itself does not send journal or reflection content to an AI provider; personal content is sent only later when the user actually uses an AI-powered feature that requires that processing. Provider and data-category details are also available in the Privacy Policy.',
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
