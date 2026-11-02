export interface GarmentColorway {
  name: string;
  hex: string;
  garmentHex: string; // The primary body fill color
}

export interface Garment {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  currency: string;
  description: string;
  colorName: string;
  colorHex: string;
  colorways: GarmentColorway[];
  details: string;
  composition: string;
  sizes: string[];
  frontImage: string;
  sideImage: string;
  backImage: string;
  numberTag: string; // e.g. "05 / 15"
}

export const GARMENTS: Garment[] = [
  {
    id: "item-1",
    name: "Classic Boxy Tee",
    subtitle: "Heavy Combed Cotton",
    category: "L’Atelier Essentials",
    price: 135,
    currency: "$",
    description: "Crafted in 340gsm organic Peruvian combed cotton. Cut with an architectural drop-shoulder drape and structured ribbing.",
    composition: "100% Organic Long-Staple Cotton • Ring-Spun",
    colorName: "Sand Dune",
    colorHex: "#e3d7c5",
    colorways: [
      { name: "Sand Dune", hex: "#e3d7c5", garmentHex: "#e3d7c5" },
      { name: "Oatmeal Melange", hex: "#eae4d8", garmentHex: "#eae4d8" },
      { name: "Raw Umber", hex: "#4b4139", garmentHex: "#4b4139" },
    ],
    details: "Pre-shrunk organic yarn • Clean blind-stitched hem • Custom washed for soft handfeel.",
    sizes: ["S", "M", "L", "XL"],
    frontImage: "beige_tee_front",
    sideImage: "beige_tee_side",
    backImage: "beige_tee_back",
    numberTag: "01 / 15",
  },
  {
    id: "item-2",
    name: "Archival Parka Coat",
    subtitle: "Technical Waxed Cotton",
    category: "Structured Outerwear",
    price: 360,
    currency: "$",
    description: "Weather-resistant 3-layer storm jacket featuring an anatomical curved sleeve and articulated hood construction.",
    composition: "65% Waxed Cotton, 35% Recycled Polyamide",
    colorName: "Nordic Pine",
    colorHex: "#2b3d2e",
    colorways: [
      { name: "Nordic Pine", hex: "#2b3d2e", garmentHex: "#2b3d2e" },
      { name: "Dark Moss", hex: "#3b4737", garmentHex: "#3b4737" },
      { name: "Slate Charcoal", hex: "#2c3035", garmentHex: "#2c3035" },
    ],
    details: "Water-repellent finish • Solid brass horn snap closures • Internal storm harness straps.",
    sizes: ["M", "L", "XL"],
    frontImage: "parka_front",
    sideImage: "parka_side",
    backImage: "parka_back",
    numberTag: "02 / 15",
  },
  {
    id: "item-3",
    name: "Sweatshirt Plus",
    subtitle: "Archival Heritage Fleece",
    category: "Atelier Streetwear",
    price: 210,
    currency: "$",
    description: "Dense 520gsm looped French terry fleece with textured chenille script across chest. Generous, sculptural drape.",
    composition: "100% Heavyweight Looped Terry Cotton",
    colorName: "Varsity Forest Green",
    colorHex: "#1b3b2b",
    colorways: [
      { name: "Varsity Green", hex: "#1b3b2b", garmentHex: "#1b3b2b" },
      { name: "Rich Espresso", hex: "#382923", garmentHex: "#382923" },
      { name: "Washed Faded Navy", hex: "#243242", garmentHex: "#243242" },
    ],
    details: "Chenille embroidery applique • Reinforced rib side gussets • Hidden kangaroo seam pockets.",
    sizes: ["S", "M", "L", "XL"],
    frontImage: "hoodie_green_front",
    sideImage: "hoodie_green_side",
    backImage: "hoodie_green_back",
    numberTag: "05 / 15",
  },
  {
    id: "item-4",
    name: "Tailored Minimal Blazer",
    subtitle: "Double-Faced Virgin Wool",
    category: "Tailored Suiting",
    price: 420,
    currency: "$",
    description: "Unstructured single-breasted jacket tailored with gentle shoulder pitch, horn buttons, and high gorge notch lapel.",
    composition: "90% Virgin Wool, 10% Cashmere",
    colorName: "Midnight Obsidian",
    colorHex: "#181b22",
    colorways: [
      { name: "Midnight Obsidian", hex: "#181b22", garmentHex: "#181b22" },
      { name: "Camel Melton", hex: "#b89069", garmentHex: "#b89069" },
      { name: "Charcoal Melange", hex: "#35383f", garmentHex: "#35383f" },
    ],
    details: "Cupro interior lining • Real water-buffalo horn buttons • Dual vented back silhouette.",
    sizes: ["S", "M", "L"],
    frontImage: "blazer_front",
    sideImage: "blazer_side",
    backImage: "blazer_back",
    numberTag: "06 / 15",
  },
  {
    id: "item-5",
    name: "Boxy Melange Hoodie",
    subtitle: "Double-Layer Vintage Cotton",
    category: "L’Atelier Essentials",
    price: 195,
    currency: "$",
    description: "Heavyweight vintage heather knit with deep, structured hood that stays upright without drawstrings.",
    composition: "100% Organic Cotton Terry 480gsm",
    colorName: "Heather Ash Grey",
    colorHex: "#c5c7cb",
    colorways: [
      { name: "Heather Ash", hex: "#c5c7cb", garmentHex: "#c5c7cb" },
      { name: "Bone White", hex: "#e8e5dc", garmentHex: "#e8e5dc" },
      { name: "Washed Black", hex: "#313337", garmentHex: "#313337" },
    ],
    details: "Seamless double hood • Boxy cropped hemline • Heavy elasticated ribbed cuffs.",
    sizes: ["S", "M", "L", "XL"],
    frontImage: "hoodie_grey_front",
    sideImage: "hoodie_grey_side",
    backImage: "hoodie_grey_back",
    numberTag: "07 / 15",
  },
  {
    id: "item-6",
    name: "Linen Haori Kimono",
    subtitle: "Heavy Slub Belgian Linen",
    category: "Atelier Layering",
    price: 260,
    currency: "$",
    description: "Traditional wrap jacket reinterpreted with contemporary drop proportions and woven cotton sash tie.",
    composition: "100% Pure Washed Belgian Linen",
    colorName: "Washed Carbon",
    colorHex: "#282a30",
    colorways: [
      { name: "Washed Carbon", hex: "#282a30", garmentHex: "#282a30" },
      { name: "Natural Flax", hex: "#d8cfbe", garmentHex: "#d8cfbe" },
      { name: "Indigo Rinse", hex: "#1f2a3a", garmentHex: "#1f2a3a" },
    ],
    details: "Internal tie cords • Wide cropped sleeves • Naturally breathable and structured drape.",
    sizes: ["S", "M", "L"],
    frontImage: "kimono_front",
    sideImage: "kimono_side",
    backImage: "kimono_back",
    numberTag: "08 / 15",
  },
];
