import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#E7DED5] border-t border-[#8E786F]/20 text-[#4A3D37] pt-16 pb-12 px-6 md:px-12 font-sans">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-16 border-b border-[#8E786F]/20">
        {/* Brand Info */}
        <div className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-[#C8A86A] mb-2">
              <Sparkles size={14} className="fill-[#C8A86A]" />
              <span className="font-serif text-xl tracking-[0.2em] text-[#4A3D37] font-semibold">
                MAHLET YOSEPH
              </span>
            </div>
            <p className="text-[10px] tracking-[0.3em] text-[#8E786F] uppercase">
              THE ART OF STRENGTH
            </p>
          </div>
          <p className="text-xs text-[#8E786F] mt-6 leading-relaxed">
            Forgotten silhouettes. <br /> Reimagined for movement.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#4A3D37] mb-4">Shop</h4>
          <ul className="space-y-2.5 text-xs text-[#8E786F]">
            <li><Link href="/collections" className="hover:text-[#4A3D37] transition-colors">Collections</Link></li>
            <li><Link href="/archive" className="hover:text-[#4A3D37] transition-colors">Archive</Link></li>
            <li><Link href="/pieces" className="hover:text-[#4A3D37] transition-colors">New Arrivals</Link></li>
            <li><Link href="/pieces" className="hover:text-[#4A3D37] transition-colors">The Pieces</Link></li>
          </ul>
        </div>

        {/* About Links */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#4A3D37] mb-4">About</h4>
          <ul className="space-y-2.5 text-xs text-[#8E786F]">
            <li><Link href="/our-story" className="hover:text-[#4A3D37] transition-colors">Our Story</Link></li>
            <li><Link href="/materials" className="hover:text-[#4A3D37] transition-colors">Materials</Link></li>
            <li><Link href="/craftsmanship" className="hover:text-[#4A3D37] transition-colors">Craftsmanship</Link></li>
            <li><Link href="/journal" className="hover:text-[#4A3D37] transition-colors">Journal</Link></li>
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#4A3D37] mb-4">Help</h4>
          <ul className="space-y-2.5 text-xs text-[#8E786F]">
            <li><a href="#" className="hover:text-[#4A3D37] transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-[#4A3D37] transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-[#4A3D37] transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-[#4A3D37] transition-colors">Size Guide</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#4A3D37] mb-4">Contact</h4>
          <ul className="space-y-2.5 text-xs text-[#8E786F]">
            <li>hello@mahletyoseph.com</li>
            <li>+251 90 123 4567</li>
            <li>Addis Ababa, Ethiopia</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#4A3D37] mb-4">Stay Connected</h4>
          <div className="relative mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border-b border-[#8E786F]/40 pb-2 text-xs text-[#4A3D37] placeholder-[#8E786F]/60 focus:outline-none focus:border-[#4A3D37] transition-colors"
            />
            <button aria-label="Subscribe" className="absolute right-0 top-0 text-[#4A3D37] hover:text-[#B89DA4] transition-colors">
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="flex space-x-4 text-xs text-[#8E786F]">
            <a href="#" className="hover:text-[#4A3D37]">Instagram</a>
            <a href="#" className="hover:text-[#4A3D37]">TikTok</a>
            <a href="#" className="hover:text-[#4A3D37]">Pinterest</a>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-[#8E786F] uppercase">
        <span>© {new Date().getFullYear()} MAHLET YOSEPH. ALL RIGHTS RESERVED.</span>
        <span className="mt-2 sm:mt-0 font-serif lowercase italic text-xs">the art of strength</span>
      </div>
    </footer>
  );
}
