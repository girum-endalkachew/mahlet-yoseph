'use client';

import Link from 'next/link';

const steps = [
  { label: "RAW MATERIAL", sub: "Cotton" },
  { label: "TEXTILE", sub: "Yarn" },
  { label: "SKETCH", sub: "Design" },
  { label: "FORM", sub: "Prototype" },
  { label: "FINAL PIECE", sub: "MAHLET YOSEPH" }
];

export default function RootToForm() {
  return (
    <div className="bg-[#F5EFE6] rounded-3xl border border-[#8E786F]/20 p-8 flex flex-col justify-between shadow-sm h-full">
      <div>
        <h2 className="font-serif text-3xl text-[#4A3D37] mb-8 leading-tight">
          FROM ROOT <br /> TO FORM.
        </h2>

        {/* Timeline */}
        <div className="space-y-6 relative pl-4 border-l border-[#8E786F]/20">
          {steps.map((step) => (
            <div key={step.label} className="relative pl-6">
              <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#8E786F]" />
              <h4 className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4A3D37]">
                {step.label}
              </h4>
              <p className="text-xs text-[#8E786F] font-sans">{step.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 space-y-2 border-t border-[#8E786F]/15 mt-8">
        <p className="text-xs text-[#8E786F] font-sans">Every piece begins somewhere.</p>
        <Link 
          href="/our-story"
          className="inline-block text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#4A3D37] hover:text-[#B89DA4] transition-colors"
        >
          OUR STORY →
        </Link>
      </div>
    </div>
  );
}
