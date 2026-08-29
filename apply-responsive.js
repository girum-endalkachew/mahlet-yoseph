const fs = require('fs');
const path = require('path');

const navbarContent = `'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 w-full z-40 py-4 md:py-6 px-4 sm:px-8 md:px-12 flex justify-between items-center text-[#E7DED5] mix-blend-difference">
        {/* Mobile Left: Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden text-[#E7DED5] p-1 focus:outline-none"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>

        {/* Brand Logo */}
        <Link href="/" className="font-serif text-2xl md:text-3xl tracking-widest text-[#E7DED5] text-center lg:text-left">
          M<br /><span className="pl-3 md:pl-4 -mt-2 block">Y</span>
        </Link>
        
        {/* Desktop Links */}
        <nav className="hidden lg:flex space-x-12 text-[10px] tracking-[0.25em] uppercase font-sans">
          <Link href="/pieces" className="hover:text-[#B89DA4] transition">Shop</Link>
          <Link href="/collections" className="hover:text-[#B89DA4] transition">Collections</Link>
          <Link href="/our-story" className="hover:text-[#B89DA4] transition">The Story</Link>
          <Link href="/journal" className="hover:text-[#B89DA4] transition">Journal</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4 sm:space-x-8 text-[10px] tracking-[0.25em] uppercase font-sans">
          <button className="hidden sm:inline-block hover:text-[#B89DA4] transition">Search</button>
          <button className="flex items-center gap-1 hover:text-[#B89DA4] transition text-[10px] sm:text-xs">
            BAG (0) <span className="text-base font-light leading-none ml-0.5">+</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#362A24] text-[#E7DED5] p-8 flex flex-col justify-between transition-all duration-300">
          <div className="flex justify-between items-center border-b border-[#8E786F]/30 pb-6">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl tracking-widest">
              MAHLET YOSEPH
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#E7DED5]">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 my-auto font-serif text-3xl sm:text-4xl tracking-wide">
            <Link href="/pieces" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B89DA4] transition">SHOP ALL</Link>
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B89DA4] transition">COLLECTIONS</Link>
            <Link href="/archive" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B89DA4] transition">THE ARCHIVE</Link>
            <Link href="/our-story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B89DA4] transition">OUR STORY</Link>
            <Link href="/journal" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#B89DA4] transition">JOURNAL</Link>
          </nav>

          <div className="border-t border-[#8E786F]/30 pt-6 flex justify-between items-end text-[10px] tracking-[0.2em] text-[#8E786F]">
            <span>NOT VINTAGE. FORGOTTEN.</span>
            <span>ADDIS ABABA</span>
          </div>
        </div>
      )}
    </>
  );
}
`;

