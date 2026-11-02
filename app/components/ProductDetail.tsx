"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Garment } from "../data/garments";
import { GarmentVisual } from "./GarmentVisual";

interface ProductDetailProps {
  garment: Garment | null;
  isOpen: boolean;
  activeColorway?: string;
  onSelectColorway?: (hex: string) => void;
  onClose: () => void;
  onAddToCart: (garment: Garment, size: string, colorHex?: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  garment,
  isOpen,
  activeColorway,
  onSelectColorway,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [viewAngle, setViewAngle] = useState<"front" | "back">("front");
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  if (!isOpen || !garment) return null;

  const currentColor = activeColorway || garment.colorHex;

  const handleAdd = () => {
    setIsAddedAnimation(true);
    onAddToCart(garment, selectedSize, currentColor);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1E1B18]/60 backdrop-blur-md">
        {/* Backdrop dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Atelier Modal Card */}
        <motion.div
          initial={{ y: "100%", opacity: 0.7 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 320 }}
          className="relative w-full max-w-lg bg-[#FAF7F0] border-t sm:border border-[#DCD3C5] sm:rounded-3xl shadow-2xl overflow-hidden z-20 flex flex-col max-h-[92vh] sm:max-h-[88vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFD1]">
            <div>
              <p className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7A65]">
                {garment.numberTag} • {garment.category}
              </p>
              <h2 className="font-serif-luxury text-2xl font-normal text-[#2A241E] leading-tight">
                {garment.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EFE7D8] text-[#4A4035] transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content inside modal */}
          <div className="overflow-y-auto px-6 py-5 space-y-6">
            {/* Visual Preview with 3D Flip */}
            <div className="relative w-full h-64 sm:h-72 bg-[#F2EDE1] rounded-2xl flex flex-col items-center justify-center border border-[#E3D9C9] p-4">
              {/* Front / Back Toggle Pill */}
              <div className="absolute top-3 right-3 flex items-center bg-[#E5DC CD] bg-[#E8E0D2] rounded-full p-0.5 border border-[#D5CABB] text-[11px] font-medium z-10">
                <button
                  onClick={() => setViewAngle("front")}
                  className={`px-3 py-1 rounded-full transition-all ${
                    viewAngle === "front"
                      ? "bg-[#2C241D] text-white shadow-sm"
                      : "text-[#6B5E4F] hover:text-black"
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setViewAngle("back")}
                  className={`px-3 py-1 rounded-full transition-all ${
                    viewAngle === "back"
                      ? "bg-[#2C241D] text-white shadow-sm"
                      : "text-[#6B5E4F] hover:text-black"
                  }`}
                >
                  Back
                </button>
              </div>

              {/* Garment Visual */}
              <motion.div
                key={viewAngle}
                initial={{ rotateY: viewAngle === "front" ? -90 : 90, opacity: 0.5 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-48 h-56 sm:w-56 sm:h-64 flex items-center justify-center"
              >
                <GarmentVisual
                  id={garment.id}
                  view={viewAngle}
                  customColor={currentColor}
                  className="w-full h-full"
                />
              </motion.div>
            </div>

            {/* Colorway Swatches */}
            {garment.colorways && garment.colorways.length > 0 && (
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6B59] block mb-2">
                  Atelier Palette <span className="font-serif-luxury italic lowercase text-xs font-normal">({garment.colorways.find(c => c.garmentHex === currentColor)?.name || garment.colorName})</span>
                </label>
                <div className="flex items-center gap-3">
                  {garment.colorways.map((c) => {
                    const isSelected = currentColor.toLowerCase() === c.garmentHex.toLowerCase();
                    return (
                      <button
                        key={c.name}
                        onClick={() => onSelectColorway?.(c.garmentHex)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs ${
                          isSelected
                            ? "border-[#2C241D] bg-[#2C241D] text-[#FAF7F0] shadow-sm"
                            : "border-[#DCD2C3] bg-[#F3EDE2] text-[#4A4035] hover:border-[#8B7A66]"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6B59]">
                  Select Cut
                </label>
                <span className="text-[11px] text-[#8C7A65] underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {garment.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        isSelected
                          ? "bg-[#2C241D] text-white border-[#2C241D] shadow-sm"
                          : "bg-[#F3ECE0] text-[#4A4035] border-[#DED4C5] hover:border-[#8C7A65]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Composition & Fabric Story */}
            <div className="space-y-3 pt-2 border-t border-[#E8DFD1]">
              <p className="text-xs text-[#524639] leading-relaxed">
                {garment.description}
              </p>
              <div className="bg-[#F3ECE0] p-3 rounded-xl border border-[#DFD5C6] space-y-1">
                <p className="text-[11px] font-medium text-[#7A6B59] uppercase tracking-wide">
                  Fabric Composition
                </p>
                <p className="text-xs text-[#2A241E] font-medium font-serif-luxury text-[13px]">
                  {garment.composition}
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Action */}
          <div className="p-4 sm:p-5 border-t border-[#E8DFD1] bg-[#FAF7F0] flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-[#8C7A65] uppercase tracking-widest font-medium">Prix Total</p>
              <p className="font-serif-luxury text-2xl font-semibold text-[#2A241E]">
                {garment.currency}{garment.price}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className={`flex-1 py-3 px-6 rounded-2xl font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                isAddedAnimation
                  ? "bg-[#4B6B4D] text-white"
                  : "bg-[#2C241D] text-[#FAF7F0] hover:bg-[#3D3329]"
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check size={16} />
                  <span>Ajouté au Panier</span>
                </>
              ) : (
                <span>Add to Wardrobe • {selectedSize}</span>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
