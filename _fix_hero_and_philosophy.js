const fs = require("fs");
const path = require("path");

const pageContent = `'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, RotateCw, Pause, Play } from "lucide-react";
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
  const [heroSpinPaused, setHeroSpinPaused] = useState(false);

  return (
    <main className="w-full bg-[#E7DED5] min-h-screen text-[#4A3D37] overflow-x-hidden">

      {/* ========== HERO SECTION WITH BALLERINA MUSIC-BOX SPIN ========== */}
      <section className="relative w-full min-h-[100svh] bg-[#362A24] text-[#E7DED5] overflow-hidden flex flex-col justify-between pt-20 pb-8 px-6 sm:px-10 md:px-16">
        
        {/* Architectural Studio Stage Backdrop */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Mahlet Yoseph Studio Stage"
            fill
            priority
            className="object-cover object-center opacity-40 scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#362A24]/80 via-[#362A24]/40 to-[#362A24]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#362A24]/85 via-transparent to-[#362A24]/85" />
          <div className="absolute inset-0 grain" />
        </div>

        {/* Hero Content Spread */}
        <div className="relative z-10 max-w-[1700px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
          
          {/* Left Text Column */}
          <motion.div initial="hidden" animate="show" className="lg:col-span-4 text-center lg:text-left space-y-6">
            <motion.div custom={0} variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-2 text-[#C8A86A]">
              <Sparkles size={12} className="fill-[#C8A86A]" />
              <span className="text-[10px] tracking-[0.42em] uppercase font-sans">MAHLET YOSEPH</span>
              <Sparkles size={12} className="fill-[#C8A86A]" />
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tight">
              WEAR YOUR <br />
              <span className="italic font-light text-[#C8A86A]">STRENGTH.</span>
            </motion.h1>

            {/* Sequential White Text Beats */}
            <motion.div custom={2} variants={fadeUp} className="space-y-2 text-[#E7DED5] font-serif text-base sm:text-lg italic opacity-90">
              <p className="border-l-2 border-[#C8A86A]/60 pl-3">the courage to begin</p>
              <p className="border-l-2 border-[#C8A86A]/60 pl-3">the confidence to keep going</p>
              <p className="border-l-2 border-[#C8A86A]/60 pl-3">the beauty of becoming</p>
              <p className="border-l-2 border-[#C8A86A]/60 pl-3">the power to rise again</p>
            </motion.div>

            <motion.div custom={3} variants={fadeUp} className="pt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/archive" className="group inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase border border-[#E7DED5]/40 hover:border-[#C8A86A] hover:bg-[#C8A86A]/10 px-6 py-3.5 transition-all">
                Explore The World <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/philosophy" className="group inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#C8A86A] border border-[#C8A86A]/50 hover:bg-[#C8A86A]/15 px-6 py-3.5 transition-all">
                Read Philosophy <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Center Column: Music-Box Ballerina Spinning Stage */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center my-4 lg:my-0">
            {/* Illuminated Arch Portal */}
            <div className="relative w-64 sm:w-80 h-[380px] sm:h-[460px] flex items-center justify-center">
              
              {/* Arch Glow Circle */}
              <div className="absolute w-[260px] sm:w-[320px] h-[340px] sm:h-[420px] rounded-t-full border border-[#C8A86A]/40 bg-gradient-to-b from-[#E7DED5]/15 via-[#C8A86A]/5 to-transparent backdrop-blur-xs flex items-center justify-center shadow-2xl">
                <div className="w-[220px] sm:w-[280px] h-[300px] sm:h-[380px] rounded-t-full border border-[#E7DED5]/20" />
              </div>

              {/* Wooden Turntable Base */}
              <div className="absolute bottom-2 w-56 sm:w-72 h-12 rounded-full bg-gradient-to-r from-[#C8A86A]/50 via-[#E7DED5]/30 to-[#C8A86A]/50 border border-[#C8A86A] shadow-[0_0_35px_rgba(200,168,106,0.3)] transform rotate-x-60">
                <div className="absolute inset-1.5 rounded-full border border-[#E7DED5]/40 bg-[#362A24]/70" />
              </div>

              {/* Continuous Ballerina Rotation */}
              <motion.div
                className="relative z-10 w-48 sm:w-56 h-[300px] sm:h-[360px] cursor-pointer"
                animate={heroSpinPaused ? {} : { rotateY: [0, 360] }}
                transition={{
                  repeat: Infinity,
                  duration: 16,
                  ease: "linear",
                }}
                onClick={() => setHeroSpinPaused(!heroSpinPaused)}
                onMouseEnter={() => setHeroSpinPaused(true)}
                onMouseLeave={() => setHeroSpinPaused(false)}
                style={{ transformStyle: "preserve-3d" }}
                title="Click or hover to pause spin"
              >
                <Image
                  src="/images/products/capri-track-pant.jpg"
                  alt="Mahlet Yoseph Ballerina Mannequin"
                  fill
                  priority
                  sizes="300px"
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] pointer-events-none"
                />
              </motion.div>

              {/* Ballerina Control Badge */}
              <button
                onClick={() => setHeroSpinPaused(!heroSpinPaused)}
                className="absolute bottom-0 z-20 flex items-center gap-2 bg-[#362A24]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#C8A86A]/50 text-[9px] tracking-[0.25em] uppercase text-[#C8A86A] shadow-lg hover:bg-[#C8A86A] hover:text-[#362A24] transition"
              >
                {heroSpinPaused ? <Play size={10} /> : <Pause size={10} />}
                <span>{heroSpinPaused ? "Resume Ballerina Turn" : "360° Ballerina Spin"}</span>
              </button>
            </div>
          </div>

          {/* Right Text Column */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.25 }} className="lg:col-span-4 text-center lg:text-right space-y-4">
            <h2 className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] leading-[0.95] tracking-tight text-[#E7DED5]">
              FORGOTTEN <br />
              <span className="italic font-light text-[#B89DA4]">PIECES.</span>
            </h2>
            <p className="text-sm font-light text-[#E7DED5]/80 max-w-xs mx-auto lg:ml-auto leading-relaxed">
              Forgotten sportswear silhouettes. Reimagined for modern movement.
            </p>
          </motion.div>

        </div>

        {/* Hero Footer Meta */}
        <div className="relative z-10 flex justify-between items-end text-[#E7DED5]/70 text-[10px] tracking-[0.3em] uppercase pt-4 border-t border-[#E7DED5]/15">
          <span>THE ART OF STRENGTH</span>
          <div className="flex items-center gap-3">
            <span className="text-[#C8A86A]">01</span>
            <span className="w-10 h-px bg-[#E7DED5]/40" />
            <span>07</span>
          </div>
        </div>
      </section>

      {/* ========== PHILOSOPHY SECTION (FIXED HIGH-CONTRAST DARK BACKGROUND) ========== */}
      <section className="relative py-24 md:py-32 px-6 text-center bg-[#362A24] text-[#E7DED5] overflow-hidden border-y border-[#C8A86A]/30">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/philosophy/bg.jpg" alt="Philosophy" fill className="object-cover opacity-35" sizes="100vw" />
          <div className="absolute inset-0 bg-[#362A24]/75" />
          <div className="absolute inset-0 grain" />
        </div>

        <div className="gold-line absolute top-0 left-[10%] right-[10%] z-10" />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }} className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-2 text-[#C8A86A]">
            <Sparkles size={12} className="fill-[#C8A86A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans">PHILOSOPHY</span>
            <Sparkles size={12} className="fill-[#C8A86A]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight text-[#E7DED5]">
            WEAR YOUR <span className="italic text-[#C8A86A]">STRENGTH.</span>
          </h2>

          <p className="font-serif text-2xl sm:text-3xl italic text-[#E7DED5] leading-relaxed max-w-2xl mx-auto">
            We believe strength begins beyond ourselves.
          </p>

          <div className="space-y-3 text-lg sm:text-xl font-serif text-[#E7DED5]/90 italic py-6 border-y border-[#E7DED5]/20 max-w-xl mx-auto">
            <p>the courage to begin</p>
            <p>the confidence to keep going</p>
            <p>the beauty of becoming</p>
            <p>the power to rise again</p>
          </div>

          <p className="text-sm sm:text-base font-sans font-light text-[#E7DED5]/80 max-w-lg mx-auto leading-relaxed">
            We create for those who move with purpose, live with confidence, and carry strength wherever they go.
          </p>

          <div className="pt-4">
            <Link href="/philosophy" className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase bg-[#C8A86A] text-[#362A24] font-semibold hover:bg-[#E7DED5] px-8 py-4 transition-all shadow-lg">
              Read Full Philosophy <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        <div className="gold-line absolute bottom-0 left-[10%] right-[10%] z-10" />
      </section>

      {/* ========== WORLDS ========== */}
      <section className="border-b border-[#8E786F]/20 flex flex-col lg:flex-row bg-[#DED5CD]">
        <div className="lg:w-[28%] p-7 sm:p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/20 flex flex-row lg:flex-col justify-between gap-6 shrink-0">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F]">01 — The Worlds</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.1rem] mt-3 leading-snug">Every era has a silhouette worth remembering.</h2>
          </div>
          <Link href="/collections" className="link-underline self-start text-[9px] tracking-[0.28em] uppercase inline-flex items-center gap-2 hover:text-[#B89DA4]">
            View All <ArrowRight size={11} />
          </Link>
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

      {/* ========== PIECES ========== */}
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

      {/* ========== SIGNATURE + PROCESS ========== */}
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
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#8E786F]/25 mb-3 shadow-sm"><Image src={p.img} alt={p.step} fill className="object-cover" /></div>
                  <h4 className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-semibold">{p.step}</h4>
                  <p className="text-[7px] sm:text-[8px] text-[#8E786F] mt-1 leading-snug">{p.desc}</p>
                </div>
                {i < processSteps.length - 1 && <ArrowRight size={12} className="text-[#C8A86A]/70 mt-6 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA + FOOTER ========== */}
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
`;

fs.writeFileSync(path.join(__dirname, "app", "page.tsx"), pageContent, "utf8");
console.log("\\n🎉 Both issues resolved! Hero Ballerina Mannequin is now continuously spinning 360°, and Philosophy text has high-contrast dark background!");
