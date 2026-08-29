'use client';
import Image from 'next/image';
import Link from 'next/link';

const collections = [
  { num: "01", title: "THE FORGOTTEN GYM BAG", desc: "Capri track pants, stirrup leggings, warm-up jackets", img: "/images/collections/forgotten-gym-bag.jpg", slug: "gym-bag" },
  { num: "02", title: "90s SPORTS CLUB", desc: "Tennis polos, pleated skirts, rugby shirts", img: "/images/collections/90s-sports-club.jpg", slug: "90s-club" },
  { num: "03", title: "2000s ATHLETE", desc: "Track pants, mesh jerseys, cropped zip jackets", img: "/images/collections/2000s-athlete.jpg", slug: "2000s" },
  { num: "04", title: "AEROBICS ARCHIVE", desc: "Athletic bodysuits, nylon shorts, flared pants", img: "/images/collections/aerobics-archive.jpg", slug: "aerobics" }
];

export default function ForgottenArchive() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#F5EFE6]">
      <div className="max-w-[1800px] mx-auto">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs tracking-[0.3em] uppercase font-sans text-[#8E786F]">The Archive</span>
          <h2 className="font-serif text-5xl md:text-7xl text-[#4A3D37]">FORGOTTEN. REIMAGINED.</h2>
          <p className="text-[#8E786F] max-w-2xl mx-auto font-sans font-light text-lg">Pieces that disappeared from the conversation. Silhouettes worth bringing back.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((col) => (
            <Link href={`/collections/${col.slug}`} key={col.num} className="group block space-y-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E7DED5]">
                <Image src={col.img} alt={col.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="space-y-2 border-b border-[#8E786F]/20 pb-6">
                <span className="text-xs font-serif text-[#8E786F] italic">{col.num}</span>
                <h3 className="font-sans text-sm tracking-[0.15em] font-semibold text-[#4A3D37]">{col.title}</h3>
                <p className="text-sm text-[#8E786F] font-sans font-light leading-relaxed">{col.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
