'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Featured3DProduct() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#E7DED5] border-y border-[#8E786F]/20">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-square md:aspect-[4/3] w-full bg-[#F5EFE6] overflow-hidden">
          <Image src="/images/products/3d-product-story.jpg" alt="3D Product" fill className="object-cover" />
        </div>
        <div className="space-y-8 max-w-xl">
          <span className="text-xs tracking-[0.3em] uppercase font-sans text-[#8E786F]">360° Product Story</span>
          <h2 className="font-serif text-5xl md:text-7xl text-[#4A3D37]">FORM IN <br/><span className="italic text-[#8E786F]">MOTION.</span></h2>
          <p className="text-lg font-sans font-light text-[#8E786F] leading-relaxed">
            Examine every angle. The Capri Track Set features deep pockets, structured ribbing, and a tailored waist designed to move fluidly with your body.
          </p>
          <Link href="/pieces" className="inline-block border-b border-[#4A3D37] pb-1 text-xs tracking-[0.2em] uppercase font-sans text-[#4A3D37] hover:text-[#B89DA4] transition-colors">
            DISCOVER THE PIECE
          </Link>
        </div>
      </div>
    </section>
  );
}
