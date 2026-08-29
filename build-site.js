const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const full = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("✅", filePath);
}

// ========== DATA ==========
write("lib/data.ts", `export type Product = {
  id: string;
  name: string;
  slug: string;
  year: string;
  price: number;
  description: string;
  story: string;
  collection: string;
  image: string;
  images?: string[];
};

export type Collection = {
  id: string;
  num: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  story: string;
  image: string;
  products: string[];
};

export const collections: Collection[] = [
  {
    id: "1",
    num: "01",
    name: "THE FORGOTTEN GYM BAG",
    slug: "forgotten-gym-bag",
    tagline: "Pieces you haven't seen in years.",
    description: "Capri track pants, stirrup leggings, warm-up jackets, retro tennis skirts.",
    story: "Before activewear became performance technology, sportswear was full of strange and beautiful silhouettes. The gym bag held what the conversation forgot.",
    image: "/images/collections/forgotten-gym-bag.jpg",
    products: ["capri-track-pant", "stirrup-leggings", "warm-up-jacket", "tennis-skirt"],
  },
  {
    id: "2",
    num: "02",
    name: "2000s ATHLETE",
    slug: "2000s-athlete",
    tagline: "Low-rise. Mesh. Movement.",
    description: "Track pants, basketball shorts, mesh jerseys, cropped zip jackets.",
    story: "The early 2000s dressed strength in mesh and low-rise lines. We bring that energy forward — quieter, sharper, reimagined.",
    image: "/images/collections/2000s-athlete.jpg",
    products: ["tear-away-track-pant", "mesh-jersey-set", "parachute-pants"],
  },
  {
    id: "3",
    num: "03",
    name: "90s SPORTS CLUB",
    slug: "90s-sports-club",
    tagline: "Tennis club photographs, reimagined.",
    description: "Tennis polos, rugby shirts, pleated skirts, vintage track jackets.",
    story: "Old athletic uniforms still feel modern because they were built for presence, not just performance. The club never closed — it waited.",
    image: "/images/collections/90s-sports-club.jpg",
    products: ["tennis-skirt", "warm-up-jacket", "capri-track-pant"],
  },
  {
    id: "4",
    num: "04",
    name: "AEROBICS ARCHIVE",
    slug: "aerobics-archive",
    tagline: "Bodysuits. Nylon. Color memory.",
    description: "Athletic bodysuits, nylon shorts, colorful leggings, cropped sweatshirts.",
    story: "Aerobics was never only fitness. It was a silhouette language — stretch, shine, and form. We archive it with intention.",
    image: "/images/collections/aerobics-archive.jpg",
    products: ["bodysuit", "parachute-pants", "stirrup-leggings"],
  },
  {
    id: "5",
    num: "05",
    name: "SUNDAY MORNING ATHLETE",
    slug: "sunday-morning-athlete",
    tagline: "Quiet strength. Soft motion.",
    description: "Oversized track pants, vintage sweatshirts, windbreakers, old-school ease.",
    story: "Strength is not always loud. Sometimes it moves quietly — on Sunday mornings, in inherited ease, in clothes that feel like rest and readiness at once.",
    image: "/images/collections/sunday-morning-athlete.jpg",
    products: ["parachute-pants", "warm-up-jacket", "capri-track-pant"],
  },
  {
    id: "6",
    num: "06",
    name: "THE GIRL'S LOCKER ROOM",
    slug: "girls-locker-room",
    tagline: "Baby tees. Shorts. Tube socks. Belonging.",
    description: "Baby tees, basketball shorts, tennis skirts, zip jackets, tube socks.",
    story: "The locker room was never only a place. It was a world of contrast — soft and sharp, fitted and oversized, intimate and public.",
    image: "/images/collections/girls-locker-room.jpg",
    products: ["mesh-jersey-set", "tennis-skirt", "tear-away-track-pant"],
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "CAPRI TRACK PANT",
    slug: "capri-track-pant",
    year: "1998 / REIMAGINED",
    price: 120,
    description: "Loose nylon capris with side stripes and a tiny logo. The silhouette everyone forgot.",
    story: "The capri track pant disappeared quietly. Not quite leggings. Not quite trousers. A strange silhouette from another time. We brought it back — reimagined for movement.",
    collection: "forgotten-gym-bag",
    image: "/images/products/capri-track-pant.jpg",
  },
  {
    id: "2",
    name: "TEAR-AWAY TRACK PANT",
    slug: "tear-away-track-pant",
    year: "2003 / REIMAGINED",
    price: 135,
    description: "Full side snaps. 90s/2000s energy. Built to move, built to break open.",
    story: "Tear-aways were never subtle. Snaps down the entire side — a gesture of readiness. We kept the drama, refined the line.",
    collection: "2000s-athlete",
    image: "/images/products/tear-away-track-pant.jpg",
  },
  {
    id: "3",
    name: "WARM-UP JACKET",
    slug: "warm-up-jacket",
    year: "1996 / REIMAGINED",
    price: 165,
    description: "Old-school zip-up. Color-blocked. Coach energy, luxury finish.",
    story: "The warm-up jacket once meant you were about to enter the court. Now it means you carry that history with you.",
    collection: "forgotten-gym-bag",
    image: "/images/products/warm-up-jacket.jpg",
  },
  {
    id: "4",
    name: "RETRO TENNIS SKIRT",
    slug: "tennis-skirt",
    year: "1996 / REIMAGINED",
    price: 95,
    description: "Pleated, sporty, almost school-uniform — in unexpected archive colors.",
    story: "Pleats that moved with every serve. We kept the structure and gave it colors the club never expected.",
    collection: "90s-sports-club",
    image: "/images/products/tennis-skirt.jpg",
  },
  {
    id: "5",
    name: "STIRRUP LEGGINGS",
    slug: "stirrup-leggings",
    year: "1995 / REIMAGINED",
    price: 88,
    description: "The strap under the foot. Mom's workout clothes — made interesting again.",
    story: "Stirrups were a detail everyone forgot. We didn't. The line from waist to sole is still one of the cleanest in sportswear.",
    collection: "forgotten-gym-bag",
    image: "/images/products/stirrup-leggings.jpg",
  },
  {
    id: "6",
    name: "NYLON PARACHUTE PANT",
    slug: "parachute-pants",
    year: "1997 / REIMAGINED",
    price: 128,
    description: "Shiny, lightweight, slightly crinkled nylon. Navy, cream, motion.",
    story: "Parachute nylon catches light the way memory catches detail. Lightweight. Unapologetic. Reimagined.",
    collection: "aerobics-archive",
    image: "/images/products/parachute-pants.jpg",
  },
  {
    id: "7",
    name: "ATHLETIC BODYSUIT",
    slug: "bodysuit",
    year: "1990s / REIMAGINED",
    price: 110,
    description: "Gymnastics and dance archive. One piece. Full form.",
    story: "The bodysuit was never only for the floor. It was a second skin of strength. We restored it with quieter luxury.",
    collection: "aerobics-archive",
    image: "/images/products/bodysuit.jpg",
  },
  {
    id: "8",
    name: "MESH JERSEY SET",
    slug: "mesh-jersey-set",
    year: "2000s / REIMAGINED",
    price: 145,
    description: "Oversized mesh jersey over fitted tank. Longer basketball shorts.",
    story: "Mesh was breath and attitude. Paired with a tiny tank and longer shorts, the contrast still feels modern.",
    collection: "2000s-athlete",
    image: "/images/products/mesh-jersey-set.jpg",
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(slug: string) {
  const col = getCollection(slug);
  if (!col) return [];
  return products.filter((p) => col.products.includes(p.slug));
}

export function getRelatedProducts(slug: string, limit = 4) {
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
`);

