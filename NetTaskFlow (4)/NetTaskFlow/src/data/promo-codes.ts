export const promoCodes = [
  // American Airlines
  { airline: "AA", code: "SAVE25NOW", discount: "25% OFF", description: "Valid for domestic flights until Dec 31" },
  { airline: "AA", code: "WEEKEND50", discount: "$50 OFF", description: "Weekend bookings over $300" },
  { airline: "AA", code: "FAMILY30", discount: "30% OFF", description: "Family bookings (3+ passengers)" },
  { airline: "AA", code: "STUDENT15", discount: "15% OFF", description: "Valid student ID required" },
  { airline: "AA", code: "MILE200", discount: "200 MILES", description: "Bonus miles for new members" },
  { airline: "AA", code: "BUSINESS40", discount: "40% OFF", description: "Business class international flights" },
  { airline: "AA", code: "EARLY75", discount: "$75 OFF", description: "Book 45 days in advance" },
  
  // Delta Airlines
  { airline: "DL", code: "DELTASAVE", discount: "20% OFF", description: "International flights booked 30 days ahead" },
  { airline: "DL", code: "BIZTRAVEL", discount: "$100 OFF", description: "Business class bookings over $1000" },
  { airline: "DL", code: "SUMMER40", discount: "40% OFF", description: "Summer vacation packages" },
  { airline: "DL", code: "LOYALTY10", discount: "10% OFF", description: "SkyMiles members only" },
  { airline: "DL", code: "EARLYBIRD", discount: "$75 OFF", description: "Book by midnight for extra savings" },
  { airline: "DL", code: "COMFORT30", discount: "30% OFF", description: "Comfort+ seat upgrades" },
  { airline: "DL", code: "FLASH120", discount: "$120 OFF", description: "48-hour flash sale" },
  
  // United Airlines
  { airline: "UA", code: "UNITED35", discount: "35% OFF", description: "Valid for select routes until Nov 30" },
  { airline: "UA", code: "COUPLES20", discount: "20% OFF", description: "Round-trip bookings for 2 passengers" },
  { airline: "UA", code: "FLASH60", discount: "$60 OFF", description: "Flash sale - limited time offer" },
  { airline: "UA", code: "MILITARY25", discount: "25% OFF", description: "Active and retired military personnel" },
  { airline: "UA", code: "EXPLORER", discount: "15% OFF", description: "Adventure destinations worldwide" },
  { airline: "UA", code: "PREMIER50", discount: "$50 OFF", description: "Premier members exclusive" },
  { airline: "UA", code: "UPGRADE45", discount: "45% OFF", description: "Economy Plus upgrades" },
  
  // Southwest Airlines
  { airline: "WN", code: "SOUTHWEST", discount: "$80 OFF", description: "Rapid Rewards members special" },
  { airline: "WN", code: "FRIENDS", discount: "Buy 1 Get 1 50% OFF", description: "Travel with friends discount" },
  { airline: "WN", code: "HOLIDAY45", discount: "45% OFF", description: "Holiday travel packages" },
  { airline: "WN", code: "WANNA50", discount: "$50 OFF", description: "Wanna Get Away fares" },
  { airline: "WN", code: "POINTS2X", discount: "2X POINTS", description: "Double points on all flights" },
  { airline: "WN", code: "COMPANION", discount: "Companion Flies Free", description: "Valid for A-List members" },
  { airline: "WN", code: "SALE35", discount: "35% OFF", description: "Weekend sale special" },
  
  // JetBlue Airways
  { airline: "B6", code: "JETBLUE30", discount: "30% OFF", description: "Cross-country flights" },
  { airline: "B6", code: "MINT100", discount: "$100 OFF", description: "Mint class upgrades" },
  { airline: "B6", code: "TRUEBLUE", discount: "25% OFF", description: "TrueBlue member exclusive" },
  { airline: "B6", code: "LASTMIN", discount: "$40 OFF", description: "Last minute bookings within 7 days" },
  { airline: "B6", code: "EVEN50", discount: "$50 OFF", description: "Even More Space seats" },
  { airline: "B6", code: "BUNDLE20", discount: "20% OFF", description: "Vacation bundle packages" },
  
  // British Airways
  { airline: "BA", code: "BRITISHAIR", discount: "£75 OFF", description: "Transatlantic flights from UK" },
  { airline: "BA", code: "EXECUTIVE", discount: "£200 OFF", description: "Executive Club members" },
  { airline: "BA", code: "CITYBREAK", discount: "35% OFF", description: "European city breaks" },
  { airline: "BA", code: "AVIOS500", discount: "500 AVIOS", description: "Bonus Avios for online bookings" },
  { airline: "BA", code: "PREMIUM150", discount: "£150 OFF", description: "Premium Economy flights" },
  { airline: "BA", code: "CLUB25", discount: "25% OFF", description: "Club World business class" },
  
  // Lufthansa
  { airline: "LH", code: "LUFTHANSA", discount: "€100 OFF", description: "Flights to/from Germany" },
  { airline: "LH", code: "MILES50", discount: "50% OFF", description: "Miles & More award flights" },
  { airline: "LH", code: "BUSINESS", discount: "€300 OFF", description: "Business class to Europe" },
  { airline: "LH", code: "GRUPPE", discount: "20% OFF", description: "Group bookings (6+ passengers)" },
  { airline: "LH", code: "SENATOR", discount: "€200 OFF", description: "Senator status members" },
  { airline: "LH", code: "SELECT30", discount: "30% OFF", description: "Select European destinations" },
  
  // Air France
  { airline: "AF", code: "AIRFRANCE", discount: "€80 OFF", description: "Flights from Paris CDG" },
  { airline: "AF", code: "SKYTEAM", discount: "25% OFF", description: "SkyTeam alliance partners" },
  { airline: "AF", code: "PREMIUM", discount: "€150 OFF", description: "Premium Economy upgrades" },
  { airline: "AF", code: "FLYBLUE", discount: "15% OFF", description: "Flying Blue program members" },
  { airline: "AF", code: "LALOUNGE", discount: "€120 OFF", description: "La Première first class" },
  { airline: "AF", code: "EUROPE40", discount: "40% OFF", description: "European destinations" },
  
  // Emirates
  { airline: "EK", code: "EMIRATES", discount: "$200 OFF", description: "First and Business Class" },
  { airline: "EK", code: "DUBAI50", discount: "$50 OFF", description: "Flights via Dubai" },
  { airline: "EK", code: "SKYWARDS", discount: "Double Miles", description: "Skywards members bonus" },
  { airline: "EK", code: "FAMILY25", discount: "25% OFF", description: "Family travel packages" },
  { airline: "EK", code: "SUITE400", discount: "$400 OFF", description: "First Class suites" },
  { airline: "EK", code: "GOLD150", discount: "$150 OFF", description: "Gold members exclusive" },
  
  // Qatar Airways
  { airline: "QR", code: "QATAR40", discount: "40% OFF", description: "Flights to Middle East and Asia" },
  { airline: "QR", code: "PRIVILEGE", discount: "$250 OFF", description: "Privilege Club members" },
  { airline: "QR", code: "QSUITE", discount: "$400 OFF", description: "QSuite Business Class" },
  { airline: "QR", code: "STOPOVER", discount: "Free Stopover", description: "Free Doha stopover package" },
  { airline: "QR", code: "FIRST500", discount: "$500 OFF", description: "First Class cabin" },
  { airline: "QR", code: "PLATINUM", discount: "$300 OFF", description: "Platinum members only" }
];