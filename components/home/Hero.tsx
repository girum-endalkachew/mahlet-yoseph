'use client';
import { useState } from 'react';
import { ArrowRight, RotateCw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const [rotated, setRotated] = useState(false);
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center pt-20">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/hero/hero-main.jpg" alt="Hero" fill priority className={`object-cover object-center transition-transform duration-1000 ${rotated ? 'scale-105' : 'scale-100'}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E7DED5] via-[#E7DED5]/70 to-transparent w-full md:w-1/2" />
      </div>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 w-full">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2 text-[#C8A86A]">
            <Sparkles size={14} className="fill-[#C8A86A]" />
            <span className="text-xs tracking-[0.35em] uppercase font-sans font-medium text-[#4A3D37]">MAHLET YOSEPH</span>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[100px] leading-[0.9] tracking-tight text-[#4A3D37]">
            THE PIECES <br />
            <span className="italic font-light text-[#8E786F]">YOU FORGOT.</span>
          </h1>
          <p className="text-lg text-[#4A3D37]/80 font-sans font-light max-w-md pt-4">
            Forgotten sportswear silhouettes. Reimagined for modern movement.
          </p>
          <div className="pt-8 flex flex-wrap gap-6">
            <Link href="/archive" className="flex items-center gap-3 bg-[#4A3D37] hover:bg-[#8E786F] text-[#E7DED5] px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase transition-colors">
              EXPLORE THE ARCHIVE <ArrowRight size={14} />
            </Link>
            <button onClick={() => setRotated(!rotated)} className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#4A3D37] hover:text-[#B89DA4] transition-colors border border-[#8E786F]/30 px-6 py-4 rounded-full bg-[#E7DED5]/50 backdrop-blur-sm">
              <RotateCw size={14} className={rotated ? 'rotate-180 transition-transform duration-700' : 'transition-transform duration-700'} /> ROTATE 360°
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
