'use client';

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
