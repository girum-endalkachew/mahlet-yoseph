import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { collections } from "@/lib/data";

export const metadata = {
  title: "Collections | MAHLET YOSEPH",
  description: "Every era has a silhouette worth remembering. Explore the 6 worlds of Mahlet Yoseph.",
};

export default function CollectionsPage() {
  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-28 pb-24">
      {/* Editorial Header */}
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 max-w-4xl">
          <div className="flex items-center gap-2 text-[#C8A86A] mb-4">
            <Sparkles size={12} className="fill-[#C8A86A]" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#8E786F]">
              The Archive Worlds
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.92] tracking-tight">
            EVERY ERA HAS A <br />
            <span className="italic font-light text-[#8E786F]">SILHOUETTE WORTH REMEMBERING.</span>
          </h1>
          <p className="mt-6 text-[#8E786F] font-sans font-light text-base md:text-lg max-w-xl leading-relaxed">
            Not typical categories. Six distinct sportswear worlds bringing back forgotten silhouettes, reimagined for modern movement.
          </p>
        </div>

        {/* 6 Worlds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={"/collections/" + col.slug}
              className="group block relative border border-[#8E786F]/20 p-6 bg-[#F5EFE6] hover:border-[#8E786F]/50 transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full bg-[#5C4D45] overflow-hidden mb-6">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/80 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 font-serif text-3xl text-[#E7DED5] drop-shadow">
                  {col.num}
                </span>
                <span className="absolute bottom-5 right-5 text-[9px] tracking-[0.25em] uppercase text-[#C8A86A] bg-[#362A24]/70 px-3 py-1 backdrop-blur border border-[#E7DED5]/15">
                  Archive Era
                </span>
              </div>

              {/* Text Info */}
              <div className="space-y-2">
                <h2 className="font-serif text-2xl text-[#4A3D37] group-hover:text-[#B89DA4] transition-colors leading-tight">
                  {col.name}
                </h2>
                <p className="text-xs text-[#8E786F] font-sans font-light italic">
                  "{col.tagline}"
                </p>
                <p className="text-xs text-[#8E786F]/80 font-sans font-light leading-relaxed line-clamp-2 pt-1">
                  {col.description}
                </p>
                
                <div className="pt-4 flex items-center justify-between border-t border-[#8E786F]/15 text-[10px] tracking-[0.25em] uppercase font-semibold text-[#4A3D37] group-hover:text-[#B89DA4] transition-colors">
                  <span>Enter World</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mid-page Philosophy Breaker */}
        <section className="mt-28 py-20 border-y border-[#8E786F]/20 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C8A86A]">
            The Art of Strength
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#4A3D37]">
            "Not vintage. Forgotten silhouettes reimagined for movement."
          </h2>
        </section>
      </div>
    </main>
  );
}
