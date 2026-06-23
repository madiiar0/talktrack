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
import PoliciesPage, {
  AiDisclaimerPage,
  PrivacyPage,
  TermsPage,
} from './components/PoliciesPage'
import ContactPage from './components/ContactPage'
import ExportDataPage from './components/ExportDataPage'

export default function App() {
  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(/\/+$/, '') || '/'
      : '/'

  if (pathname === '/waitlist') {
    return <WaitlistPage />
  }

  if (pathname === '/policies') {
    return <PoliciesPage />
  }

  if (pathname === '/privacy') {
    return <PrivacyPage />
  }

  if (pathname === '/terms') {
    return <TermsPage />
  }

  if (pathname === '/ai-disclaimer') {
    return <AiDisclaimerPage />
  }

  if (pathname === '/contact' || pathname === '/support') {
    return <ContactPage />
  }

  if (pathname === '/export-data') {
    return <ExportDataPage />
  }

  return (
    <div className="tt-page relative isolate min-h-screen overflow-x-hidden">
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