const pageContent = `'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const eras = [
  { num: "01", name: "THE FORGOTTEN GYM BAG", img: "/images/collections/forgotten-gym-bag.jpg", slug: "forgotten-gym-bag" },
  { num: "02", name: "2000s ATHLETE", img: "/images/collections/2000s-athlete.jpg", slug: "2000s-athlete" },
  { num: "03", name: "90s SPORTS CLUB", img: "/images/collections/90s-sports-club.jpg", slug: "90s-sports-club" },
  { num: "04", name: "AEROBICS ARCHIVE", img: "/images/collections/aerobics-archive.jpg", slug: "aerobics-archive" },
  { num: "05", name: "SUNDAY MORNING ATHLETE", img: "/images/collections/sunday-morning-athlete.jpg", slug: "sunday-morning-athlete" },
  { num: "06", name: "THE GIRL'S LOCKER ROOM", img: "/images/collections/girls-locker-room.jpg", slug: "girls-locker-room" }
];

const products = [
  { name: "CAPRI TRACK PANT", year: "1998 / REIMAGINED", img: "/images/products/capri-track-pant.jpg" },
  { name: "TEAR-AWAY TRACK PANT", year: "2003 / REIMAGINED", img: "/images/products/tear-away-track-pant.jpg" },
  { name: "WARM-UP JACKET", year: "1996 / REIMAGINED", img: "/images/products/warm-up-jacket.jpg" },
  { name: "RETRO TENNIS SKIRT", year: "1996 / REIMAGINED", img: "/images/products/tennis-skirt.jpg" },
  { name: "STIRRUP LEGGINGS", year: "1995 / REIMAGINED", img: "/images/products/stirrup-leggings.jpg" },
  { name: "NYLON PARACHUTE PANT", year: "1997 / REIMAGINED", img: "/images/products/parachute-pants.jpg" },
  { name: "ATHLETIC BODYSUIT", year: "1990s / REIMAGINED", img: "/images/products/bodysuit.jpg" },
  { name: "MESH JERSEY SET", year: "2000s / REIMAGINED", img: "/images/products/mesh-jersey-set.jpg" }
];

const process = [
  { step: "MEMORY", desc: "The past we never forgot.", img: "/images/hero/hero-main.jpg" },
  { step: "SILHOUETTE", desc: "The shapes that stayed.", img: "/images/products/3d-product-story.jpg" },
  { step: "SKETCH", desc: "Ideas drawn from archive.", img: "/images/hero/hero-main.jpg" },
  { step: "FABRIC", desc: "Chosen with intention.", img: "/images/hero/hero-main.jpg" },
  { step: "CONSTRUCTION", desc: "Built with precision.", img: "/images/hero/hero-main.jpg" },
  { step: "MOVEMENT", desc: "Made to move differently.", img: "/images/products/capri-track-pant.jpg" }
];

export default function HomePage() {
  return (
    <main className="w-full bg-[#E7DED5] min-h-screen text-[#4A3D37]">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[85vh] sm:h-[90vh] min-h-[580px] bg-[#5C4D45] overflow-hidden flex flex-col justify-between p-6 sm:p-12 md:p-16">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/images/hero/hero-main.jpg" alt="Mahlet Yoseph Hero" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#5C4D45]/90 via-[#5C4D45]/30 to-[#5C4D45]/85" />
        </div>

        <div className="relative z-10 my-auto text-center lg:text-left text-[#E7DED5] max-w-4xl mx-auto lg:mx-0 lg:w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6">
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight">
              FORGOTTEN <br /> PIECES.
            </h1>
            <p className="font-serif text-2xl sm:text-4xl md:text-5xl lg:hidden italic opacity-90 mt-2">
              REMEMBERED DIFFERENTLY.
            </p>
            <Link 
              href="/archive" 
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans hover:text-[#B89DA4] transition pt-2 border-b border-[#E7DED5]/40 pb-1"
            >
              EXPLORE THE WORLD <ArrowRight size={12} />
            </Link>
          </div>

          <div className="hidden lg:block text-right">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight">
              REMEMBERED <br /> DIFFERENTLY.
            </h1>
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-end text-[#E7DED5] text-[10px] tracking-widest font-sans pt-4">
          <span className="opacity-70">MAHLET YOSEPH</span>
          <div className="flex items-center gap-3">
            <span>01</span>
            <div className="w-8 h-[1px] bg-[#E7DED5]/50" />
            <span>07</span>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE THE WORLDS */}
      <section className="border-b border-[#8E786F]/30 flex flex-col lg:flex-row bg-[#DED5CD]">
        <div className="lg:w-[28%] p-6 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/30 flex flex-row lg:flex-col justify-between items-end lg:items-start shrink-0">
          <div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#8E786F] font-semibold block">01 — THE WORLDS</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-2 lg:mt-4 leading-snug hidden sm:block">
              EVERY ERA <br className="hidden lg:block" />HAS A SILHOUETTE <br className="hidden lg:block" />WORTH REMEMBERING.
            </h2>
          </div>
          <Link href="/collections" className="text-[9px] tracking-[0.2em] uppercase font-semibold flex items-center gap-2 hover:text-[#8E786F] transition shrink-0">
            VIEW ALL <span className="hidden sm:inline">COLLECTIONS</span> <ArrowRight size={10} />
          </Link>
        </div>

        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x">
          {eras.map((era, i) => (
            <Link 
              href={'/collections/' + era.slug} 
              key={i} 
              className="relative w-[240px] sm:w-[280px] md:w-[320px] h-[380px] sm:h-[440px] md:h-[480px] shrink-0 border-r border-[#8E786F]/30 snap-start group overflow-hidden bg-[#5C4D45]"
            >
              <Image 
                src={era.img} 
                alt={era.name} 
                fill 
                sizes="(max-width: 640px) 240px, 320px"
                className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/90 via-transparent to-[#362A24]/30 p-5 sm:p-6 flex flex-col justify-between z-10">
                <span className="text-xl sm:text-2xl font-serif text-[#E7DED5]">{era.num}</span>
                <div>
                  <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-sans text-[#E7DED5] font-semibold block">{era.name}</span>
                  <span className="text-[9px] tracking-widest text-[#B89DA4] uppercase mt-1 block">EXPLORE →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SHOP THE LOOK */}
      <section className="border-b border-[#8E786F]/30 flex flex-col lg:flex-row bg-[#E7DED5]">
        <div className="lg:w-[28%] p-6 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#8E786F]/30 flex flex-row lg:flex-col justify-between items-end lg:items-start shrink-0">
          <div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#8E786F] font-semibold block">02 — SHOP THE PIECES</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-2 lg:mt-4 leading-snug hidden sm:block">
              CURATED. <br className="hidden lg:block" />CONSIDERED. <br className="hidden lg:block" />CONNECTED.
            </h2>
          </div>
          <Link href="/pieces" className="text-[9px] tracking-[0.2em] uppercase font-semibold flex items-center gap-2 hover:text-[#8E786F] transition shrink-0">
            VIEW ALL <span className="hidden sm:inline">PIECES</span> <ArrowRight size={10} />
          </Link>
        </div>

        <div className="lg:w-[72%] flex overflow-x-auto hide-scrollbar p-6 sm:p-8 gap-5 sm:gap-8 snap-x snap-mandatory touch-pan-x items-center bg-[#E7DED5]">
          {products.map((prod, i) => (
            <div key={i} className="w-[180px] sm:w-[210px] shrink-0 snap-start group cursor-pointer">
              <div className="relative w-full h-[230px] sm:h-[270px] bg-[#DED5CD] mb-3 overflow-hidden border border-[#8E786F]/20">
                <Image src={prod.img} alt={prod.name} fill sizes="210px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#4A3D37] truncate">{prod.name}</h3>
              <p className="text-[8px] sm:text-[9px] text-[#8E786F] tracking-widest mt-0.5">{prod.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SIGNATURE PIECE & PROCESS */}
      <section className="border-b border-[#8E786F]/30 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#66554D] text-[#E7DED5] p-6 sm:p-10 md:p-12 flex flex-col justify-between relative min-h-[420px] sm:min-h-[500px]">
          <div className="absolute inset-0 opacity-50">
            <Image src="/images/products/3d-product-story.jpg" alt="3D Product" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-[#66554D]/40" />
          </div>
          <div className="relative z-10">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#B89DA4] font-semibold">03 — THE SIGNATURE PIECE</span>
            <h2 className="font-serif text-3xl sm:text-4xl mt-3 sm:mt-4">CAPRI TRACK PANT</h2>
            <p className="text-[10px] sm:text-[11px] tracking-widest uppercase mt-2 opacity-80">THE SILHOUETTE YOU FORGOT.</p>
          </div>
          <div className="relative z-10 flex justify-between items-end mt-12">
            <Link href="/pieces/capri-track-pant" className="text-[9px] tracking-[0.2em] uppercase flex items-center gap-2 hover:text-[#B89DA4] transition border-b border-[#E7DED5]/30 pb-1">
              VIEW DETAILS <ArrowRight size={10} />
            </Link>
            <div className="flex flex-col items-center gap-1 opacity-70 text-[8px] sm:text-[9px] tracking-widest">
              <span>360°</span>
              <span>EXPLORE</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F5EFE6] p-6 sm:p-10 md:p-12 border-t lg:border-t-0 lg:border-l border-[#8E786F]/30">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#8E786F] font-semibold">04 — FROM MEMORY TO MOVEMENT</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-3 sm:mt-4 mb-8 sm:mb-12">FROM MEMORY TO MOVEMENT.</h2>
          
          <div className="flex items-center justify-between gap-3 overflow-x-auto hide-scrollbar pb-2">
            {process.map((p, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="flex flex-col gap-2 w-20 sm:w-24">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#8E786F]/30 relative">
                    <Image src={p.img} alt={p.step} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-[8px] sm:text-[9px] tracking-widest uppercase font-semibold text-[#4A3D37]">{p.step}</h4>
                    <p className="text-[7px] sm:text-[8px] text-[#8E786F] mt-0.5 leading-tight">{p.desc}</p>
                  </div>
                </div>
                {i < process.length - 1 && <ArrowRight size={10} className="text-[#8E786F]/50 mx-0.5 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA & FOOTER */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#362A24] text-[#E7DED5]">
        <div className="relative p-8 sm:p-12 md:p-16 flex flex-col justify-center min-h-[420px] sm:min-h-[500px]">
          <div className="absolute inset-0 opacity-40">
            <Image src="/images/cta/move-differently.jpg" alt="CTA" fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#362A24] via-[#362A24]/70 to-transparent" />
          </div>
          <div className="relative z-10 space-y-4 sm:space-y-6 max-w-md">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#B89DA4]">05 — MOVE DIFFERENTLY</span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-tight">MOVE <br />DIFFERENTLY.</h2>
            <div>
              <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase opacity-90">MAHLET YOSEPH</p>
              <p className="text-[8px] tracking-[0.4em] text-[#B89DA4] mt-1 italic">THE ART OF STRENGTH</p>
            </div>
            <Link href="/archive" className="inline-flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase hover:text-[#B89DA4] transition border-b border-[#E7DED5]/30 pb-1 mt-4">
              ENTER THE WORLD <ArrowRight size={10} />
            </Link>
          </div>
        </div>

        <div className="p-8 sm:p-12 md:p-16 border-t lg:border-t-0 lg:border-l border-[#8E786F]/20 flex flex-col justify-between">
          <div className="text-center pb-8 border-b border-[#8E786F]/20">
            <h2 className="font-serif text-3xl sm:text-4xl tracking-widest mb-2">M<br/><span className="pl-4 -mt-2 block">Y</span></h2>
            <p className="text-[10px] tracking-[0.3em] uppercase">MAHLET YOSEPH</p>
            <p className="text-[8px] tracking-[0.4em] text-[#B89DA4] mt-1">THE ART OF STRENGTH</p>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 py-8 sm:py-12 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
            <ul className="space-y-2.5 sm:space-y-3 text-[#8E786F]">
              <li className="text-[#E7DED5] mb-3 font-semibold">SHOP</li>
              <li><Link href="/pieces" className="hover:text-[#E7DED5]">All Pieces</Link></li>
              <li><Link href="/collections" className="hover:text-[#E7DED5]">Collections</Link></li>
            </ul>
            <ul className="space-y-2.5 sm:space-y-3 text-[#8E786F]">
              <li className="text-[#E7DED5] mb-3 font-semibold">COMPANY</li>
              <li><Link href="/our-story" className="hover:text-[#E7DED5]">Our Story</Link></li>
              <li><Link href="/journal" className="hover:text-[#E7DED5]">Journal</Link></li>
            </ul>
            <ul className="space-y-2.5 sm:space-y-3 text-[#8E786F]">
              <li className="text-[#E7DED5] mb-3 font-semibold">FOLLOW</li>
              <li><a href="#" className="hover:text-[#E7DED5]">Instagram</a></li>
              <li><a href="#" className="hover:text-[#E7DED5]">TikTok</a></li>
            </ul>
          </div>

          <div className="pt-6 border-t border-[#8E786F]/20 flex flex-col sm:flex-row justify-between items-center gap-3 text-[8px] sm:text-[9px] tracking-widest text-[#8E786F]">
            <span>© 2026 MAHLET YOSEPH</span>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="hover:text-[#E7DED5]">SHIPPING</a>
              <a href="#" className="hover:text-[#E7DED5]">PRIVACY</a>
              <a href="#" className="hover:text-[#E7DED5]">TERMS</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'components', 'layout', 'Navbar.tsx'), navbarContent, 'utf8');
fs.writeFileSync(path.join(__dirname, 'app', 'page.tsx'), pageContent, 'utf8');

console.log('✅ Success: Responsive Navbar & Page written cleanly!');
