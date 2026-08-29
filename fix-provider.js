const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const full = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("✅ Fixed:", filePath);
}

// 1. SAFE CART CONTEXT (never crashes if context is momentarily missing during SSR)
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

// Fallback safety to avoid crash
const defaultContext: CartContextValue = {
  items: [],
  isOpen: false,
  openBag: () => {},
  closeBag: () => {},
  toggleBag: () => {},
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearBag: () => {},
  totalItems: 0,
};

export function useCart() {
  const ctx = useContext(CartContext);
  return ctx || defaultContext;
}
`);

// 2. CLIENT PROVIDERS WRAPPER
write("components/providers/ClientProviders.tsx", `'use client';

import React from "react";
import { CartProvider } from "@/context/CartContext";
import BagDrawer from "@/components/layout/BagDrawer";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <BagDrawer />
    </CartProvider>
  );
}
`);

// 3. CLEAN ROOT LAYOUT
write("app/layout.tsx", `import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { ClientProviders } from "@/components/providers/ClientProviders";
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
        <ClientProviders>
          <Navbar />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
`);

// Clean build cache if present
const nextDir = path.join(__dirname, '.next');
if (fs.existsSync(nextDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log("✅ Next.js cache cleared.");
  } catch {}
}

console.log("\\n🎉 Provider fix deployed cleanly!");