// ========== COLLECTIONS INDEX ==========
write("app/collections/page.tsx", `import Image from "next/image";
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
`);

// ========== COLLECTION DETAIL ==========
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
                  <p className="text-sm mt-2 text-[#4A3D37]">\${p.price}</p>
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

// ========== PIECES INDEX ==========
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
            Forgotten silhouettes. Reimagined for movement. Not vintage —
            remembered differently.
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
              <p className="text-sm mt-2">\${p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
`);

// ========== PRODUCT DETAIL ==========
write("app/pieces/[slug]/page.tsx", `'use client';

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  products,
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
            <p className="text-2xl mt-6 font-light">\${product.price}</p>
            <p className="mt-6 text-[#8E786F] font-light leading-relaxed max-w-md">
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
              {added ? "Added to Bag ✓" : "Add to Bag — $" + product.price}
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
                <p className="text-sm mt-1">\${p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
`);

// ========== ARCHIVE ==========
write("app/archive/page.tsx", `import Image from "next/image";
import Link from "next/link";
import { products, collections } from "@/lib/data";

export const metadata = {
  title: "The Archive | MAHLET YOSEPH",
  description: "Pieces we almost forgot.",
};

export default function ArchivePage() {
  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-28 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
            The Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl mt-4">
            PIECES WE<br />ALMOST FORGOT.
          </h1>
          <p className="mt-6 text-[#8E786F] font-light">
            An interactive memory of silhouettes — by era, by type, by the
            feeling they left behind.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12 text-[10px] tracking-[0.2em] uppercase">
          <span className="px-4 py-2 border border-[#4A3D37] bg-[#4A3D37] text-[#E7DED5]">
            All
          </span>
          {["1990s", "2000s", "Track", "Tennis", "Aerobics"].map((f) => (
            <span
              key={f}
              className="px-4 py-2 border border-[#8E786F]/40 text-[#8E786F]"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <Link
              key={p.slug}
              href={"/pieces/" + p.slug}
              className="group border border-[#8E786F]/20 p-6 hover:border-[#8E786F]/50 transition bg-[#F5EFE6]"
            >
              <div className="flex justify-between text-[10px] tracking-widest text-[#8E786F] mb-4">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{p.year.split(" / ")[0]}</span>
              </div>
              <div className="relative aspect-square mb-6 bg-[#DED5CD] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                  sizes="33vw"
                />
              </div>
              <h2 className="font-serif text-xl">{p.name}</h2>
              <p className="text-xs text-[#8E786F] mt-2 uppercase tracking-wider">
                {p.year}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="font-serif text-2xl mb-8">Browse by World</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={"/collections/" + c.slug}
                className="text-center p-4 border border-[#8E786F]/20 hover:bg-[#4A3D37] hover:text-[#E7DED5] transition"
              >
                <span className="block font-serif text-lg">{c.num}</span>
                <span className="text-[9px] tracking-wider uppercase mt-1 block leading-tight">
                  {c.name.replace("THE ", "")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
`);

// ========== OUR STORY ==========
write("app/our-story/page.tsx", `import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Story | MAHLET YOSEPH",
  description: "The Art of Strength. Not vintage. Forgotten.",
};

export default function OurStoryPage() {
  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen">
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-[1100px] mx-auto text-center">
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#8E786F]">
          Mahlet Yoseph
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl mt-6 leading-none">
          THE ART<br />OF STRENGTH.
        </h1>
        <p className="mt-8 text-lg text-[#8E786F] font-light max-w-xl mx-auto">
          A fashion house built around movement, memory, and strength.
        </p>
      </section>

      <section className="relative h-[50vh] min-h-[360px]">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Our Story"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#362A24]/30" />
      </section>

      <section className="py-20 md:py-28 px-6 md:px-12 max-w-[900px] mx-auto space-y-20">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl">The Legacy</h2>
          <p className="mt-6 text-[#8E786F] font-light leading-relaxed text-lg">
            MAHLET YOSEPH exists to bring back silhouettes that disappeared from
            the conversation. Not as costume. Not as nostalgia. As living form —
            cut for the body that moves now.
          </p>
        </div>

        <div className="border-y border-[#8E786F]/20 py-16 text-center">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-none">
            NOT VINTAGE.
            <br />
            <span className="italic text-[#8E786F]">FORGOTTEN.</span>
          </h2>
          <p className="mt-8 text-[#8E786F] max-w-lg mx-auto font-light">
            We look back to the silhouettes that shaped movement, then bring
            them forward.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl">From Root to Form</h2>
          <p className="mt-6 text-[#8E786F] font-light leading-relaxed text-lg">
            Every piece begins somewhere — in cotton, in yarn, in a sketch drawn
            from memory. From the materials beneath our feet to the movement of
            the women who wear them.
          </p>
          <ul className="mt-10 space-y-4 text-sm tracking-[0.15em] uppercase">
            {[
              "Raw material — Cotton",
              "Textile — Yarn",
              "Sketch — Design",
              "Form — Prototype",
              "Final piece — Mahlet Yoseph",
            ].map((step) => (
              <li
                key={step}
                className="flex items-center gap-4 border-b border-[#8E786F]/15 pb-4"
              >
                <span className="w-2 h-2 rounded-full bg-[#8E786F]" />
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-3xl md:text-4xl">Materials</h2>
          <p className="mt-6 text-[#8E786F] font-light leading-relaxed text-lg">
            Natural fibers. Intentional textiles. Quiet luxury in the hand of the
            cloth — chosen so strength can feel soft, and movement can feel
            inherited.
          </p>
        </div>

        <div className="text-center pt-8">
          <h2 className="font-serif text-3xl md:text-5xl mb-8">
            Strength has a history.
          </h2>
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 bg-[#4A3D37] text-[#E7DED5] px-8 py-4 text-[11px] tracking-[0.25em] uppercase hover:bg-[#8E786F] transition"
          >
            Enter the Worlds <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
`);

// ========== JOURNAL ==========
write("app/journal/page.tsx", `import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Journal | MAHLET YOSEPH",
  description: "Fashion stories, process, and collection notes.",
};

const posts = [
  {
    slug: "from-root-to-form",
    cat: "Process",
    title: "From Root to Form",
    excerpt: "How a forgotten silhouette becomes a new piece.",
  },
  {
    slug: "return-of-capri-pants",
    cat: "Fashion",
    title: "The Return of Capri Pants",
    excerpt: "The silhouette everyone forgot — and why it matters again.",
  },
  {
    slug: "sports-club-1998",
    cat: "Collection",
    title: "Sports Club, 1998",
    excerpt: "Why old athletic uniforms still feel modern.",
  },
];

export default function JournalPage() {
  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-28 pb-20">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
          Journal
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl mt-4 mb-16">
          STORIES FROM<br />THE ARCHIVE.
        </h1>

        <div className="space-y-0">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-t border-[#8E786F]/25 py-10 md:py-14 group"
            >
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8E786F]">
                {post.cat}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl mt-3 group-hover:text-[#B89DA4] transition">
                {post.title}
              </h2>
              <p className="mt-4 text-[#8E786F] font-light max-w-xl">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 mt-6 text-[10px] tracking-[0.2em] uppercase">
                Read Story <ArrowRight size={12} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
`);

// ========== NOT FOUND ==========
write("app/not-found.tsx", `import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#E7DED5] text-[#4A3D37] flex flex-col items-center justify-center px-6 text-center pt-20">
      <h1 className="font-serif text-6xl md:text-8xl">404</h1>
      <p className="mt-4 text-[#8E786F] tracking-widest uppercase text-xs">
        This piece was forgotten
      </p>
      <Link
        href="/"
        className="mt-10 text-[11px] tracking-[0.25em] uppercase border-b border-[#4A3D37] pb-1 hover:text-[#B89DA4] hover:border-[#B89DA4]"
      >
        Return Home
      </Link>
    </main>
  );
}
`);

// Fix layout so Navbar works on light pages too (remove forced cream-only body issue)
write("app/layout.tsx", `import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MAHLET YOSEPH | Fashion House",
  description: "The Art of Strength. Forgotten silhouettes. Reimagined for movement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          playfair.variable +
          " " +
          montserrat.variable +
          " font-sans bg-[#E7DED5] text-[#4A3D37] antialiased min-h-screen"
        }
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
`);

// Navbar that works on light AND dark pages
write("components/layout/Navbar.tsx", `'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lightBar = !isHome || scrolled;
  const text = lightBar ? "text-[#4A3D37]" : "text-[#E7DED5]";
  const barBg = lightBar
    ? "bg-[#E7DED5]/95 backdrop-blur-md border-b border-[#8E786F]/15"
    : "bg-transparent";

  return (
    <>
      <header
        className={
          "fixed top-0 w-full z-40 py-4 md:py-5 px-4 sm:px-8 md:px-12 flex justify-between items-center transition-all duration-300 " +
          barBg +
          " " +
          text
        }
      >
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={"lg:hidden p-1 " + text}
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>

        <Link
          href="/"
          className={
            "font-serif text-2xl md:text-3xl tracking-widest text-center lg:text-left " +
            text
          }
        >
          M<br />
          <span className="pl-3 md:pl-4 -mt-2 block">Y</span>
        </Link>

        <nav className="hidden lg:flex space-x-10 text-[10px] tracking-[0.25em] uppercase font-sans">
          <Link href="/pieces" className="hover:text-[#B89DA4] transition">
            Shop
          </Link>
          <Link href="/collections" className="hover:text-[#B89DA4] transition">
            Collections
          </Link>
          <Link href="/our-story" className="hover:text-[#B89DA4] transition">
            The Story
          </Link>
          <Link href="/journal" className="hover:text-[#B89DA4] transition">
            Journal
          </Link>
        </nav>

        <div className="flex items-center space-x-4 sm:space-x-8 text-[10px] tracking-[0.25em] uppercase font-sans">
          <Link href="/archive" className="hidden sm:inline hover:text-[#B89DA4] transition">
            Archive
          </Link>
          <button className="flex items-center gap-1 hover:text-[#B89DA4] transition">
            BAG (0) <span className="text-base font-light leading-none ml-0.5">+</span>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#362A24] text-[#E7DED5] p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-[#8E786F]/30 pb-6">
            <span className="font-serif text-2xl tracking-widest">MAHLET YOSEPH</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 my-auto font-serif text-3xl tracking-wide">
            <Link href="/pieces" onClick={() => setMobileMenuOpen(false)}>
              SHOP ALL
            </Link>
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)}>
              COLLECTIONS
            </Link>
            <Link href="/archive" onClick={() => setMobileMenuOpen(false)}>
              THE ARCHIVE
            </Link>
            <Link href="/our-story" onClick={() => setMobileMenuOpen(false)}>
              OUR STORY
            </Link>
            <Link href="/journal" onClick={() => setMobileMenuOpen(false)}>
              JOURNAL
            </Link>
          </nav>
          <div className="border-t border-[#8E786F]/30 pt-6 text-[10px] tracking-[0.2em] text-[#8E786F] flex justify-between">
            <span>NOT VINTAGE. FORGOTTEN.</span>
            <span>ADDIS ABABA</span>
          </div>
        </div>
      )}
    </>
  );
}
`);

console.log("\\n🎉 Full public website routes created!");
console.log("Visit:");
console.log("  /");
console.log("  /collections");
console.log("  /collections/90s-sports-club");
console.log("  /pieces");
console.log("  /pieces/capri-track-pant");
console.log("  /archive");
console.log("  /our-story");
console.log("  /journal");
