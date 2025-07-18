import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PromoCodes from "@/pages/promo-codes";
import BaggageRules from "@/pages/baggage-rules";
import VisaChecker from "@/pages/visa-checker";
import DelayRadar from "@/pages/delay-radar";
import FeeExplorer from "@/pages/fee-explorer";
import LayoverPlanner from "@/pages/layover-planner";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/promo-codes" component={PromoCodes} />
      <Route path="/baggage-rules" component={BaggageRules} />
      <Route path="/visa-checker" component={VisaChecker} />
      <Route path="/delay-radar" component={DelayRadar} />
      <Route path="/fee-explorer" component={FeeExplorer} />
      <Route path="/layover-planner" component={LayoverPlanner} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
