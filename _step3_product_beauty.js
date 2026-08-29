const fs = require("fs");
const path = require("path");

const productPageCode = `'use client';

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, ChevronDown, Check, ShieldCheck, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getProduct,
  getRelatedProducts,
  getCollection,
} from "@/lib/data";
import { useCart } from "@/context/CartContext";

const sizes = [
  { code: "XS", desc: "US 0-2" },
  { code: "S", desc: "US 4-6" },
  { code: "M", desc: "US 8-10" },
  { code: "L", desc: "US 12-14" },
  { code: "XL", desc: "US 16" },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProduct(slug);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState<"fit" | "craft" | "care">("fit");
  const [activeAngle, setActiveAngle] = useState<"front" | "detail" | "silhouette">("front");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#E7DED5] pt-36 px-6 text-center text-[#4A3D37]">
        <span className="font-serif text-5xl">Piece Not Found</span>
        <p className="text-xs text-[#8E786F] tracking-widest uppercase mt-4">
          This silhouette may belong to another era.
        </p>
        <Link
          href="/pieces"
          className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase border border-[#4A3D37] px-6 py-3 hover:bg-[#4A3D37] hover:text-[#E7DED5] transition"
        >
          <ArrowLeft size={12} /> Return to All Pieces
        </Link>
      </main>
    );
  }

  const collection = getCollection(product.collection);
  const related = getRelatedProducts(product.slug, 4);

  const handleAdd = () => {
    addItem({
      id: product.slug,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: selectedSize,
      year: product.year,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-24 md:pt-28 pb-24">
      {/* Breadcrumb Header */}
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 py-4 border-b border-[#8E786F]/15 flex justify-between items-center text-[10px] tracking-[0.25em] uppercase text-[#8E786F]">
        <Link
          href="/pieces"
          className="inline-flex items-center gap-2 hover:text-[#4A3D37] transition"
        >
          <ArrowLeft size={12} /> Back to Pieces
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-[9px]">
          <Link href="/" className="hover:text-[#4A3D37]">Archive</Link>
          <span>/</span>
          {collection && (
            <>
              <Link href={"/collections/" + collection.slug} className="hover:text-[#4A3D37]">
                {collection.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#4A3D37] font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 md:px-12 pt-8 md:pt-12">
        {/* Main Product Spread: Sticky Left Gallery + Right Editorial Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Gallery Column (Span 7) */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] w-full bg-[#DED5CD] overflow-hidden border border-[#8E786F]/20 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAngle}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={
                      activeAngle === "detail"
                        ? "/images/products/3d-product-story.jpg"
                        : activeAngle === "silhouette"
                        ? "/images/cta/move-differently.jpg"
                        : product.image
                    }
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Angle View Selector Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-2 bg-[#362A24]/75 backdrop-blur-md p-1.5 rounded-full border border-[#E7DED5]/20 text-[#E7DED5]">
                  <button
                    onClick={() => setActiveAngle("front")}
                    className={
                      "px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase rounded-full transition " +
                      (activeAngle === "front"
                        ? "bg-[#C8A86A] text-[#362A24] font-semibold"
                        : "hover:text-[#C8A86A]")
                    }
                  >
                    Front
                  </button>
                  <button
                    onClick={() => setActiveAngle("detail")}
                    className={
                      "px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase rounded-full transition " +
                      (activeAngle === "detail"
                        ? "bg-[#C8A86A] text-[#362A24] font-semibold"
                        : "hover:text-[#C8A86A]")
                    }
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => setActiveAngle("silhouette")}
                    className={
                      "px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase rounded-full transition " +
                      (activeAngle === "silhouette"
                        ? "bg-[#C8A86A] text-[#362A24] font-semibold"
                        : "hover:text-[#C8A86A]")
                    }
                  >
                    Motion
                  </button>
                </div>

                <span className="hidden sm:inline-block text-[9px] tracking-[0.25em] uppercase text-[#E7DED5] bg-[#362A24]/60 backdrop-blur px-3 py-1.5 border border-[#E7DED5]/15">
                  Reimagined Silhouette
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { angle: "front", img: product.image, label: "Front View" },
                { angle: "detail", img: "/images/products/3d-product-story.jpg", label: "Textile Detail" },
                { angle: "silhouette", img: "/images/cta/move-differently.jpg", label: "In Motion" },
              ].map((item) => (
                <button
                  key={item.angle}
                  onClick={() => setActiveAngle(item.angle as any)}
                  className={
                    "relative aspect-[4/3] bg-[#DED5CD] overflow-hidden border transition-all text-left group " +
                    (activeAngle === item.angle
                      ? "border-[#4A3D37] ring-1 ring-[#4A3D37]"
                      : "border-[#8E786F]/20 opacity-70 hover:opacity-100")
                  }
                >
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 text-[8px] tracking-[0.2em] uppercase text-[#E7DED5] bg-[#362A24]/70 px-2 py-0.5 backdrop-blur">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Product Info Column (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Collection Header */}
              {collection && (
                <div className="flex items-center gap-2 text-[#C8A86A] mb-3">
                  <Sparkles size={11} className="fill-[#C8A86A]" />
                  <Link
                    href={"/collections/" + collection.slug}
                    className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#8E786F] hover:text-[#4A3D37] transition"
                  >
                    {collection.name}
                  </Link>
                </div>
              )}

              {/* Title & Era Badge */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A3D37] leading-[0.95]">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 mt-4 pt-2 border-t border-[#8E786F]/20">
                <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#8E786F]">
                  ERA {product.year}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#C8A86A]" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#B89DA4] font-medium">
                  Limited Archive Piece
                </span>
              </div>

              {/* Short Editorial Intro */}
              <p className="mt-6 font-serif text-lg sm:text-xl text-[#4A3D37] leading-relaxed italic">
                "{product.description}"
              </p>

              {/* Material Highlights Pill Cards */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 bg-[#F5EFE6] border border-[#8E786F]/20 rounded-sm">
                  <span className="text-[8px] tracking-[0.25em] uppercase text-[#8E786F] block">Fabric</span>
                  <span className="text-[11px] font-sans font-medium text-[#4A3D37] block mt-0.5">100% Organic Cotton</span>
                </div>
                <div className="p-3 bg-[#F5EFE6] border border-[#8E786F]/20 rounded-sm">
                  <span className="text-[8px] tracking-[0.25em] uppercase text-[#8E786F] block">Silhouette</span>
                  <span className="text-[11px] font-sans font-medium text-[#4A3D37] block mt-0.5">Relaxed / Reimagined</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-8 pt-6 border-t border-[#8E786F]/20">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#4A3D37]">
                    Select Size
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#8E786F]">
                    Tailored Movement Fit
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => setSelectedSize(s.code)}
                      className={
                        "py-3.5 flex flex-col items-center justify-center border transition-all text-center " +
                        (selectedSize === s.code
                          ? "bg-[#4A3D37] text-[#E7DED5] border-[#4A3D37] shadow-md"
                          : "bg-[#F5EFE6] border-[#8E786F]/30 text-[#4A3D37] hover:border-[#4A3D37]")
                      }
                    >
                      <span className="text-xs font-semibold tracking-widest">{s.code}</span>
                      <span className="text-[8px] opacity-70 mt-0.5">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Inquiry Bag Button */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleAdd}
                  className="w-full bg-[#4A3D37] hover:bg-[#8E786F] text-[#E7DED5] py-4 px-8 text-[11px] tracking-[0.3em] uppercase font-medium transition-all shadow-md flex items-center justify-center gap-3 group"
                >
                  {added ? (
                    <>
                      <Check size={14} className="text-[#C8A86A]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Inquiry Bag</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[9px] tracking-[0.2em] text-center uppercase text-[#8E786F]">
                  No upfront price • Custom tailored upon request
                </p>
              </div>

              {/* Expandable Editorial Tabs */}
              <div className="mt-10 border-t border-[#8E786F]/20 pt-6">
                <div className="flex border-b border-[#8E786F]/20">
                  {[
                    { id: "fit", label: "Fit & Motion" },
                    { id: "craft", label: "Craftsmanship" },
                    { id: "care", label: "Care & Fiber" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={
                        "pb-3 px-4 text-[10px] tracking-[0.2em] uppercase font-semibold transition border-b-2 -mb-px " +
                        (activeTab === tab.id
                          ? "border-[#4A3D37] text-[#4A3D37]"
                          : "border-transparent text-[#8E786F] hover:text-[#4A3D37]")
                      }
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="py-4 text-xs text-[#8E786F] font-light leading-relaxed min-h-[100px]">
                  {activeTab === "fit" && (
                    <p>
                      Engineered for unconstrained movement. Cut with a slightly dropped crotch and structured ankle ribbing that retains form whether worn relaxed or pulled up the leg.
                    </p>
                  )}
                  {activeTab === "craft" && (
                    <p>
                      Woven from long-staple Ethiopian organic cotton yarns. Hand-finished flatlock seams prevent chafing, with reinforced side piping designed to outlast modern fast-fashion activewear.
                    </p>
                  )}
                  {activeTab === "care" && (
                    <p>
                      Machine wash cold on gentle cycle with natural detergent. Lay flat to dry away from direct heat to preserve fiber tension and natural plant dye depth.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Story Banner Section */}
        <section className="mt-24 md:mt-36 border-t border-[#8E786F]/20 pt-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#C8A86A] font-semibold">
              01 — The Story Behind The Piece
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#4A3D37] leading-tight">
              A Silhouette Brought Back <br /> From Silence.
            </h2>
            <p className="font-serif text-xl sm:text-2xl text-[#8E786F] italic leading-relaxed pt-2">
              "{product.story}"
            </p>
          </div>
        </section>

        {/* From Root To Form Visual Process Strip */}
        <section className="mt-20 py-16 border-y border-[#8E786F]/20 bg-[#F5EFE6] px-6 md:px-12 -mx-6 md:-mx-12">
          <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-10">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">Creation Line</span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#4A3D37] mt-1">From Root to Form</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { step: "01", name: "COTTON", sub: "Ethiopian Soil", img: "/images/hero/hero-main.jpg" },
                { step: "02", name: "TEXTILE", sub: "Natural Yarn", img: "/images/products/3d-product-story.jpg" },
                { step: "03", name: "SKETCH", sub: "Archive Drape", img: "/images/hero/hero-main.jpg" },
                { step: "04", name: "FORM", sub: "Hand Prototype", img: "/images/products/capri-track-pant.jpg" },
                { step: "05", name: "GARMENT", sub: "Mahlet Yoseph", img: product.image },
              ].map((s) => (
                <div key={s.step} className="space-y-3 flex flex-col items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#8E786F]/30 shadow-sm">
                    <Image src={s.img} alt={s.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#C8A86A] block">{s.step}</span>
                    <h4 className="text-[10px] tracking-[0.2em] font-semibold text-[#4A3D37] uppercase">{s.name}</h4>
                    <p className="text-[8px] text-[#8E786F] uppercase tracking-wider">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Pieces Strip */}
        <section className="mt-24">
          <div className="flex justify-between items-end mb-12 border-b border-[#8E786F]/20 pb-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">Curated Archive</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#4A3D37] mt-1">Complete The Look</h2>
            </div>
            <Link
              href="/pieces"
              className="text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center gap-2 text-[#4A3D37] hover:text-[#B89DA4] transition"
            >
              All Pieces <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p) => (
              <Link key={p.slug} href={"/pieces/" + p.slug} className="group block">
                <div className="relative aspect-[3/4] bg-[#DED5CD] mb-4 overflow-hidden border border-[#8E786F]/15">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-[10px] tracking-[0.18em] uppercase font-semibold text-[#4A3D37] group-hover:text-[#B89DA4] transition">
                  {p.name}
                </h3>
                <p className="text-[9px] text-[#8E786F] tracking-widest mt-1">{p.year}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
`;

fs.writeFileSync(path.join(__dirname, "app", "pieces", "[slug]", "page.tsx"), productPageCode, "utf8");
console.log("✅ Step 3 Complete: Editorial Product Detail Page Deployed!");
