"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Garment } from "../data/garments";
import { GarmentVisual, WoodenHanger } from "./GarmentVisual";

interface CurvedRailProps {
  garments: Garment[];
  selectedIndex: number;
  selectedColorway?: string;
  isOverlayOpen?: boolean;
  onSelectIndex: (index: number) => void;
  onOpenDetail: (garment: Garment) => void;
}

export const CurvedRail: React.FC<CurvedRailProps> = ({
  garments,
  selectedIndex,
  selectedColorway,
  isOverlayOpen = false,
  onSelectIndex,
  onOpenDetail,
}) => {
  const currentIdxMotion = useMotionValue(selectedIndex);
  // Elegant, natural spring dampening
  const smoothIdx = useSpring(currentIdxMotion, {
    stiffness: 220,
    damping: 28,
    mass: 0.85,
  });

  const [turnedMap, setTurnedMap] = useState<Record<string, boolean>>({
    [garments[selectedIndex]?.id || ""]: false,
  });

  useEffect(() => {
    currentIdxMotion.set(selectedIndex);
    // Reset all pieces back to facing front (default) whenever the active garment/index changes
    setTurnedMap({});
  }, [selectedIndex, currentIdxMotion]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const startIdxVal = useRef(selectedIndex);
  const dragVelocity = useRef(0);
  const lastDragTime = useRef(0);
  const lastDragX = useRef(0);

  // Wheel handling for trackpads / desktop mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 8) return;
    const direction = delta > 0 ? 1 : -1;
    const nextIdx = Math.max(0, Math.min(garments.length - 1, selectedIndex + direction));
    if (nextIdx !== selectedIndex) {
      onSelectIndex(nextIdx);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    lastDragX.current = e.clientX;
    lastDragTime.current = performance.now();
    startIdxVal.current = currentIdxMotion.get();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = now - lastDragTime.current;
    if (dt > 10) {
      dragVelocity.current = (e.clientX - lastDragX.current) / dt;
      lastDragTime.current = now;
      lastDragX.current = e.clientX;
    }

    const deltaX = e.clientX - dragStartX.current;
    const sensitivity = typeof window !== "undefined" && window.innerWidth < 640 ? 160 : 230;
    const newIdx = startIdxVal.current - deltaX / sensitivity;
    const boundedIdx = Math.max(-0.5, Math.min(garments.length - 0.5, newIdx));
    currentIdxMotion.set(boundedIdx);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    // Add inertia based on velocity
    let target = currentIdxMotion.get();
    if (Math.abs(dragVelocity.current) > 0.4) {
      target -= Math.sign(dragVelocity.current) * 0.6;
    }
    const finalIdx = Math.max(0, Math.min(garments.length - 1, Math.round(target)));
    onSelectIndex(finalIdx);
  };

  const handleGarmentClick = (garment: Garment, idx: number) => {
    if (idx !== selectedIndex) {
      onSelectIndex(idx);
      setTurnedMap((prev) => ({ ...prev, [garment.id]: false }));
      return;
    }

    const isCurrentlyTurnedSide = turnedMap[garment.id] === true;
    if (!isCurrentlyTurnedSide) {
      setTurnedMap((prev) => ({ ...prev, [garment.id]: true }));
    } else {
      onOpenDetail(garment);
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full h-full flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing touch-none overflow-hidden"
    >
      {/* 1. Curved Hanging Brass/Champagne Architecture Rail */}
      <div className="absolute top-[8%] sm:top-[10%] left-0 right-0 h-44 pointer-events-none z-10 flex justify-center">
        <svg
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          className="w-full h-full max-w-6xl opacity-90 drop-shadow-[0_12px_24px_rgba(180,150,110,0.18)]"
        >
          <defs>
            <linearGradient id="brassRail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8F7350" stopOpacity="0.2" />
              <stop offset="25%" stopColor="#BFA07C" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E5D1B8" stopOpacity="1" />
              <stop offset="75%" stopColor="#BFA07C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8F7350" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="brassHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#D9C2A7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8F7350" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Depth / drop shadow rail */}
          <path
            d="M 40 45 Q 600 135 1160 45"
            fill="none"
            stroke="#7C6343"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.35"
          />
          {/* Main Brushed Brass Pipe */}
          <path
            d="M 40 42 Q 600 132 1160 42"
            fill="none"
            stroke="url(#brassRail)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Metallic Top Specular Highlight */}
          <path
            d="M 42 40.5 Q 600 130.5 1158 40.5"
            fill="none"
            stroke="url(#brassHighlight)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 2. Natural Ambient Spotlight on Floor */}
      <div className="absolute bottom-[2%] w-[75%] sm:w-[480px] h-[50px] bg-gradient-to-r from-transparent via-[#8B7355]/15 to-transparent rounded-[100%] blur-2xl pointer-events-none" />

      {/* 3. Garments Carousel along the Arc */}
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-auto">
        {garments.map((garment, idx) => {
          return (
            <GarmentItem
              key={garment.id}
              garment={garment}
              index={idx}
              smoothIdx={smoothIdx}
              selectedIndex={selectedIndex}
              isTurned={turnedMap[garment.id] || false}
              isOverlayOpen={isOverlayOpen}
              customColor={idx === selectedIndex ? selectedColorway : undefined}
              onClick={() => handleGarmentClick(garment, idx)}
              onLookCloser={() => onOpenDetail(garment)}
            />
          );
        })}
      </div>

      {/* 4. Elegant Instructional Guidance */}
      <div className="absolute bottom-5 sm:bottom-7 z-20 flex flex-col items-center pointer-events-none select-none text-center px-4">
        <p className="text-[12px] sm:text-[13px] font-sans tracking-wide text-[#7A7062]">
          Tap a piece to rotate <span className="mx-1.5 opacity-40">•</span> Tap again to inspect
        </p>
      </div>
    </div>
  );
};

interface GarmentItemProps {
  garment: Garment;
  index: number;
  smoothIdx: any;
  selectedIndex: number;
  isTurned: boolean;
  isOverlayOpen: boolean;
  customColor?: string;
  onClick: () => void;
  onLookCloser: () => void;
}

const GarmentItem: React.FC<GarmentItemProps> = ({
  garment,
  index,
  smoothIdx,
  selectedIndex,
  isTurned,
  isOverlayOpen,
  customColor,
  onClick,
  onLookCloser,
}) => {
  const isSelected = index === selectedIndex;

  // Responsive item spacing
  const [spacing, setSpacing] = useState(210);
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) setSpacing(140);
      else if (w < 768) setSpacing(175);
      else if (w < 1024) setSpacing(210);
      else setSpacing(235);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // X position
  const x = useTransform(smoothIdx, (curr: number) => {
    const diff = index - curr;
    return diff * spacing;
  });

  // Curved Rail Parabolic Y drop
  const y = useTransform(smoothIdx, (curr: number) => {
    const diff = index - curr;
    const baseDrop = 50;
    const factor = spacing < 160 ? 12 : 15;
    return baseDrop - Math.pow(diff, 2) * factor;
  });

  // Scale: Center item is prominent, sides scale down
  const scale = useTransform(smoothIdx, (curr: number) => {
    const diff = Math.abs(index - curr);
    const s = 1.05 - Math.min(diff * 0.14, 0.45);
    return Math.max(0.65, s);
  });

  // Natural Pendulum Sway Physics: Tilts smoothly as you slide
  const rotateZ = useTransform(smoothIdx, (curr: number) => {
    const diff = index - curr;
    // As the rack moves, hangers swing with subtle inertia
    const sway = Math.sin(diff * 1.5) * -7;
    return Math.max(-12, Math.min(12, sway));
  });

  // 3D Perspective Y-Rotation
  const rotateY = useTransform(smoothIdx, (curr: number) => {
    const diff = index - curr;
    const clampDiff = Math.max(-2.5, Math.min(2.5, diff));
    return -clampDiff * 14;
  });

  // Opacity: smoothly dim distant garments
  const opacity = useTransform(smoothIdx, (curr: number) => {
    const diff = Math.abs(index - curr);
    if (diff > 2.8) return 0;
    return Math.max(0.2, 1 - diff * 0.32);
  });

  // Z-Index: center is highest within rail (range 10 to 40)
  const zIndex = useTransform(smoothIdx, (curr: number) => {
    const diff = Math.abs(index - curr);
    return Math.max(5, Math.round(40 - diff * 8));
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotateZ,
        rotateY,
        opacity,
        zIndex,
        perspective: 1200,
      }}
      onClick={onClick}
      className={`absolute flex flex-col items-center justify-start cursor-pointer origin-top will-change-transform ${
        isSelected ? "pointer-events-auto" : "pointer-events-auto"
      }`}
    >
      {/* Wooden Hanger with Debossed Leather Price Tag */}
      <div className="z-20">
        <WoodenHanger price={garment.price} currency={garment.currency} isTurned={isTurned} />
      </div>

      {/* Garment Body Container */}
      <motion.div
        animate={{
          rotateY: isTurned ? 90 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 24,
        }}
        className="relative -mt-3.5 flex items-center justify-center w-52 h-64 sm:w-64 sm:h-80 select-none will-change-transform"
      >
        <GarmentVisual
          id={garment.id}
          view={isTurned ? "side" : "front"}
          customColor={customColor}
          className="w-full h-full object-contain"
        />

        {/* Soft fabric ambient ground shadow */}
        <div
          className="absolute -bottom-6 w-36 h-4 rounded-full blur-md bg-black/15 pointer-events-none transition-all duration-300"
          style={{
            transform: isTurned ? "scaleX(0.4)" : "scaleX(1)",
          }}
        />
      </motion.div>

      {/* Look Closer Floating Pill for turned active garment */}
      {isSelected && isTurned && !isOverlayOpen && (
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5 }}
          onClick={(e) => {
            e.stopPropagation();
            onLookCloser();
          }}
          className="mt-2 z-30 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C241D] text-[#F5F2EB] text-xs font-medium tracking-wide shadow-lg hover:bg-[#3D3329] active:scale-95 transition-all duration-200 border border-[#483B2E]"
        >
          <span>Inspect Piece</span>
          <span className="text-[10px] opacity-60">↗</span>
        </motion.button>
      )}
    </motion.div>
  );
};
