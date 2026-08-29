const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const full = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("✅ Updated:", filePath);
}

// 1. COLLECTIONS INDEX PAGE
write("app/collections/page.tsx", `import Image from "next/image";
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
`);

// 2. COLLECTION DETAIL PAGE
write("app/collections/[slug]/page.tsx", `import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import {
  collections,
  getCollection,
  getProductsByCollection,
} from "@/lib/data";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) return { title: "Collection | MAHLET YOSEPH" };
  return {
    title: col.name + " | MAHLET YOSEPH",
    description: col.description,
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) notFound();

  const items = getProductsByCollection(slug);
  const others = collections.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen">
      {/* Full-bleed Hero */}
      <section className="relative h-[75vh] min-h-[520px] bg-[#5C4D45] flex items-end">
        <Image
          src={col.image}
          alt={col.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#362A24] via-[#362A24]/40 to-transparent" />
        
        <div className="relative z-10 max-w-[1700px] mx-auto w-full px-6 md:px-12 pb-12 md:pb-16 text-[#E7DED5]">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#B89DA4] hover:text-[#E7DED5] transition mb-6"
          >
            <ArrowLeft size={12} /> All Worlds
          </Link>
          <div className="flex items-center gap-2 text-[#C8A86A] mb-3">
            <Sparkles size={11} className="fill-[#C8A86A]" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans">
              ERA {col.num} ARCHIVE
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none">
            {col.name}
          </h1>
          <p className="mt-4 text-base md:text-xl font-serif italic text-[#E7DED5]/90 max-w-2xl">
            "{col.tagline}"
          </p>
        </div>
      </section>

      {/* Editorial Story Breakdown */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#8E786F] block">
              01 — The World
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#4A3D37] mt-2">
              Memory & Motion
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 border-l md:border-[#8E786F]/20 md:pl-10">
            <p className="font-serif text-2xl sm:text-3xl text-[#4A3D37] leading-snug">
              {col.story}
            </p>
            <p className="text-sm md:text-base text-[#8E786F] font-sans font-light leading-relaxed">
              {col.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid in this Collection */}
      <section className="border-t border-[#8E786F]/20 bg-[#F5EFE6] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1700px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 gap-4 border-b border-[#8E786F]/15 pb-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
                02 — Silhouettes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3D37] mt-1">
                Pieces in This World
              </h2>
            </div>
            <Link
              href="/pieces"
              className="text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center gap-2 text-[#4A3D37] hover:text-[#B89DA4] transition"
            >
              Explore All Pieces <ArrowRight size={12} />
            </Link>
          </div>

          {items.length === 0 ? (
            <p className="text-[#8E786F] font-serif italic text-lg">
              Archive pieces for this era are currently being reimagined in the studio.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
              {items.map((p) => (
                <Link
                  key={p.slug}
                  href={"/pieces/" + p.slug}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] bg-[#DED5CD] mb-4 overflow-hidden border border-[#8E786F]/15">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <h3 className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold text-[#4A3D37] group-hover:text-[#B89DA4] transition">
                    {p.name}
                  </h3>
                  <p className="text-[9px] text-[#8E786F] tracking-widest mt-1">
                    {p.year}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Explore Other Worlds */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[1700px] mx-auto border-t border-[#8E786F]/20">
        <div className="mb-12 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">Continue Journey</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#4A3D37] mt-1">Step Into Other Eras</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={"/collections/" + c.slug}
              className="group block border border-[#8E786F]/20 p-6 bg-[#F5EFE6] hover:border-[#8E786F]/50 transition-all duration-300"
            >
              <span className="font-serif text-xl text-[#C8A86A] block mb-2">{c.num}</span>
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#4A3D37] group-hover:text-[#B89DA4] transition">
                {c.name}
              </h3>
              <p className="text-[11px] text-[#8E786F] font-sans font-light mt-2 line-clamp-1 italic">
                "{c.tagline}"
              </p>
              <div className="mt-4 flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-[#4A3D37] group-hover:text-[#B89DA4]">
                <span>Enter</span>
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
`);

console.log("\\n🎉 Step 4 Complete: Editorial Collection Pages Deployed!");
