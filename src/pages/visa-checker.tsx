import { useState } from "react";
import { ArrowLeft, Search, FileText, ExternalLink, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CountrySelector } from "@/components/ui/country-selector";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdSenseBanner from "@/components/home/adsense-banner";
import { getCountryByCode } from "@shared/countries";

export default function VisaChecker() {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromCountry || !toCountry) return;
    
    setIsChecking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChecking(false);
  };

  // Now using CountrySelector component with search functionality for all 195+ countries

  // Dummy visa data based on country combinations
  const getVisaRequirement = (from: string, to: string) => {
    const visaFree = ['us-uk', 'us-ca', 'uk-de', 'de-fr', 'au-uk', 'ca-us'];
    const visaRequired = ['us-cn', 'in-us', 'cn-us', 'br-us', 'us-in'];
    const eVisa = ['us-in', 'uk-in', 'au-in', 'ca-in'];
    
    const combo = `${from}-${to}`;
    
    if (visaFree.includes(combo)) {
      return { type: 'visa-free', duration: '90 days', color: 'green' };
    } else if (eVisa.includes(combo)) {
      return { type: 'e-visa', duration: '30 days', color: 'blue' };
    } else if (visaRequired.includes(combo)) {
      return { type: 'visa-required', duration: 'Varies', color: 'red' };
    } else {
      return { type: 'visa-on-arrival', duration: '30 days', color: 'yellow' };
    }
  };

  // Comprehensive embassy/official travel information links
  const embassyLinks: { [key: string]: string } = {
    // Major countries with dedicated travel info sites
    us: "https://travel.state.gov/",
    gb: "https://www.gov.uk/foreign-travel-advice", 
    ca: "https://travel.gc.ca/",
    au: "https://www.smartraveller.gov.au/",
    de: "https://www.auswaertiges-amt.de/",
    fr: "https://www.diplomatie.gouv.fr/",
    jp: "https://www.mofa.go.jp/",
    in: "https://www.mea.gov.in/",
    cn: "http://www.fmprc.gov.cn/",
    br: "http://www.itamaraty.gov.br/",
    ru: "https://www.mid.ru/",
    it: "https://www.esteri.it/",
    es: "https://www.exteriores.gob.es/",
    nl: "https://www.government.nl/",
    ch: "https://www.eda.admin.ch/",
    se: "https://www.government.se/",
    no: "https://www.regjeringen.no/",
    dk: "https://um.dk/",
    fi: "https://um.fi/",
    at: "https://www.bmeia.gv.at/",
    be: "https://diplomatie.belgium.be/",
    kr: "https://www.mofa.go.kr/",
    sg: "https://www.mfa.gov.sg/",
    nz: "https://www.safetravel.govt.nz/",
    ie: "https://www.dfa.ie/",
    za: "https://www.dirco.gov.za/",
    mx: "https://www.gob.mx/sre",
    ar: "https://www.cancilleria.gob.ar/",
    cl: "https://minrel.gob.cl/",
    pe: "https://www.gob.pe/rree",
    co: "https://www.cancilleria.gov.co/",
    eg: "https://www.mfa.gov.eg/",
    sa: "https://www.mofa.gov.sa/",
    ae: "https://www.mofaic.gov.ae/",
    tr: "https://www.mfa.gov.tr/",
    il: "https://www.gov.il/en/departments/ministry_of_foreign_affairs",
    th: "https://www.mfa.go.th/",
    my: "https://www.kln.gov.my/",
    id: "https://kemlu.go.id/",
    ph: "https://www.dfa.gov.ph/",
    vn: "https://www.mofa.gov.vn/",
    pk: "https://www.mofa.gov.pk/",
    bd: "https://www.mofa.gov.bd/",
    ng: "https://foreignaffairs.gov.ng/",
    ke: "https://www.mfa.go.ke/",
    ma: "https://www.diplomatie.ma/",
    tn: "https://www.diplomatie.gov.tn/",
    ua: "https://mfa.gov.ua/",
    pl: "https://www.gov.pl/web/dyplomacja",
    cz: "https://www.mzv.cz/",
    hu: "https://kormany.hu/kulgazdasagi-es-kulugyminiszterium",
    ro: "https://www.mae.ro/",
    bg: "https://www.mfa.bg/",
    hr: "https://mvep.gov.hr/",
    rs: "https://www.mfa.gov.rs/",
    sk: "https://www.mzv.sk/",
    si: "https://www.gov.si/en/state-authorities/ministries/ministry-of-foreign-affairs/",
    lt: "https://www.urm.lt/",
    lv: "https://www.mfa.gov.lv/",
    ee: "https://vm.ee/",
    cy: "https://www.mfa.gov.cy/",
    mt: "https://foreignaffairs.gov.mt/",
    is: "https://www.government.is/ministries/ministry-for-foreign-affairs/",
    lu: "https://maee.gouvernement.lu/"
  };

  // Function to get embassy link or fallback to generic search
  const getEmbassyLink = (countryCode: string, countryName: string) => {
    return embassyLinks[countryCode] || `https://www.google.com/search?q=${encodeURIComponent(countryName + ' embassy official travel information')}`;
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      {/* Google AdSense Banner - Top */}
      <AdSenseBanner position="top" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Visa Checker</h1>
              <p className="text-gray-600">Verify visa requirements for your destination</p>
            </div>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Check Visa Requirements</CardTitle>
            <CardDescription>
              Select your citizenship and destination country to check visa requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheck} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Country</label>
                  <CountrySelector
                    value={fromCountry}
                    onValueChange={setFromCountry}
                    placeholder="Select your country"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Country</label>
                  <CountrySelector
                    value={toCountry}
                    onValueChange={setToCountry}
                    placeholder="Select destination"
                  />
                </div>
              </div>
              
              <Button type="submit" disabled={isChecking || !fromCountry || !toCountry} className="w-full">
                {isChecking ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Check Visa Requirements
              </Button>
            </form>
          </CardContent>
        </Card>

        {fromCountry && toCountry && !isChecking && (() => {
          const requirement = getVisaRequirement(fromCountry, toCountry);
          const fromCountryName = getCountryByCode(fromCountry)?.name;
          const toCountryName = getCountryByCode(toCountry)?.name;
          
          return (
            <div className="space-y-6">
              {/* Main Visa Requirement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {requirement.color === 'green' && <CheckCircle className="w-5 h-5 mr-2 text-green-600" />}
                    {requirement.color === 'red' && <XCircle className="w-5 h-5 mr-2 text-red-600" />}
                    {requirement.color === 'blue' && <FileText className="w-5 h-5 mr-2 text-blue-600" />}
                    {requirement.color === 'yellow' && <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />}
                    Visa Requirements
                  </CardTitle>
                  <CardDescription>
                    Travel from {fromCountryName} to {toCountryName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-lg ${
                    requirement.color === 'green' ? 'bg-green-50 border border-green-200' :
                    requirement.color === 'red' ? 'bg-red-50 border border-red-200' :
                    requirement.color === 'blue' ? 'bg-blue-50 border border-blue-200' :
                    'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <div className="text-center">
                      <h3 className={`text-2xl font-bold mb-2 ${
                        requirement.color === 'green' ? 'text-green-800' :
                        requirement.color === 'red' ? 'text-red-800' :
                        requirement.color === 'blue' ? 'text-blue-800' :
                        'text-yellow-800'
                      }`}>
                        {requirement.type === 'visa-free' ? 'Visa Not Required' :
                         requirement.type === 'visa-required' ? 'Visa Required' :
                         requirement.type === 'e-visa' ? 'eVisa Required' :
                         'Visa on Arrival'}
                      </h3>
                      <p className={`text-lg ${
                        requirement.color === 'green' ? 'text-green-700' :
                        requirement.color === 'red' ? 'text-red-700' :
                        requirement.color === 'blue' ? 'text-blue-700' :
                        'text-yellow-700'
                      }`}>
                        Maximum stay: {requirement.duration}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Required Documents</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Valid passport (6+ months validity)</li>
                        <li>• Return/onward ticket</li>
                        <li>• Proof of accommodation</li>
                        <li>• Sufficient funds for stay</li>
                        {requirement.type !== 'visa-free' && (
                          <>
                            <li>• Completed visa application</li>
                            <li>• Passport photos</li>
                            <li>• Travel insurance (recommended)</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Processing Information</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {requirement.type === 'visa-free' ? (
                          <>
                            <li>• No visa application needed</li>
                            <li>• Entry granted at border</li>
                            <li>• Check passport validity requirements</li>
                          </>
                        ) : requirement.type === 'e-visa' ? (
                          <>
                            <li>• Apply online 3-7 days before travel</li>
                            <li>• Processing time: 2-3 business days</li>
                            <li>• Fee: $25-50 USD</li>
                          </>
                        ) : requirement.type === 'visa-on-arrival' ? (
                          <>
                            <li>• Apply at airport upon arrival</li>
                            <li>• Processing time: 30-60 minutes</li>
                            <li>• Fee: $20-35 USD</li>
                          </>
                        ) : (
                          <>
                            <li>• Apply at embassy/consulate</li>
                            <li>• Processing time: 5-15 business days</li>
                            <li>• Fee: $50-160 USD</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Embassy/Consulate Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Official Resources</CardTitle>
                  <CardDescription>
                    Always verify requirements with official government sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      asChild
                    >
                      <a href={getEmbassyLink(toCountry, toCountryName || '')} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {toCountryName} Official Travel Info
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      asChild
                    >
                      <a href={getEmbassyLink(fromCountry, fromCountryName || '')} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {fromCountryName} Travel Advisories
                      </a>
                    </Button>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> Visa requirements can change without notice. Always verify current requirements with official embassy/consulate websites before traveling.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })()}

        {isChecking && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Checking visa requirements...</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      {/* Google AdSense Banner - Bottom */}
      <AdSenseBanner position="bottom" />
      <Footer />
    </div>
  );
}
