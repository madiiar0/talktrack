import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Send,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

const PRICE_OPTIONS = [
  '$5/month',
  '$10/month',
  '$15/month',
  '$20+/month',
  'Custom',
]

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function getApiUrl() {
  return (import.meta.env.VITE_API_URL || 'http://localhost:5001').replace(
    /\/+$/,
    '',
  )
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
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#f7fbfc] text-[#071014]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-3 h-[42vh] rounded-[30px] bg-[#dff4fb] bg-[url('/assets/hero_background.png')] bg-cover bg-center opacity-70 sm:inset-x-6 sm:top-6 sm:rounded-[38px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[30vh] h-44 bg-gradient-to-b from-transparent to-[#f7fbfc]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-24 h-[30rem] w-[30rem] rounded-full bg-[#dbf4f8]/55 blur-[140px]"
      />
      <main className="relative z-10 flex min-h-screen px-6 py-8 sm:px-8 lg:px-[56px] xl:px-[90px]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col">
          <a
            href="/"
            className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-[#cfe8ef]/80 bg-white/70 px-4 py-2 text-[14px] font-semibold text-[#101820]/62 shadow-[0_12px_32px_-28px_rgba(35,96,118,0.34)] backdrop-blur-sm transition-colors hover:border-[#5dc8ea]/60 hover:text-[#248eb1]"
          >
            <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" />
            Back to landing page
          </a>

          <div className="grid flex-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-[620px]">
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#248eb1]">
                EARLY ACCESS
              </p>
              <h1
                className="text-[clamp(46px,5.5vw,88px)] font-normal italic leading-[0.95] tracking-[-0.035em] text-[#050708]"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Join the TalkTrack waitlist.
              </h1>
              <p className="mt-6 max-w-[580px] text-[clamp(16px,1.2vw,21px)] font-medium leading-[1.6] text-[#101820]/70">
                Tell us where to send access and what you would want your
                personal AI agent to track first.
              </p>
            </div>

            {status === 'success' ? (
              <div className="rounded-[28px] border border-[#cfe8ef]/90 bg-white/80 p-6 shadow-[0_24px_88px_-76px_rgba(52,116,138,0.48)] backdrop-blur-sm sm:p-8">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#5dc8ea] to-[#dbf4f8] text-[#071014]">
                  <CheckCircle2 size={28} strokeWidth={2.6} aria-hidden="true" />
                </div>
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#248eb1]">
                  Request sent
                </p>
                <h2
                  className="mt-4 text-[clamp(32px,3.8vw,54px)] font-normal italic leading-[0.98] tracking-[-0.035em] text-[#050708]"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {message || "Thanks - you're on the waitlist."}
                </h2>
                <p className="mt-4 text-[15px] font-medium leading-[1.6] text-[#101820]/68">
                  We'll contact you when early access opens.
                </p>
                <a
                  href="/"
                  className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#050708]/80 bg-gradient-to-r from-[#5dc8ea] to-[#dbf4f8] px-7 text-[13px] font-bold uppercase tracking-[0.05em] text-[#050708] shadow-[0_18px_44px_-30px_rgba(38,114,143,0.55)] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#5dc8ea] hover:shadow-[0_18px_42px_-30px_rgba(93,200,234,0.72)]"
                >
                  <ArrowLeft size={16} strokeWidth={2.6} aria-hidden="true" />
                  Back to landing page
                </a>
              </div>
            ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-[#cfe8ef]/90 bg-white/80 p-5 shadow-[0_24px_88px_-76px_rgba(52,116,138,0.48)] backdrop-blur-sm sm:p-7"
            >
              <div className="grid gap-5">
                <label className="grid gap-2">
                  <span className="text-[13px] font-bold text-[#071014]">
                    Name
                  </span>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    maxLength={120}
                    className="min-h-[52px] rounded-[16px] border border-[#cfe8ef] bg-[#fafdff] px-4 text-[15px] font-medium text-[#071014] outline-none transition-[border-color,box-shadow] placeholder:text-[#101820]/35 focus:border-[#5dc8ea] focus:shadow-[0_0_0_4px_rgba(93,200,234,0.16)]"
                  />
                </label>

              <label className="grid gap-2">
                <span className="text-[13px] font-bold text-[#071014]">
                  Email or phone number
                </span>
                <input
                  required
                  type="text"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="Your Email or Phone"
                  maxLength={160}
                  className="min-h-[52px] rounded-[16px] border border-[#cfe8ef] bg-[#fafdff] px-4 text-[15px] font-medium text-[#071014] outline-none transition-[border-color,box-shadow] placeholder:text-[#101820]/35 focus:border-[#5dc8ea] focus:shadow-[0_0_0_4px_rgba(93,200,234,0.16)]"
                />
              </label>

              <fieldset className="grid gap-3">
                <legend className="text-[13px] font-bold text-[#071014]">
                  How much maximum would you pay for this app?
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {PRICE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedPrice(option)}
                      className={[
                        'min-h-[44px] rounded-full border px-3 text-[13px] font-bold transition-[border-color,background-color,color,box-shadow]',
                        selectedPrice === option
                          ? 'border-[#5dc8ea] bg-gradient-to-r from-[#5dc8ea] to-[#dbf4f8] text-[#050708] shadow-[0_12px_28px_-24px_rgba(31,112,145,0.7)]'
                          : 'border-[#cfe8ef] bg-white/70 text-[#101820]/62 hover:border-[#5dc8ea]/60 hover:text-[#248eb1]',
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
                    className="min-h-[52px] rounded-[16px] border border-[#cfe8ef] bg-[#fafdff] px-4 text-[15px] font-medium text-[#071014] outline-none transition-[border-color,box-shadow] placeholder:text-[#101820]/35 focus:border-[#5dc8ea] focus:shadow-[0_0_0_4px_rgba(93,200,234,0.16)]"
                  />
                ) : null}
              </fieldset>

              <label className="grid gap-2">
                <span className="text-[13px] font-bold text-[#071014]">
                  Suggestions or concerns
                </span>
                <textarea
                  value={suggestions}
                  onChange={(event) => setSuggestions(event.target.value)}
                  placeholder="What would you want TalkTrack to track first?"
                  maxLength={2000}
                  rows={5}
                  className="min-h-[132px] resize-y rounded-[16px] border border-[#cfe8ef] bg-[#fafdff] px-4 py-3 text-[15px] font-medium leading-[1.5] text-[#071014] outline-none transition-[border-color,box-shadow] placeholder:text-[#101820]/35 focus:border-[#5dc8ea] focus:shadow-[0_0_0_4px_rgba(93,200,234,0.16)]"
                />
              </label>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-1 inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-[#050708]/80 bg-gradient-to-r from-[#5dc8ea] to-[#dbf4f8] px-6 text-[14px] font-bold uppercase tracking-[0.05em] text-[#050708] shadow-[0_18px_44px_-30px_rgba(38,114,143,0.55)] transition-[border-color,transform,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:border-[#5dc8ea] hover:shadow-[0_18px_42px_-30px_rgba(93,200,234,0.72)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
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
                <p className="rounded-[16px] border border-red-200 bg-red-50 p-4 text-[14px] font-bold text-red-600">
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
