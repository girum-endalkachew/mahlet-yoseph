import Image from "next/image";
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
