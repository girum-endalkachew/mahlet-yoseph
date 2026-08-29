'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function MoveDifferentlyCTA() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center text-center">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/cta/move-differently.jpg" alt="Move Differently" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#3D2B1F]/40" />
      </div>
      <div className="space-y-8 z-10 px-6">
        <h2 className="font-serif text-6xl md:text-8xl text-[#E7DED5]">
          MOVE <br />
          <span className="italic font-light">DIFFERENTLY.</span>
        </h2>
        <Link href="/collections" className="inline-block bg-[#E7DED5] text-[#3D2B1F] px-10 py-5 rounded-full text-xs tracking-[0.25em] uppercase font-sans font-semibold hover:bg-[#B89DA4] hover:text-[#E7DED5] transition-colors">
          DISCOVER MAHLET YOSEPH
        </Link>
      </div>
    </section>
  );
}
