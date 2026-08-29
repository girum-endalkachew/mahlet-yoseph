import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Journal | MAHLET YOSEPH",
  description: "Fashion stories, process, and collection notes.",
};

const posts = [
  {
    slug: "from-root-to-form",
    cat: "Process",
    title: "From Root to Form",
    excerpt: "How a forgotten silhouette becomes a new piece.",
  },
  {
    slug: "return-of-capri-pants",
    cat: "Fashion",
    title: "The Return of Capri Pants",
    excerpt: "The silhouette everyone forgot — and why it matters again.",
  },
  {
    slug: "sports-club-1998",
    cat: "Collection",
    title: "Sports Club, 1998",
    excerpt: "Why old athletic uniforms still feel modern.",
  },
];

export default function JournalPage() {
  return (
    <main className="bg-[#E7DED5] text-[#4A3D37] min-h-screen pt-28 pb-20">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#8E786F]">
          Journal
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl mt-4 mb-16">
          STORIES FROM<br />THE ARCHIVE.
        </h1>

        <div className="space-y-0">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-t border-[#8E786F]/25 py-10 md:py-14 group"
            >
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8E786F]">
                {post.cat}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl mt-3 group-hover:text-[#B89DA4] transition">
                {post.title}
              </h2>
              <p className="mt-4 text-[#8E786F] font-light max-w-xl">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 mt-6 text-[10px] tracking-[0.2em] uppercase">
                Read Story <ArrowRight size={12} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
