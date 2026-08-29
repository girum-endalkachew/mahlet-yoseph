import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { ClientProviders } from "@/components/providers/ClientProviders";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MAHLET YOSEPH | Fashion House",
  description: "The Art of Strength. Forgotten silhouettes. Reimagined for movement.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={
          playfair.variable +
          " " +
          montserrat.variable +
          " font-sans bg-[#E7DED5] text-[#4A3D37] antialiased min-h-screen"
        }
      >
        <ClientProviders>
          <Navbar />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
