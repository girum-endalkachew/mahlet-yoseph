import Image from "next/image";
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
              <p className="text-sm mt-2">${p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
