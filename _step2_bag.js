const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const full = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("✅", filePath);
}

// ========== CART CONTEXT ==========
write("context/CartContext.tsx", `'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  quantity: number;
  year?: string;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  toggleBag: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  clearBag: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "mahlet-yoseph-bag";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.slug === item.slug && p.size === item.size
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + (item.quantity || 1),
        };
        return next;
      }
      return [
        ...prev,
        {
          id: item.slug + "-" + item.size,
          slug: item.slug,
          name: item.name,
          image: item.image,
          size: item.size,
          year: item.year,
          quantity: item.quantity || 1,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (slug: string, size: string) => {
    setItems((prev) => prev.filter((p) => !(p.slug === slug && p.size === size)));
  };

  const updateQuantity = (slug: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(slug, size);
      return;
    }
    setItems((prev) =>
      prev.map((p) =>
        p.slug === slug && p.size === size ? { ...p, quantity } : p
      )
    );
  };

  const clearBag = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    isOpen,
    openBag: () => setIsOpen(true),
    closeBag: () => setIsOpen(false),
    toggleBag: () => setIsOpen((v) => !v),
    addItem,
    removeItem,
    updateQuantity,
    clearBag,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
`);

// ========== BAG DRAWER ==========
write("components/layout/BagDrawer.tsx", `'use client';

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
`);

// ========== LAYOUT with provider ==========
write("app/layout.tsx", `import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import BagDrawer from "@/components/layout/BagDrawer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MAHLET YOSEPH | Fashion House",
  description:
    "The Art of Strength. Forgotten silhouettes. Reimagined for movement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          playfair.variable +
          " " +
          montserrat.variable +
          " font-sans bg-[#E7DED5] text-[#4A3D37] antialiased min-h-screen"
        }
      >
        <CartProvider>
          <Navbar />
          {children}
          <BagDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
`);

// ========== NAVBAR with bag open ==========
write("components/layout/Navbar.tsx", `'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { totalItems, openBag } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = !isHome || scrolled;
  const tone = solid ? "text-[#4A3D37]" : "text-[#E7DED5]";
  const bar = solid
    ? "bg-[#E7DED5]/85 backdrop-blur-xl border-b border-[#8E786F]/15 shadow-[0_10px_40px_-24px_rgba(54,42,36,0.35)]"
    : "bg-transparent";

  const links = [
    { href: "/pieces", label: "Shop" },
    { href: "/collections", label: "Collections" },
    { href: "/our-story", label: "The Story" },
    { href: "/journal", label: "Journal" },
  ];

  return (
    <>
      <header className={"fixed top-0 inset-x-0 z-50 transition-all duration-500 " + bar}>
        <div
          className={
            "max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 h-16 md:h-[4.5rem] flex items-center justify-between " +
            tone
          }
        >
          <button
            onClick={() => setOpen(true)}
            className={"lg:hidden p-2 -ml-2 " + tone}
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>

          <Link href="/" className="group flex flex-col items-center lg:items-start">
            <span className="flex items-center gap-1.5">
              <Sparkles size={10} className="text-[#C8A86A] fill-[#C8A86A] opacity-90" />
              <span className="font-serif text-[1.35rem] md:text-[1.55rem] tracking-[0.28em] leading-none">
                MY
              </span>
              <Sparkles size={10} className="text-[#C8A86A] fill-[#C8A86A] opacity-90" />
            </span>
            <span
              className={
                "text-[8px] tracking-[0.42em] uppercase mt-1 opacity-70 " +
                (solid ? "text-[#8E786F]" : "text-[#E7DED5]/80")
              }
            >
              Mahlet Yoseph
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-[10px] tracking-[0.28em] uppercase">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "relative py-1 transition-colors hover:text-[#B89DA4] " +
                  (pathname.startsWith(l.href) ? "text-[#B89DA4]" : "")
                }
              >
                {l.label}
                {pathname.startsWith(l.href) && (
                  <motion.span
                    layoutId="nav-ink"
                    className="absolute left-0 right-0 -bottom-0.5 h-px bg-[#C8A86A]"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5 md:gap-7 text-[10px] tracking-[0.28em] uppercase">
            <Link
              href="/archive"
              className={"hidden sm:inline hover:text-[#B89DA4] transition " + tone}
            >
              Archive
            </Link>
            <button
              onClick={openBag}
              className={"inline-flex items-center gap-1.5 hover:text-[#B89DA4] transition " + tone}
            >
              <span>Bag</span>
              <span className="opacity-80">({totalItems})</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#362A24] text-[#E7DED5]"
          >
            <div className="relative h-full flex flex-col p-8 md:p-12">
              <div className="flex justify-between items-center border-b border-[#8E786F]/30 pb-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={12} className="text-[#C8A86A] fill-[#C8A86A]" />
                  <span className="font-serif tracking-[0.28em] text-sm">
                    MAHLET YOSEPH
                  </span>
                </div>
                <button onClick={() => setOpen(false)} className="p-2" aria-label="Close">
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="my-auto flex flex-col gap-5">
                {[
                  { href: "/pieces", label: "Shop All" },
                  { href: "/collections", label: "Collections" },
                  { href: "/archive", label: "The Archive" },
                  { href: "/our-story", label: "Our Story" },
                  { href: "/journal", label: "Journal" },
                ].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 * i,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-serif text-4xl sm:text-5xl tracking-wide hover:text-[#B89DA4] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-[#8E786F]/30 pt-6 flex justify-between items-center text-[10px] tracking-[0.25em] text-[#8E786F]">
                <span>Not vintage. Forgotten.</span>
                <button
                  onClick={() => {
                    setOpen(false);
                    openBag();
                  }}
                  className="text-[#E7DED5] hover:text-[#C8A86A] transition"
                >
                  Bag ({totalItems})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`);

