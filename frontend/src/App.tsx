import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problems from './components/Problems'
import GlobalBackground from './components/GlobalBackground'
import CommandExamplesSection from './components/CommandExamplesSection'
import KeyFeaturesSection from './components/KeyFeaturesSection'
import FaqSection from './components/FaqSection'
import FinalCTASection from './components/FinalCTASection'
import Footer from './components/Footer'
import WaitlistPage from './components/WaitlistPage'

export default function App() {
  const isWaitlistPage =
    typeof window !== 'undefined' && window.location.pathname === '/waitlist'

  if (isWaitlistPage) {
    return <WaitlistPage />
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#f7fbfc]">
      <GlobalBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Problems />
        <KeyFeaturesSection />
        <CommandExamplesSection />
        <FaqSection />
        <FinalCTASection />
        <Footer />
      </main>
    </div>
  )
}
