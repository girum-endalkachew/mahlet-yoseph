import Image from "next/image";
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