// ========== PRODUCT PAGE with real add to bag ==========
write("app/pieces/[slug]/page.tsx", `'use client';

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getProduct,
  getRelatedProducts,
  getCollection,
} from "@/lib/data";
import { useCart } from "@/context/CartContext";

const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProduct(slug);
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#E7DED5] pt-32 px-6 text-center">
        <h1 className="font-serif text-3xl">Piece not found</h1>
        <Link
          href="/pieces"
          className="mt-6 inline-block text-sm tracking-widest uppercase"
        >
          ← Back to Pieces
        </Link>
      </main>
    );
  }

  const collection = getCollection(product.collection);
  const related = getRelatedProducts(product.slug);

  const handleAdd = () => {
    addItem({
      id: product.slug,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size,
      year: product.year,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-24 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <Link
          href="/pieces"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#8E786F] hover:text-[#4A3D37] mb-8"
        >
          <ArrowLeft size={12} /> All Pieces
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative aspect-[3/4] bg-[#DED5CD] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 right-6 text-[9px] tracking-widest uppercase text-[#E7DED5] bg-[#362A24]/60 backdrop-blur px-3 py-2">
              360° Explore
            </div>
          </div>

          <div className="flex flex-col justify-center lg:py-8">
            {collection && (
              <Link
                href={"/collections/" + collection.slug}
                className="text-[10px] tracking-[0.25em] uppercase text-[#8E786F] hover:text-[#B89DA4]"
              >
                {collection.name}
              </Link>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mt-3">
              {product.name}
            </h1>
            <p className="text-[10px] tracking-widest text-[#8E786F] mt-3">
              {product.year}
            </p>
            <p className="mt-8 text-[#8E786F] font-light leading-relaxed max-w-md">
              {product.description}
            </p>

            <div className="mt-10">
              <p className="text-[10px] tracking-[0.2em] uppercase mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={
                      "w-12 h-12 text-xs tracking-widest border transition " +
                      (size === s
                        ? "bg-[#4A3D37] text-[#E7DED5] border-[#4A3D37]"
                        : "border-[#8E786F]/40 hover:border-[#4A3D37]")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="mt-10 w-full sm:w-auto sm:min-w-[280px] bg-[#4A3D37] hover:bg-[#8E786F] text-[#E7DED5] py-4 px-8 text-[11px] tracking-[0.25em] uppercase transition"
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
          </div>
        </div>

        <section className="mt-20 md:mt-28 max-w-3xl border-t border-[#8E786F]/20 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
            The Story Behind The Piece
          </span>
          <p className="font-serif text-2xl sm:text-3xl mt-6 leading-snug">
            {product.story}
          </p>
        </section>

        <section className="mt-16 py-12 border-y border-[#8E786F]/20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F] mb-6">
            From Root to Form
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] tracking-[0.15em] uppercase text-[#4A3D37]">
            <span>Cotton</span>
            <span className="text-[#8E786F]">→</span>
            <span>Textile</span>
            <span className="text-[#8E786F]">→</span>
            <span>Sketch</span>
            <span className="text-[#8E786F]">→</span>
            <span>Garment</span>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-serif text-2xl md:text-3xl">Related Pieces</h2>
            <Link
              href="/pieces"
              className="text-[10px] tracking-[0.2em] uppercase flex items-center gap-2"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link key={p.slug} href={"/pieces/" + p.slug} className="group">
                <div className="relative aspect-[3/4] bg-[#DED5CD] mb-3 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    sizes="25vw"
                  />
                </div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase font-semibold">
                  {p.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
`);

console.log("\\n🎉 STEP 2 COMPLETE: Premium Bag Drawer + Cart system");
console.log("Test: open a product → Add to Bag → drawer slides in");
console.log("Navbar BAG (n) updates. Persists in localStorage.");
