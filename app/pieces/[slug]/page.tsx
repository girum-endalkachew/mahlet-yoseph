'use client';

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getProduct,
  getRelatedProducts,
  getCollection,
} from "@/lib/data";
import { useCart } from "@/context/CartContext";

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
  const { addItem } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#E7DED5] pt-32 px-6 text-center">
        <h1 className="font-serif text-3xl">Piece not found</h1>
        <Link
          href="/pieces"
          className="mt-6 inline-block text-sm tracking-widest uppercase"
        >
          ← Back to Pieces
        </Link>
      </main>
    );
  }

  const collection = getCollection(product.collection);
  const related = getRelatedProducts(product.slug);

  const handleAdd = () => {
    addItem({
      id: product.slug,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size,
      year: product.year,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

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
              onClick={handleAdd}
              className="mt-10 w-full sm:w-auto sm:min-w-[280px] bg-[#4A3D37] hover:bg-[#8E786F] text-[#E7DED5] py-4 px-8 text-[11px] tracking-[0.25em] uppercase transition"
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
          </div>
        </div>

        <section className="mt-20 md:mt-28 max-w-3xl border-t border-[#8E786F]/20 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
            The Story Behind The Piece
          </span>
          <p className="font-serif text-2xl sm:text-3xl mt-6 leading-snug">
            {product.story}
          </p>
        </section>

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
