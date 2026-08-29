import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data";

export const metadata = {
  title: "Collections | MAHLET YOSEPH",
  description: "Every era has a silhouette worth remembering.",
};

export default function CollectionsPage() {
  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-28 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F] font-semibold">
            The Worlds
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl mt-4 leading-tight">
            EVERY ERA HAS A<br />SILHOUETTE WORTH<br />REMEMBERING.
          </h1>
          <p className="mt-6 text-[#8E786F] font-sans font-light text-base md:text-lg max-w-xl">
            Not categories. Worlds. Forgotten sportswear eras, reimagined for movement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={"/collections/" + col.slug}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#5C4D45] mb-5">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/80 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 font-serif text-2xl text-[#E7DED5]">
                  {col.num}
                </span>
              </div>
              <h2 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#4A3D37] group-hover:text-[#B89DA4] transition">
                {col.name}
              </h2>
              <p className="text-sm text-[#8E786F] mt-2 font-light leading-relaxed">
                {col.tagline}
              </p>
              <span className="inline-flex items-center gap-2 mt-3 text-[10px] tracking-[0.2em] uppercase text-[#4A3D37]">
                Enter <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
