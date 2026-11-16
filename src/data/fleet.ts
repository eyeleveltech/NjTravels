export interface Vehicle {
  id: string;
  name: string;
  category: "economy" | "mpv" | "group" | "luxury";
  seats: string;
  image: string;
  avifImage?: string;
  alt: string;
  chips: string[];
  speech: string;
  flip: boolean;
}

export const CATEGORIES = [
  { id: "economy", label: "Economy" },
  { id: "mpv", label: "MPV" },
  { id: "group", label: "Group" },
  { id: "luxury", label: "Luxury" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const FLEET: Vehicle[] = [
  {
    id: "wagonr",
    name: "Maruti WagonR",
    category: "economy",
    seats: "5 seats",
    image: "/assets/img/fleet/wagonr.webp",
    avifImage: "/assets/img/fleet/wagonr.avif",
    alt: "White Maruti Suzuki WagonR hatchback on a blush studio backdrop",
    chips: ["Airport", "City"],
    speech: "Compact and economical for city rides and short trips.",
    flip: false,
  },
  {
    id: "etios",
    name: "Toyota Etios",
    category: "economy",
    seats: "4 seats",
    image: "/assets/img/fleet/etios.webp",
    avifImage: "/assets/img/fleet/etios.avif",
    alt: "Toyota Etios on a blush studio backdrop",
    chips: ["Airport", "City"],
    speech: "Comfortable, reliable and roomy for four passengers.",
    flip: false,
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga",
    category: "mpv",
    seats: "7 seats",
    image: "/assets/img/fleet/ertiga.webp",
    avifImage: "/assets/img/fleet/ertiga.avif",
    alt: "Maruti Ertiga on a blush studio backdrop",
    chips: ["Family", "Outstation"],
    speech: "Family trip or a team outing? Room for everyone.",
    flip: true,
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "mpv",
    seats: "7 seats",
    image: "/assets/img/fleet/innova-crysta.webp",
    avifImage: "/assets/img/fleet/innova-crysta.avif",
    alt: "Toyota Innova Crysta on a blush studio backdrop",
    chips: ["Family", "Outstation"],
    speech: "The highway king — plush ride, reclining seats, and effortless power.",
    flip: false,
  },
  {
    id: "innova-hycross",
    name: "Toyota Innova Hycross",
    category: "mpv",
    seats: "7 seats",
    image: "/assets/img/fleet/innova-hycross.webp",
    avifImage: "/assets/img/fleet/innova-hycross.avif",
    alt: "Toyota Innova Hycross on a blush studio backdrop",
    chips: ["Family", "Outstation"],
    speech: "Comfortable seating for seven on longer journeys.",
    flip: true,
  },
  {
    id: "van14",
    name: "Luxury and Premium Van",
    category: "group",
    seats: "18 seats",
    image: "/assets/img/fleet/van14.webp",
    avifImage: "/assets/img/fleet/van14.avif",
    alt: "White luxury and premium van on a blush studio backdrop",
    chips: ["Group", "Tour"],
    speech: "Travelling as a group? Everyone and their luggage fits comfortably.",
    flip: false,
  },
  {
    id: "van12",
    name: "12 Seater AC Van",
    category: "group",
    seats: "12 seats",
    image: "/assets/img/fleet/van12.webp",
    avifImage: "/assets/img/fleet/van12.avif",
    alt: "White 12-seater AC van on a blush studio backdrop",
    chips: ["Group", "Tour"],
    speech: "Comfortable AC seating for small groups and family trips.",
    flip: true,
  },
  {
    id: "bus",
    name: "Tourist Coach",
    category: "group",
    seats: "32 seats",
    image: "/assets/img/fleet/bus.webp",
    avifImage: "/assets/img/fleet/bus.avif",
    alt: "White 32-seater tourist coach on a blush studio backdrop",
    chips: ["Group", "Tour"],
    speech: "Comfortable seating for large groups and events.",
    flip: false,
  },
  {
    id: "bmw",
    name: "BMW 5 Series",
    category: "luxury",
    seats: "5 seats",
    image: "/assets/img/fleet/bmw.webp",
    avifImage: "/assets/img/fleet/bmw.avif",
    alt: "BMW 5 Series on a blush studio backdrop",
    chips: ["VIP", "Corporate"],
    speech: "Arriving somewhere special? Executive comfort, refined and swift.",
    flip: false,
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz E-Class",
    category: "luxury",
    seats: "5 seats",
    image: "/assets/img/fleet/mercedes.webp",
    avifImage: "/assets/img/fleet/mercedes.avif",
    alt: "Mercedes-Benz E-Class on a blush studio backdrop",
    chips: ["VIP", "Corporate"],
    speech: "Pure luxury and prestige for VIP transfers and celebrations.",
    flip: false,
  },
  {
    id: "audi",
    name: "Audi A6",
    category: "luxury",
    seats: "5 seats",
    image: "/assets/img/fleet/audi.webp",
    avifImage: "/assets/img/fleet/audi.avif",
    alt: "Audi A6 on a blush studio backdrop",
    chips: ["VIP", "Corporate"],
    speech: "Understated luxury with cutting-edge executive refinement.",
    flip: false,
  },
];
