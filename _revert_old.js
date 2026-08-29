const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const full = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("✅ Reverted:", filePath);
}

write("components/ui/BrandLogo.tsx", `'use client';

import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  light?: boolean;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export default function BrandLogo({
  light = false,
  size = "md",
  showTagline = true,
  className = "",
}: BrandLogoProps) {
  const logoSizes = {
    sm: "w-7 h-7",
    md: "w-10 h-10 md:w-12 md:h-12",
    lg: "w-16 h-16 md:w-20 md:h-20",
  };

  const titleSizes = {
    sm: "text-xs tracking-[0.25em]",
    md: "text-sm md:text-base tracking-[0.28em]",
    lg: "text-xl md:text-2xl tracking-[0.32em]",
  };

  const taglineSizes = {
    sm: "text-[7px] tracking-[0.35em]",
    md: "text-[8px] md:text-[9px] tracking-[0.4em]",
    lg: "text-[10px] md:text-[11px] tracking-[0.45em]",
  };

  const textColor = light ? "text-[#E7DED5]" : "text-[#4A3D37]";
  const subtextColor = light ? "text-[#C8A86A]" : "text-[#8E786F]";

  return (
    <Link href="/" className={"group inline-flex items-center gap-3 " + className}>
      <div className={"relative shrink-0 " + logoSizes[size]}>
        <Image
          src="/images/logo/mylogo.jpg"
          alt="MAHLET YOSEPH Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className={"font-serif font-medium leading-none uppercase transition-colors group-hover:text-[#B89DA4] " + textColor + " " + titleSizes[size]}>
          MAHLET YOSEPH
        </span>
        {showTagline && (
          <span className={"font-sans uppercase mt-1 opacity-80 " + subtextColor + " " + taglineSizes[size]}>
            THE ART OF STRENGTH
          </span>
        )}
      </div>
    </Link>
  );
}
`);

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
  description: "The Art of Strength. Forgotten silhouettes. Reimagined for movement.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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

write("app/globals.css", `@import "tailwindcss";

:root {
  --cream: #E7DED5;
  --taupe: #8E786F;
  --dark: #4A3D37;
  --ink: #362A24;
  --pink: #B89DA4;
  --gold: #C8A86A;
}

html { scroll-behavior: smooth; }
body {
  background: var(--cream);
  color: var(--dark);
  -webkit-font-smoothing: antialiased;
}
::selection { background: #B89DA4; color: #E7DED5; }
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair), serif;
  font-weight: 400;
}
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.gold-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, #C8A86A, transparent);
}
.grain::after {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  z-index: 2;
}
.link-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0% 1px;
  transition: background-size 0.4s ease;
}
.link-underline:hover { background-size: 100% 1px; }
`);

