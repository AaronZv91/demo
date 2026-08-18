export type CompanyCard = {
  kicker: string;
  title: string;
  body: string;
};

export type CompanyEntry = {
  index: number;
  id: string;
  name: string;
  short: string;
  slogan: string;
  logo: string;
  photo?: string;
  /** Full-bleed service photo behind the frosted-glass layer */
  backdrop: string;
  href?: string;
  accentFrom: string;
  accentTo: string;
  founded: string;
  location: string;
  hours: string;
  phone: string;
  email: string;
  mission: string;
  milestones: { year: string; label: string }[];
  stats: { value: string; label: string }[];
  cards: [CompanyCard, CompanyCard, CompanyCard, CompanyCard];
};

const PLACEHOLDER_LOGO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="28" fill="#15161f"/><circle cx="60" cy="60" r="34" fill="none" stroke="#7c5cff" stroke-width="6"/><text x="60" y="68" text-anchor="middle" fill="#fff" font-size="22" font-family="system-ui">WT</text></svg>`,
  );

function logo(path: string) {
  return path || PLACEHOLDER_LOGO;
}

const HQ = {
  location: "8 Gul Circle, Singapore 629564",
  hours: "Mon–Fri 08:30–18:00",
  phone: "+65 6559 8988",
  email: "contact-us@wts.com.sg",
};

/** Design02: parent 0 + eight units (1–8). Missing assets fall back gracefully. */
export const companyData: CompanyEntry[] = [
  {
    index: 0,
    id: "group",
    name: "Woodlands Group",
    short: "Group",
    slogan: "Moving Singapore forward since 1974",
    logo: logo("/brands/group.png"),
    backdrop: "/scroll-frames/frame-0172.jpg",
    accentFrom: "#ff2d78",
    accentTo: "#7c5cff",
    founded: "1974",
    ...HQ,
    mission:
      "A homegrown Singapore group spanning transport, travel, engineering, hospitality, pawnbroking, technology, and commercial laundry — built on reliability, safety, and long-term partnership. Founded by Mr Voo Soon Sang, Mr Lim Chin Hwee, Mr Sia Leong Bee and partners.",
    milestones: [
      { year: "1974", label: "Company founded in Singapore" },
      { year: "1989", label: "WTS Travel & Tours incorporated" },
      { year: "2005", label: "Engineering and Flash Laundry arms" },
      { year: "2010", label: "Enterprise 50 award" },
      { year: "2023", label: "The Bus Collective opens in Changi" },
      { year: "2024", label: "50 years of connections and beyond" },
    ],
    stats: [
      { value: "50+", label: "Years of stewardship" },
      { value: "800+", label: "People and vehicles" },
      { value: "8", label: "Operating brands" },
      { value: "1974", label: "Founded in Singapore" },
    ],
    cards: [
      {
        kicker: "Mission",
        title: "One ecosystem",
        body: "Connect people, cargo, and communities through diversified operating companies under a single group standard.",
      },
      {
        kicker: "Scale",
        title: "National backbone",
        body: "Hundreds of vehicles and people supporting Singapore’s transport ecosystem every day.",
      },
      {
        kicker: "Values",
        title: "Reliable. Capable. Forward.",
        body: "Hope looks practical: on-time arrivals, clear communication, and a horizon that stays open.",
      },
      {
        kicker: "HQ",
        title: "8 Gul Circle",
        body: "+65 6559 8988 · contact-us@wts.com.sg · Singapore 629564",
      },
    ],
  },
  {
    index: 1,
    id: "transport",
    name: "Woodlands Transport",
    short: "Transport",
    slogan: "Singapore’s largest private bus & construction fleet",
    logo: logo("/brands/transport.png"),
    photo: "/brands/transport-photo.jpg",
    backdrop: "/brands/bg/transport.jpg",
    href: "https://www.woodlandstransport.com.sg/",
    accentFrom: "#ff3b6b",
    accentTo: "#ffb347",
    founded: "1974",
    ...HQ,
    mission:
      "Founded in 1974 — Singapore’s largest private operator for school and corporate bus charters, airport partnerships, and heavy construction haulage. Fleet includes buses, tour coaches, lorry cranes, prime movers, mixers, cement tankers, and tipper trucks.",
    milestones: [
      { year: "1974", label: "Transport beginnings" },
      { year: "1978", label: "Construction haulage added" },
      { year: "2010", label: "Enterprise 50 award" },
      { year: "2024", label: "50-year fleet stewardship" },
    ],
    stats: [
      { value: "800+", label: "Fleet vehicles" },
      { value: "800+", label: "Employees" },
      { value: "24/7", label: "Construction logistics" },
      { value: "CAG", label: "Airport partner" },
    ],
    cards: [
      {
        kicker: "Bus charter",
        title: "People on time",
        body: "Schools, MNCs, agencies, factories, and Changi Airport Group — scheduled, trained, dependable.",
      },
      {
        kicker: "Coaches",
        title: "Tours & events",
        body: "Comfortable coaches for group travel, inbound itineraries, and peak event days.",
      },
      {
        kicker: "Haulage",
        title: "GPS-enabled sites",
        body: "Cement tankers, mixers, lorry cranes, prime movers — monitored for national projects.",
      },
      {
        kicker: "Projects",
        title: "Infrastructure partners",
        body: "MRT corridors, housing, and integrated resorts — heavy materials moved with precision.",
      },
    ],
  },
  {
    index: 2,
    id: "travel",
    name: "WTS Travel",
    short: "Travel",
    slogan: "Cruises, tours, tickets & ground arrangements",
    logo: logo("/brands/travel.png"),
    backdrop: "/scroll-frames/frame-0084.jpg",
    href: "https://wtstravel.com.sg/",
    accentFrom: "#00e5ff",
    accentTo: "#3b82f6",
    founded: "1989",
    location: "Branches islandwide, Singapore",
    hours: "Daily 10:00–19:00",
    phone: "+65 6559 8988",
    email: "contact-us@wts.com.sg",
    mission:
      "Incorporated in 1989, WTS Travel & Tours is an established Singapore agency for cruises, overseas packages, air-ticketing, hotels, inbound tours, and more than a decade of MICE and incentive groups.",
    milestones: [
      { year: "1989", label: "Travel arm incorporated" },
      { year: "1998", label: "Inbound Singapore desk opens" },
      { year: "2012", label: "MICE & incentive practice" },
      { year: "2024", label: "Islandwide branch network" },
    ],
    stats: [
      { value: "1989", label: "Established" },
      { value: "MICE", label: "Incentive groups" },
      { value: "5+", label: "Service lines" },
      { value: "SG", label: "Branch network" },
    ],
    cards: [
      {
        kicker: "Leisure",
        title: "Tours & cruises",
        body: "Asia to Europe by air, coach, and cruise — itineraries with trained consultants.",
      },
      {
        kicker: "Retail",
        title: "Tickets & hotels",
        body: "Worldwide air-ticketing and hotel reservations for individuals and groups.",
      },
      {
        kicker: "Inbound",
        title: "Singapore on the ground",
        body: "Coaches, attractions, and itineraries for visitors discovering the island.",
      },
      {
        kicker: "Corporate",
        title: "Incentive & MICE",
        body: "Decade-plus of corporate incentive tours and conference logistics.",
      },
    ],
  },
  {
    index: 3,
    id: "engineering",
    name: "WTS Engineering",
    short: "Engineering",
    slogan: "Heavy vehicle maintenance & fleet care",
    logo: logo("/brands/engineering.png"),
    backdrop: "/scroll-frames/frame-0120.jpg",
    href: "https://www.wtsengineering.com.sg/",
    accentFrom: "#a3ff12",
    accentTo: "#22d3ee",
    founded: "2005",
    location: "Gul Circle & Kaki Bukit, Singapore",
    hours: "Workshops 08:00–18:00 · Recovery 24/7",
    phone: "+65 6559 8988",
    email: "contact-us@wts.com.sg",
    mission:
      "Set up in 2005 as the group’s engineering arm — workshops at Gul Circle and Kaki Bukit for preventive care, accident repairs, electrical and air-con work, spray painting, tyres, and islandwide recovery.",
    milestones: [
      { year: "2005", label: "Engineering subsidiary formed" },
      { year: "2009", label: "Kaki Bukit workshop opens" },
      { year: "2016", label: "24/7 recovery roster" },
      { year: "2023", label: "Online booking for fleets" },
    ],
    stats: [
      { value: "2", label: "Workshops" },
      { value: "24/7", label: "Island recovery" },
      { value: "2005", label: "Established" },
      { value: "1-stop", label: "Heavy-vehicle care" },
    ],
    cards: [
      {
        kicker: "Workshop",
        title: "Full service stack",
        body: "Preventive, electrical, air-con, bodywork, spray painting, tyres, online booking.",
      },
      {
        kicker: "Fleets",
        title: "Built for uptime",
        body: "One-stop heavy vehicle care so downtime does not cascade into lost days.",
      },
      {
        kicker: "Coverage",
        title: "West and east",
        body: "Gul Circle and Kaki Bukit — island response without a long deadhead.",
      },
      {
        kicker: "Recovery",
        title: "Road-ready overnight",
        body: "Keep commercial vehicles certified, painted, and dispatched on shift.",
      },
    ],
  },
  {
    index: 4,
    id: "cashbox",
    name: "CashBox",
    short: "CashBox",
    slogan: "Trusted pawnbroking & short-term loans",
    logo: logo("/brands/cashbox.png"),
    backdrop: "/scroll-frames/frame-0080.jpg",
    accentFrom: "#fbbf24",
    accentTo: "#f59e0b",
    founded: "2012",
    location: "Outlets islandwide, Singapore",
    hours: "Daily 10:00–21:00",
    phone: "+65 6559 8988",
    email: "contact-us@wts.com.sg",
    mission:
      "CashBox is the group’s licensed pawnbroking arm — a one-stop provider of short-term loans against valuables, with islandwide storefronts and trained valuation teams who treat personal finance with privacy and clarity.",
    milestones: [
      { year: "2012", label: "First CashBox outlet opens" },
      { year: "2016", label: "Islandwide store network" },
      { year: "2020", label: "Digital valuation booking" },
      { year: "2024", label: "Neighbourhood retail refresh" },
    ],
    stats: [
      { value: "2012", label: "Retail launch" },
      { value: "SG", label: "Islandwide outlets" },
      { value: "Licensed", label: "Pawnbroking" },
      { value: "24h", label: "Valuation care" },
    ],
    cards: [
      {
        kicker: "Pawn",
        title: "Regulated pledges",
        body: "Licensed pawn services with clear processes and secure handling of valuables.",
      },
      {
        kicker: "Loans",
        title: "Short-term liquidity",
        body: "Personal financing designed for individuals who need a discreet, fast horizon.",
      },
      {
        kicker: "Valuation",
        title: "Jewellery, with care",
        body: "Trained teams assess pledges against consistent, professional standards.",
      },
      {
        kicker: "Access",
        title: "Near home or work",
        body: "Convenient storefronts so customers reach a branch without a long trip.",
      },
    ],
  },
  {
    index: 5,
    id: "bus-collective",
    name: "The Bus Collective",
    short: "Bus Collective",
    slogan: "SEA’s first upcycled bus resort hotel",
    logo: logo("/brands/bus-collective.png"),
    photo: "/brands/bus-collective-photo.jpg",
    backdrop: "/brands/bg/bus-collective.jpg",
    href: "https://www.thebuscollective.com/",
    accentFrom: "#c084fc",
    accentTo: "#fb7185",
    founded: "2023",
    location: "5 Telok Paku Road, Singapore 508883",
    hours: "Check-in 15:00 · Check-out 12:00",
    phone: "+65 6559 8988",
    email: "stay@thebuscollective.com",
    mission:
      "Opened in 2023 in Changi Village — Southeast Asia’s first resort hotel rebuilt from decommissioned public buses. About 20 king suites (~45㎡) with patio BBQ, hawker culture next door, and a circular-economy staycation story.",
    milestones: [
      { year: "2021", label: "Concept and bus salvage" },
      { year: "2022", label: "Changi Village site works" },
      { year: "2023", label: "Grand opening" },
      { year: "2025", label: "Coastal experience desk" },
    ],
    stats: [
      { value: "20", label: "Bus suites" },
      { value: "45㎡", label: "Typical room" },
      { value: "2023", label: "Opened" },
      { value: "Changi", label: "Village & beach" },
    ],
    cards: [
      {
        kicker: "Stay",
        title: "Upcycled suites",
        body: "King rooms retaining bus character — windows, cabin cues — with modern comfort.",
      },
      {
        kicker: "Place",
        title: "Changi Village",
        body: "5 Telok Paku Road — hawker culture, beach, and the quieter east-side rhythm.",
      },
      {
        kicker: "Patio",
        title: "BBQ evenings",
        body: "Private outdoor spaces designed for couples and small groups.",
      },
      {
        kicker: "Desk",
        title: "Local discovery",
        body: "Cycling, coastal, and neighbourhood itineraries booked on property.",
      },
    ],
  },
  {
    index: 6,
    id: "plotigo",
    name: "Plotigo",
    short: "Plotigo",
    slogan: "Technology arm for smart mobility & AI",
    logo: logo("/brands/plotigo.png"),
    backdrop: "/scroll-frames/frame-0105.jpg",
    href: "https://plotigo.app/",
    accentFrom: "#22d3ee",
    accentTo: "#818cf8",
    founded: "2020",
    location: "8 Gul Circle, Singapore 629564",
    hours: "Mon–Fri 09:00–18:00",
    phone: "+65 9650 6326",
    email: "it@plotigo.app",
    mission:
      "Plotigo is the group’s technology company — born from real transport operations. School-bus parent apps, booking and dispatch, route optimisation, gantry access, kiosk ticketing, and AI-assisted surveillance for fleets and facilities.",
    milestones: [
      { year: "2020", label: "Tech arm launches" },
      { year: "2021", label: "School-bus parent PWA" },
      { year: "2023", label: "AI route & watch stack" },
      { year: "2025", label: "Facility access products" },
    ],
    stats: [
      { value: "2020", label: "Founded" },
      { value: "AI", label: "Route & watch" },
      { value: "PWA", label: "Parent apps" },
      { value: "Ops", label: "Born on the road" },
    ],
    cards: [
      {
        kicker: "Dispatch",
        title: "Booking platforms",
        body: "Airport and corporate ride systems with live driver tracking and admin control.",
      },
      {
        kicker: "School",
        title: "Parent apps",
        body: "Registration, GPS tracking, payments, and dashboards for student fleets.",
      },
      {
        kicker: "Intelligence",
        title: "ETA & pooling",
        body: "Real-time visibility and AI-assisted routing for coordinated fleets.",
      },
      {
        kicker: "Sites",
        title: "Access & watch",
        body: "Gantry control, kiosk ticketing, and event detection for safer facilities.",
      },
    ],
  },
  {
    index: 7,
    id: "flash",
    name: "Flash Laundry",
    short: "Flash Laundry",
    slogan: "Commercial laundry for hospitality",
    logo: logo("/brands/flash.png"),
    backdrop: "/scroll-frames/frame-0092.jpg",
    accentFrom: "#38bdf8",
    accentTo: "#34d399",
    founded: "2005",
    location: "Singapore",
    hours: "Mon–Sat 07:00–19:00",
    phone: "+65 6559 8988",
    email: "contact-us@wts.com.sg",
    mission:
      "Established in 2005, Flash Laundry specialises in commercial laundry and dry cleaning for hotels, F&B, and institutions. Pickup and return rhythms follow occupancy — backed by the group’s logistics DNA.",
    milestones: [
      { year: "2005", label: "Laundry established" },
      { year: "2011", label: "Hospitality linen programmes" },
      { year: "2018", label: "Night-turn finishing shifts" },
      { year: "2024", label: "Group last-mile coordination" },
    ],
    stats: [
      { value: "2005", label: "Established" },
      { value: "HORECA", label: "Core sector" },
      { value: "Night", label: "Finishing shifts" },
      { value: "Door", label: "Pickup & return" },
    ],
    cards: [
      {
        kicker: "Plant",
        title: "Wash & finishing",
        body: "High-volume laundry and garment care tuned for hotels and institutions.",
      },
      {
        kicker: "Timing",
        title: "Guest-facing clocks",
        body: "Pickup and return rhythms that match check-in and peak nights.",
      },
      {
        kicker: "Programmes",
        title: "Linen on cycle",
        body: "Scheduled runs so operators stay stocked without over-inventory.",
      },
      {
        kicker: "Logistics",
        title: "Last-mile linen",
        body: "Backed by Woodlands transport know-how for reliable hospitality turns.",
      },
    ],
  },
  {
    index: 8,
    id: "haveleh",
    name: "HaveLeh",
    short: "HaveLeh",
    slogan: "Personal & business protection, grouped with care",
    logo: logo("/brands/haveleh.png"),
    backdrop: "/scroll-frames/frame-0098.jpg",
    accentFrom: "#fb7185",
    accentTo: "#f97316",
    founded: "2021",
    location: "8 Gul Circle, Singapore 629564",
    hours: "Mon–Fri 09:00–18:00",
    phone: "+65 6559 8988",
    email: "contact-us@wts.com.sg",
    mission:
      "HaveLeh offers personal and business insurance — health, auto, and liability — for individuals, families, professionals, and SMEs. Advice sits beside the group’s transport, travel, and daily-life companies.",
    milestones: [
      { year: "2021", label: "Protection desk opens" },
      { year: "2022", label: "SME liability suite" },
      { year: "2023", label: "Family health plans" },
      { year: "2025", label: "Group-wide staff cover" },
    ],
    stats: [
      { value: "2021", label: "Practice opens" },
      { value: "SME", label: "Business cover" },
      { value: "LIFE", label: "Family plans" },
      { value: "AUTO", label: "Motor & liability" },
    ],
    cards: [
      {
        kicker: "People",
        title: "Health & life",
        body: "Cover for individuals and families who want a trusted, local adviser.",
      },
      {
        kicker: "Motor",
        title: "Auto & liability",
        body: "Protection that understands fleets, company cars, and daily commuting.",
      },
      {
        kicker: "SME",
        title: "Business cover",
        body: "Liability and operations cover for professionals and smaller firms.",
      },
      {
        kicker: "Group",
        title: "One conversation",
        body: "Insurance sitting beside transport, travel, and everyday Woodlands services.",
      },
    ],
  },
];

export const PARENT = companyData[0];
export const SUBSIDIARIES = companyData.slice(1);
export const SECTOR_COUNT = SUBSIDIARIES.length;
export const SECTOR_DEG = 360 / SECTOR_COUNT;
