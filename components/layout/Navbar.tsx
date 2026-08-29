'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lightBar = !isHome || scrolled;
  const text = lightBar ? "text-[#4A3D37]" : "text-[#E7DED5]";
  const barBg = lightBar
    ? "bg-[#E7DED5]/95 backdrop-blur-md border-b border-[#8E786F]/15"
    : "bg-transparent";

  return (
    <>
      <header
        className={
          "fixed top-0 w-full z-40 py-4 md:py-5 px-4 sm:px-8 md:px-12 flex justify-between items-center transition-all duration-300 " +
          barBg +
          " " +
          text
        }
      >
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={"lg:hidden p-1 " + text}
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>

        <Link
          href="/"
          className={
            "font-serif text-2xl md:text-3xl tracking-widest text-center lg:text-left " +
            text
          }
        >
          M<br />
          <span className="pl-3 md:pl-4 -mt-2 block">Y</span>
        </Link>

        <nav className="hidden lg:flex space-x-10 text-[10px] tracking-[0.25em] uppercase font-sans">
          <Link href="/pieces" className="hover:text-[#B89DA4] transition">
            Shop
          </Link>
          <Link href="/collections" className="hover:text-[#B89DA4] transition">
            Collections
          </Link>
          <Link href="/our-story" className="hover:text-[#B89DA4] transition">
            The Story
          </Link>
          <Link href="/journal" className="hover:text-[#B89DA4] transition">
            Journal
          </Link>
        </nav>

        <div className="flex items-center space-x-4 sm:space-x-8 text-[10px] tracking-[0.25em] uppercase font-sans">
          <Link href="/archive" className="hidden sm:inline hover:text-[#B89DA4] transition">
            Archive
          </Link>
          <button className="flex items-center gap-1 hover:text-[#B89DA4] transition">
            BAG (0) <span className="text-base font-light leading-none ml-0.5">+</span>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#362A24] text-[#E7DED5] p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-[#8E786F]/30 pb-6">
            <span className="font-serif text-2xl tracking-widest">MAHLET YOSEPH</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 my-auto font-serif text-3xl tracking-wide">
            <Link href="/pieces" onClick={() => setMobileMenuOpen(false)}>
              SHOP ALL
            </Link>
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)}>
              COLLECTIONS
            </Link>
            <Link href="/archive" onClick={() => setMobileMenuOpen(false)}>
              THE ARCHIVE
            </Link>
            <Link href="/our-story" onClick={() => setMobileMenuOpen(false)}>
              OUR STORY
            </Link>
            <Link href="/journal" onClick={() => setMobileMenuOpen(false)}>
              JOURNAL
            </Link>
          </nav>
          <div className="border-t border-[#8E786F]/30 pt-6 text-[10px] tracking-[0.2em] text-[#8E786F] flex justify-between">
            <span>NOT VINTAGE. FORGOTTEN.</span>
            <span>ADDIS ABABA</span>
          </div>
        </div>
      )}
    </>
  );
}
