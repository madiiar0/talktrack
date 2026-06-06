import TypewriterHeadline from './TypewriterHeadline'
import PhoneDemoMockup from './PhoneDemoMockup'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full bg-[#fff] px-3 pb-3 pt-[80px] text-[#071014] sm:px-6 sm:pb-7 sm:pt-[80px]"
    >
      <div className="relative min-h-[calc(100svh-92px)] overflow-hidden rounded-[28px] bg-[#dff4fb] bg-[url('/assets/hero_background.png')] bg-cover bg-center sm:min-h-[calc(100svh-124px)] sm:rounded-[34px] lg:rounded-[38px]">
        <div className="absolute inset-0 bg-white/[0.08]" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/60 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid min-h-[inherit] w-full max-w-[1500px] items-center gap-10 px-6 pb-10 pt-12 sm:px-10 sm:pt-14 md:pb-14 lg:grid-cols-[minmax(0,1.18fr)_minmax(290px,0.7fr)] lg:gap-12 lg:px-14 lg:pt-16 xl:px-20">
          {/* ---- Left: copy ---- */}
          <div className="flex w-full max-w-[980px] flex-col items-start">
            <div className="reveal w-full" style={{ animationDelay: '0.04s' }}>
              <TypewriterHeadline />
            </div>

            <p
              className="mt-7 max-w-[660px] text-[clamp(15px,1.1vw,20px)] font-medium leading-[1.55] tracking-[-0.01em] text-[#101820]/80 sm:mt-8"
            >
              Talk naturally. Ask TalkTrack what to track, what to stop tracking,
              and what changed over time. It turns conversations into structured
              personal data, charts, summaries, and insights.
            </p>

            <div
              className="mt-9 flex w-full flex-col gap-3 sm:max-w-[420px]"
            >
              <a
                href="/waitlist"
                className="flex h-[58px] w-full items-center justify-center rounded-[18px] border border-[#0b0b0b]/80 bg-gradient-to-r from-[#5dc8ea] to-[#dbf4f8] px-8 text-[clamp(17px,1.08vw,22px)] font-semibold tracking-[0.02em] text-[#050708] shadow-[0_18px_44px_-30px_rgba(38,114,143,0.55)] transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#5dc8ea] hover:shadow-[0_18px_42px_-30px_rgba(93,200,234,0.72)] active:translate-y-0 sm:h-[64px]"
              >
                Get Early Access
              </a>
            </div>

            <p
              className="mt-4 text-[clamp(12px,0.82vw,15px)] font-medium text-[#101820]/50"
            >
              *Android and iOS apps coming soon.
            </p>
          </div>

          {/* ---- Right: interactive phone demo ---- */}
          <div className="reveal-chart flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[330px]">
              <PhoneDemoMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
