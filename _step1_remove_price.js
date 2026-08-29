const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const full = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("✅", filePath);
}

// PIECES INDEX (no price)
write("app/pieces/page.tsx", `import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

export const metadata = {
  title: "The Pieces | MAHLET YOSEPH",
  description: "Curated. Considered. Connected.",
};

export default function PiecesPage() {
  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-28 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F] font-semibold">
            Shop
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl mt-4">
            THE PIECES.
          </h1>
          <p className="mt-4 text-[#8E786F] font-light max-w-lg">
            Forgotten silhouettes. Reimagined for movement. Not vintage — remembered differently.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {products.map((p) => (
            <Link key={p.slug} href={"/pieces/" + p.slug} className="group block">
              <div className="relative aspect-[3/4] bg-[#DED5CD] mb-4 overflow-hidden border border-[#8E786F]/15">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <h2 className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase font-semibold group-hover:text-[#B89DA4] transition">
                {p.name}
              </h2>
              <p className="text-[9px] text-[#8E786F] tracking-widest mt-1">
                {p.year}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
`);

// PRODUCT DETAIL (no price shown, hidden even in the button)
write("app/pieces/[slug]/page.tsx", `'use client';

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getProduct,
  getRelatedProducts,
  getCollection,
} from "@/lib/data";

const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProduct(slug);
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#E7DED5] pt-32 px-6 text-center">
        <h1 className="font-serif text-3xl">Piece not found</h1>
        <Link href="/pieces" className="mt-6 inline-block text-sm tracking-widest uppercase">
          ← Back to Pieces
        </Link>
      </main>
    );
  }

  const collection = getCollection(product.collection);
  const related = getRelatedProducts(product.slug);

  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-24 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <Link
          href="/pieces"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#8E786F] hover:text-[#4A3D37] mb-8"
        >
          <ArrowLeft size={12} /> All Pieces
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="relative aspect-[3/4] bg-[#DED5CD] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 right-6 text-[9px] tracking-widest uppercase text-[#E7DED5] bg-[#362A24]/60 backdrop-blur px-3 py-2">
              360° Explore
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center lg:py-8">
            {collection && (
              <Link
                href={"/collections/" + collection.slug}
                className="text-[10px] tracking-[0.25em] uppercase text-[#8E786F] hover:text-[#B89DA4]"
              >
                {collection.name}
              </Link>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mt-3">
              {product.name}
            </h1>
            <p className="text-[10px] tracking-widest text-[#8E786F] mt-3">
              {product.year}
            </p>
            <p className="mt-8 text-[#8E786F] font-light leading-relaxed max-w-md">
              {product.description}
            </p>

            {/* Size */}
            <div className="mt-10">
              <p className="text-[10px] tracking-[0.2em] uppercase mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={
                      "w-12 h-12 text-xs tracking-widest border transition " +
                      (size === s
                        ? "bg-[#4A3D37] text-[#E7DED5] border-[#4A3D37]"
                        : "border-[#8E786F]/40 hover:border-[#4A3D37]")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              className="mt-10 w-full sm:w-auto sm:min-w-[280px] bg-[#4A3D37] hover:bg-[#8E786F] text-[#E7DED5] py-4 px-8 text-[11px] tracking-[0.25em] uppercase transition"
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
          </div>
        </div>

        {/* Story */}
        <section className="mt-20 md:mt-28 max-w-3xl border-t border-[#8E786F]/20 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
            The Story Behind The Piece
          </span>
          <p className="font-serif text-2xl sm:text-3xl mt-6 leading-snug">
            {product.story}
          </p>
        </section>

        {/* Root to form strip */}
        <section className="mt-16 py-12 border-y border-[#8E786F]/20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F] mb-6">
            From Root to Form
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] tracking-[0.15em] uppercase text-[#4A3D37]">
            <span>Cotton</span>
            <span className="text-[#8E786F]">→</span>
            <span>Textile</span>
            <span className="text-[#8E786F]">→</span>
            <span>Sketch</span>
            <span className="text-[#8E786F]">→</span>
            <span>Garment</span>
          </div>
        </section>

        {/* Related */}
        <section className="mt-20">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-serif text-2xl md:text-3xl">Related Pieces</h2>
            <Link
              href="/pieces"
              className="text-[10px] tracking-[0.2em] uppercase flex items-center gap-2"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link key={p.slug} href={"/pieces/" + p.slug} className="group">
                <div className="relative aspect-[3/4] bg-[#DED5CD] mb-3 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    sizes="25vw"
                  />
                </div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase font-semibold">
                  {p.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
`);

// COLLECTION DETAIL (remove price)
write("app/collections/[slug]/page.tsx", `import Image from "next/image";
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
`);

console.log("\\n🎉 STEP 1 COMPLETE: All price tags removed from Pieces, Product Detail & Collection pages!");
