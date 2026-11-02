"use client";

import React from "react";

interface GarmentVisualProps {
  id: string;
  view: "front" | "side" | "back";
  customColor?: string;
  className?: string;
}

export const GarmentVisual: React.FC<GarmentVisualProps> = ({
  id,
  view,
  customColor,
  className = "",
}) => {
  // Front, Side, and Back representations for garments
  switch (id) {
    case "item-1": {
      // Classic Boxy Tee
      const bodyColor = customColor || "#e3d7c5";
      if (view === "side") {
        return (
          <svg viewBox="0 0 100 240" className={`w-full h-full drop-shadow-xl ${className}`}>
            <path
              d="M48 20 C48 30 45 60 42 120 C39 180 43 230 48 235 C53 230 57 180 54 120 C51 60 48 30 48 20 Z"
              fill={bodyColor}
            />
            {/* folded sleeve silhouette */}
            <path d="M44 60 C32 80 32 140 45 150 C46 130 46 90 47 65 Z" fill="#000000" fillOpacity="0.08" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 240 260" className={`w-full h-full drop-shadow-2xl ${className}`}>
          {/* T-Shirt Body */}
          <path
            d="M 85 45 C 98 56 142 56 155 45 L 215 80 L 195 125 L 165 110 L 162 245 L 78 245 L 75 110 L 45 125 L 25 80 Z"
            fill={bodyColor}
          />
          {/* Collar */}
          <path
            d="M 85 45 C 98 62 142 62 155 45 C 145 52 95 52 85 45 Z"
            fill="#000000"
            fillOpacity="0.08"
          />
          {/* Fabric Shading */}
          <path
            d="M 75 110 L 78 245 L 90 245 L 85 110 Z"
            fill="black"
            fillOpacity="0.05"
          />
          {view === "front" && (
            <text
              x="120"
              y="130"
              textAnchor="middle"
              fill="#22201D"
              fillOpacity="0.4"
              fontSize="9"
              letterSpacing="3.5"
              fontFamily="var(--font-serif), serif"
              fontStyle="italic"
            >
              L’ATELIER ÉDITION
            </text>
          )}
        </svg>
      );
    }

    case "item-2": {
      // Archival Parka Coat
      const bodyColor = customColor || "#2b3d2e";
      if (view === "side") {
        return (
          <svg viewBox="0 0 110 260" className={`w-full h-full drop-shadow-xl ${className}`}>
            <path
              d="M 52 18 C 50 35 40 70 38 140 C 36 210 42 250 50 255 C 58 250 64 210 62 140 C 60 70 54 35 52 18 Z"
              fill={bodyColor}
            />
            {/* Hood profile */}
            <path d="M 50 18 C 30 25 32 60 48 65 Z" fill="#000000" fillOpacity="0.2" />
            <path d="M 46 80 C 35 120 38 180 50 190 C 52 170 53 120 52 85 Z" fill="#000000" fillOpacity="0.15" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 250 280" className={`w-full h-full drop-shadow-2xl ${className}`}>
          {/* Parka Silhouette */}
          <path
            d="M 85 40 L 165 40 L 230 85 L 205 130 L 175 115 L 172 265 L 78 265 L 75 115 L 45 130 L 20 85 Z"
            fill={bodyColor}
          />
          {/* Storm Hood outline */}
          <path
            d="M 85 40 C 95 18 155 18 165 40 C 145 35 105 35 85 40 Z"
            fill="#000000"
            fillOpacity="0.25"
          />
          {/* Front Center Placket / Zipper */}
          {view === "front" ? (
            <>
              <line x1="125" y1="40" x2="125" y2="265" stroke="#000000" strokeOpacity="0.4" strokeWidth="3" />
              {/* Flap pockets */}
              <rect x="86" y="160" width="28" height="34" rx="2" fill="#000000" fillOpacity="0.12" />
              <rect x="136" y="160" width="28" height="34" rx="2" fill="#000000" fillOpacity="0.12" />
              {/* Horn snap buttons */}
              <circle cx="125" cy="80" r="3" fill="#D4AF37" fillOpacity="0.7" />
              <circle cx="125" cy="120" r="3" fill="#D4AF37" fillOpacity="0.7" />
              <circle cx="125" cy="160" r="3" fill="#D4AF37" fillOpacity="0.7" />
              <circle cx="125" cy="200" r="3" fill="#D4AF37" fillOpacity="0.7" />
            </>
          ) : (
            // Back storm flap
            <path
              d="M 88 75 L 162 75 L 158 115 L 92 115 Z"
              fill="#000000"
              fillOpacity="0.18"
            />
          )}
        </svg>
      );
    }

    case "item-3": {
      // Sweatshirt Plus (Signature Green Hoodie from the video)
      const bodyColor = customColor || "#1b3b2b";
      if (view === "side") {
        return (
          <svg viewBox="0 0 110 260" className={`w-full h-full drop-shadow-xl ${className}`}>
            <path
              d="M 52 16 C 50 35 42 70 40 135 C 38 200 44 245 52 250 C 60 245 66 200 64 135 C 62 70 54 35 52 16 Z"
              fill={bodyColor}
            />
            {/* Hood profile */}
            <path d="M 52 16 C 32 20 28 50 48 60 Z" fill="#000000" fillOpacity="0.25" />
            {/* Sleeve side curve */}
            <path d="M 45 70 C 35 110 38 180 50 188 C 52 170 53 115 50 78 Z" fill="#000000" fillOpacity="0.15" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 250 280" className={`w-full h-full drop-shadow-2xl ${className}`}>
          {/* Main Hoodie Silhouette */}
          <path
            d="M 85 45 L 165 45 L 235 85 L 210 135 L 175 118 L 170 255 L 80 255 L 75 118 L 40 135 L 15 85 Z"
            fill={bodyColor}
          />
          {/* Hood crossover neckline */}
          <path
            d="M 85 45 C 95 20 155 20 165 45 C 145 60 105 60 85 45 Z"
            fill="#000000"
            fillOpacity="0.3"
          />
          <path
            d="M 98 42 C 115 62 135 62 152 42 Z"
            fill="#000000"
            fillOpacity="0.4"
          />

          {view === "front" ? (
            <>
              {/* Chenille Curving Arc: 'VEIRDO' text like the reference video */}
              <path
                id="arcPathHoodie"
                d="M 75 105 Q 125 78 175 105"
                fill="none"
              />
              <text
                fill="#F7F1E5"
                fontSize="17"
                fontWeight="900"
                letterSpacing="4"
                textAnchor="middle"
                className="select-none"
              >
                <textPath href="#arcPathHoodie" startOffset="50%">
                  VEIRDO
                </textPath>
              </text>

              {/* Subtitle 'ORIGINAL' straight text below */}
              <text
                x="125"
                y="114"
                textAnchor="middle"
                fill="#C5A67C"
                fontSize="7.5"
                fontWeight="700"
                letterSpacing="4"
              >
                ORIGINAL • 1989
              </text>

              {/* Kangaroo Pocket */}
              <path
                d="M 88 185 L 162 185 L 156 242 L 94 242 Z"
                fill="#000000"
                fillOpacity="0.12"
              />
              {/* Pocket side hand openings */}
              <path d="M 88 185 L 94 242" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.5" />
              <path d="M 162 185 L 156 242" stroke="#000000" strokeOpacity="0.3" strokeWidth="1.5" />
            </>
          ) : (
            // Back view details
            <>
              <line x1="85" y1="45" x2="165" y2="45" stroke="#000000" strokeOpacity="0.3" strokeWidth="2" />
              <text
                x="125"
                y="160"
                textAnchor="middle"
                fill="#F7F1E5"
                fillOpacity="0.1"
                fontSize="24"
                fontFamily="var(--font-serif), serif"
                fontStyle="italic"
              >
                Atelier
              </text>
            </>
          )}

          {/* Bottom Hem Ribbing */}
          <rect x="80" y="246" width="90" height="9" fill="#000000" fillOpacity="0.16" />
        </svg>
      );
    }

    case "item-4": {
      // Tailored Minimal Blazer
      const bodyColor = customColor || "#181b22";
      if (view === "side") {
        return (
          <svg viewBox="0 0 100 250" className={`w-full h-full drop-shadow-xl ${className}`}>
            <path
              d="M 50 18 C 50 35 42 65 40 130 C 38 190 44 240 50 245 C 56 240 62 190 60 130 C 58 65 52 35 50 18 Z"
              fill={bodyColor}
            />
            {/* Structured arm silhouette */}
            <path d="M 44 55 C 32 90 34 160 48 175 C 50 150 51 100 48 65 Z" fill="#000000" fillOpacity="0.25" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 250 280" className={`w-full h-full drop-shadow-2xl ${className}`}>
          {/* Blazer Silhouette with sharp structured shoulders */}
          <path
            d="M 85 45 L 165 45 L 235 78 L 210 130 L 175 115 L 170 260 L 80 260 L 75 115 L 40 130 L 15 78 Z"
            fill={bodyColor}
          />
          {view === "front" ? (
            <>
              {/* Deep V Notch Lapel */}
              <polygon points="85,45 125,145 105,95 75,70" fill="#000000" fillOpacity="0.3" />
              <polygon points="165,45 125,145 145,95 175,70" fill="#000000" fillOpacity="0.35" />
              {/* Center Placket Line */}
              <line x1="125" y1="145" x2="125" y2="260" stroke="#000000" strokeOpacity="0.5" strokeWidth="2" />
              {/* Horn Button */}
              <circle cx="125" cy="165" r="3.5" fill="#4a3728" stroke="#2b2017" strokeWidth="1" />
              <circle cx="125" cy="195" r="3.5" fill="#4a3728" stroke="#2b2017" strokeWidth="1" />
              {/* Jet Pockets */}
              <line x1="88" y1="190" x2="114" y2="190" stroke="#000000" strokeOpacity="0.4" strokeWidth="2.5" />
              <line x1="136" y1="190" x2="162" y2="190" stroke="#000000" strokeOpacity="0.4" strokeWidth="2.5" />
            </>
          ) : (
            // Back vent slit
            <line x1="125" y1="210" x2="125" y2="260" stroke="#000000" strokeOpacity="0.6" strokeWidth="2" />
          )}
        </svg>
      );
    }

    case "item-5": {
      // Boxy Melange Hoodie
      const bodyColor = customColor || "#c5c7cb";
      if (view === "side") {
        return (
          <svg viewBox="0 0 100 240" className={`w-full h-full drop-shadow-xl ${className}`}>
            <path
              d="M 50 18 C 50 35 42 70 40 135 C 38 195 44 235 50 240 C 56 235 62 195 60 135 C 58 70 52 35 50 18 Z"
              fill={bodyColor}
            />
            <path d="M 50 18 C 30 22 28 50 48 58 Z" fill="#000000" fillOpacity="0.1" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 250 270" className={`w-full h-full drop-shadow-2xl ${className}`}>
          <path
            d="M 85 45 L 165 45 L 235 85 L 210 135 L 175 118 L 170 250 L 80 250 L 75 118 L 40 135 L 15 85 Z"
            fill={bodyColor}
          />
          {/* Deep Hood */}
          <path
            d="M 85 45 C 95 18 155 18 165 45 C 145 60 105 60 85 45 Z"
            fill="#000000"
            fillOpacity="0.1"
          />
          {view === "front" && (
            <>
              {/* Architectural typographic hit */}
              <text
                x="125"
                y="118"
                textAnchor="middle"
                fill="#22201D"
                fillOpacity="0.45"
                fontSize="9"
                letterSpacing="4"
                fontFamily="var(--font-serif), serif"
                fontStyle="italic"
              >
                NUMÉRO SEPT
              </text>
              <rect x="90" y="180" width="70" height="52" rx="4" fill="#000000" fillOpacity="0.05" />
            </>
          )}
        </svg>
      );
    }

    default: // Linen Haori Kimono
    case "item-6": {
      const bodyColor = customColor || "#282a30";
      return (
        <svg viewBox="0 0 250 280" className={`w-full h-full drop-shadow-2xl ${className}`}>
          <path
            d="M 85 45 L 155 45 L 225 80 L 205 135 L 170 120 L 168 255 L 72 255 L 70 120 L 35 135 L 15 80 Z"
            fill={bodyColor}
          />
          {view === "front" ? (
            <>
              {/* Overlapping Wrap Front */}
              <path d="M 85 45 L 155 170 L 145 255 L 72 255 Z" fill="#000000" fillOpacity="0.15" />
              <line x1="85" y1="45" x2="155" y2="170" stroke="#000000" strokeOpacity="0.3" strokeWidth="2" />
              {/* Linen Tie Knot */}
              <circle cx="152" cy="170" r="4" fill="#888" />
              <path d="M 152 170 Q 165 190 162 215" stroke="#777" strokeWidth="2.5" fill="none" />
            </>
          ) : (
            <line x1="120" y1="45" x2="120" y2="255" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.5" />
          )}
        </svg>
      );
    }
  }
};

/**
 * Natural Birchwood Hanger with Debossed Leather Price Tag
 */
export const WoodenHanger: React.FC<{
  price: number;
  currency?: string;
  isTurned?: boolean;
}> = ({ price, currency = "$", isTurned = false }) => {
  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none">
      {/* Matte Brass / Champagne Gold Hook on Rail */}
      <svg width="40" height="32" viewBox="0 0 40 32" className="overflow-visible">
        <path
          d="M 20 28 L 20 14 C 20 6 29 4 29 11 C 29 15 25 18 20 18"
          fill="none"
          stroke="#C5A67C"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Brass collar ring */}
        <ellipse cx="20" cy="29" rx="3.5" ry="2" fill="#A88B63" />
      </svg>

      {/* Debossed Leather / Natural Paper Tag */}
      <div className="absolute top-1 z-20 flex items-center justify-center bg-[#FAF7F0] text-[#2C241D] font-medium text-[11px] px-2.5 py-0.5 rounded shadow-sm border border-[#D5C9B7] tracking-tight font-sans transition-transform duration-300">
        <span className="font-serif-luxury italic text-xs mr-0.5">{currency}</span>
        <span className="font-semibold">{price}</span>
      </div>

      {/* Birchwood Hanger Body */}
      <svg
        width={isTurned ? "60" : "165"}
        height="32"
        viewBox="0 0 160 32"
        className="transition-all duration-400 ease-out drop-shadow-md -mt-1"
      >
        <defs>
          <linearGradient id="birchWoodGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C8A882" />
            <stop offset="35%" stopColor="#DFCAA9" />
            <stop offset="50%" stopColor="#EAD8BC" />
            <stop offset="65%" stopColor="#DFCAA9" />
            <stop offset="100%" stopColor="#BFA07C" />
          </linearGradient>
        </defs>
        <path
          d="M 12 28 C 30 18 60 10 80 5 C 100 10 130 18 148 28 C 144 31 136 30 130 26 C 100 16 80 12 80 12 C 80 12 60 16 30 26 C 24 30 16 31 12 28 Z"
          fill="url(#birchWoodGradient)"
        />
        {/* Brass Crossbar */}
        <line x1="26" y1="26" x2="134" y2="26" stroke="#C5A67C" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
};
