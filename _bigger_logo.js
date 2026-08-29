const fs = require("fs");
const path = require("path");

const code = `'use client';

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
// Bigger on mobile so the lockup reads clearly on phones
const iconBox = {
sm: "w-10 h-10",
md: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
lg: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24",
}[size];

const wordBox = {
sm: "h-9 w-[140px] sm:h-10 sm:w-[160px]",
md: "h-11 w-[170px] sm:h-12 sm:w-[200px] md:h-14 md:w-[240px]",
lg: "h-14 w-[200px] sm:h-16 sm:w-[240px] md:h-20 md:w-[300px]",
}[size];

return (
<Link
href="/"
className={"group inline-flex items-center gap-2 sm:gap-3 " + className}
>
<div className={"relative shrink-0 " + iconBox}>
<Image src="/images/logo/mylogo.jpg" alt="" fill priority className="object-contain" sizes="96px" />
</div>
<div className={"relative shrink-0 " + wordBox}>
<Image src="/images/logo/mylogo2.jpg" alt="MAHLET YOSEPH — The Art of Strength" fill priority className="object-contain object-left" sizes="300px" />
</div>
</Link>
);
}
`;

fs.writeFileSync(
path.join(__dirname, "components", "ui", "BrandLogo.tsx"),
code,
"utf8"
);

// Slightly taller navbar so bigger logo fits on phone
const navPath = path.join(__dirname, "components", "layout", "Navbar.tsx");
let nav = fs.readFileSync(navPath, "utf8");
nav = nav.replace(
/h-16 md:h-20/g,
"h-[4.5rem] sm:h-20 md:h-[5.25rem]"
);
fs.writeFileSync(navPath, nav, "utf8");

console.log("✅ Logo bigger on mobile + desktop; navbar height increased slightly");
