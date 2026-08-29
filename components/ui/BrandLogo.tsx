'use client';

import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  light?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BrandLogo({
  size = "md",
  className = "",
}: BrandLogoProps) {
  const iconBox = {
    sm: "w-9 h-9",
    md: "w-12 h-12 md:w-14 md:h-14",
    lg: "w-16 h-16 md:w-20 md:h-20",
  }[size];

  const wordBox = {
    sm: "h-8 w-[130px]",
    md: "h-10 md:h-12 w-[160px] md:w-[200px]",
    lg: "h-14 md:h-16 w-[200px] md:w-[260px]",
  }[size];

  return (
    <Link href="/" className={"group inline-flex items-center gap-2.5 md:gap-3 " + className}>
      <div className={"relative shrink-0 " + iconBox}>
        <Image
          src="/images/logo/mylogo.jpg"
          alt=""
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className={"relative shrink-0 " + wordBox}>
        <Image
          src="/images/logo/mylogo2.jpg"
          alt="MAHLET YOSEPH — The Art of Strength"
          fill
          priority
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}