write("components/layout/Navbar.tsx", `'use client';

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
  const isDark = pathname === "/philosophy";
  const { totalItems, openBag } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = (!isHome && !isDark) || scrolled;
  const tone = solid ? "text-[#4A3D37]" : "text-[#E7DED5]";
  const bar = solid
    ? "bg-[#E7DED5]/90 backdrop-blur-xl border-b border-[#8E786F]/15 shadow-sm"
    : "bg-transparent";

  const links = [
    { href: "/pieces", label: "Shop" },
    { href: "/collections", label: "Collections" },
    { href: "/philosophy", label: "Philosophy" },
    { href: "/our-story", label: "The Story" },
    { href: "/journal", label: "Journal" },
  ];

  return (
    <>
      <header className={"fixed top-0 inset-x-0 z-50 transition-all duration-500 " + bar}>
        <div className={"max-w-[1800px] mx-auto px-5 sm:px-8 md:px-12 h-16 md:h-20 flex items-center justify-between " + tone}>
          <button onClick={() => setOpen(true)} className={"lg:hidden p-2 -ml-2 " + tone} aria-label="Open menu">
            <Menu size={20} strokeWidth={1.5} />
          </button>
          <BrandLogo light={!solid} size="md" />
          <nav className="hidden lg:flex items-center gap-8 text-[10px] tracking-[0.28em] uppercase font-sans">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={"relative py-1 transition-colors hover:text-[#B89DA4] " + (pathname.startsWith(l.href) ? "text-[#B89DA4]" : "")}>
                {l.label}
                {pathname.startsWith(l.href) && (
                  <motion.span layoutId="nav-ink" className="absolute left-0 right-0 -bottom-0.5 h-px bg-[#C8A86A]" />
                )}
              </Link>
            ))}
          </nav>
          <div className={"flex items-center gap-5 md:gap-7 text-[10px] tracking-[0.28em] uppercase font-sans " + tone}>
            <Link href="/archive" className="hidden sm:inline hover:text-[#B89DA4] transition">Archive</Link>
            <button onClick={openBag} className="inline-flex items-center gap-1.5 hover:text-[#B89DA4] transition">
              <span>Bag</span>
              <span className="opacity-80">({totalItems})</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#362A24] text-[#E7DED5]">
            <div className="relative h-full flex flex-col p-8 md:p-12">
              <div className="flex justify-between items-center border-b border-[#8E786F]/30 pb-6">
                <BrandLogo light size="md" />
                <button onClick={() => setOpen(false)} className="p-2" aria-label="Close"><X size={24} strokeWidth={1.5} /></button>
              </div>
              <nav className="my-auto flex flex-col gap-6">
                {[
                  { href: "/pieces", label: "SHOP ALL" },
                  { href: "/collections", label: "COLLECTIONS" },
                  { href: "/philosophy", label: "PHILOSOPHY" },
                  { href: "/archive", label: "THE ARCHIVE" },
                  { href: "/our-story", label: "OUR STORY" },
                  { href: "/journal", label: "JOURNAL" },
                ].map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i, duration: 0.5, ease: "easeOut" }}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="font-serif text-3xl sm:text-5xl tracking-wide hover:text-[#B89DA4] transition-colors">{l.label}</Link>
                  </motion.div>
                ))}
              </nav>
              <div className="border-t border-[#8E786F]/30 pt-6 flex justify-between text-[10px] tracking-[0.25em] text-[#8E786F]">
                <span>WEAR YOUR STRENGTH.</span>
                <span>ADDIS ABABA</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`);

