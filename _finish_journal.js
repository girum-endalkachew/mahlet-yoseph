const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const full = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("✅", filePath);
}

// ===== JOURNAL DATA =====
write("lib/journal.ts", `export type JournalPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  cover: string;
  content: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "from-root-to-form",
    category: "Process",
    title: "From Root to Form",
    excerpt: "How a forgotten silhouette becomes a new piece — from cotton to garment, memory to movement.",
    date: "March 2026",
    readTime: "4 min",
    cover: "/images/hero/hero-main.jpg",
    content: [
      "Every piece at Mahlet Yoseph begins somewhere quiet. Not in a trend report. Not in a season calendar. In memory — a silhouette that stayed with us long after the conversation moved on.",
      "From root to form is our creation line. Cotton from soil. Yarn drawn with intention. A sketch pulled from the archive. A prototype shaped by hand. Then the final garment — cut for the body that moves now.",
      "We do not rush this path. Strength in clothing is not only stretch or performance. It is the courage of a line that was almost forgotten, brought forward with precision.",
      "The capri track pant did not return because it was loud. It returned because it was true. Not quite leggings. Not quite trousers. A strange, beautiful middle that still knows how to move.",
      "This is how we work: remember, reimagine, release. From root to form. From memory to movement.",
    ],
  },
  {
    slug: "return-of-capri-pants",
    category: "Fashion",
    title: "The Return of Capri Pants",
    excerpt: "The silhouette everyone forgot — and why it matters again for bodies that move with purpose.",
    date: "February 2026",
    readTime: "5 min",
    cover: "/images/products/capri-track-pant.jpg",
    content: [
      "Capri track pants disappeared quietly. They were never the loudest piece in the gym bag. They simply stopped being talked about.",
      "Not quite leggings. Not quite trousers. A length that sat between memory and function — ankle-baring, stripe-sided, ready for warm-ups and walk-outs alike.",
      "We brought them back because strength is more than what the body can do. Strength is also what we choose to wear when we begin again, keep going, become, and rise.",
      "Our capri is loose nylon energy with structure. Side stripes. A tiny logo. A silhouette reimagined for modern movement — not costume, not nostalgia, living form.",
      "The return of the capri is not a trend cycle. It is an invitation: wear what was forgotten, and move differently.",
    ],
  },
  {
    slug: "sports-club-1998",
    category: "Collection",
    title: "Sports Club, 1998",
    excerpt: "Why old athletic uniforms still feel modern — tennis polos, pleated skirts, and the quiet power of the club.",
    date: "January 2026",
    readTime: "4 min",
    cover: "/images/collections/90s-sports-club.jpg",
    content: [
      "There is a photograph that never ages: white lines on a court, a pleated skirt in motion, a polo fitted close to the ribs, a jacket waiting on the bench.",
      "Sports Club, 1998 is that feeling made wearable again. Tennis polos. Rugby stripes. Contrast piping. Pieces that belonged to presence as much as performance.",
      "Old athletic uniforms still feel modern because they were built for belonging. The club was never only a place — it was a way of carrying yourself.",
      "We reimagine those silhouettes without turning them into costume. Butter yellow. Burgundy. Chocolate. Cream. Colors the archive whispered and we answered.",
      "Enter the era. The club never closed. It waited.",
    ],
  },
  {
    slug: "wear-your-strength",
    category: "Philosophy",
    title: "Wear Your Strength",
    excerpt: "We believe strength begins beyond ourselves — and what that means for everything we make.",
    date: "March 2026",
    readTime: "3 min",
    cover: "/images/philosophy/bg.jpg",
    content: [
      "We believe strength begins beyond ourselves.",
      "It is the courage to begin, the confidence to keep going, the beauty of becoming, and the power to rise again.",
      "Because strength is more than what the body can do.",
      "We create for those who move with purpose, live with confidence, and carry strength wherever they go.",
      "From strong women. From strong men. For a stronger kind of love.",
      "This is more than what you wear. This is your strength.",
    ],
  },
  {
    slug: "forgotten-not-vintage",
    category: "Brand",
    title: "Not Vintage. Forgotten.",
    excerpt: "Why we refuse the word vintage — and what it means to bring a silhouette forward instead of backward.",
    date: "December 2025",
    readTime: "4 min",
    cover: "/images/collections/forgotten-gym-bag.jpg",
    content: [
      "Vintage looks back. Forgotten waits to be found.",
      "We do not dress you in the past. We return silhouettes that disappeared from the conversation — and cut them for the life you live now.",
      "The gym bag held strange, beautiful forms: stirrup leggings, warm-up jackets, tear-aways, mesh, parachute nylon. Performance culture moved on. Memory did not.",
      "Not vintage means we are not collecting dust. We are continuing a line of strength — from cotton to cloth, from archive to body.",
      "When you wear Mahlet Yoseph, you are not wearing a costume of another decade. You are wearing a form that was worth remembering.",
    ],
  },
  {
    slug: "sunday-morning-athlete",
    category: "Collection",
    title: "Sunday Morning Athlete",
    excerpt: "Quiet strength. Soft motion. The inherited ease of oversized track pants and a washed sweatshirt.",
    date: "November 2025",
    readTime: "3 min",
    cover: "/images/collections/sunday-morning-athlete.jpg",
    content: [
      "Strength is not always loud. Sometimes it moves quietly — on Sunday mornings, in clothes that feel like rest and readiness at once.",
      "Sunday Morning Athlete is oversized track pants, a vintage washed sweatshirt, a light windbreaker, old-school ease. Inherited strength without spectacle.",
      "We built this world for the in-between: after the long week, before the next beginning. Soft fibers. Generous cuts. Motion without urgency.",
      "Wear it to walk. Wear it to stretch. Wear it to remember that confidence can be calm.",
      "This is strength you carry home.",
    ],
  },
];

export function getPost(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  return journalPosts.filter((p) => p.slug !== slug).slice(0, limit);
}
`);

