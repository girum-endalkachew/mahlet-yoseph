const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const full = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("✅", filePath);
}

// Ensure logo folder + copy mylogo2 if only in images/logo
const imgLogo = path.join(__dirname, "public", "images", "logo", "mylogo2.jpg");
const pubLogoDir = path.join(__dirname, "public", "logo");
if (fs.existsSync(imgLogo)) {
  fs.mkdirSync(pubLogoDir, { recursive: true });
  fs.copyFileSync(imgLogo, path.join(pubLogoDir, "mylogo2.jpg"));
  console.log("✅ mylogo2.jpg available at /images/logo/ and /logo/");
}

// BrandLogo — image lockup only (mylogo2)
write("components/ui/BrandLogo.tsx", `'use client';

import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  light?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
}

export default function BrandLogo({
  size = "md",
  className = "",
}: BrandLogoProps) {
  const box = {
    sm: "h-10 w-auto min-w-[120px] max-w-[160px]",
    md: "h-12 md:h-14 w-auto min-w-[150px] max-w-[220px]",
    lg: "h-16 md:h-20 w-auto min-w-[180px] max-w-[280px]",
    hero: "h-16 sm:h-20 md:h-24 w-auto min-w-[200px] max-w-[320px]",
  }[size];

  return (
    <Link href="/" className={"inline-flex items-center justify-center " + className}>
      <span className={"relative block " + box} style={{ aspectRatio: "3 / 1" }}>
        <Image
          src="/images/logo/mylogo2.jpg"
          alt="MAHLET YOSEPH — The Art of Strength"
          fill
          priority
          className="object-contain object-left"
          sizes="320px"
        />
      </span>
    </Link>
  );
}
`);

// Layout — add Great Vibes for cursive
write("app/layout.tsx", `import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";
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

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "MAHLET YOSEPH | Fashion House",
  description: "Wear Your Strength. Forgotten silhouettes. Reimagined for movement.",
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
          " " +
          greatVibes.variable +
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

// globals — script utility + gold
write("app/globals.css", `@import "tailwindcss";

:root {
  --cream: #E7DED5;
  --cream-soft: #F5EFE6;
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

::selection {
  background: var(--gold);
  color: var(--ink);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair), serif;
  font-weight: 400;
  letter-spacing: -0.02em;
}

.font-script {
  font-family: var(--font-script), cursive;
}

.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.gold-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
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

:focus-visible {
  outline: 1px solid var(--gold);
  outline-offset: 3px;
}
`);

// Navbar — bigger logo, gold accents
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = (!isHome && !isDark) || scrolled;
  const tone = solid ? "text-[#4A3D37]" : "text-[#E7DED5]";
  const bar = solid
    ? "bg-[#E7DED5]/92 backdrop-blur-xl border-b border-[#C8A86A]/25 shadow-sm"
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
        <div className={"max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 h-[4.25rem] md:h-[5.25rem] flex items-center justify-between " + tone}>
          <button
            onClick={() => setOpen(true)}
            className={"lg:hidden p-2 -ml-1 " + tone}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <BrandLogo size="md" />
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-[10px] tracking-[0.28em] uppercase">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "relative py-1 transition-colors hover:text-[#C8A86A] " +
                  (pathname.startsWith(l.href) ? "text-[#C8A86A]" : "")
                }
              >
                {l.label}
                {pathname.startsWith(l.href) && (
                  <motion.span layoutId="nav-ink" className="absolute left-0 right-0 -bottom-0.5 h-px bg-[#C8A86A]" />
                )}
              </Link>
            ))}
          </nav>

          <div className={"flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase " + tone}>
            <Link href="/archive" className="hidden sm:inline hover:text-[#C8A86A] transition">
              Archive
            </Link>
            <button onClick={openBag} className="hover:text-[#C8A86A] transition">
              Bag ({totalItems})
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
            <div className="h-full flex flex-col p-6 sm:p-10">
              <div className="flex justify-between items-center border-b border-[#C8A86A]/25 pb-6">
                <BrandLogo size="md" />
                <button onClick={() => setOpen(false)} className="p-2" aria-label="Close">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="my-auto flex flex-col gap-5">
                {[
                  { href: "/pieces", label: "Shop All" },
                  { href: "/collections", label: "Collections" },
                  { href: "/philosophy", label: "Philosophy" },
                  { href: "/archive", label: "Archive" },
                  { href: "/our-story", label: "The Story" },
                  { href: "/journal", label: "Journal" },
                ].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-serif text-3xl sm:text-4xl tracking-wide hover:text-[#C8A86A] transition"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <p className="font-script text-2xl text-[#C8A86A] border-t border-[#C8A86A]/25 pt-6">
                Wear Your Strength.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`);

