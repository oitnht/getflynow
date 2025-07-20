import React from 'react'
import { Router, Route, Switch } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import './index.css'

// Import your existing pages
import Home from './pages/home'
import BaggageRules from './pages/baggage-rules'
import ContactUs from './pages/contact-us'
import DelayRadar from './pages/delay-radar'
import FeeExplorer from './pages/fee-explorer'
import HelpCenter from './pages/help-center'
import LayoverPlanner from './pages/layover-planner'
import NotFound from './pages/not-found'
import PrivacyPolicy from './pages/privacy-policy'
import PromoFinder from './pages/promo-finder'
import TermsOfService from './pages/terms-of-service'
import VisaChecker from './pages/visa-checker'
import CurrencyConverter from './pages/currency-converter'
import WeatherForecast from './pages/weather-forecast'

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/baggage-rules" component={BaggageRules} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/delay-radar" component={DelayRadar} />
            <Route path="/fee-explorer" component={FeeExplorer} />
            <Route path="/help-center" component={HelpCenter} />
            <Route path="/layover-planner" component={LayoverPlanner} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/promo-finder" component={PromoFinder} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/visa-checker" component={VisaChecker} />
            <Route path="/currency-converter" component={CurrencyConverter} />
            <Route path="/weather-forecast" component={WeatherForecast} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App