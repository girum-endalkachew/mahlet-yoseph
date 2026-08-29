'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function BrandStatement() {
  return (
    <section className="py-40 px-6 md:px-12 bg-[#F5EFE6] text-center flex flex-col items-center justify-center">
      <h2 className="font-serif text-6xl md:text-8xl lg:text-[110px] leading-[0.9] text-[#4A3D37] max-w-5xl mx-auto">
        NOT VINTAGE. <br />
        <span className="italic font-light text-[#8E786F]">FORGOTTEN.</span>
      </h2>
      <p className="mt-12 text-lg md:text-xl font-sans font-light text-[#4A3D37] max-w-2xl mx-auto leading-relaxed">
        We look back to the silhouettes that shaped movement, then bring them forward. Pieces engineered with precision, natural fibers, and timeless strength.
      </p>
      <Link href="/our-story" className="mt-12 w-16 h-16 rounded-full border border-[#4A3D37] flex items-center justify-center hover:bg-[#4A3D37] hover:text-[#E7DED5] transition-colors">
        →
      </Link>
    </section>
  );
}
