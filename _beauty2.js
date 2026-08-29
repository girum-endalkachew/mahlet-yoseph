const fs = require("fs");
const path = require("path");

const nav = `'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
        <div className={"max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 h-16 md:h-[4.5rem] flex items-center justify-between " + tone}>
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
            <span className={"text-[8px] tracking-[0.42em] uppercase mt-1 opacity-70 " + (solid ? "text-[#8E786F]" : "text-[#E7DED5]/80")}>
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
            <Link href="/archive" className={"hidden sm:inline hover:text-[#B89DA4] transition " + tone}>
              Archive
            </Link>
            <button className={"inline-flex items-center gap-1.5 hover:text-[#B89DA4] transition " + tone}>
              <span>Bag</span>
              <span className="opacity-70">(0)</span>
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
            <div className="absolute inset-0 grain" />
            <div className="relative h-full flex flex-col p-8 md:p-12">
              <div className="flex justify-between items-center border-b border-[#8E786F]/30 pb-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={12} className="text-[#C8A86A] fill-[#C8A86A]" />
                  <span className="font-serif tracking-[0.28em] text-sm">MAHLET YOSEPH</span>
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
                    transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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

              <div className="border-t border-[#8E786F]/30 pt-6 flex justify-between text-[10px] tracking-[0.25em] text-[#8E786F]">
                <span>Not vintage. Forgotten.</span>
                <span>Addis Ababa</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`;

fs.writeFileSync(path.join(__dirname, "components", "layout", "Navbar.tsx"), nav, "utf8");
console.log("✅ Navbar beauty pass done");
