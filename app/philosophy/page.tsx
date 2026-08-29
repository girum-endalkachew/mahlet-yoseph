import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

export const metadata = {
  title: "Philosophy | MAHLET YOSEPH",
  description: "Wear Your Strength.",
};

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen text-[#E7DED5] relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/philosophy/bg.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#362A24]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#362A24]/40 via-transparent to-[#362A24]/90" />
        <div className="absolute inset-0 grain" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-28 md:pt-32">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#B89DA4] hover:text-[#E7DED5] transition mb-16">
          <ArrowLeft size={12} /> Home
        </Link>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 pb-32">
        <div className="text-center mb-20 space-y-6">
          <div className="flex items-center justify-center gap-2 text-[#C8A86A]">
            <Sparkles size={12} className="fill-[#C8A86A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans">Our Philosophy</span>
            <Sparkles size={12} className="fill-[#C8A86A]" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight">
            WEAR YOUR <br />
            <span className="italic font-light text-[#A68B4B]">STRENGTH.</span>
          </h1>
          <div className="gold-line mx-auto w-24 mt-8" />
        </div>

        <div className="space-y-16 text-center">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#E7DED5] italic">
            We believe strength begins beyond ourselves.
          </p>
          <div className="space-y-6 py-8 border-y border-[#E7DED5]/15">
            {["the courage to begin", "the confidence to keep going", "the beauty of becoming", "the power to rise again"].map((line) => (
              <p key={line} className="font-serif text-xl sm:text-2xl md:text-3xl text-[#E7DED5]/90 leading-relaxed">{line}</p>
            ))}
          </div>
          <p className="font-serif text-xl sm:text-2xl text-[#B89DA4] italic leading-relaxed max-w-2xl mx-auto">
            Because strength is more than what the body can do.
          </p>
          <div className="space-y-3 py-8">
            <p className="font-sans text-sm sm:text-base text-[#E7DED5]/85 font-light leading-relaxed max-w-xl mx-auto">We create for those who move with purpose,</p>
            <p className="font-sans text-sm sm:text-base text-[#E7DED5]/85 font-light leading-relaxed max-w-xl mx-auto">live with confidence,</p>
            <p className="font-sans text-sm sm:text-base text-[#E7DED5]/85 font-light leading-relaxed max-w-xl mx-auto">and carry strength wherever they go.</p>
          </div>
          <div className="space-y-4 py-12 border-y border-[#E7DED5]/15">
            <p className="font-serif text-2xl sm:text-3xl text-[#E7DED5] leading-relaxed">From strong women.</p>
            <p className="font-serif text-2xl sm:text-3xl text-[#E7DED5] leading-relaxed">From strong men.</p>
            <p className="font-serif text-2xl sm:text-3xl text-[#C8A86A] leading-relaxed italic">For a stronger kind of love.</p>
          </div>
          <div className="space-y-4 pt-8">
            <p className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-[#8E786F]">This is more than what you wear.</p>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#E7DED5] leading-tight">
              This is your <span className="italic text-[#A68B4B]">strength.</span>
            </p>
          </div>
          <div className="pt-16 flex flex-col items-center gap-6">
            <div className="gold-line w-16" />
            <BrandLogo light size="md" />
          </div>
        </div>
      </div>
    </main>
  );
}
