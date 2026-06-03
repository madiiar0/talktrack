import { ArrowRight } from 'lucide-react'
import TypewriterHeadline from './TypewriterHeadline'
import AnimatedRadarChart from './AnimatedRadarChart'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full"
    >
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1700px] flex-col items-center gap-10 px-6 pb-20 pt-32 sm:px-8 lg:px-[56px] xl:grid xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:items-center xl:gap-10 xl:px-[90px] xl:pb-16 xl:pt-28">
        {/* ---- Left: copy ---- */}
        <div className="flex w-full flex-col items-start">
          <div className="reveal w-full" style={{ animationDelay: '0.04s' }}>
            <TypewriterHeadline />
          </div>

          <p
            className="reveal mt-5 max-w-[680px] text-[clamp(15px,1.15vw,20px)] font-medium leading-[1.45] text-white/75"
            style={{ animationDelay: '0.16s' }}
          >
            TalkTrack turns your daily voice check-in into AI insights, habit
            detection, and personal stats that grow over time. Speak naturally
            and let AI cook for you!
          </p>

          <a
            href="/waitlist"
            className="reveal mt-8 flex h-[54px] w-full max-w-[460px] items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-mint to-mint-light text-[clamp(17px,1.12vw,20px)] font-extrabold text-black shadow-[0_10px_34px_-14px_rgba(36,255,174,0.42)] transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-[0_14px_46px_-16px_rgba(36,255,174,0.58)] active:scale-[0.99] sm:h-[60px]"
            style={{ animationDelay: '0.28s' }}
          >
            Get early access
            <ArrowRight size={20} strokeWidth={2.8} aria-hidden="true" />
          </a>

          <p
            className="reveal mt-4 text-[clamp(13px,0.9vw,17px)] font-medium text-white/45"
            style={{ animationDelay: '0.38s' }}
          >
            *Android and iOS apps coming soon.
          </p>
        </div>

        {/* ---- Right: radar ---- */}
        <div className="reveal-chart w-full max-w-[760px] xl:max-w-none">
          <AnimatedRadarChart />
        </div>
      </div>
    </section>
  )
}