// ===== JOURNAL INDEX =====
write("app/journal/page.tsx", `import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { journalPosts } from "@/lib/journal";

export const metadata = {
  title: "Journal | MAHLET YOSEPH",
  description: "Stories from the archive — process, fashion, philosophy, and collection notes.",
};

export default function JournalPage() {
  const featured = journalPosts[0];
  const rest = journalPosts.slice(1);

  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-28 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="flex items-center gap-2 text-[#C8A86A] mb-4">
            <Sparkles size={12} className="fill-[#C8A86A]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#8E786F]">
              Journal
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.95]">
            STORIES FROM<br />
            <span className="italic text-[#8E786F]">THE ARCHIVE.</span>
          </h1>
          <p className="mt-6 text-[#8E786F] font-light text-base md:text-lg max-w-xl leading-relaxed">
            Process notes, collection worlds, and the philosophy behind every silhouette we bring forward.
          </p>
        </div>

        {/* Featured Story */}
        <Link
          href={"/journal/" + featured.slug}
          className="group grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 border border-[#8E786F]/20 overflow-hidden bg-[#F5EFE6] hover:border-[#8E786F]/40 transition-all"
        >
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] bg-[#5C4D45]">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#362A24]/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#362A24]/20" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C8A86A]">
              Featured · {featured.category}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-3 group-hover:text-[#B89DA4] transition-colors leading-tight">
              {featured.title}
            </h2>
            <p className="mt-4 text-[#8E786F] font-light leading-relaxed max-w-md">
              {featured.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-[#8E786F]">
              <span>{featured.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#C8A86A]" />
              <span>{featured.readTime}</span>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-semibold text-[#4A3D37] group-hover:text-[#B89DA4] transition">
              Read Story <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Category filter labels (visual only) */}
        <div className="flex flex-wrap gap-2 mb-12 text-[10px] tracking-[0.2em] uppercase">
          <span className="px-4 py-2 bg-[#4A3D37] text-[#E7DED5]">All</span>
          {["Process", "Fashion", "Collection", "Philosophy", "Brand"].map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 border border-[#8E786F]/30 text-[#8E786F]"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={"/journal/" + post.slug}
              className="group block border border-[#8E786F]/15 bg-[#F5EFE6] hover:border-[#8E786F]/40 transition-all overflow-hidden"
            >
              <div className="relative aspect-[16/10] bg-[#DED5CD] overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center text-[9px] tracking-[0.25em] uppercase text-[#8E786F]">
                  <span className="text-[#C8A86A]">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl text-[#4A3D37] group-hover:text-[#B89DA4] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-[#8E786F] font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="pt-3 flex justify-between items-center border-t border-[#8E786F]/15 text-[10px] tracking-[0.2em] uppercase">
                  <span className="text-[#8E786F]">{post.date}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#4A3D37] group-hover:text-[#B89DA4]">
                    Read <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Philosophy CTA */}
        <section className="mt-24 py-16 border-t border-[#8E786F]/20 text-center max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C8A86A]">
            Our Belief
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl mt-4 text-[#4A3D37]">
            Wear Your Strength.
          </h2>
          <p className="mt-4 text-[#8E786F] font-light">
            Strength begins beyond ourselves.
          </p>
          <Link
            href="/philosophy"
            className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase border border-[#4A3D37] px-6 py-3 hover:bg-[#4A3D37] hover:text-[#E7DED5] transition"
          >
            Read Philosophy <ArrowRight size={12} />
          </Link>
        </section>
      </div>
    </main>
  );
}
`);

