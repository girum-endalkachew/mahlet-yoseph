const fs = require("fs");
const path = require("path");

// 1. Ensure public/logo folder exists and copy image as fallback safeguard
const srcPath = path.join(__dirname, "public", "images", "logo", "mylogo.jpg");
const fallbackDir = path.join(__dirname, "public", "logo");
const fallbackPath = path.join(fallbackDir, "mylogo.jpg");

if (fs.existsSync(srcPath)) {
  if (!fs.existsSync(fallbackDir)) {
    fs.mkdirSync(fallbackDir, { recursive: true });
  }
  fs.copyFileSync(srcPath, fallbackPath);
  console.log("✅ Copied logo to public/logo/mylogo.jpg for fallback!");
}

// 2. Update BrandLogo component to use /images/logo/mylogo.jpg
const brandLogoCode = `'use client';

import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  light?: boolean;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export default function BrandLogo({
  light = false,
  size = "md",
  showTagline = true,
  className = "",
}: BrandLogoProps) {
  const logoSizes = {
    sm: "w-7 h-7",
    md: "w-10 h-10 md:w-12 md:h-12",
    lg: "w-16 h-16 md:w-20 md:h-20",
  };

  const titleSizes = {
    sm: "text-xs tracking-[0.25em]",
    md: "text-sm md:text-base tracking-[0.28em]",
    lg: "text-xl md:text-2xl tracking-[0.32em]",
  };

  const taglineSizes = {
    sm: "text-[7px] tracking-[0.35em]",
    md: "text-[8px] md:text-[9px] tracking-[0.4em]",
    lg: "text-[10px] md:text-[11px] tracking-[0.45em]",
  };

  const textColor = light ? "text-[#E7DED5]" : "text-[#4A3D37]";
  const subtextColor = light ? "text-[#C8A86A]" : "text-[#8E786F]";

  return (
    <Link href="/" className={"group inline-flex items-center gap-3 " + className}>
      <div className={"relative shrink-0 " + logoSizes[size]}>
        <Image
          src="/images/logo/mylogo.jpg"
          alt="MAHLET YOSEPH Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className={"font-serif font-medium leading-none uppercase transition-colors group-hover:text-[#B89DA4] " + textColor + " " + titleSizes[size]}>
          MAHLET YOSEPH
        </span>
        {showTagline && (
          <span className={"font-sans uppercase mt-1 opacity-80 " + subtextColor + " " + taglineSizes[size]}>
            THE ART OF STRENGTH
          </span>
        )}
      </div>
    </Link>
  );
}
`;

fs.writeFileSync(path.join(__dirname, "components", "ui", "BrandLogo.tsx"), brandLogoCode, "utf8");
console.log("✅ BrandLogo.tsx path updated to /images/logo/mylogo.jpg!");
