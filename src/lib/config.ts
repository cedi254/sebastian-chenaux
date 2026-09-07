export const siteConfig = {
  name: "Sebastian Chenaux",
  social: { image: "" },
  contact: { email: "", whatsapp: "", instagram: "" },
  booking: { preview: true },
  location: {
    name: "SC Training",
    website: "https://www.google.com/maps/search/?api=1&query=Riedtlistrasse+27+8006+Z%C3%BCrich",
    note: "Personal Training mit Sebastian. Den genauen Treffpunkt vereinbaren wir persönlich.",
    verifiedOn: "2026-09-07",
    studios: [
      {
        name: "Zürich",
        street: "Riedtlistrasse 27",
        city: "8006 Zürich",
        map: "https://www.google.com/maps/search/?api=1&query=Riedtlistrasse+27+8006+Z%C3%BCrich",
      },
    ],
  },
};
export const trainingModes = [
  {
    name: "Kraft",
    tagline: "STÄRKER WERDEN.\nLEISTUNG AUFBAUEN.",
    copy: "Gezieltes Krafttraining für mehr Stabilität, Leistung und einen stärkeren, gesünderen Körper.",
    image: "curls",
  },
  {
    name: "Ausdauer",
    tagline: "MEHR ENERGIE.\nMEHR BELASTBARKEIT.",
    copy: "Schritt für Schritt länger durchhalten. Mit einem Training, das deine Kondition aufbaut und dir Energie für den Alltag gibt.",
    image: "portrait",
  },
  {
    name: "Functional",
    tagline: "STÄRKER BEWEGEN.\nBESSER FUNKTIONIEREN.",
    copy: "Kraft, Koordination und Beweglichkeit verbinden. Für Bewegungen, die sich im Sport und im Alltag gut anfühlen.",
    image: "plates",
  },
];
export const goals = [
  {
    id: "muscle",
    label: "Muskelaufbau",
    title: "LET’S BUILD.",
    copy: "Wir kombinieren strukturiertes Krafttraining, Progression und ein Training, das zu deinem Alltag passt.",
  },
  {
    id: "fat",
    label: "Fett verlieren",
    title: "MAKE YOUR MOVE.",
    copy: "Wir verbinden Kraft und Ausdauer mit Routinen, die du langfristig in deinen Alltag integrieren kannst.",
  },
  {
    id: "fitness",
    label: "Fitness",
    title: "FEEL STRONGER.",
    copy: "Ein strukturiertes Training für mehr Kraft, Energie und Wohlbefinden.",
  },
  {
    id: "athletic",
    label: "Athletik",
    title: "PERFORM BETTER.",
    copy: "Mehr Explosivität, Kraft und Kontrolle für deine sportliche Leistung.",
  },
  {
    id: "endurance",
    label: "Ausdauer",
    title: "KEEP GOING.",
    copy: "Wir verbessern deine Belastbarkeit und bauen Schritt für Schritt mehr Ausdauer auf.",
  },
  {
    id: "wellbeing",
    label: "Allgemein fitter",
    title: "MOVE. FEEL. LIVE.",
    copy: "Mehr Bewegung, mehr Sicherheit und ein gutes Körpergefühl. Wir starten dort, wo du heute stehst.",
  },
];
export const packages = [
  {
    name: "START",
    label: "Einzeltraining",
    price: "CHF XX",
    unit: "/ Training",
    description: "Dein Einstieg. Dein erster Schritt.",
    features: [
      "Persönliches 1:1 Training",
      "Zielbesprechung",
      "Individuelle Betreuung",
    ],
    recommended: false,
  },
  {
    name: "BUILD",
    label: "5 Trainings",
    price: "CHF XXX",
    unit: "/ Paket",
    description: "Dranbleiben. Eine Basis aufbauen.",
    features: [
      "5 persönliche Trainingseinheiten",
      "Individuelle Trainingsplanung",
      "Technik & Fortschrittskontrolle",
    ],
    recommended: true,
  },
  {
    name: "LEVEL UP",
    label: "10 Trainings",
    price: "CHF XXX",
    unit: "/ Paket",
    description: "Konsequent trainieren. Weiterkommen.",
    features: [
      "10 persönliche Trainingseinheiten",
      "Individuelle Trainingsplanung",
      "Regelmässige Standortbestimmung",
    ],
    recommended: false,
  },
];
export const frequencies = [
  "1× pro Woche",
  "2× pro Woche",
  "3×+ pro Woche",
  "Noch unsicher",
];
