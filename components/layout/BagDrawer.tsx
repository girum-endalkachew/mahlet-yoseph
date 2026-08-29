'use client';

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function BagDrawer() {
  const {
    items,
    isOpen,
    closeBag,
    removeItem,
    updateQuantity,
    totalItems,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bag-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] bg-[#362A24]/45 backdrop-blur-[2px]"
            onClick={closeBag}
          />

          {/* Drawer */}
          <motion.aside
            key="bag-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[80] h-full w-full max-w-[420px] bg-[#F5EFE6] text-[#4A3D37] shadow-[-20px_0_60px_rgba(54,42,36,0.2)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#8E786F]/20">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
                  Your bag
                </p>
                <h2 className="font-serif text-2xl mt-1">
                  {totalItems === 0
                    ? "Empty"
                    : totalItems === 1
                    ? "1 Piece"
                    : totalItems + " Pieces"}
                </h2>
              </div>
              <button
                onClick={closeBag}
                className="w-10 h-10 rounded-full border border-[#8E786F]/30 flex items-center justify-center hover:bg-[#4A3D37] hover:text-[#E7DED5] transition"
                aria-label="Close bag"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <p className="font-serif text-2xl text-[#4A3D37]">
                    Nothing here yet.
                  </p>
                  <p className="mt-3 text-sm text-[#8E786F] font-light max-w-xs leading-relaxed">
                    Forgotten pieces are waiting. Enter a world and add what moves you.
                  </p>
                  <button
                    onClick={closeBag}
                    className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase border border-[#4A3D37] px-6 py-3 hover:bg-[#4A3D37] hover:text-[#E7DED5] transition"
                  >
                    Continue exploring
                    <ArrowRight size={12} />
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 border-b border-[#8E786F]/15 pb-6"
                    >
                      <Link
                        href={"/pieces/" + item.slug}
                        onClick={closeBag}
                        className="relative w-24 h-32 shrink-0 bg-[#DED5CD] overflow-hidden"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              href={"/pieces/" + item.slug}
                              onClick={closeBag}
                              className="text-[11px] tracking-[0.15em] uppercase font-semibold hover:text-[#B89DA4] transition line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            {item.year && (
                              <p className="text-[9px] tracking-widest text-[#8E786F] mt-1">
                                {item.year}
                              </p>
                            )}
                            <p className="text-[10px] text-[#8E786F] mt-2 tracking-wider uppercase">
                              Size {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.slug, item.size)}
                            className="text-[9px] tracking-[0.2em] uppercase text-[#8E786F] hover:text-[#4A3D37] shrink-0"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mt-auto pt-4 flex items-center gap-3">
                          <div className="inline-flex items-center border border-[#8E786F]/30">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.slug,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center hover:bg-[#E7DED5] transition"
                              aria-label="Decrease"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs tracking-widest">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.slug,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center hover:bg-[#E7DED5] transition"
                              aria-label="Increase"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#8E786F]/20 px-6 py-6 bg-[#E7DED5]">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8E786F] mb-4 leading-relaxed">
                  Shipping & returns calculated at inquiry. No prices shown — this bag is a request list.
                </p>
                <button
                  className="w-full bg-[#4A3D37] hover:bg-[#8E786F] text-[#E7DED5] py-4 text-[11px] tracking-[0.28em] uppercase transition"
                  onClick={() => {
                    closeBag();
                    // placeholder for future checkout / inquiry
                    window.location.href = "mailto:hello@mahletyoseph.com?subject=Bag Inquiry — Mahlet Yoseph";
                  }}
                >
                  Request these pieces
                </button>
                <button
                  onClick={closeBag}
                  className="w-full mt-3 text-[10px] tracking-[0.25em] uppercase text-[#8E786F] hover:text-[#4A3D37] py-2 transition"
                >
                  Continue exploring
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
