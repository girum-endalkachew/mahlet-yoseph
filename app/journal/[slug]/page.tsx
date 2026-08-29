import Image from "next/image";
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
