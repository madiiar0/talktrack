import { Image } from 'lucide-react'
import { useState } from 'react'

export default function ScreenshotPhoneFrame({
  src,
  alt,
  label,
  className = '',
}: {
  src: string
  alt: string
  label: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={['relative w-full max-w-[300px]', className].join(' ')}>
      <div className="aspect-[9/19.5] rounded-[34px] border border-[#050708]/80 bg-[#101214] p-2 shadow-[0_24px_66px_-52px_rgba(5,7,8,0.42)]">
        <div className="relative h-full overflow-hidden rounded-[27px] border border-[var(--tt-accent-border)] bg-[var(--tt-bg)]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-3 z-20 h-5 w-[76px] -translate-x-1/2 rounded-full border border-black/70 bg-[#050708]"
          />

          {!failed ? (
            <img
              src={src}
              alt={alt}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center bg-[linear-gradient(180deg,var(--tt-accent-50),var(--tt-bg))] px-6 text-center">
              <div>
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[var(--tt-accent-border)] bg-white/80 text-[color:var(--tt-accent-strong)]">
                  <Image size={24} strokeWidth={2.3} aria-hidden="true" />
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase text-[color:var(--tt-accent-strong)]">
                  {label}
                </p>
                <p className="mt-2 text-[13px] font-semibold leading-[1.45] text-[color:var(--tt-ink)]">
                  App preview image coming soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
