import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "ONYX PLATINUM | Chauffeur VTC Van Mercedes EQV Paris & 95",
  description: "Le leader du transport de luxe 100% électrique à Cormeilles-en-Parisis. Transferts aéroports CDG/Orly, Disneyland et mise à disposition VIP.",
  keywords: ["VTC Cormeilles-en-Parisis", "Van Luxe Paris", "Mercedes EQV", "Transfert CDG", "Chauffeur Privé 95"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
