'use client';

import Product360Viewer from "@/components/ui/Product360Viewer";

export default function Featured3DProduct() {
  return (
    <section className="w-full">
      <Product360Viewer
        imageSrc="/images/products/capri-track-pant.jpg"
        title="Capri Track Pant — Signature Silhouette"
      />
    </section>
  );
}
