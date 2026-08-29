const fs = require("fs");
const path = require("path");

const pageContent = `'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

const process = [
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
      {/* HERO */}
      <section className="relative w-full h-[100svh] min-h-[640px] bg-[#5C4D45] overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Mahlet Yoseph"
            fill
            priority
            className="object-cover object-[center_30%] scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#362A24]/55 via-[#5C4D45]/25 to-[#362A24]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#362A24]/50 via-transparent to-[#362A24]/45" />
          <div className="absolute inset-0 grain" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 pt-24 pb-10">
          <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-2 gap-10 items-end">
            <motion.div
              initial="hidden"
              animate="show"
              className="text-[#E7DED5] text-center lg:text-left"
            >
              <motion.p
                custom={0}
                variants={fadeUp}
                className="text-[10px] tracking-[0.42em] uppercase text-[#C8A86A] mb-6"
              >
                THE ART OF STRENGTH
              </motion.p>
              <motion.h1
                custom={1}
                variants={fadeUp}
                className="font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] tracking-tight"
              >
                FORGOTTEN
                <br />
                <span className="italic font-light text-[#E7DED5]/95">PIECES.</span>
              </motion.h1>
              <motion.p
                custom={2}
                variants={fadeUp}
                className="mt-5 font-serif text-2xl sm:text-3xl italic text-[#E7DED5]/85 lg:hidden"
              >
                Remembered differently.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="mt-8 flex justify-center lg:justify-start">
                <Link
                  href="/archive"
                  className="group inline-flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase border border-[#E7DED5]/35 hover:border-[#C8A86A] hover:bg-[#E7DED5]/10 px-6 py-3.5 transition-all duration-500"
                >
                  Explore the world
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
              className="hidden lg:block text-right text-[#E7DED5]"
            >
              <h2 className="font-serif text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] tracking-tight">
                REMEMBERED
                <br />
                <span className="italic font-light">DIFFERENTLY.</span>
              </h2>
              <p className="mt-6 text-sm font-light text-[#E7DED5]/75 max-w-sm ml-auto leading-relaxed">
                Forgotten sportswear silhouettes. Reimagined for modern movement.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 px-6 sm:px-10 md:px-16 pb-8 flex justify-between items-end text-[#E7DED5]/70 text-[10px] tracking-[0.3em] uppercase">
          <span>MAHLET YOSEPH</span>
          <div className="flex items-center gap-3">
            <span className="text-[#C8A86A]">01</span>
            <span className="w-10 h-px bg-[#E7DED5]/35" />
            <span>07</span>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative py-20 md:py-28 px-6 text-center bg-[#F5EFE6] border-b border-[#8E786F]/15 overflow-hidden">
        <div className="gold-line absolute top-0 left-[10%] right-[10%]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#8E786F] mb-6">Brand Philosophy</p>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.95]">
            NOT VINTAGE.
            <br />
            <span className="italic text-[#8E786F]">FORGOTTEN.</span>
          </h2>
          <p className="mt-8 text-[#8E786F] font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            We look back to the silhouettes that shaped movement, then bring them forward.
          </p>
        </motion.div>
      </section>

      {/* WORLDS */}
      <section className="border-b border-[#8E786F]/20 flex flex-col lg:flex-row bg-[#DED5CD]">
        <div className="lg:w-[28%] p-7 sm:p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/20 flex flex-row lg:flex-col justify-between gap-6 shrink-0">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F]">01 — The Worlds</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.1rem] mt-3 leading-snug">
              Every era has a silhouette worth remembering.
            </h2>
          </div>
          <Link
            href="/collections"
            className="link-underline self-start text-[9px] tracking-[0.28em] uppercase inline-flex items-center gap-2 hover:text-[#B89DA4]"
          >
            View All <ArrowRight size={11} />
          </Link>
        </div>

        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x">
          {eras.map((era) => (
            <Link
              key={era.slug}
              href={"/collections/" + era.slug}
              className="relative w-[250px] sm:w-[300px] md:w-[340px] h-[400px] sm:h-[460px] md:h-[520px] shrink-0 border-r border-[#8E786F]/15 snap-center group overflow-hidden bg-[#5C4D45]"
            >
              <Image
                src={era.img}
                alt={era.name}
                fill
                sizes="340px"
                className="object-cover opacity-90 transition-all duration-[1.1s] ease-out group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/95 via-[#362A24]/15 to-[#362A24]/25" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="font-serif text-2xl text-[#E7DED5]/95">{era.num}</span>
                <div>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#E7DED5] font-medium">
                    {era.name}
                  </p>
                  <p className="mt-2 text-[9px] tracking-[0.28em] uppercase text-[#C8A86A] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Enter World →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PIECES */}
      <section className="border-b border-[#8E786F]/20 flex flex-col lg:flex-row bg-[#E7DED5]">
        <div className="lg:w-[28%] p-7 sm:p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/20 flex flex-row lg:flex-col justify-between gap-6 shrink-0">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F]">02 — Shop The Pieces</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.1rem] mt-3 leading-snug">
              Curated. Considered. Connected.
            </h2>
          </div>
          <Link href="/pieces" className="link-underline self-start text-[9px] tracking-[0.28em] uppercase inline-flex items-center gap-2">
            View All <ArrowRight size={11} />
          </Link>
        </div>

        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar p-7 sm:p-10 gap-6 sm:gap-8 snap-x snap-mandatory touch-pan-x">
          {products.map((prod) => (
            <Link
              key={prod.slug}
              href={"/pieces/" + prod.slug}
              className="w-[180px] sm:w-[210px] shrink-0 snap-start group"
            >
              <div className="relative w-full h-[240px] sm:h-[280px] bg-[#DED5CD] mb-4 overflow-hidden border border-[#8E786F]/10">
                <Image
                  src={prod.img}
                  alt={prod.name}
                  fill
                  sizes="210px"
                  className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#362A24]/0 group-hover:bg-[#362A24]/10 transition-colors duration-500" />
              </div>
              <h3 className="text-[10px] tracking-[0.18em] uppercase font-semibold group-hover:text-[#B89DA4] transition-colors">
                {prod.name}
              </h3>
              <p className="text-[8px] sm:text-[9px] text-[#8E786F] tracking-[0.2em] mt-1.5">{prod.year}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SIGNATURE + PROCESS */}
      <section className="border-b border-[#8E786F]/20 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[480px] md:min-h-[560px] bg-[#66554D] text-[#E7DED5] overflow-hidden group">
          <Image
            src="/images/products/3d-product-story.jpg"
            alt="Capri Track Pant"
            fill
            className="object-cover opacity-55 group-hover:opacity-65 group-hover:scale-105 transition-all duration-[1.4s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/90 via-[#66554D]/35 to-transparent" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86A]">03 — Signature Piece</span>
              <h2 className="font-serif text-3xl sm:text-5xl mt-4">Capri Track Pant</h2>
              <p className="text-[11px] tracking-[0.25em] uppercase mt-3 text-[#E7DED5]/75">
                The silhouette you forgot.
              </p>
            </div>
            <div className="flex justify-between items-end">
              <Link
                href="/pieces/capri-track-pant"
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase border-b border-[#E7DED5]/35 pb-1 hover:border-[#C8A86A] hover:text-[#C8A86A] transition"
              >
                View Details <ArrowRight size={12} />
              </Link>
              <div className="text-right text-[9px] tracking-[0.3em] uppercase text-[#E7DED5]/60">
                <div>360°</div>
                <div className="mt-1">Explore</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F5EFE6] p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-[#8E786F]/15 flex flex-col justify-center">
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#8E786F]">04 — From Memory to Movement</span>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4 mb-10 md:mb-14 leading-snug">
            From memory
            <br />
            to movement.
          </h2>
          <div className="flex items-start gap-2 overflow-x-auto hide-scrollbar pb-2">
            {process.map((p, i) => (
              <div key={p.step} className="flex items-start gap-2 shrink-0">
                <div className="w-[5.5rem] sm:w-24">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#8E786F]/25 mb-3 shadow-sm">
                    <Image src={p.img} alt={p.step} fill className="object-cover" />
                  </div>
                  <h4 className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-semibold">{p.step}</h4>
                  <p className="text-[7px] sm:text-[8px] text-[#8E786F] mt-1 leading-snug">{p.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <ArrowRight size={12} className="text-[#C8A86A]/70 mt-6 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA + FOOTER */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#362A24] text-[#E7DED5]">
        <div className="relative min-h-[480px] md:min-h-[560px] overflow-hidden group">
          <Image
            src="/images/cta/move-differently.jpg"
            alt="Move Differently"
            fill
            className="object-cover opacity-45 group-hover:opacity-55 group-hover:scale-105 transition-all duration-[1.4s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#362A24] via-[#362A24]/65 to-[#362A24]/20" />
          <div className="absolute inset-0 grain" />
          <div className="relative z-10 h-full p-8 md:p-16 flex flex-col justify-center max-w-lg">
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#C8A86A]">05 — Close</span>
            <h2 className="font-serif text-4xl sm:text-6xl mt-4 leading-[0.95]">
              MOVE
              <br />
              <span className="italic font-light">DIFFERENTLY.</span>
            </h2>
            <div className="mt-5">
              <BrandLogo light size="sm" />
            </div>
            <Link
              href="/collections"
              className="mt-10 inline-flex items-center gap-2 self-start text-[10px] tracking-[0.28em] uppercase border border-[#E7DED5]/30 hover:border-[#C8A86A] hover:bg-[#E7DED5]/5 px-6 py-3.5 transition-all duration-500"
            >
              Enter The World <ArrowRight size={12} />
            </Link>
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
            <div className="flex gap-5">
              <span>Shipping</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'app', 'page.tsx'), pageContent, 'utf8');
console.log('✅ app/page.tsx updated with strict Framer Motion types!');
