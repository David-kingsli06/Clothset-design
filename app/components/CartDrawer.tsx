"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Garment } from "../data/garments";

export interface CartItem {
  id: string;
  garment: Garment;
  size: string;
  quantity: number;
  customColor?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountOpen, setDiscountOpen] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.garment.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === "ATELIER" || discountCode.trim().toUpperCase() === "STYLE") {
      setAppliedDiscount(20);
    } else if (discountCode.trim().length > 0) {
      alert("Try promotion code: ATELIER for 20% off");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1E1B18]/60 backdrop-blur-sm cursor-pointer z-10"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-20">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-[#FAF7F0] border-l border-[#DCD3C5] shadow-2xl flex flex-col relative z-20"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DFD1]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#4A4035]" />
                <h2 className="font-serif-luxury text-xl font-normal text-[#2A241E]">
                  Wardrobe Cart ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#EFE7D8] text-[#4A4035] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-[#7A6B59] space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#EFE7D8] flex items-center justify-center">
                    <ShoppingBag size={24} className="opacity-40" />
                  </div>
                  <p className="font-serif-luxury text-lg">Your curated wardrobe is empty.</p>
                  <p className="text-xs text-[#8C7A65]">Slide along the rail and inspect pieces to add.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-4 p-3 bg-[#F3EDE2] rounded-2xl border border-[#E2D8C9]"
                  >
                    {/* Color dot / thumbnail indication */}
                    <div
                      className="w-14 h-16 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden"
                      style={{ backgroundColor: item.customColor || item.garment.colorHex }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white uppercase">{item.size}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-luxury text-base text-[#2A241E] truncate font-medium">
                        {item.garment.name}
                      </h4>
                      <p className="text-[11px] text-[#7A6B59]">
                        Size: <span className="font-semibold text-[#2A241E]">{item.size}</span>
                      </p>
                      <p className="text-xs font-semibold text-[#2A241E] mt-1">
                        {item.garment.currency}{item.garment.price * item.quantity}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-[#FAF7F0] border border-[#D5CABB] rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-[#6B5E4F] hover:text-black transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-semibold px-1 min-w-[14px] text-center text-[#2A241E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-[#6B5E4F] hover:text-black transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-[#9A8978] hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Promo Code Drawer */}
            {items.length > 0 && (
              <div className="px-6 py-2 border-t border-[#E8DFD1]">
                {!discountOpen ? (
                  <button
                    onClick={() => setDiscountOpen(true)}
                    className="text-[11px] text-[#7A6B59] hover:underline font-medium"
                  >
                    + Apply Atelier VIP Invitation Code
                  </button>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. ATELIER"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 bg-[#F3EDE2] border border-[#D5CABB] rounded-xl px-3 py-1.5 text-xs text-[#2A241E] uppercase tracking-wider outline-none focus:border-[#7A6B59]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#2C241D] text-[#FAF7F0] text-xs rounded-xl hover:bg-[#3D3329]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {appliedDiscount > 0 && (
                  <p className="text-[11px] text-[#3E6B42] font-semibold mt-1">
                    ✓ 20% Atelier Courtesy Applied
                  </p>
                )}
              </div>
            )}

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#E8DFD1] bg-[#FAF7F0] space-y-3">
                <div className="space-y-1.5 text-xs text-[#6B5E4F]">
                  <div className="flex justify-between">
                    <span>Sous-Total</span>
                    <span className="font-medium text-[#2A241E]">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-[#3E6B42]">
                      <span>VIP Privilege (-{appliedDiscount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Complimentary Shipping</span>
                    <span className="text-[#3E6B42] font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#2A241E] pt-2 border-t border-[#E8DFD1]">
                    <span className="font-serif-luxury text-lg">Total</span>
                    <span className="font-serif-luxury text-xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 px-4 bg-[#2C241D] hover:bg-[#3D3329] active:scale-[0.99] text-[#FAF7F0] rounded-2xl font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Acquire Wardrobe</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
