
import React, { useState, useEffect } from 'react'
import { Route, Router } from 'wouter'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Home from '@/pages/home'
import VisaChecker from '@/pages/visa-checker'
import PromoFinder from '@/pages/promo-finder'
import BaggageRules from '@/pages/baggage-rules'
import DelayRadar from '@/pages/delay-radar'
import FeeExplorer from '@/pages/fee-explorer'
import LayoverPlanner from '@/pages/layover-planner'
import ContactUs from '@/pages/contact-us'
import HelpCenter from '@/pages/help-center'
import PrivacyPolicy from '@/pages/privacy-policy'
import TermsOfService from '@/pages/terms-of-service'
import NotFound from '@/pages/not-found'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Route path="/" component={Home} />
            <Route path="/visa-checker" component={VisaChecker} />
            <Route path="/promo-finder" component={PromoFinder} />
            <Route path="/baggage-rules" component={BaggageRules} />
            <Route path="/delay-radar" component={DelayRadar} />
            <Route path="/fee-explorer" component={FeeExplorer} />
            <Route path="/layover-planner" component={LayoverPlanner} />
            <Route path="/contact" component={ContactUs} />
            <Route path="/help" component={HelpCenter} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/terms" component={TermsOfService} />
            <Route component={NotFound} />
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  )
}

export default App
