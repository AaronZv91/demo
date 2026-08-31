export type StoryMilestone = {
  id: string;
  num: string;
  year: string;
  decade: string;
  title: string;
  category:
    | "Heritage"
    | "Expansion"
    | "Fleet"
    | "Travel & Tours"
    | "Engineering"
    | "Finance"
    | "Accreditation"
    | "HQ"
    | "Innovation"
    | "ESG & Green"
    | "Jubilee";
  color: string;
  badgeBg: string;
  icon:
    | "flag"
    | "bus"
    | "truck"
    | "building"
    | "plane"
    | "coin"
    | "trailer"
    | "award"
    | "wrench"
    | "wash"
    | "trophy"
    | "chart"
    | "ferris"
    | "shield"
    | "school"
    | "store"
    | "video"
    | "ev"
    | "solar"
    | "star";
  points: string[];
};

export const STORY_TIMELINE: StoryMilestone[] = [
  {
    id: "m-1974",
    num: "01",
    year: "1974",
    decade: "1970s",
    title: "The Mandai Kampong Beginnings",
    category: "Heritage",
    color: "#0284c7", // Sky blue
    badgeBg: "rgba(2, 132, 199, 0.12)",
    icon: "flag",
    points: [
      "Started the business partnership in 1974 with a few partners from Mandai Kampong at Woodlands Road to provide bus transport service.",
    ],
  },
  {
    id: "m-1981",
    num: "02",
    year: "1981",
    decade: "1980s",
    title: "Official Incorporation & Initial Fleet",
    category: "Heritage",
    color: "#f43f5e", // Rose
    badgeBg: "rgba(244, 63, 94, 0.12)",
    icon: "bus",
    points: [
      "Formally incorporated a private limited company: Woodlands Transport Service Pte Ltd on 15th June 1981.",
      "Fleet size: 30 non-air conditioned buses and 5 lorry cranes.",
      "Staff strength: 36 dedicated personnel.",
    ],
  },
  {
    id: "m-1984",
    num: "03",
    year: "1984",
    decade: "1980s",
    title: "10th Anniversary & Heavy Cement Transport",
    category: "Fleet",
    color: "#8b5cf6", // Violet
    badgeBg: "rgba(139, 92, 246, 0.12)",
    icon: "truck",
    points: [
      "Celebrated the 10th Anniversary of Woodlands Transport.",
      "Start of Cement Delivery Transport Business in RDC: Concrete Mixer Trucks.",
    ],
  },
  {
    id: "m-1985",
    num: "04",
    year: "1985",
    decade: "1980s",
    title: "Relocation to 9 Wan Shih Road",
    category: "HQ",
    color: "#10b981", // Emerald
    badgeBg: "rgba(16, 185, 129, 0.12)",
    icon: "building",
    points: ["Moved into dedicated premises at 9, Wan Shih Road."],
  },
  {
    id: "m-1989",
    num: "05",
    year: "1989",
    decade: "1980s",
    title: "WTS Travel & In-House Coach Building",
    category: "Travel & Tours",
    color: "#06b6d4", // Cyan
    badgeBg: "rgba(6, 182, 212, 0.12)",
    icon: "plane",
    points: [
      "Incorporated WTS Travel & Tours Pte Ltd and obtained cross-borders licences to capture local inbound and outbound tour business.",
      "Incorporated WTS Coachworks Pte Ltd to build our own buses, PZ8668U being the first bus built by WTS. Subsequently renamed to WTS Logistics & Trading to start Cement Tanker Trucks Business.",
    ],
  },
  {
    id: "m-1994",
    num: "06",
    year: "1994",
    decade: "1990s",
    title: "Thye Eik Pawnshop & 20th Milestone",
    category: "Finance",
    color: "#ec4899", // Pink
    badgeBg: "rgba(236, 72, 153, 0.12)",
    icon: "coin",
    points: [
      "“Thye Eik Pawnshop” — Commencement of our first pawnshop business.",
      "Celebrated 20th Anniversary.",
    ],
  },
  {
    id: "m-1997",
    num: "07",
    year: "1997",
    decade: "1990s",
    title: "Prime Movers & Precast Logistics",
    category: "Fleet",
    color: "#d97706", // Amber
    badgeBg: "rgba(217, 119, 6, 0.12)",
    icon: "trailer",
    points: [
      "Purchase of Prime Movers and Trailers to start the delivery of Precast Components.",
    ],
  },
  {
    id: "m-2001",
    num: "08",
    year: "2001",
    decade: "2000s",
    title: "New Premises at 12 Tuas Ave 10",
    category: "HQ",
    color: "#6366f1", // Indigo
    badgeBg: "rgba(99, 102, 241, 0.12)",
    icon: "building",
    points: ["Moved to expanded new premises at 12, Tuas Ave 10."],
  },
  {
    id: "m-2002",
    num: "09",
    year: "2002",
    decade: "2000s",
    title: "Tourism Malaysia Recognition",
    category: "Accreditation",
    color: "#14b8a6", // Teal
    badgeBg: "rgba(20, 184, 166, 0.12)",
    icon: "award",
    points: [
      "Received Outstanding Support & Contribution towards Destination in Malaysia by Tourism Malaysia 2002.",
    ],
  },
  {
    id: "m-2004",
    num: "10",
    year: "2004",
    decade: "2000s",
    title: "30th Anniversary & Bukit Timah Plaza HQ",
    category: "Travel & Tours",
    color: "#e11d48", // Crimson
    badgeBg: "rgba(225, 29, 72, 0.12)",
    icon: "building",
    points: [
      "30th Anniversary milestone.",
      "Opening of WTS Travel HQ in Bukit Timah Plaza.",
    ],
  },
  {
    id: "m-2005",
    num: "11",
    year: "2005",
    decade: "2000s",
    title: "WTS Engineering & Flash Laundry",
    category: "Engineering",
    color: "#3b82f6", // Blue
    badgeBg: "rgba(59, 130, 246, 0.12)",
    icon: "wrench",
    points: [
      "Incorporated WTS Engineering Pte Ltd for our comprehensive engineering works.",
      "Acquired Flash Laundry Pte Ltd to service the hospitality industry.",
    ],
  },
  {
    id: "m-2007",
    num: "12",
    year: "2007",
    decade: "2000s",
    title: "Mall Pawnshop First & National Record",
    category: "Accreditation",
    color: "#8b5cf6", // Purple
    badgeBg: "rgba(139, 92, 246, 0.12)",
    icon: "trophy",
    points: [
      "The 1st pawnshop to operate in a shopping mall (Jurong Point) and was featured on Channel U “On the beat” in Feb “都市大发现” 2007.",
      "Recorded as Largest Private Bus Operator in Singapore by Singapore Book of Records.",
    ],
  },
  {
    id: "m-2009",
    num: "13",
    year: "2009",
    decade: "2000s",
    title: "1,200 Vehicles & Historic Financials",
    category: "Fleet",
    color: "#059669", // Green
    badgeBg: "rgba(5, 150, 105, 0.12)",
    icon: "chart",
    points: [
      "Group vehicle fleet size crossed over the 1,200 vehicle mark with historic financial results.",
    ],
  },
  {
    id: "m-2010",
    num: "14",
    year: "2010",
    decade: "2010s",
    title: "Enterprise 50 (3rd) & Changi Airport Desk",
    category: "Accreditation",
    color: "#ea580c", // Orange
    badgeBg: "rgba(234, 88, 12, 0.12)",
    icon: "award",
    points: [
      "Singapore Enterprise 50 Award 2010 – 3rd position.",
      "Awarded to manage Ground Transport Desk at all 4 terminals at Changi Airport.",
      "Group Staff strength crossed 1,000.",
    ],
  },
  {
    id: "m-2012",
    num: "15",
    year: "2012",
    decade: "2010s",
    title: "Flagship HQ at Gul Circle & 1,300 Vehicles",
    category: "HQ",
    color: "#2563eb", // Royal Blue
    badgeBg: "rgba(37, 99, 235, 0.12)",
    icon: "building",
    points: [
      "Moved into our new Corporate HQ at Gul Circle.",
      "Our vehicle fleet size crossed the 1,300 vehicles mark.",
    ],
  },
  {
    id: "m-2014",
    num: "16",
    year: "2014",
    decade: "2010s",
    title: "40th Anniversary & Singapore Flyer Investment",
    category: "Travel & Tours",
    color: "#db2777", // Pink-red
    badgeBg: "rgba(219, 39, 119, 0.12)",
    icon: "ferris",
    points: [
      "40th Anniversary celebration.",
      "WTS Travel awarded 19th Malaysian Tourism Award Singapore Region.",
      "Incorporated WTS Leisure Pte Ltd to invest in Singapore Flyer with Straco Leisure Pte Ltd.",
    ],
  },
  {
    id: "m-2015",
    num: "17",
    year: "2015",
    decade: "2010s",
    title: "Bulim Depot Tender & Enterprise 50",
    category: "Expansion",
    color: "#0891b2", // Cyan
    badgeBg: "rgba(8, 145, 178, 0.12)",
    icon: "shield",
    points: [
      "Participated in the first Public Transport Operator Tender for Bulim Depot.",
      "WTS Travel: Singapore Enterprise 50 Award 2015 – 46th position.",
    ],
  },
  {
    id: "m-2016",
    num: "18",
    year: "2016",
    decade: "2010s",
    title: "Woodlands Transport Solutions & Enterprise 50",
    category: "Expansion",
    color: "#7c3aed", // Deep violet
    badgeBg: "rgba(124, 58, 237, 0.12)",
    icon: "school",
    points: [
      "Incorporated Woodlands Transport Solutions Pte Ltd to manage all our Schools Transport Business.",
      "WTS Travel – Singapore Enterprise 50 Award 2016 – 40th position.",
    ],
  },
  {
    id: "m-2019",
    num: "19",
    year: "2019",
    decade: "2010s",
    title: "WTS Travel Outlets Peak at 15 Nationwide",
    category: "Travel & Tours",
    color: "#d97706", // Amber
    badgeBg: "rgba(217, 119, 6, 0.12)",
    icon: "store",
    points: ["WTS Travel Outlets peaked at 15 outlets island-wide."],
  },
  {
    id: "m-2020",
    num: "20",
    year: "2020",
    decade: "2020s",
    title: "Resilience, Live Broadcasts & Birth of Plotigo",
    category: "Innovation",
    color: "#0284c7", // Sky blue
    badgeBg: "rgba(2, 132, 199, 0.12)",
    icon: "video",
    points: [
      "Covid Crisis: MCO & Circuit Breaker response.",
      "Started Facebook live of Bingo & Pingo.",
      "Birth of WTS Tech — Plotigo.",
    ],
  },
  {
    id: "m-2022",
    num: "21",
    year: "2022",
    decade: "2020s",
    title: "EV Fleet, Charging Hub & Wheelchair Mobility",
    category: "ESG & Green",
    color: "#059669", // Emerald green
    badgeBg: "rgba(5, 150, 105, 0.12)",
    icon: "ev",
    points: [
      "First batch of EV buses and EV chargers at Gul Circle.",
      "WTS Travel Office merged with Corporate HQ office at 8 Gul Circle.",
      "Commencement of Wheelchair vehicle business.",
    ],
  },
  {
    id: "m-2023",
    num: "22",
    year: "2023",
    decade: "2020s",
    title: "Solar Green Plan & The Bus Collective",
    category: "ESG & Green",
    color: "#16a34a", // Leaf green
    badgeBg: "rgba(22, 163, 74, 0.12)",
    icon: "solar",
    points: [
      "Commencement of Green Sustainability Plan — installed Solar Panels at Gul Circle.",
      "Opening of The Bus Collective @ Changi Village (SEA’s first upcycled bus hotel).",
    ],
  },
  {
    id: "m-2024",
    num: "23",
    year: "2024",
    decade: "2020s",
    title: "Golden Jubilee — 50 Years Moving Forward",
    category: "Jubilee",
    color: "#eab308", // Gold
    badgeBg: "rgba(234, 179, 8, 0.16)",
    icon: "star",
    points: [
      "50th Anniversary — Celebrating half a century of stewardship, moving people and building Singapore.",
    ],
  },
];