// Homepage — big top logo lockup, cursive gold, no duplicate philosophy, no "Art of" text lines
write("app/page.tsx", `'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import BrandLogo from "@/components/ui/BrandLogo";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: "easeOut" },
  }),
};

const eras = [
  { num: "01", name: "THE FORGOTTEN GYM BAG", img: "/images/collections/forgotten-gym-bag.jpg", slug: "forgotten-gym-bag", blurb: "Capri tracks, stirrups, warm-ups — the bag that held what we forgot." },
  { num: "02", name: "2000s ATHLETE", img: "/images/collections/2000s-athlete.jpg", slug: "2000s-athlete", blurb: "Mesh, low-rise lines, cropped zips — movement with attitude." },
  { num: "03", name: "90s SPORTS CLUB", img: "/images/collections/90s-sports-club.jpg", slug: "90s-sports-club", blurb: "Polos, pleats, piping — the club photograph, reimagined." },
  { num: "04", name: "AEROBICS ARCHIVE", img: "/images/collections/aerobics-archive.jpg", slug: "aerobics-archive", blurb: "Bodysuits, nylon, color memory — strength in stretch." },
  { num: "05", name: "SUNDAY MORNING ATHLETE", img: "/images/collections/sunday-morning-athlete.jpg", slug: "sunday-morning-athlete", blurb: "Quiet ease. Oversized calm. Strength you carry home." },
  { num: "06", name: "THE GIRL'S LOCKER ROOM", img: "/images/collections/girls-locker-room.jpg", slug: "girls-locker-room", blurb: "Baby tees, shorts, socks — belonging in contrast." },
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

export default function HomePage() {
  return (
    <main className="w-full bg-[#E7DED5] min-h-screen text-[#4A3D37] overflow-x-hidden">

      {/* HERO — large top branding */}
      <section className="relative w-full min-h-[100svh] bg-[#362A24] text-[#E7DED5] overflow-hidden flex flex-col">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Mahlet Yoseph"
            fill
            priority
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#362A24]/75 via-[#362A24]/35 to-[#362A24]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#362A24]/55 via-transparent to-[#362A24]/50" />
          <div className="absolute inset-0 grain" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col px-5 sm:px-10 md:px-16 pt-24 md:pt-28 pb-10 max-w-[1600px] mx-auto w-full">
          {/* LOGO LOCKUP — big, top, image only */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start gap-3 mb-10 md:mb-14"
          >
            <BrandLogo size="hero" />
            <p className="font-script text-2xl sm:text-3xl md:text-4xl text-[#C8A86A]">
              Wear Your Strength.
            </p>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center grid-cols-1 lg:grid lg:grid-cols-2 gap-8 items-end">
            <motion.div initial="hidden" animate="show" className="text-center lg:text-left space-y-6">
              <motion.h1
                custom={0}
                variants={fadeUp}
                className="font-serif font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.92] tracking-tight"
              >
                FORGOTTEN
                <br />
                PIECES.
              </motion.h1>
              <motion.p
                custom={1}
                variants={fadeUp}
                className="font-script text-2xl sm:text-3xl md:text-4xl text-[#C8A86A]"
              >
                Remembered differently.
              </motion.p>
              <motion.div custom={2} variants={fadeUp} className="pt-2">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#E7DED5] border-b border-[#C8A86A] pb-1 hover:text-[#C8A86A] transition"
                >
                  Explore the world <ArrowRight size={12} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="hidden lg:block text-right space-y-4"
            >
              <p className="font-script text-xl text-[#C8A86A]/90 max-w-sm ml-auto leading-relaxed">
                the courage to begin · the confidence to keep going
              </p>
              <p className="font-script text-xl text-[#C8A86A]/90 max-w-sm ml-auto leading-relaxed">
                the beauty of becoming · the power to rise again
              </p>
              <Link
                href="/philosophy"
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#C8A86A] hover:text-[#E7DED5] transition"
              >
                Read more <ArrowRight size={11} />
              </Link>
            </motion.div>
          </div>

          <div className="flex justify-between items-center text-[9px] tracking-[0.3em] uppercase text-[#E7DED5]/60 pt-8 border-t border-[#E7DED5]/15 mt-8">
            <span className="font-script text-base normal-case tracking-normal text-[#C8A86A]">Wear Your Strength.</span>
            <span>01 — 07</span>
          </div>
        </div>
      </section>

      {/* ONE philosophy band only (no duplicate second page-style block) */}
      <section className="relative py-20 md:py-28 px-6 bg-[#362A24] text-[#E7DED5] text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/philosophy/bg.jpg" alt="" fill className="object-cover opacity-30" sizes="100vw" />
          <div className="absolute inset-0 bg-[#362A24]/80" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <p className="font-script text-3xl sm:text-4xl md:text-5xl text-[#C8A86A]">
            Wear Your Strength.
          </p>
          <p className="font-serif text-lg sm:text-xl text-[#E7DED5]/90 leading-relaxed">
            We believe strength begins beyond ourselves.
          </p>
          <p className="font-script text-lg sm:text-xl text-[#C8A86A]/85 leading-relaxed">
            the courage to begin · the confidence to keep going · the beauty of becoming · the power to rise again
          </p>
          <p className="text-sm text-[#E7DED5]/70 font-light max-w-md mx-auto leading-relaxed">
            Because strength is more than what the body can do. We create for those who move with purpose and carry strength wherever they go.
          </p>
          <Link
            href="/philosophy"
            className="inline-flex items-center gap-2 mt-2 text-[10px] tracking-[0.28em] uppercase bg-[#C8A86A] text-[#362A24] font-semibold px-7 py-3.5 hover:bg-[#E7DED5] transition"
          >
            Read more <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* WORLDS */}
      <section className="border-b border-[#8E786F]/20 flex flex-col lg:flex-row bg-[#DED5CD]">
        <div className="lg:w-[28%] p-5 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/20 flex justify-between items-center lg:flex-col lg:items-start gap-4">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86A]">01 — The Worlds</span>
            <h2 className="font-serif font-medium text-2xl md:text-3xl mt-2 leading-snug hidden sm:block text-[#4A3D37]">
              Every era has a silhouette worth remembering.
            </h2>
          </div>
          <Link href="/collections" className="text-[9px] tracking-[0.25em] uppercase font-semibold text-[#4A3D37] hover:text-[#C8A86A] inline-flex items-center gap-1">
            View all <ArrowRight size={10} />
          </Link>
        </div>
        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 lg:gap-0 p-4 lg:p-0">
          {eras.map((era) => (
            <Link
              key={era.slug}
              href={"/collections/" + era.slug}
              className="relative w-[280px] sm:w-[320px] h-[400px] sm:h-[460px] shrink-0 snap-start group overflow-hidden bg-[#362A24] border border-[#8E786F]/20 lg:border-0 lg:border-r lg:border-[#8E786F]/15"
            >
              <Image src={era.img} alt={era.name} fill className="object-cover opacity-90 group-hover:scale-105 transition duration-700" sizes="320px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#362A24] via-transparent to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-[#E7DED5]">
                <span className="font-serif text-2xl text-[#C8A86A]">{era.num}</span>
                <div>
                  <h3 className="text-[11px] tracking-[0.2em] uppercase font-semibold">{era.name}</h3>
                  <p className="font-script text-base text-[#C8A86A] mt-2 leading-snug">{era.blurb}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-[9px] tracking-[0.25em] uppercase text-[#C8A86A] border-b border-[#C8A86A] pb-0.5">
                    Read more <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PIECES */}
      <section className="border-b border-[#8E786F]/20 flex flex-col lg:flex-row bg-[#E7DED5]">
        <div className="lg:w-[28%] p-5 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/20 flex justify-between items-center lg:flex-col lg:items-start gap-4">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86A]">02 — The Pieces</span>
            <h2 className="font-serif font-medium text-2xl md:text-3xl mt-2 hidden sm:block">Curated. Considered. Connected.</h2>
          </div>
          <Link href="/pieces" className="text-[9px] tracking-[0.25em] uppercase font-semibold hover:text-[#C8A86A] inline-flex items-center gap-1">
            View all <ArrowRight size={10} />
          </Link>
        </div>
        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar p-5 sm:p-8 gap-5 snap-x">
          {products.map((p) => (
            <Link key={p.slug} href={"/pieces/" + p.slug} className="w-[170px] sm:w-[200px] shrink-0 snap-start group">
              <div className="relative h-[230px] sm:h-[260px] bg-[#DED5CD] mb-3 overflow-hidden border border-[#C8A86A]/20">
                <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition duration-700" sizes="200px" />
              </div>
              <h3 className="text-[10px] tracking-[0.15em] uppercase font-semibold group-hover:text-[#C8A86A] transition">{p.name}</h3>
              <p className="font-script text-sm text-[#8E786F] mt-1">{p.year}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Signature */}
      <section className="relative min-h-[480px] bg-[#66554D] text-[#E7DED5] overflow-hidden">
        <Image src="/images/products/3d-product-story.jpg" alt="Capri" fill className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/90 via-[#362A24]/30 to-transparent" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col justify-end min-h-[480px]">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86A]">03 — Signature</span>
          <h2 className="font-serif font-semibold text-4xl sm:text-5xl md:text-6xl mt-3">Capri Track Pant</h2>
          <p className="font-script text-2xl text-[#C8A86A] mt-3">The silhouette you forgot.</p>
          <Link href="/pieces/capri-track-pant" className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase border-b border-[#C8A86A] pb-1 w-fit hover:text-[#C8A86A] transition">
            Read more <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#362A24] text-[#E7DED5]">
        <div className="relative min-h-[400px] p-8 md:p-16 flex flex-col justify-center overflow-hidden">
          <Image src="/images/cta/move-differently.jpg" alt="" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#362A24] via-[#362A24]/70 to-transparent" />
          <div className="relative z-10 space-y-4">
            <h2 className="font-serif font-semibold text-4xl sm:text-5xl">MOVE<br /><span className="font-script font-normal text-[#C8A86A] text-3xl sm:text-4xl">differently.</span></h2>
            <BrandLogo size="md" />
            <Link href="/collections" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase border border-[#C8A86A]/50 px-5 py-3 hover:bg-[#C8A86A]/15 transition w-fit">
              Enter the world <ArrowRight size={11} />
            </Link>
          </div>
        </div>
        <div className="p-8 md:p-16 border-t lg:border-t-0 lg:border-l border-[#C8A86A]/20 flex flex-col justify-between">
          <div className="flex flex-col items-center pb-10 border-b border-[#C8A86A]/20">
            <BrandLogo size="lg" />
            <p className="font-script text-xl text-[#C8A86A] mt-4">Wear Your Strength.</p>
            <div className="gold-line mt-6 w-28" />
          </div>
          <div className="grid grid-cols-3 gap-4 py-10 text-[9px] tracking-[0.2em] uppercase">
            <ul className="space-y-2 text-[#8E786F]">
              <li className="text-[#C8A86A] mb-3">Shop</li>
              <li><Link href="/pieces" className="hover:text-[#E7DED5]">Pieces</Link></li>
              <li><Link href="/collections" className="hover:text-[#E7DED5]">Collections</Link></li>
            </ul>
            <ul className="space-y-2 text-[#8E786F]">
              <li className="text-[#C8A86A] mb-3">House</li>
              <li><Link href="/philosophy" className="hover:text-[#E7DED5]">Philosophy</Link></li>
              <li><Link href="/journal" className="hover:text-[#E7DED5]">Journal</Link></li>
            </ul>
            <ul className="space-y-2 text-[#8E786F]">
              <li className="text-[#C8A86A] mb-3">Follow</li>
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>
          <p className="text-[8px] tracking-[0.25em] text-[#8E786F]">© {new Date().getFullYear()} MAHLET YOSEPH</p>
        </div>
      </section>
    </main>
  );
}
`);

