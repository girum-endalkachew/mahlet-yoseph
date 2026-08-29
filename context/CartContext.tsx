'use client';

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