write("app/page.tsx", `'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import BrandLogo from "@/components/ui/BrandLogo";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.08, ease: "easeOut" },
  }),
};

const eras = [
  { num: "01", name: "THE FORGOTTEN GYM BAG", img: "/images/collections/forgotten-gym-bag.jpg", slug: "forgotten-gym-bag" },
  { num: "02", name: "2000s ATHLETE", img: "/images/collections/2000s-athlete.jpg", slug: "2000s-athlete" },
  { num: "03", name: "90s SPORTS CLUB", img: "/images/collections/90s-sports-club.jpg", slug: "90s-sports-club" },
  { num: "04", name: "AEROBICS ARCHIVE", img: "/images/collections/aerobics-archive.jpg", slug: "aerobics-archive" },
  { num: "05", name: "SUNDAY MORNING ATHLETE", img: "/images/collections/sunday-morning-athlete.jpg", slug: "sunday-morning-athlete" },
  { num: "06", name: "THE GIRL'S LOCKER ROOM", img: "/images/collections/girls-locker-room.jpg", slug: "girls-locker-room" },
];

const products = [
  { name: "CAPRI TRACK PANT", year: "1998 / REIMAGINED", img: "/images/products/capri-track-pant.jpg", slug: "capri-track-pant" },
  { name: "TEAR-AWAY TRACK PANT", year: "2003 / REIMAGINED", img: "/images/products/tear-away-track-pant.jpg", slug: "tear-away-track-pant" },
  { name: "WARM-UP JACKET", year: "1996 / REIMAGINED", img: "/images/products/warm-up-jacket.jpg", slug: "warm-up-jacket" },
  { name: "RETRO TENNIS SKIRT", year: "1996 / REIMAGINED", img: "/images/products/tennis-skirt.jpg", slug: "tennis-skirt" },
  { name: "STIRRUP LEGGINGS", year: "1995 / REIMAGINED", img: "/images/products/stirrup-leggings.jpg", slug: "stirrup-leggings" },
  { name: "NYLON PARACHUTE PANT", year: "1997 / REIMAGINED", img: "/images/products/parachute-pants.jpg", slug: "parachute-pants" },
  { name: "ATHLETIC BODYSUIT", year: "1990s / REIMAGINED", img: "/images/products/bodysuit.jpg", slug: "bodysuit" },
  { name: "MESH JERSEY SET", year: "2000s / REIMAGINED", img: "/images/products/mesh-jersey-set.jpg", slug: "mesh-jersey-set" },
];

const processSteps = [
  { step: "MEMORY", desc: "The past we never forgot.", img: "/images/hero/hero-main.jpg" },
  { step: "SILHOUETTE", desc: "The shapes that stayed.", img: "/images/products/3d-product-story.jpg" },
  { step: "SKETCH", desc: "Ideas drawn from archive.", img: "/images/hero/hero-main.jpg" },
  { step: "FABRIC", desc: "Chosen with intention.", img: "/images/hero/hero-main.jpg" },
  { step: "CONSTRUCTION", desc: "Built with precision.", img: "/images/hero/hero-main.jpg" },
  { step: "MOVEMENT", desc: "Made to move differently.", img: "/images/products/capri-track-pant.jpg" },
];

export default function HomePage() {
  return (
    <main className="w-full bg-[#E7DED5] min-h-screen text-[#4A3D37] overflow-x-hidden">
      <section className="relative w-full h-[100svh] min-h-[640px] bg-[#5C4D45] overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0">
          <Image src="/images/hero/hero-main.jpg" alt="Mahlet Yoseph" fill priority className="object-cover object-[center_30%] scale-105" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#362A24]/55 via-[#5C4D45]/25 to-[#362A24]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#362A24]/50 via-transparent to-[#362A24]/45" />
          <div className="absolute inset-0 grain" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 pt-24 pb-10">
          <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-2 gap-10 items-end">
            <motion.div initial="hidden" animate="show" className="text-[#E7DED5] text-center lg:text-left">
              <motion.div custom={0} variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-2 text-[#C8A86A] mb-6">
                <Sparkles size={12} className="fill-[#C8A86A]" />
                <span className="text-[10px] tracking-[0.42em] uppercase">MAHLET YOSEPH</span>
                <Sparkles size={12} className="fill-[#C8A86A]" />
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} className="font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.9] tracking-tight">
                WEAR YOUR <br />
                <span className="italic font-light text-[#C8A86A]">STRENGTH.</span>
              </motion.h1>
              <motion.div custom={2} variants={fadeUp} className="mt-8 space-y-2 text-[#E7DED5]/85 font-serif text-base sm:text-lg md:text-xl italic">
                <p>the courage to begin</p>
                <p>the confidence to keep going</p>
                <p>the beauty of becoming</p>
                <p>the power to rise again</p>
              </motion.div>
              <motion.div custom={3} variants={fadeUp} className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/archive" className="group inline-flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase border border-[#E7DED5]/35 hover:border-[#C8A86A] hover:bg-[#E7DED5]/10 px-6 py-3.5 transition-all duration-500">
                  Explore The World <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
                <Link href="/philosophy" className="group inline-flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-[#C8A86A] border border-[#C8A86A]/40 hover:bg-[#C8A86A]/10 px-6 py-3.5 transition-all duration-500">
                  Read Philosophy <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.25, ease: "easeOut" }} className="hidden lg:block text-right text-[#E7DED5]">
              <h2 className="font-serif text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] tracking-tight">
                FORGOTTEN <br /><span className="italic font-light">PIECES.</span>
              </h2>
              <p className="mt-6 text-sm font-light text-[#E7DED5]/75 max-w-sm ml-auto leading-relaxed">
                Forgotten sportswear silhouettes. Reimagined for modern movement.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="relative z-10 px-6 sm:px-10 md:px-16 pb-8 flex justify-between items-end text-[#E7DED5]/70 text-[10px] tracking-[0.3em] uppercase">
          <span>THE ART OF STRENGTH</span>
          <div className="flex items-center gap-3">
            <span className="text-[#C8A86A]">01</span>
            <span className="w-10 h-px bg-[#E7DED5]/35" />
            <span>07</span>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 px-6 text-center overflow-hidden bg-[#362A24]">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/philosophy/bg.jpg" alt="Philosophy" fill className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-[#362A24]/70" />
          <div className="absolute inset-0 grain" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9, ease: "easeOut" }} className="max-w-3xl mx-auto text-[#E7DED5] space-y-8">
          <div className="flex items-center justify-center gap-2 text-[#C8A86A]">
            <Sparkles size={11} className="fill-[#C8A86A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase">Philosophy</span>
            <Sparkles size={11} className="fill-[#C8A86A]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
            WEAR YOUR <span className="italic text-[#C8A86A]">STRENGTH.</span>
          </h2>
          <p className="font-serif text-xl sm:text-2xl italic text-[#E7DED5]/85 leading-relaxed">
            We believe strength begins beyond ourselves.
          </p>
          <div className="space-y-2 text-base sm:text-lg font-serif text-[#E7DED5]/75 italic">
            <p>the courage to begin</p>
            <p>the confidence to keep going</p>
            <p>the beauty of becoming</p>
            <p>the power to rise again</p>
          </div>
          <Link href="/philosophy" className="inline-flex items-center gap-3 mt-4 text-[10px] tracking-[0.3em] uppercase border border-[#E7DED5]/30 hover:border-[#C8A86A] hover:bg-[#E7DED5]/5 px-6 py-3.5 transition-all duration-500 text-[#E7DED5]">
            Read Full Philosophy <ArrowRight size={13} />
          </Link>
        </motion.div>
      </section>

      <section className="border-b border-[#8E786F]/20 flex flex-col lg:flex-row bg-[#DED5CD]">
        <div className="lg:w-[28%] p-7 sm:p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/20 flex flex-row lg:flex-col justify-between gap-6 shrink-0">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F]">01 — The Worlds</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.1rem] mt-3 leading-snug">Every era has a silhouette worth remembering.</h2>
          </div>
          <Link href="/collections" className="link-underline self-start text-[9px] tracking-[0.28em] uppercase inline-flex items-center gap-2 hover:text-[#B89DA4]">View All <ArrowRight size={11} /></Link>
        </div>
        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x">
          {eras.map((era) => (
            <Link key={era.slug} href={"/collections/" + era.slug} className="relative w-[250px] sm:w-[300px] md:w-[340px] h-[400px] sm:h-[460px] md:h-[520px] shrink-0 border-r border-[#8E786F]/15 snap-center group overflow-hidden bg-[#5C4D45]">
              <Image src={era.img} alt={era.name} fill sizes="340px" className="object-cover opacity-90 transition-all duration-[1.1s] ease-out group-hover:opacity-100 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/95 via-[#362A24]/15 to-[#362A24]/25" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="font-serif text-2xl text-[#E7DED5]/95">{era.num}</span>
                <div>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#E7DED5] font-medium">{era.name}</p>
                  <p className="mt-2 text-[9px] tracking-[0.28em] uppercase text-[#C8A86A] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">Enter World →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-b border-[#8E786F]/20 flex flex-col lg:flex-row bg-[#E7DED5]">
        <div className="lg:w-[28%] p-7 sm:p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/20 flex flex-row lg:flex-col justify-between gap-6 shrink-0">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F]">02 — Shop The Pieces</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.1rem] mt-3 leading-snug">Curated. Considered. Connected.</h2>
          </div>
          <Link href="/pieces" className="link-underline self-start text-[9px] tracking-[0.28em] uppercase inline-flex items-center gap-2">View All <ArrowRight size={11} /></Link>
        </div>
        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar p-7 sm:p-10 gap-6 sm:gap-8 snap-x snap-mandatory touch-pan-x">
          {products.map((prod) => (
            <Link key={prod.slug} href={"/pieces/" + prod.slug} className="w-[180px] sm:w-[210px] shrink-0 snap-start group">
              <div className="relative w-full h-[240px] sm:h-[280px] bg-[#DED5CD] mb-4 overflow-hidden border border-[#8E786F]/10">
                <Image src={prod.img} alt={prod.name} fill sizes="210px" className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105" />
              </div>
              <h3 className="text-[10px] tracking-[0.18em] uppercase font-semibold group-hover:text-[#B89DA4] transition-colors">{prod.name}</h3>
              <p className="text-[8px] sm:text-[9px] text-[#8E786F] tracking-[0.2em] mt-1.5">{prod.year}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-b border-[#8E786F]/20 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[480px] md:min-h-[560px] bg-[#66554D] text-[#E7DED5] overflow-hidden group">
          <Image src="/images/products/3d-product-story.jpg" alt="Capri Track Pant" fill className="object-cover opacity-55 group-hover:opacity-65 group-hover:scale-105 transition-all duration-[1.4s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/90 via-[#66554D]/35 to-transparent" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86A]">03 — Signature Piece</span>
              <h2 className="font-serif text-3xl sm:text-5xl mt-4">Capri Track Pant</h2>
              <p className="text-[11px] tracking-[0.25em] uppercase mt-3 text-[#E7DED5]/75">The silhouette you forgot.</p>
            </div>
            <div className="flex justify-between items-end">
              <Link href="/pieces/capri-track-pant" className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase border-b border-[#E7DED5]/35 pb-1 hover:border-[#C8A86A] hover:text-[#C8A86A] transition">View Details <ArrowRight size={12} /></Link>
              <div className="text-right text-[9px] tracking-[0.3em] uppercase text-[#E7DED5]/60"><div>360°</div><div className="mt-1">Explore</div></div>
            </div>
          </div>
        </div>
        <div className="bg-[#F5EFE6] p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-[#8E786F]/15 flex flex-col justify-center">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F]">04 — From Memory to Movement</span>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4 mb-10 md:mb-14 leading-snug">From memory<br />to movement.</h2>
          <div className="flex items-start gap-2 overflow-x-auto hide-scrollbar pb-2">
            {processSteps.map((p, i) => (
              <div key={p.step} className="flex items-start gap-2 shrink-0">
                <div className="w-[5.5rem] sm:w-24">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#8E786F]/25 mb-3 shadow-sm">
                    <Image src={p.img} alt={p.step} fill className="object-cover" />
                  </div>
                  <h4 className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-semibold">{p.step}</h4>
                  <p className="text-[7px] sm:text-[8px] text-[#8E786F] mt-1 leading-snug">{p.desc}</p>
                </div>
                {i < processSteps.length - 1 && <ArrowRight size={12} className="text-[#C8A86A]/70 mt-6 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#362A24] text-[#E7DED5]">
        <div className="relative min-h-[480px] md:min-h-[560px] overflow-hidden group">
          <Image src="/images/cta/move-differently.jpg" alt="Move Differently" fill className="object-cover opacity-45 group-hover:opacity-55 group-hover:scale-105 transition-all duration-[1.4s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#362A24] via-[#362A24]/65 to-[#362A24]/20" />
          <div className="absolute inset-0 grain" />
          <div className="relative z-10 h-full p-8 md:p-16 flex flex-col justify-center max-w-lg">
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86A]">05 — Close</span>
            <h2 className="font-serif text-4xl sm:text-6xl mt-4 leading-[0.95]">MOVE<br /><span className="italic font-light">DIFFERENTLY.</span></h2>
            <div className="mt-5"><BrandLogo light size="sm" /></div>
            <Link href="/collections" className="mt-10 inline-flex items-center gap-2 self-start text-[10px] tracking-[0.28em] uppercase border border-[#E7DED5]/30 hover:border-[#C8A86A] hover:bg-[#E7DED5]/5 px-6 py-3.5 transition-all duration-500">Enter The World <ArrowRight size={12} /></Link>
          </div>
        </div>
        <div className="p-8 md:p-16 border-t lg:border-t-0 lg:border-l border-[#8E786F]/25 flex flex-col justify-between min-h-[480px]">
          <div className="flex flex-col items-center justify-center pb-10 border-b border-[#8E786F]/25 text-center">
            <BrandLogo light size="lg" className="flex-col text-center" />
            <div className="gold-line mt-6 w-32" />
          </div>
          <div className="grid grid-cols-3 gap-4 py-10 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-sans">
            <ul className="space-y-3 text-[#8E786F]">
              <li className="text-[#E7DED5] mb-4 font-medium">Shop</li>
              <li><Link href="/pieces" className="hover:text-[#E7DED5] transition">All Pieces</Link></li>
              <li><Link href="/collections" className="hover:text-[#E7DED5] transition">Collections</Link></li>
              <li><Link href="/archive" className="hover:text-[#E7DED5] transition">Archive</Link></li>
            </ul>
            <ul className="space-y-3 text-[#8E786F]">
              <li className="text-[#E7DED5] mb-4 font-medium">House</li>
              <li><Link href="/philosophy" className="hover:text-[#E7DED5] transition">Philosophy</Link></li>
              <li><Link href="/our-story" className="hover:text-[#E7DED5] transition">Our Story</Link></li>
              <li><Link href="/journal" className="hover:text-[#E7DED5] transition">Journal</Link></li>
            </ul>
            <ul className="space-y-3 text-[#8E786F]">
              <li className="text-[#E7DED5] mb-4 font-medium">Follow</li>
              <li><a href="#" className="hover:text-[#E7DED5] transition">Instagram</a></li>
              <li><a href="#" className="hover:text-[#E7DED5] transition">TikTok</a></li>
              <li><a href="#" className="hover:text-[#E7DED5] transition">Pinterest</a></li>
            </ul>
          </div>
          <div className="pt-6 border-t border-[#8E786F]/25 flex flex-col sm:flex-row justify-between gap-3 text-[8px] sm:text-[9px] tracking-[0.25em] text-[#8E786F] font-sans">
            <span>© {new Date().getFullYear()} MAHLET YOSEPH</span>
            <div className="flex gap-5"><span>Shipping</span><span>Privacy</span><span>Terms</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
`);

