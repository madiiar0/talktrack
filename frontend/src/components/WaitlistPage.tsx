import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Send,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import GlobalBackground from './GlobalBackground'

const PRICE_OPTIONS = [
  '$5/month',
  '$10/month',
  '$15/month',
  '$20+/month',
  'Custom',
]

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function getApiUrl() {
  return import.meta.env.VITE_API_URL || 'http://localhost:5001'
}

export default function WaitlistPage() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('$10/month')
  const [customPrice, setCustomPrice] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [message, setMessage] = useState('')

  const honestPrice = useMemo(
    () => (selectedPrice === 'Custom' ? customPrice.trim() : selectedPrice),
    [customPrice, selectedPrice],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedContact = contact.trim()

    if (!trimmedName || !trimmedContact || !honestPrice) {
      setStatus('error')
      setMessage('Please fill in name, contact, and payment preference.')
      return
    }

    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch(`${getApiUrl()}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          contact: trimmedContact,
          honestPrice,
          suggestions: suggestions.trim(),
        }),
      })

      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setMessage(data?.message || "Thanks - you're on the waitlist.")
      setName('')
      setContact('')
      setSelectedPrice('$10/month')
      setCustomPrice('')
      setSuggestions('')
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message !== 'Failed to fetch'
          ? error.message
          : 'Something went wrong. Please try again.'

      setStatus('error')
      setMessage(errorMessage)
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#0b0b0b]">
      <GlobalBackground />
      <main className="relative z-10 flex min-h-screen px-6 py-8 sm:px-8 lg:px-[56px] xl:px-[90px]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col">
          <a
            href="/"
            className="mb-10 inline-flex w-fit items-center gap-2 text-[14px] font-bold text-white/65 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" />
            Back to landing page
          </a>

          <div className="grid flex-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-[620px]">
              <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-mint">
                EARLY ACCESS
              </p>
              <h1 className="text-[clamp(38px,5.5vw,78px)] font-black leading-[0.98] tracking-[-0.03em] text-white">
                Join the TalkTrack waitlist.
              </h1>
              <p className="mt-6 max-w-[580px] text-[clamp(16px,1.2vw,21px)] font-medium leading-[1.55] text-white/70">
                Tell us where to send access and what would make TalkTrack worth
                paying for.
              </p>
            </div>

            {status === 'success' ? (
              <div className="rounded-[26px] border border-mint/25 bg-mint/10 p-6 shadow-[0_24px_90px_-78px_rgba(36,255,174,0.48)] backdrop-blur-md sm:p-8">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-mint text-black">
                  <CheckCircle2 size={28} strokeWidth={2.6} aria-hidden="true" />
                </div>
                <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-mint">
                  Request sent
                </p>
                <h2 className="mt-4 text-[clamp(28px,3.6vw,46px)] font-black leading-[1.02] tracking-[-0.025em] text-white">
                  {message || "Thanks - you're on the waitlist."}
                </h2>
                <p className="mt-4 text-[15px] font-medium leading-[1.6] text-white/70">
                  We'll contact you when early access opens.
                </p>
                <a
                  href="/"
                  className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-mint to-mint-light px-7 text-[13px] font-black uppercase tracking-[0.05em] text-black shadow-[0_14px_40px_-20px_rgba(36,255,174,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ArrowLeft size={16} strokeWidth={2.6} aria-hidden="true" />
                  Back to landing page
                </a>
              </div>
            ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-[26px] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_-78px_rgba(36,255,174,0.48)] backdrop-blur-md sm:p-7"
            >
              <div className="grid gap-5">
                <label className="grid gap-2">
                  <span className="text-[13px] font-extrabold text-white">
                    Name
                  </span>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    maxLength={120}
                    className="min-h-[52px] rounded-[16px] border border-white/10 bg-black/20 px-4 text-[15px] font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-mint/45"
                  />
                </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-extrabold text-white">
                  Email or phone number
                </span>
                <input
                  required
                  type="text"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="Your Email or Phone"
                  maxLength={160}
                  className="min-h-[52px] rounded-[16px] border border-white/10 bg-black/20 px-4 text-[15px] font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-mint/45"
                />
              </label>

              <fieldset className="grid gap-3">
                <legend className="text-[13px] font-extrabold text-white">
                  How much maximum would you pay for this app?
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {PRICE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedPrice(option)}
                      className={[
                        'min-h-[44px] rounded-full border px-3 text-[13px] font-extrabold transition-colors',
                        selectedPrice === option
                          ? 'border-mint/45 bg-mint text-black'
                          : 'border-white/10 bg-black/15 text-white/70 hover:border-white/20 hover:text-white',
                      ].join(' ')}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {selectedPrice === 'Custom' ? (
                  <input
                    required
                    type="text"
                    value={customPrice}
                    onChange={(event) => setCustomPrice(event.target.value)}
                    placeholder="Example: $10/month"
                    maxLength={80}
                    className="min-h-[52px] rounded-[16px] border border-white/10 bg-black/20 px-4 text-[15px] font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-mint/45"
                  />
                ) : null}
              </fieldset>

              <label className="grid gap-2">
                <span className="text-[13px] font-extrabold text-white">
                  Suggestions or concerns
                </span>
                <textarea
                  value={suggestions}
                  onChange={(event) => setSuggestions(event.target.value)}
                  placeholder="What would make you use or not use TalkTrack?"
                  maxLength={2000}
                  rows={5}
                  className="min-h-[132px] resize-y rounded-[16px] border border-white/10 bg-black/20 px-4 py-3 text-[15px] font-medium leading-[1.5] text-white outline-none transition-colors placeholder:text-white/35 focus:border-mint/45"
                />
              </label>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-mint to-mint-light px-6 text-[14px] font-black uppercase tracking-[0.05em] text-black shadow-[0_14px_42px_-20px_rgba(36,255,174,0.55)] transition-[transform,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_54px_-22px_rgba(36,255,174,0.68)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === 'submitting' ? (
                  <LoaderCircle
                    size={17}
                    strokeWidth={2.6}
                    aria-hidden="true"
                    className="animate-spin"
                  />
                ) : (
                  <Send size={17} strokeWidth={2.6} aria-hidden="true" />
                )}
                {status === 'submitting' ? 'Sending...' : 'Send'}
              </button>

              {status === 'error' ? (
                <p className="rounded-[16px] border border-white/10 bg-black/20 p-4 text-[14px] font-bold text-white/75">
                  {message || 'Something went wrong. Please try again.'}
                </p>
              ) : null}
            </div>
          </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
