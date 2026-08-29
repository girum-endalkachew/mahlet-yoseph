'use client';

import BallerinaSpin from "@/components/ui/BallerinaSpin";

export default function Featured3DProduct() {
  return (
    <section className="w-full">
      <BallerinaSpin
        imageSrc="/images/products/capri-track-pant.jpg"
        title="Capri Track Pant — Signature Silhouette"
        autoSpinDuration={18}
      />
    </section>
  );
}
