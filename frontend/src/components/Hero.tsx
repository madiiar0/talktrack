import TypewriterHeadline from './TypewriterHeadline'
import AppStoreButton from './AppStoreButton'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full bg-white px-3 pb-3 pt-[80px] text-[color:var(--tt-ink)] sm:px-6 sm:pb-7 sm:pt-[80px]"
    >
      <div className="tt-soft-panel relative min-h-[calc(100svh-92px)] overflow-hidden rounded-[28px] border-0 shadow-none sm:min-h-[calc(100svh-124px)] sm:rounded-[34px] lg:rounded-[38px]">
        <img
          src="/assets/hero_background.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/70 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid min-h-[inherit] w-full max-w-[1500px] items-center gap-10 px-6 pb-10 pt-12 sm:px-10 sm:pt-14 md:pb-14 lg:grid-cols-[minmax(0,1.18fr)_minmax(290px,0.7fr)] lg:gap-12 lg:px-14 lg:pt-16 xl:px-20">
          {/* ---- Left: copy ---- */}
          <div className="flex w-full max-w-[980px] flex-col items-start">
            <div className="reveal w-full" style={{ animationDelay: '0.04s' }}>
              <TypewriterHeadline />
            </div>

            <p
              className="mt-7 max-w-[660px] text-[clamp(16px,1.16vw,21px)] font-medium leading-[1.6] text-[rgba(63,75,102,0.82)] sm:mt-8"
            >
              Reflect by speaking for 2-3 minutes. TalkTrack turns your logs
              into visible trends, insights, and noticed patterns.
            </p>

            <div
              className="mt-9 flex w-full flex-col gap-3 sm:max-w-[320px] sm:flex-row"
            >
              <AppStoreButton className="w-full sm:w-auto" />
            </div>

            <p
              className="mt-4 text-[13px] font-medium text-[color:var(--tt-muted)] sm:text-[14px]"
            >
              Not medical care, therapy, diagnosis, or emergency support.
            </p>
          </div>

          {/* ---- Right: app preview image ---- */}
          <div className="reveal-chart flex w-full justify-center lg:justify-end">
            <img
              src="/assets/herosectionpic.png"
              alt="TalkTrack app daily reflection and insights preview"
              className="h-auto w-full max-w-[340px] object-contain sm:max-w-[390px] lg:max-w-[440px] xl:max-w-[480px]"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
