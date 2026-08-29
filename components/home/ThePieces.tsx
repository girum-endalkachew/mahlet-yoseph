'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const products = [
  { name: "CAPRI TRACK PANT", img: "/images/products/capri-track-pant.jpg" },
  { name: "TEAR-AWAY TRACK PANT", img: "/images/products/tear-away-track-pant.jpg" },
  { name: "VINTAGE WARM-UP JACKET", img: "/images/products/warm-up-jacket.jpg" },
  { name: "RETRO TENNIS SKIRT", img: "/images/products/tennis-skirt.jpg" }
];

export default function ThePieces() {
  return (
    <div className="bg-[#E7DED5] rounded-3xl border border-[#8E786F]/20 p-6 md:p-8 flex flex-col justify-between shadow-sm h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-semibold text-[#8E786F]">
            4. THE PIECES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3D37]">
            THE PIECES
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full border border-[#8E786F]/30 flex items-center justify-center text-[#4A3D37] hover:bg-[#8E786F] hover:text-[#E7DED5] transition-colors">
            <ArrowLeft size={14} />
          </button>
          <button className="w-8 h-8 rounded-full border border-[#8E786F]/30 flex items-center justify-center text-[#4A3D37] hover:bg-[#8E786F] hover:text-[#E7DED5] transition-colors">
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 4 Products Horizontal Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.name} className="group space-y-3">
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#F5EFE6] border border-[#8E786F]/15">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-sans text-[11px] font-semibold tracking-[0.15em] text-[#4A3D37] uppercase">
              {p.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
