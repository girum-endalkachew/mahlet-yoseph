export type Product = {
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
