import { ArrowRight } from 'lucide-react'
import TypewriterHeadline from './TypewriterHeadline'
import PhoneDemoMockup from './PhoneDemoMockup'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full"
    >
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col items-center justify-center gap-12 px-6 pb-20 pt-32 sm:px-8 lg:px-[56px] lg:pt-28 xl:grid xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.78fr)] xl:gap-16 xl:px-[90px] xl:pb-16 xl:pt-28">
        {/* ---- Left: copy ---- */}
        <div className="flex w-full max-w-[780px] flex-col items-start xl:max-w-none">
          <div className="reveal w-full" style={{ animationDelay: '0.04s' }}>
            <TypewriterHeadline />
          </div>

          <p
            className="reveal mt-8 max-w-[680px] text-[clamp(15px,1.12vw,20px)] font-medium leading-[1.55] text-white/75 sm:mt-9"
            style={{ animationDelay: '0.16s' }}
          >
            Talk naturally. Ask TalkTrack what to track, what to stop tracking,
            and what changed over time. It turns conversations into structured
            personal data, charts, summaries, and insights.
          </p>

          <div
            className="reveal mt-9 flex w-full flex-col gap-3 sm:max-w-[320px]"
            style={{ animationDelay: '0.28s' }}
          >
            <a
              href="/waitlist"
              className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-mint to-mint-light text-[clamp(16px,1vw,19px)] font-extrabold text-black shadow-[0_10px_34px_-14px_rgba(36,255,174,0.42)] transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-[0_14px_46px_-16px_rgba(36,255,174,0.58)] active:scale-[0.99] sm:h-[60px] sm:max-w-[320px]"
            >
              Get early access
              <ArrowRight size={20} strokeWidth={2.8} aria-hidden="true" />
            </a>
          </div>

          <p
            className="reveal mt-4 text-[clamp(13px,0.9vw,17px)] font-medium text-white/45"
            style={{ animationDelay: '0.38s' }}
          >
            *Android and iOS apps coming soon.
          </p>
        </div>

        {/* ---- Right: interactive phone demo ---- */}
        <div className="reveal-chart flex w-full justify-center xl:justify-end">
          <PhoneDemoMockup />
        </div>
      </div>
    </section>
  )
}
