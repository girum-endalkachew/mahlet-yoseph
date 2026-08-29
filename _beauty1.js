const fs = require("fs");
const path = require("path");

fs.writeFileSync(path.join(__dirname, "app", "globals.css"), `@import "tailwindcss";

:root {
  --cream: #E7DED5;
  --cream-soft: #F5EFE6;
  --taupe: #8E786F;
  --dark: #4A3D37;
  --ink: #362A24;
  --pink: #B89DA4;
  --gold: #C8A86A;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--cream);
  color: var(--dark);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--pink);
  color: var(--cream);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair), serif;
  font-weight: 400;
  letter-spacing: -0.02em;
}

/* Hide carousel scrollbars */
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Elegant thin scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--gold) 70%, transparent);
  border-radius: 99px;
}
::-webkit-scrollbar-thumb:hover { background: var(--taupe); }

/* Image reveal */
.img-reveal {
  overflow: hidden;
}
.img-reveal img {
  transition: transform 1.1s var(--ease-out), opacity 0.6s ease;
}
.group:hover .img-reveal img,
.img-reveal:hover img {
  transform: scale(1.06);
}

/* Soft gold line accent */
.gold-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

/* Film grain (very subtle) */
.grain::after {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  z-index: 2;
}

/* Link underline grow */
.link-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0% 1px;
  transition: background-size 0.4s var(--ease-out);
}
.link-underline:hover {
  background-size: 100% 1px;
}

/* Focus rings for accessibility */
:focus-visible {
  outline: 1px solid var(--gold);
  outline-offset: 3px;
}
`, "utf8");

console.log("✅ globals.css beauty tokens applied");
