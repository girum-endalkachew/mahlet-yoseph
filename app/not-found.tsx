import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#E7DED5] text-[#4A3D37] flex flex-col items-center justify-center px-6 text-center pt-20">
      <h1 className="font-serif text-6xl md:text-8xl">404</h1>
      <p className="mt-4 text-[#8E786F] tracking-widest uppercase text-xs">
        This piece was forgotten
      </p>
      <Link
        href="/"
        className="mt-10 text-[11px] tracking-[0.25em] uppercase border-b border-[#4A3D37] pb-1 hover:text-[#B89DA4] hover:border-[#B89DA4]"
      >
        Return Home
      </Link>
    </main>
  );
}
