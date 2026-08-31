export type EpicValue = {
  letter: "E" | "P" | "I" | "C";
  title: string;
  tagline: string;
  description: string;
  color: string;
  bgLight: string;
  badgeBg: string;
  borderColor: string;
};

export const CORE_VALUES_DATA = {
  vision: {
    kicker: "VISION",
    text: "Empowering every journey towards a better world",
  },
  mission: {
    kicker: "MISSION",
    text: "Delivering safe, reliable and pleasant journeys through great people, innovation and sustainable practices",
  },
  motto:
    "Fueling progress through our EPIC core values and embracing sustainability in every journey we embark on!",
  values: [
    {
      letter: "E",
      title: "Excellence",
      tagline: "Highest standards & continuous innovation",
      description:
        "Striving for the highest standards in safety, reliability, and customer experience through continuous improvement and innovation.",
      color: "#ef4444", // Red
      bgLight: "rgba(239, 68, 68, 0.06)",
      badgeBg: "rgba(239, 68, 68, 0.12)",
      borderColor: "rgba(239, 68, 68, 0.28)",
    },
    {
      letter: "P",
      title: "People-Focused",
      tagline: "Customers, employees & community first",
      description:
        "Prioritizing the need and well-being of our customers, employees and communities to create meaningful and positive experience.",
      color: "#f97316", // Orange
      bgLight: "rgba(249, 115, 22, 0.06)",
      badgeBg: "rgba(249, 115, 22, 0.12)",
      borderColor: "rgba(249, 115, 22, 0.28)",
    },
    {
      letter: "I",
      title: "Integrity",
      tagline: "Honesty & ethical transparency",
      description:
        "Upholding honesty, transparency, and ethical practices in all our operations and interactions.",
      color: "#eab308", // Yellow / Gold
      bgLight: "rgba(234, 179, 8, 0.06)",
      badgeBg: "rgba(234, 179, 8, 0.14)",
      borderColor: "rgba(234, 179, 8, 0.32)",
    },
    {
      letter: "C",
      title: "Commitment",
      tagline: "Outstanding service & sustainable impact",
      description:
        "Dedication to delivering outstanding service, driving sustainable practices, and contributing to the betterment of our world.",
      color: "#22c55e", // Green
      bgLight: "rgba(34, 197, 94, 0.06)",
      badgeBg: "rgba(34, 197, 94, 0.12)",
      borderColor: "rgba(34, 197, 94, 0.28)",
    },
  ] as EpicValue[],
};