// Philosophy page — logo image, cursive gold, no typed "Art of Strength"
write("app/philosophy/page.tsx", `import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

export const metadata = {
  title: "Philosophy | MAHLET YOSEPH",
  description: "Wear Your Strength.",
};

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen text-[#E7DED5] relative">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/philosophy/bg.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#362A24]/80" />
        <div className="absolute inset-0 grain" />
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-12 pt-28 pb-24">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#C8A86A] hover:text-[#E7DED5] mb-12">
          <ArrowLeft size={12} /> Home
        </Link>

        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <BrandLogo size="lg" />
          <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#C8A86A]">
            Wear Your Strength.
          </h1>
          <div className="gold-line w-24" />
        </div>

        <div className="space-y-12 text-center max-w-2xl mx-auto">
          <p className="font-serif text-2xl sm:text-3xl italic leading-relaxed">
            We believe strength begins beyond ourselves.
          </p>

          <div className="space-y-4 py-8 border-y border-[#C8A86A]/30">
            {[
              "the courage to begin",
              "the confidence to keep going",
              "the beauty of becoming",
              "the power to rise again",
            ].map((line) => (
              <p key={line} className="font-script text-2xl sm:text-3xl text-[#C8A86A]">
                {line}
              </p>
            ))}
          </div>

          <p className="font-serif text-xl italic text-[#E7DED5]/90">
            Because strength is more than what the body can do.
          </p>

          <div className="space-y-2 text-sm sm:text-base font-light text-[#E7DED5]/80 leading-relaxed">
            <p>We create for those who move with purpose,</p>
            <p>live with confidence,</p>
            <p>and carry strength wherever they go.</p>
          </div>

          <div className="space-y-3 py-10 border-y border-[#C8A86A]/30">
            <p className="font-serif text-2xl">From strong women.</p>
            <p className="font-serif text-2xl">From strong men.</p>
            <p className="font-script text-3xl text-[#C8A86A]">For a stronger kind of love.</p>
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
              This is more than what you wear.
            </p>
            <p className="font-script text-3xl sm:text-4xl text-[#C8A86A]">
              This is your strength.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
`);

console.log("\\n🎉 Done: mylogo2 lockup, bigger logo, gold + cursive, no duplicate sections, no typed Art of Strength under headers");
