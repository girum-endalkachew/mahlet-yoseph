'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import BrandLogo from "@/components/ui/BrandLogo";

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
    ? "bg-[#E7DED5]/90 backdrop-blur-xl border-b border-[#8E786F]/15 shadow-sm"
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
        <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 h-16 md:h-20 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className={"lg:hidden p-2 -ml-2 " + tone}
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          <BrandLogo light={!solid} size="md" />

          <nav className="hidden lg:flex items-center gap-10 text-[10px] tracking-[0.28em] uppercase font-sans">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "relative py-1 transition-colors hover:text-[#B89DA4] " +
                  (pathname.startsWith(l.href) ? "text-[#B89DA4]" : tone)
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

          <div className={"flex items-center gap-5 md:gap-7 text-[10px] tracking-[0.28em] uppercase font-sans " + tone}>
            <Link href="/archive" className="hidden sm:inline hover:text-[#B89DA4] transition">
              Archive
            </Link>
            <button
              onClick={openBag}
              className="inline-flex items-center gap-1.5 hover:text-[#B89DA4] transition"
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
                <BrandLogo light size="md" />
                <button onClick={() => setOpen(false)} className="p-2 text-[#E7DED5]" aria-label="Close">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="my-auto flex flex-col gap-6">
                {[
                  { href: "/pieces", label: "SHOP ALL" },
                  { href: "/collections", label: "COLLECTIONS" },
                  { href: "/archive", label: "THE ARCHIVE" },
                  { href: "/our-story", label: "OUR STORY" },
                  { href: "/journal", label: "JOURNAL" },
                ].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-serif text-3xl sm:text-5xl tracking-wide hover:text-[#B89DA4] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-[#8E786F]/30 pt-6 flex justify-between items-center text-[10px] tracking-[0.25em] text-[#8E786F]">
                <span>NOT VINTAGE. FORGOTTEN.</span>
                <span>ADDIS ABABA</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
