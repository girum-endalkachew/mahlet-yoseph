import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
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
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] bg-[#5C4D45]">
        <Image
          src={col.image}
          alt={col.name}
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#362A24] via-[#362A24]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-[#E7DED5]">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89DA4]">
            {col.num} — Collection
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl mt-3 max-w-4xl">
            {col.name}
          </h1>
          <p className="mt-4 text-sm md:text-base opacity-90 max-w-xl font-light">
            {col.tagline}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
          The Story
        </span>
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl mt-6 leading-snug text-[#4A3D37]">
          {col.story}
        </p>
        <p className="mt-6 text-[#8E786F] font-light max-w-2xl leading-relaxed">
          {col.description}
        </p>
      </section>

      {/* Pieces */}
      <section className="border-t border-[#8E786F]/20 bg-[#F5EFE6] py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
                The Pieces
              </span>
              <h2 className="font-serif text-3xl md:text-5xl mt-2">
                In This World
              </h2>
            </div>
            <Link
              href="/pieces"
              className="text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 hover:text-[#B89DA4]"
            >
              All Pieces <ArrowRight size={12} />
            </Link>
          </div>

          {items.length === 0 ? (
            <p className="text-[#8E786F]">Pieces coming soon.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {items.map((p) => (
                <Link
                  key={p.slug}
                  href={"/pieces/" + p.slug}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] bg-[#DED5CD] mb-4 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="25vw"
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  <h3 className="text-[10px] tracking-[0.15em] uppercase font-semibold">
                    {p.name}
                  </h3>
                  <p className="text-[9px] text-[#8E786F] mt-1 tracking-widest">
                    {p.year}
                  </p>
                  <p className="text-sm mt-2 text-[#4A3D37]">${p.price}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      <section className="py-16 md:py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl mb-10">
          You May Also Enter
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={"/collections/" + c.slug}
              className="group flex items-center justify-between border-b border-[#8E786F]/30 pb-4 hover:text-[#B89DA4] transition"
            >
              <span className="font-sans text-xs tracking-[0.15em] uppercase">
                {c.name}
              </span>
              <ArrowRight size={14} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
