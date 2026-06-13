import { CheckCircle2, LoaderCircle, Send } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import PublicPageLayout, { PageLink } from './PublicPageLayout'
import { postJson } from '../lib/api'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'min-h-[52px] rounded-[16px] border border-[#B7E3F2] bg-[#fafdff] px-4 text-[15px] font-medium text-[#071014] outline-none transition-[border-color,box-shadow] placeholder:text-[#101820]/35 focus:border-[#2498C7] focus:shadow-[0_0_0_4px_rgba(36,152,199,0.16)]'

const labelClass = 'grid gap-2 text-[13px] font-bold text-[#071014]'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [appUserEmail, setAppUserEmail] = useState('')
  const [subject, setSubject] = useState('Support question')
  const [messageText, setMessageText] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [responseMessage, setResponseMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const trimmedEmail = email.trim().toLowerCase()
    const trimmedAppUserEmail = appUserEmail.trim().toLowerCase()
    const trimmedMessage = messageText.trim()

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      setStatus('error')
      setResponseMessage('Please enter a valid email address.')
      return
    }

    if (trimmedAppUserEmail && !isValidEmail(trimmedAppUserEmail)) {
      setStatus('error')
      setResponseMessage('Please enter a valid app user email address.')
      return
    }

    if (trimmedMessage.length < 10) {
      setStatus('error')
      setResponseMessage('Please enter a message with at least 10 characters.')
      return
    }

    setStatus('submitting')
    setResponseMessage('')

    try {
      const result = await postJson('/api/contact', {
        name: name.trim(),
        email: trimmedEmail,
        appUserEmail: trimmedAppUserEmail,
        subject,
        message: trimmedMessage,
        company,
      })

      setStatus('success')
      setResponseMessage(result.message || 'Your message has been received.')
      setName('')
      setEmail('')
      setAppUserEmail('')
      setSubject('Support question')
      setMessageText('')
      setCompany('')
    } catch (error) {
      setStatus('error')
      setResponseMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <PublicPageLayout
      eyebrow="Help Center"
      title="Contact TalkTrack."
      description="Send support questions, product feedback, privacy questions, or account requests. We will review your message and respond when possible."
    >
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <aside className="rounded-[28px] border border-[#B7E3F2]/80 bg-white/78 p-6 shadow-[0_24px_88px_-76px_rgba(52,116,138,0.48)] backdrop-blur-sm">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#147BA6]">
            Before you write
          </p>
          <h2
            className="mt-4 text-[clamp(32px,3vw,48px)] font-normal italic leading-[1] tracking-[-0.03em] text-[#050708]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            The right place for support.
          </h2>
          <div className="mt-5 grid gap-4 text-[15px] font-medium leading-[1.7] text-[#101820]/68">
            <p>
              For data exports, use the dedicated{' '}
              <PageLink href="/export-data">export request page</PageLink> so
              the request is labeled correctly.
            </p>
            <p>
              For privacy and terms details, read the{' '}
              <PageLink href="/policies">TalkTrack policies</PageLink>.
            </p>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-[#B7E3F2]/90 bg-white/82 p-5 shadow-[0_24px_88px_-76px_rgba(52,116,138,0.48)] backdrop-blur-sm sm:p-7"
        >
          <div className="grid gap-5">
            <label className={labelClass}>
              Name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                maxLength={120}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                maxLength={160}
                autoComplete="email"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              App user email, if different
              <input
                type="email"
                value={appUserEmail}
                onChange={(event) => setAppUserEmail(event.target.value)}
                placeholder="Optional"
                maxLength={160}
                autoComplete="email"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Subject / reason
              <select
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className={inputClass}
              >
                <option>Support question</option>
                <option>Bug report</option>
                <option>Privacy question</option>
                <option>Account question</option>
                <option>Product feedback</option>
                <option>Other</option>
              </select>
            </label>

            <label className={labelClass}>
              Message
              <textarea
                required
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                placeholder="Tell us what you need help with."
                maxLength={4000}
                rows={7}
                className={`${inputClass} min-h-[160px] resize-y py-3 leading-[1.55]`}
              />
            </label>

            <label className="hidden" aria-hidden="true">
              Company
              <input
                type="text"
                tabIndex={-1}
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                autoComplete="off"
              />
            </label>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-[#050708]/80 bg-gradient-to-r from-[#2498C7] to-[#147BA6] px-6 text-[14px] font-bold uppercase tracking-[0.05em] text-white shadow-[0_18px_44px_-30px_rgba(38,114,143,0.55)] transition-[border-color,transform,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:border-[#147BA6] hover:shadow-[0_18px_42px_-30px_rgba(36,152,199,0.72)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === 'submitting' ? (
                <LoaderCircle size={17} strokeWidth={2.6} className="animate-spin" />
              ) : status === 'success' ? (
                <CheckCircle2 size={17} strokeWidth={2.6} />
              ) : (
                <Send size={17} strokeWidth={2.6} />
              )}
              {status === 'submitting' ? 'Sending...' : 'Send message'}
            </button>

            {responseMessage ? (
              <p
                aria-live="polite"
                className={[
                  'rounded-[16px] border p-4 text-[14px] font-bold',
                  status === 'success'
                    ? 'border-[#B7E3F2] bg-[#E7F6FB]/70 text-[#147BA6]'
                    : 'border-red-200 bg-red-50 text-red-600',
                ].join(' ')}
              >
                {responseMessage}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </PublicPageLayout>
  )
}