// ===== JOURNAL ARTICLE PAGE =====
write("app/journal/[slug]/page.tsx", `import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { journalPosts, getPost, getRelatedPosts } from "@/lib/journal";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Journal | MAHLET YOSEPH" };
  return {
    title: post.title + " | Journal | MAHLET YOSEPH",
    description: post.excerpt,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[380px] bg-[#5C4D45]">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          className="object-cover opacity-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#362A24] via-[#362A24]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-[#E7DED5] max-w-[1100px] mx-auto">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#B89DA4] hover:text-[#E7DED5] transition mb-6"
          >
            <ArrowLeft size={12} /> Journal
          </Link>
          <div className="flex items-center gap-2 text-[#C8A86A] mb-3">
            <Sparkles size={11} className="fill-[#C8A86A]" />
            <span className="text-[10px] tracking-[0.3em] uppercase">
              {post.category}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight max-w-3xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-[#E7DED5]/70">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#C8A86A]" />
            <span>{post.readTime} read</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-[720px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="font-serif text-xl sm:text-2xl text-[#8E786F] italic leading-relaxed border-b border-[#8E786F]/20 pb-10 mb-10">
          {post.excerpt}
        </p>

        <div className="space-y-8">
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-serif text-xl sm:text-2xl text-[#4A3D37] leading-relaxed"
                  : "font-sans text-base sm:text-lg text-[#4A3D37]/90 font-light leading-relaxed"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Closing mark */}
        <div className="mt-16 pt-10 border-t border-[#8E786F]/20 text-center space-y-3">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C8A86A]">
            Mahlet Yoseph
          </p>
          <p className="font-serif text-lg italic text-[#8E786F]">
            The Art of Strength
          </p>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-[#8E786F]/20 bg-[#F5EFE6] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-serif text-2xl md:text-3xl">Continue Reading</h2>
            <Link
              href="/journal"
              className="text-[10px] tracking-[0.25em] uppercase flex items-center gap-2 hover:text-[#B89DA4]"
            >
              All Stories <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={"/journal/" + p.slug}
                className="group block"
              >
                <div className="relative aspect-[16/10] bg-[#DED5CD] mb-4 overflow-hidden border border-[#8E786F]/15">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="33vw"
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#C8A86A]">
                  {p.category}
                </span>
                <h3 className="font-serif text-xl mt-1 group-hover:text-[#B89DA4] transition">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy link */}
      <section className="py-16 text-center px-6">
        <p className="font-serif text-2xl text-[#4A3D37]">Wear Your Strength.</p>
        <Link
          href="/philosophy"
          className="mt-6 inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase border border-[#4A3D37] px-6 py-3 hover:bg-[#4A3D37] hover:text-[#E7DED5] transition"
        >
          Read Philosophy <ArrowRight size={12} />
        </Link>
      </section>
    </main>
  );
}
`);

console.log("\\n🎉 Journal complete!");
console.log("  /journal — index with featured + grid");
console.log("  /journal/from-root-to-form");
console.log("  /journal/return-of-capri-pants");
console.log("  /journal/sports-club-1998");
console.log("  /journal/wear-your-strength");
console.log("  /journal/forgotten-not-vintage");
console.log("  /journal/sunday-morning-athlete");
