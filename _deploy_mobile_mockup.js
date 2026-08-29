const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const full = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("✅ Updated:", filePath);
}

// 1. MOBILE-OPTIMIZED NAVBAR MATCHING MOCKUP
write("components/layout/Navbar.tsx", `'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
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
        <div className={"max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 h-16 md:h-20 flex items-center justify-between " + tone}>
          {/* Mobile Left: Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className={"lg:hidden p-2 -ml-2 hover:text-[#C8A86A] transition " + tone}
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          {/* Centered Brand Logo on Mobile */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <BrandLogo light={!solid} size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[10px] tracking-[0.28em] uppercase font-sans">
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

          {/* Mobile Right: Bag Button */}
          <div className={"flex items-center gap-4 sm:gap-7 text-[10px] tracking-[0.25em] uppercase font-sans " + tone}>
            <Link href="/archive" className="hidden sm:inline hover:text-[#B89DA4] transition">
              Archive
            </Link>
            <button
              onClick={openBag}
              className="inline-flex items-center gap-1.5 hover:text-[#C8A86A] transition px-2 py-1 rounded-full border border-current/20 lg:border-none"
            >
              <span>Bag</span>
              <span className="opacity-80">({totalItems})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#362A24] text-[#E7DED5]"
          >
            <div className="relative h-full flex flex-col p-6 sm:p-10 md:p-12">
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
                  { href: "/philosophy", label: "PHILOSOPHY" },
                  { href: "/archive", label: "THE ARCHIVE" },
                  { href: "/our-story", label: "OUR STORY" },
                  { href: "/journal", label: "JOURNAL" },
                ].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-serif text-3xl sm:text-5xl tracking-wide hover:text-[#C8A86A] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="border-t border-[#8E786F]/30 pt-6 flex justify-between items-center text-[10px] tracking-[0.25em] text-[#8E786F]">
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

// 2. HOMEPAGE MATCHING MOBILE MOCKUP
write("app/page.tsx", `'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
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

      {/* ========== HERO SECTION (RESPONSIVE MATCHING MOBILE MOCKUP) ========== */}
      <section className="relative w-full h-[100svh] min-h-[640px] bg-[#362A24] text-[#E7DED5] overflow-hidden flex flex-col justify-between pt-20 pb-6 px-4 sm:px-10 md:px-16">
        
        {/* Background Image Framing */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Mahlet Yoseph Hero"
            fill
            priority
            className="object-cover object-[center_35%] lg:object-center opacity-90 scale-100"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#362A24]/70 via-transparent to-[#362A24]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#362A24]/60 via-transparent to-[#362A24]/60" />
          <div className="absolute inset-0 grain" />
        </div>

        {/* Hero Text Overlay Layout */}
        <div className="relative z-10 max-w-[1600px] mx-auto w-full my-auto flex flex-col justify-between items-center text-center lg:text-left h-full py-6 lg:py-12">
          
          {/* Top Title Overlay on Mobile / Desktop Left */}
          <motion.div initial="hidden" animate="show" className="w-full lg:grid lg:grid-cols-2 lg:gap-10 lg:items-end">
            <div className="space-y-3">
              <motion.div custom={0} variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-2 text-[#C8A86A]">
                <Sparkles size={11} className="fill-[#C8A86A]" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase">WEAR YOUR STRENGTH</span>
                <Sparkles size={11} className="fill-[#C8A86A]" />
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} className="font-serif text-4xl sm:text-6xl lg:text-[100px] leading-[0.92] tracking-tight">
                FORGOTTEN <br className="hidden sm:block" />
                <span className="italic font-light text-[#E7DED5]/90">PIECES.</span>
              </motion.h1>
            </div>

            {/* Desktop Right Alignment */}
            <div className="hidden lg:block text-right">
              <h2 className="font-serif text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] tracking-tight">
                REMEMBERED <br />
                <span className="italic font-light text-[#C8A86A]">DIFFERENTLY.</span>
              </h2>
            </div>
          </motion.div>

          {/* Bottom Title & Link Overlay on Mobile */}
          <div className="w-full space-y-4 pt-12 lg:pt-0">
            <div className="lg:hidden space-y-1">
              <h2 className="font-serif text-2xl sm:text-4xl italic text-[#E7DED5] leading-snug">
                REMEMBERED DIFFERENTLY.
              </h2>
              <div className="space-y-1 text-xs sm:text-sm font-serif text-[#C8A86A] italic opacity-90 pt-1">
                <p>the courage to begin • the confidence to keep going</p>
              </div>
            </div>

            <div className="pt-2 flex justify-center lg:justify-start">
              <Link
                href="/archive"
                className="group inline-flex items-center gap-2.5 text-[10px] tracking-[0.3em] uppercase text-[#E7DED5] border-b border-[#C8A86A] pb-1 hover:text-[#C8A86A] transition"
              >
                <span>EXPLORE THE WORLD</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Hero Bottom Slider Indicator Bar */}
        <div className="relative z-10 flex justify-between items-center text-[#E7DED5]/70 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase pt-3 border-t border-[#E7DED5]/15">
          <span>MAHLET YOSEPH</span>
          
          {/* Mockup Dot Indicator */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A86A]" />
            <span className="w-4 h-[1px] bg-[#E7DED5]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E7DED5]/30" />
          </div>

          <span>01 / 07</span>
        </div>
      </section>

      {/* ========== SECTION 01 — THE WORLDS ========== */}
      <section className="border-b border-[#8E786F]/20 flex flex-col lg:flex-row bg-[#DED5CD]">
        {/* Section Bar Header */}
        <div className="lg:w-[28%] p-5 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/20 flex justify-between items-center lg:flex-col lg:items-start shrink-0">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F] font-medium block">01 — THE WORLDS</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.1rem] mt-2 leading-snug hidden lg:block">
              EVERY ERA HAS A SILHOUETTE WORTH REMEMBERING.
            </h2>
          </div>
          <Link href="/collections" className="text-[9px] tracking-[0.28em] uppercase font-semibold flex items-center gap-1.5 text-[#4A3D37] hover:text-[#B89DA4] transition">
            VIEW ALL <ArrowRight size={10} />
          </Link>
        </div>

        {/* Horizontal Carousel Cards */}
        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x p-4 sm:p-6 lg:p-0 gap-4 lg:gap-0">
          {eras.map((era) => (
            <Link
              key={era.slug}
              href={"/collections/" + era.slug}
              className="relative w-[280px] sm:w-[320px] md:w-[350px] h-[380px] sm:h-[440px] shrink-0 border border-[#8E786F]/20 lg:border-none lg:border-r lg:border-[#8E786F]/15 snap-start group overflow-hidden bg-[#362A24] rounded-sm lg:rounded-none"
            >
              <Image
                src={era.img}
                alt={era.name}
                fill
                sizes="350px"
                className="object-cover opacity-85 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/95 via-[#362A24]/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                <span className="font-serif text-2xl text-[#E7DED5]">{era.num}</span>
                <div className="space-y-2">
                  <p className="text-[11px] tracking-[0.2em] uppercase font-sans text-[#E7DED5] font-semibold">
                    {era.name}
                  </p>
                  <span className="inline-block text-[9px] tracking-[0.25em] uppercase text-[#C8A86A] border-b border-[#C8A86A] pb-0.5">
                    EXPLORE →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== SECTION 02 — SHOP THE PIECES ========== */}
      <section className="border-b border-[#8E786F]/20 flex flex-col lg:flex-row bg-[#E7DED5]">
        {/* Section Bar Header */}
        <div className="lg:w-[28%] p-5 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/20 flex justify-between items-center lg:flex-col lg:items-start shrink-0">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F] font-medium block">02 — SHOP THE PIECES</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.1rem] mt-2 leading-snug hidden lg:block">
              CURATED. CONSIDERED. CONNECTED.
            </h2>
          </div>
          <Link href="/pieces" className="text-[9px] tracking-[0.28em] uppercase font-semibold flex items-center gap-1.5 text-[#4A3D37] hover:text-[#B89DA4] transition">
            VIEW ALL <ArrowRight size={10} />
          </Link>
        </div>

        {/* Product Carousel */}
        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar p-5 sm:p-8 gap-5 snap-x snap-mandatory touch-pan-x">
          {products.map((prod) => (
            <Link key={prod.slug} href={"/pieces/" + prod.slug} className="w-[170px] sm:w-[210px] shrink-0 snap-start group">
              <div className="relative w-full h-[230px] sm:h-[270px] bg-[#DED5CD] mb-3 overflow-hidden border border-[#8E786F]/15">
                <Image src={prod.img} alt={prod.name} fill sizes="210px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-[10px] tracking-[0.18em] uppercase font-semibold text-[#4A3D37] truncate">{prod.name}</h3>
              <p className="text-[8px] sm:text-[9px] text-[#8E786F] tracking-[0.2em] mt-1">{prod.year}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== PHILOSOPHY BANNER SECTION ========== */}
      <section className="relative py-20 md:py-28 px-6 text-center bg-[#362A24] text-[#E7DED5] overflow-hidden border-y border-[#C8A86A]/30">
        <div className="absolute inset-0 z-0">
          <Image src="/images/philosophy/bg.jpg" alt="Philosophy" fill className="object-cover opacity-35" sizes="100vw" />
          <div className="absolute inset-0 bg-[#362A24]/75" />
          <div className="absolute inset-0 grain" />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2 text-[#C8A86A]">
            <Sparkles size={11} className="fill-[#C8A86A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans">PHILOSOPHY</span>
            <Sparkles size={11} className="fill-[#C8A86A]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight">
            WEAR YOUR <span className="italic text-[#C8A86A]">STRENGTH.</span>
          </h2>

          <p className="font-serif text-xl sm:text-2xl italic text-[#E7DED5]/90 leading-relaxed max-w-2xl mx-auto">
            We believe strength begins beyond ourselves.
          </p>

          <div className="pt-2">
            <Link href="/philosophy" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase bg-[#C8A86A] text-[#362A24] font-semibold hover:bg-[#E7DED5] px-7 py-3.5 transition-all shadow-md">
              Read Full Philosophy <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ========== SIGNATURE & PROCESS ========== */}
      <section className="border-b border-[#8E786F]/20 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[440px] md:min-h-[520px] bg-[#66554D] text-[#E7DED5] overflow-hidden group">
          <Image src="/images/products/3d-product-story.jpg" alt="Capri Track Pant" fill className="object-cover opacity-55 group-hover:scale-105 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/90 via-[#66554D]/30 to-transparent" />
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-10">
            <div>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86A]">03 — SIGNATURE PIECE</span>
              <h2 className="font-serif text-3xl sm:text-5xl mt-3">Capri Track Pant</h2>
              <p className="text-[10px] tracking-[0.25em] uppercase mt-2 text-[#E7DED5]/80">The silhouette you forgot.</p>
            </div>
            <div className="flex justify-between items-end">
              <Link href="/pieces/capri-track-pant" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase border-b border-[#E7DED5]/40 pb-1 hover:text-[#C8A86A] transition">
                View Details <ArrowRight size={11} />
              </Link>
              <span className="text-[9px] tracking-[0.3em] uppercase opacity-70">360° Explore</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F5EFE6] p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-[#8E786F]/15 flex flex-col justify-center">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F]">04 — FROM MEMORY TO MOVEMENT</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 mb-8">From memory to movement.</h2>
          <div className="flex items-start gap-2 overflow-x-auto hide-scrollbar pb-2">
            {processSteps.map((p, i) => (
              <div key={p.step} className="flex items-start gap-2 shrink-0">
                <div className="w-20 sm:w-24">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#8E786F]/25 mb-2 shadow-sm">
                    <Image src={p.img} alt={p.step} fill className="object-cover" />
                  </div>
                  <h4 className="text-[8px] tracking-[0.2em] uppercase font-semibold text-[#4A3D37]">{p.step}</h4>
                  <p className="text-[7px] text-[#8E786F] mt-0.5 leading-tight">{p.desc}</p>
                </div>
                {i < processSteps.length - 1 && <ArrowRight size={11} className="text-[#C8A86A]/70 mt-5 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA & FOOTER ========== */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#362A24] text-[#E7DED5]">
        <div className="relative min-h-[420px] p-6 sm:p-12 flex flex-col justify-center overflow-hidden">
          <Image src="/images/cta/move-differently.jpg" alt="Move Differently" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#362A24] via-[#362A24]/60 to-transparent" />
          <div className="relative z-10 space-y-4 max-w-md">
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86A]">05 — CLOSE</span>
            <h2 className="font-serif text-3xl sm:text-5xl leading-tight">MOVE <br /><span className="italic font-light">DIFFERENTLY.</span></h2>
            <div className="pt-2"><BrandLogo light size="sm" /></div>
            <Link href="/collections" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase border border-[#E7DED5]/30 hover:border-[#C8A86A] px-5 py-3 transition-all mt-4">
              Enter The World <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        <div className="p-6 sm:p-12 border-t lg:border-t-0 lg:border-l border-[#8E786F]/25 flex flex-col justify-between">
          <div className="flex flex-col items-center justify-center pb-8 border-b border-[#8E786F]/25 text-center">
            <BrandLogo light size="lg" className="flex-col text-center" />
            <div className="gold-line mt-6 w-32" />
          </div>

          <div className="grid grid-cols-3 gap-4 py-8 text-[9px] tracking-[0.2em] uppercase font-sans">
            <ul className="space-y-2.5 text-[#8E786F]">
              <li className="text-[#E7DED5] mb-3 font-medium">Shop</li>
              <li><Link href="/pieces" className="hover:text-[#E7DED5]">All Pieces</Link></li>
              <li><Link href="/collections" className="hover:text-[#E7DED5]">Collections</Link></li>
            </ul>
            <ul className="space-y-2.5 text-[#8E786F]">
              <li className="text-[#E7DED5] mb-3 font-medium">House</li>
              <li><Link href="/philosophy" className="hover:text-[#E7DED5]">Philosophy</Link></li>
              <li><Link href="/our-story" className="hover:text-[#E7DED5]">Our Story</Link></li>
            </ul>
            <ul className="space-y-2.5 text-[#8E786F]">
              <li className="text-[#E7DED5] mb-3 font-medium">Follow</li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
            </ul>
          </div>

          <div className="pt-6 border-t border-[#8E786F]/25 flex flex-col sm:flex-row justify-between gap-3 text-[8px] tracking-[0.25em] text-[#8E786F] font-sans">
            <span>© {new Date().getFullYear()} MAHLET YOSEPH</span>
            <div className="flex gap-4"><span>Shipping</span><span>Privacy</span><span>Terms</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
`;

fs.writeFileSync(path.join(__dirname, "components", "layout", "Navbar.tsx"), navbarCode, "utf8");
fs.writeFileSync(path.join(__dirname, "app", "page.tsx"), pageCode, "utf8");

console.log("\\n🎉 Mobile layout matching reference mockup deployed successfully!");
