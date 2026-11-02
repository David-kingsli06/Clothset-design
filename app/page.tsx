"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  ShoppingBag,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { GARMENTS, Garment } from "./data/garments";
import { CurvedRail } from "./components/CurvedRail";
import { ProductDetail } from "./components/ProductDetail";
import { CartDrawer, CartItem } from "./components/CartDrawer";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(2); // Start on Sweatshirt Plus
  const [selectedGarmentForDetail, setSelectedGarmentForDetail] = useState<Garment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Custom active colorway mapping per garment id
  const [colorways, setColorways] = useState<Record<string, string>>({
    "item-3": "#1b3b2b",
  });

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "init-cart-item",
      garment: GARMENTS[2],
      size: "L",
      quantity: 1,
      customColor: "#1b3b2b",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"AUTUMN / WINTER 2027" | "CURATED ARCHIVE">("AUTUMN / WINTER 2027");

  const activeGarment = GARMENTS[selectedIndex] || GARMENTS[0];
  const activeGarmentColor = colorways[activeGarment.id] || activeGarment.colorHex;

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDetailOpen || isCartOpen) return;
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => Math.min(GARMENTS.length - 1, prev + 1));
      } else if (e.key === "Enter" || e.key === " ") {
        handleOpenDetail(activeGarment);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDetailOpen, isCartOpen, activeGarment]);

  const handleOpenDetail = (garment: Garment) => {
    setSelectedGarmentForDetail(garment);
    setIsDetailOpen(true);
  };

  const handleSelectColorway = (garmentId: string, hex: string) => {
    setColorways((prev) => ({ ...prev, [garmentId]: hex }));
  };

  const handleAddToCart = (garment: Garment, size: string, colorHex?: string) => {
    const resolvedColor = colorHex || colorways[garment.id] || garment.colorHex;
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.garment.id === garment.id && item.size === size && item.customColor === resolvedColor
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${garment.id}-${size}-${resolvedColor}-${Date.now()}`,
          garment,
          size,
          quantity: 1,
          customColor: resolvedColor,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, quantity: it.quantity + delta } : it))
        .filter((it) => it.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleCheckout = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C5A67C", "#8F7350", "#2C241D", "#FAF7F0"],
    });
    alert("Thank you for your order with L'Atelier Édition.");
    setCartItems([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <main className="relative w-screen h-screen max-h-screen overflow-hidden bg-[#F5F2EB] bg-grain text-[#22201D] flex flex-col justify-between select-none">
      {/* =========================================================================
          TOP ATMOSPHERE / ARCHIVAL BRAND HEADER
      ========================================================================= */}
      <header className="relative z-30 w-full px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between border-b border-[#E3DACB]/80 backdrop-blur-xs">
        {/* Left: Atelier Edition Stamp */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C5A67C] flex items-center justify-center font-serif-luxury text-sm font-semibold italic text-[#69543C] bg-[#EDE6D8]">
            É
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif-luxury text-base sm:text-lg tracking-wider font-semibold uppercase text-[#22201D] leading-none">
              L’Atelier Édition
            </h1>
            <span className="text-[10px] sm:text-[11px] tracking-widest text-[#7E7060] uppercase mt-0.5">
              Paris • Copenhagen • Tokyo
            </span>
          </div>
        </div>

        {/* Center: Curated Collection Tabs (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center bg-[#E8E0D2] p-1 rounded-full border border-[#D8CEBF]">
          <button
            onClick={() => setActiveTab("AUTUMN / WINTER 2027")}
            className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
              activeTab === "AUTUMN / WINTER 2027"
                ? "bg-[#2C241D] text-[#FAF7F0] shadow-sm"
                : "text-[#6B5E4F] hover:text-black"
            }`}
          >
            A/W 2027 COLLECTION
          </button>
          <button
            onClick={() => setActiveTab("CURATED ARCHIVE")}
            className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
              activeTab === "CURATED ARCHIVE"
                ? "bg-[#2C241D] text-[#FAF7F0] shadow-sm"
                : "text-[#6B5E4F] hover:text-black"
            }`}
          >
            CURATED ARCHIVE
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => alert("Search curated collection...")}
            className="p-2 sm:p-2.5 rounded-full hover:bg-[#E9E1D2] text-[#42392F] transition-colors"
            title="Search"
          >
            <Search size={17} />
          </button>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C241D] text-[#FAF7F0] text-xs font-medium tracking-wide shadow-sm hover:bg-[#3D3329] transition-all"
            title="Wardrobe Cart"
          >
            <ShoppingBag size={14} />
            <span className="hidden sm:inline font-serif-luxury text-sm italic font-normal">Wardrobe</span>
            <span className="w-5 h-5 rounded-full bg-[#C5A67C] text-[#2C241D] font-bold text-[10px] flex items-center justify-center">
              {totalCartCount}
            </span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          CENTER HERO: CURVED ROTATING RAIL (Strictly zero vertical page scroll)
      ========================================================================= */}
      <section className="relative flex-1 w-full flex items-center justify-center min-h-0 z-0">
        {/* Soft Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] overflow-hidden select-none">
          <span className="font-serif-luxury text-[32vw] tracking-tighter uppercase whitespace-nowrap text-[#2C241D]">
            ATELIER
          </span>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
          disabled={selectedIndex === 0}
          className="absolute left-3 sm:left-8 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FAF7F0]/90 border border-[#D5CABB] text-[#4A4035] flex items-center justify-center shadow-md hover:bg-white active:scale-95 disabled:opacity-20 disabled:pointer-events-none transition-all"
          title="Previous garment"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Curved Rail Component */}
        <CurvedRail
          garments={GARMENTS}
          selectedIndex={selectedIndex}
          selectedColorway={activeGarmentColor}
          isOverlayOpen={isDetailOpen || isCartOpen}
          onSelectIndex={setSelectedIndex}
          onOpenDetail={handleOpenDetail}
        />

        {/* Right Arrow Button */}
        <button
          onClick={() => setSelectedIndex((prev) => Math.min(GARMENTS.length - 1, prev + 1))}
          disabled={selectedIndex === GARMENTS.length - 1}
          className="absolute right-3 sm:right-8 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FAF7F0]/90 border border-[#D5CABB] text-[#4A4035] flex items-center justify-center shadow-md hover:bg-white active:scale-95 disabled:opacity-20 disabled:pointer-events-none transition-all"
          title="Next garment"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* =========================================================================
          BOTTOM DOCK: ACTIVE GARMENT STORY, COLORWAYS & ACTIONS
      ========================================================================= */}
      <footer className="relative z-30 w-full px-4 sm:px-8 py-3.5 sm:py-4 border-t border-[#E3DACB]/80 bg-[#FAF7F0]/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left info: Active Garment Editorial Details */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-widest text-[#8C7A65] uppercase">
                {activeGarment.numberTag}
              </span>
              <span className="text-[10px] text-[#A89883]">•</span>
              <span className="text-[10px] font-medium tracking-wide text-[#7E7060]">
                {activeGarment.subtitle}
              </span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#2A241E] leading-tight">
              {activeGarment.name}
            </h3>
          </div>

          {/* Colorway Swatches Direct in the Footer Dock */}
          {activeGarment.colorways && (
            <div className="flex items-center gap-2 pl-3 border-l border-[#DCD3C5]">
              {activeGarment.colorways.map((c) => {
                const isSelected = (activeGarmentColor || activeGarment.colorHex).toLowerCase() === c.garmentHex.toLowerCase();
                return (
                  <button
                    key={c.name}
                    onClick={() => handleSelectColorway(activeGarment.id, c.garmentHex)}
                    title={c.name}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      isSelected
                        ? "ring-2 ring-[#2C241D] ring-offset-2 ring-offset-[#FAF7F0] scale-110"
                        : "border-black/20 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Center: Arc Progress Indicator */}
        <div className="flex items-center gap-1.5">
          {GARMENTS.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => setSelectedIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === selectedIndex ? "w-8 bg-[#2C241D]" : "w-2 bg-[#D5CABB] hover:bg-[#8C7A65]"
              }`}
              title={g.name}
            />
          ))}
        </div>

        {/* Right: Quick Look Closer & Price */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-[#8C7A65] block">Price</span>
            <span className="font-serif-luxury text-xl font-semibold text-[#2A241E]">
              {activeGarment.currency}{activeGarment.price}
            </span>
          </div>

          <button
            onClick={() => handleOpenDetail(activeGarment)}
            className="px-5 py-2.5 rounded-full bg-[#2C241D] hover:bg-[#3D3329] active:scale-95 text-[#FAF7F0] text-xs font-semibold tracking-wider uppercase shadow-md transition-all flex items-center gap-2"
          >
            <span>Inspect Piece</span>
            <span className="text-sm font-light">↗</span>
          </button>
        </div>
      </footer>

      {/* =========================================================================
          PRODUCT DETAIL MODAL & CART DRAWER
      ========================================================================= */}
      <div className="relative z-50">
        <ProductDetail
          garment={selectedGarmentForDetail}
          isOpen={isDetailOpen}
          activeColorway={selectedGarmentForDetail ? colorways[selectedGarmentForDetail.id] : undefined}
          onSelectColorway={(hex) => {
            if (selectedGarmentForDetail) {
              handleSelectColorway(selectedGarmentForDetail.id, hex);
            }
          }}
          onClose={() => setIsDetailOpen(false)}
          onAddToCart={handleAddToCart}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>
    </main>
  );
}
