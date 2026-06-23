import { Download } from 'lucide-react'

export default function AppStoreButton({
  className = '',
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className={[
        'tt-primary inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase transition-[opacity] duration-200 disabled:cursor-not-allowed disabled:opacity-90',
        compact
          ? 'min-h-11 px-5 text-[12px] sm:px-7 sm:text-[13px]'
          : 'min-h-[56px] px-8 text-[14px] sm:min-h-[62px] sm:px-10 sm:text-[15px]',
        className,
      ].join(' ')}
    >
      <Download size={compact ? 15 : 17} strokeWidth={2.6} aria-hidden="true" />
      Download on the App Store
    </button>
  )
}
