export type JournalPost = {
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
