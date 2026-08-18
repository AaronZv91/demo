export type BusinessNode = {
  id: string;
  index: number;
  name: string;
  short: string;
  tagline: string;
  summary: string;
  highlight: string;
  services: { title: string; detail: string }[];
  logo: string;
  photo?: string;
  href?: string;
  phone?: string;
  email?: string;
  address?: string;
  /** Scroll progress 0–1 where this node becomes active during scrub */
  progress: number;
};

const HQ = {
  phone: "+65 6559 8988",
  email: "contact-us@wts.com.sg",
  address: "No. 8 Gul Circle, Singapore 629564",
};

/** Woodlands Group hierarchy from 资源/ (0 parent + 1–7 units) */
export const BUSINESSES: BusinessNode[] = [
  {
    id: "group",
    index: 0,
    name: "Woodlands Group",
    short: "Group",
    tagline: "Moving Singapore forward since 1974",
    summary:
      "A homegrown Singapore group spanning transport, travel, engineering, hospitality, pawnbroking, technology, and commercial laundry.",
    highlight: "One ecosystem. Many capabilities.",
    services: [
      {
        title: "Diversified portfolio",
        detail: "Operating companies that serve mobility, travel, and daily needs.",
      },
    ],
    logo: "/brands/group.png",
    ...HQ,
    progress: 0,
  },
  {
    id: "transport",
    index: 1,
    name: "Woodlands Transport",
    short: "Transport",
    tagline: "Singapore’s largest private bus & construction fleet",
    summary:
      "Founded in 1974, Woodlands Transport is Singapore’s largest private transport operator — with hundreds of buses and heavy vehicles on the road daily. We partner with schools, MNCs, government agencies, factories, and Changi Airport Group to move people safely, while our construction fleet supports major infrastructure with cement tankers, mixer trucks, lorry cranes, and trailers.",
    highlight:
      "50+ years of keeping Singapore moving — people by day, materials by project.",
    services: [
      {
        title: "Bus charter & corporate mobility",
        detail:
          "School buses, factory shuttles, MNC and agency charters, and airport-linked services with trained drivers and scheduled reliability.",
      },
      {
        title: "Tour coaches",
        detail:
          "Comfortable coaches for group travel, events, and inbound itineraries across Singapore.",
      },
      {
        title: "Construction haulage",
        detail:
          "Cement tankers, ready-mix mixer trucks, lorry cranes, prime movers & trailers, and Roll-On Roll-Off for scrap and site logistics.",
      },
      {
        title: "National project support",
        detail:
          "Proven capacity for MRT corridors, housing, and integrated resort deliveries with GPS-enabled monitoring.",
      },
    ],
    logo: "/brands/transport.png",
    photo: "/brands/transport-photo.jpg",
    href: "https://www.woodlandstransport.com.sg/",
    ...HQ,
    progress: 0.14,
  },
  {
    id: "travel",
    index: 2,
    name: "WTS Travel",
    short: "Travel",
    tagline: "Cruises, tours, tickets & ground arrangements",
    summary:
      "Incorporated in 1989, WTS Travel & Tours is one of Singapore’s established travel agencies — serving leisure travellers, inbound visitors, and corporate groups. From Asia–Europe packages and cruises to air tickets, hotels, and coach tours, the team designs journeys with trained consultants and islandwide branch access.",
    highlight:
      "Leisure, inbound, and MICE — travel crafted with local expertise and global reach.",
    services: [
      {
        title: "Outbound packages & cruises",
        detail:
          "Curated tours by air, coach, and cruise across Asia, Europe, and beyond.",
      },
      {
        title: "Air-ticketing & hotels",
        detail:
          "Worldwide ticketing and hotel reservations for individuals and groups.",
      },
      {
        title: "Inbound Singapore experiences",
        detail:
          "Ground transport, attractions, and itineraries for visitors discovering Singapore.",
      },
      {
        title: "MICE & incentive groups",
        detail:
          "Decade-plus experience handling corporate incentives, conferences, and group logistics.",
      },
    ],
    logo: "/brands/travel.png",
    href: "https://wtstravel.com.sg/",
    phone: "+65 6559 8988",
    email: "contact-us@wts.com.sg",
    address: "Branches strategically located across Singapore",
    progress: 0.28,
  },
  {
    id: "engineering",
    index: 3,
    name: "WTS Engineering",
    short: "Engineering",
    tagline: "Heavy vehicle maintenance & fleet care",
    summary:
      "Set up in 2005 as the group’s engineering arm, WTS Engineering runs workshops at Gul Circle and Kaki Bukit. We keep heavy fleets roadworthy with preventive maintenance, accident repairs, electrical and air-con work, spray painting, tyre service, and 24/7 islandwide recovery — a one-stop partner for fleet owners who cannot afford downtime.",
    highlight:
      "Two workshops. One promise — keep heavy vehicles safe, certified, and ready.",
    services: [
      {
        title: "Preventive & corrective maintenance",
        detail:
          "Scheduled servicing and fault repairs that protect uptime for commercial fleets.",
      },
      {
        title: "Bodywork & spray painting",
        detail:
          "Accident repairs, panel work, and finishing to return vehicles to service condition.",
      },
      {
        title: "Electrical & air-con systems",
        detail:
          "Diagnostics and repair for climate and electrical systems on heavy vehicles.",
      },
      {
        title: "24/7 recovery",
        detail:
          "Islandwide recovery support so breakdowns do not cascade into operational loss.",
      },
    ],
    logo: "/brands/engineering.png",
    href: "https://www.wtsengineering.com.sg/",
    phone: "+65 6559 8988",
    email: "contact-us@wts.com.sg",
    address: "Workshops at Gul Circle & Kaki Bukit, Singapore",
    progress: 0.42,
  },
  {
    id: "cashbox",
    index: 4,
    name: "CashBox",
    short: "CashBox",
    tagline: "Trusted pawnbroking & short-term loans",
    summary:
      "CashBox is the group’s pawnbroking subsidiary — a licensed, customer-focused network offering short-term loans against valuables. With outlets across Singapore, CashBox aims to make financing accessible, transparent, and handled by trained staff who understand the sensitivity of personal lending.",
    highlight:
      "Islandwide outlets. Professional valuation. Short-term support when you need it.",
    services: [
      {
        title: "Licensed pawnbroking",
        detail:
          "Regulated pawn services with clear processes and secure handling of pledged items.",
      },
      {
        title: "Short-term personal loans",
        detail:
          "Flexible short-term financing options designed for individuals who need quick liquidity.",
      },
      {
        title: "Professional valuation",
        detail:
          "Trained teams assess jewellery and valuables with care and consistency.",
      },
      {
        title: "Convenient access",
        detail:
          "Multiple storefronts islandwide so customers can reach a branch near home or work.",
      },
    ],
    logo: "/brands/cashbox.png",
    phone: "+65 6559 8988",
    email: "jiawoei91@gmail.com",
    address: "Outlets islandwide across Singapore",
    progress: 0.56,
  },
  {
    id: "bus-collective",
    index: 5,
    name: "The Bus Collective",
    short: "Bus Collective",
    tagline: "SEA’s first upcycled bus resort hotel",
    summary:
      "The Bus Collective in Changi Village turns decommissioned public buses into boutique hotel suites — Southeast Asia’s first resort concept of its kind. Operated with WTS Travel’s hospitality vision, the property offers about 20 upcycled rooms on a spacious seaside site, inviting guests to slow down, explore Changi’s food and nature, and experience sustainability made tangible.",
    highlight:
      "Retired buses. Reborn as suites. A staycation with a story.",
    services: [
      {
        title: "Upcycled bus suites",
        detail:
          "Around 45 sqm rooms retaining bus character — windows, cabin cues — with modern comfort.",
      },
      {
        title: "Changi Village location",
        detail:
          "Steps from hawker culture, beach, and the quieter east-side rhythm of Singapore.",
      },
      {
        title: "Private patio experiences",
        detail:
          "BBQ-ready outdoor spaces and stay packages designed for couples and small groups.",
      },
      {
        title: "Tours & local discovery",
        detail:
          "On-site experience desk for cycling, coastal, and neighbourhood itineraries.",
      },
    ],
    logo: "/brands/bus-collective.png",
    photo: "/brands/bus-collective-photo.jpg",
    href: "https://www.thebuscollective.com/",
    phone: "+65 6559 8988",
    email: "jiawoei91@gmail.com",
    address: "5 Telok Paku Road, Singapore 508883",
    progress: 0.7,
  },
  {
    id: "plotigo",
    index: 6,
    name: "Plotigo",
    short: "Plotigo",
    tagline: "Technology arm for smart mobility & AI",
    summary:
      "Plotigo is the group’s technology company — born from real transport operations and expanded into digital products for mobility and beyond. From school-bus parent apps and booking platforms to route optimisation, access control, and AI-assisted surveillance, Plotigo builds systems that make fleets smarter and cities safer.",
    highlight:
      "Ops-born tech — software shaped by roads, routes, and real passengers.",
    services: [
      {
        title: "Smart booking & dispatch",
        detail:
          "Airport and corporate ride platforms with live driver tracking and admin control.",
      },
      {
        title: "ETA & route intelligence",
        detail:
          "Real-time fleet visibility, pooling logic, and AI-assisted routing for efficiency.",
      },
      {
        title: "Student transport apps",
        detail:
          "Parent registration, GPS tracking, payments, and admin dashboards for school fleets.",
      },
      {
        title: "AI surveillance & access",
        detail:
          "Event detection, gantry access, and kiosk ticketing integrated for secure facilities.",
      },
    ],
    logo: "/brands/plotigo.png",
    href: "https://plotigo.app/",
    phone: "+65 9650 6326",
    email: "it@plotigo.app",
    address: "8 Gul Circle, Singapore 629564",
    progress: 0.84,
  },
  {
    id: "flash",
    index: 7,
    name: "Flash Laundry",
    short: "Flash Laundry",
    tagline: "Commercial laundry for hospitality",
    summary:
      "Established in 2005, Flash Laundry specialises in commercial laundry and dry cleaning for the hospitality sector. Hotels and operators rely on consistent turnaround for linen and uniforms — backed by the group’s logistics DNA so quality and timing stay aligned with guest-facing standards.",
    highlight:
      "Hospitality linen that turns as reliably as a check-in desk.",
    services: [
      {
        title: "Commercial laundry",
        detail:
          "High-volume wash programmes tuned for hotels, F&B, and institutional clients.",
      },
      {
        title: "Dry cleaning",
        detail:
          "Care for uniforms and garments that need precision finishing.",
      },
      {
        title: "Hospitality linen cycles",
        detail:
          "Scheduled pickup and return rhythms that match room-turn and peak occupancy.",
      },
      {
        title: "Group logistics support",
        detail:
          "Operational coordination that keeps hospitality partners stocked and on time.",
      },
    ],
    logo: "/brands/flash.png",
    phone: "+65 6559 8988",
    email: "jiawoei91@gmail.com",
    address: "Singapore",
    progress: 0.9,
  },
  {
    id: "haveleh",
    index: 8,
    name: "HaveLeh",
    short: "HaveLeh",
    tagline: "Personal & business protection, grouped with care",
    summary:
      "HaveLeh offers personal and business insurance — health, auto, and liability — for individuals, families, professionals, and SMEs. Advice sits beside the group’s transport, travel, and daily-life companies.",
    highlight:
      "Protection that sits next to the journeys people already take with us.",
    services: [
      {
        title: "Health & life",
        detail:
          "Cover for individuals and families who want a trusted, local adviser.",
      },
      {
        title: "Auto & liability",
        detail:
          "Protection that understands fleets, company cars, and daily commuting.",
      },
      {
        title: "Business cover",
        detail:
          "Liability and operations cover for professionals and smaller firms.",
      },
      {
        title: "One conversation",
        detail:
          "Insurance sitting beside transport, travel, and everyday Woodlands services.",
      },
    ],
    logo: "/brands/haveleh.png",
    phone: "+65 6559 8988",
    email: "contact-us@wts.com.sg",
    address: "8 Gul Circle, Singapore 629564",
    progress: 1,
  },
];

/** Operating units only (no Group) — evenly spaced for scroll scrub */
export const JOURNEY_NODES: BusinessNode[] = BUSINESSES.filter(
  (b) => b.index > 0,
).map((b, i, arr) => ({
  ...b,
  progress: arr.length <= 1 ? 0 : i / (arr.length - 1),
}));

export const CONTACT = {
  email: "jiawoei91@gmail.com",
  phone: "+65 6559 8988",
  fax: "+65 6898 2394",
  address: "No. 8 Gul Circle, Singapore 629564",
  officialEmail: "contact-us@wts.com.sg",
};