write("app/philosophy/page.tsx", `import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

export const metadata = {
  title: "Philosophy | MAHLET YOSEPH",
  description: "Wear Your Strength. We believe strength begins beyond ourselves.",
};

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen text-[#E7DED5] relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/philosophy/bg.jpg" alt="Philosophy Background" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#362A24]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#362A24]/40 via-transparent to-[#362A24]/90" />
        <div className="absolute inset-0 grain" />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-28 md:pt-32">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#B89DA4] hover:text-[#E7DED5] transition mb-16">
          <ArrowLeft size={12} /> Home
        </Link>
      </div>
      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 pb-32">
        <div className="text-center mb-20 space-y-6">
          <div className="flex items-center justify-center gap-2 text-[#C8A86A]">
            <Sparkles size={12} className="fill-[#C8A86A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans">Our Philosophy</span>
            <Sparkles size={12} className="fill-[#C8A86A]" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight">
            WEAR YOUR <br /><span className="italic font-light text-[#C8A86A]">STRENGTH.</span>
          </h1>
          <div className="gold-line mx-auto w-24 mt-8" />
        </div>
        <div className="space-y-16 text-center">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#E7DED5] italic">
            We believe strength begins beyond ourselves.
          </p>
          <div className="space-y-6 py-8 border-y border-[#E7DED5]/15">
            {["the courage to begin","the confidence to keep going","the beauty of becoming","the power to rise again"].map((line) => (
              <p key={line} className="font-serif text-xl sm:text-2xl md:text-3xl text-[#E7DED5]/90 leading-relaxed">{line}</p>
            ))}
          </div>
          <p className="font-serif text-xl sm:text-2xl text-[#B89DA4] italic leading-relaxed max-w-2xl mx-auto">
            Because strength is more than what the body can do.
          </p>
          <div className="space-y-3 py-8">
            <p className="font-sans text-sm sm:text-base text-[#E7DED5]/85 font-light leading-relaxed max-w-xl mx-auto">We create for those who move with purpose,</p>
            <p className="font-sans text-sm sm:text-base text-[#E7DED5]/85 font-light leading-relaxed max-w-xl mx-auto">live with confidence,</p>
            <p className="font-sans text-sm sm:text-base text-[#E7DED5]/85 font-light leading-relaxed max-w-xl mx-auto">and carry strength wherever they go.</p>
          </div>
          <div className="space-y-4 py-12 border-y border-[#E7DED5]/15">
            <p className="font-serif text-2xl sm:text-3xl text-[#E7DED5] leading-relaxed">From strong women.</p>
            <p className="font-serif text-2xl sm:text-3xl text-[#E7DED5] leading-relaxed">From strong men.</p>
            <p className="font-serif text-2xl sm:text-3xl text-[#C8A86A] leading-relaxed italic">For a stronger kind of love.</p>
          </div>
          <div className="space-y-4 pt-8">
            <p className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-[#8E786F]">This is more than what you wear.</p>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#E7DED5] leading-tight">This is your <span className="italic text-[#C8A86A]">strength.</span></p>
          </div>
          <div className="pt-16 flex flex-col items-center gap-6">
            <div className="gold-line w-16" />
            <BrandLogo light size="md" className="flex-col text-center" />
          </div>
        </div>
      </div>
    </main>
  );
}
`);

console.log("\\n✅ Reverted to previous clean version (mylogo.jpg + typed brand text, full-bleed hero)");
