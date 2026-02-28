import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "ONYX DRIVE PARIS | Chauffeur VTC Premium 100% Électrique",
  description: "L'excellence du transport de luxe 100% électrique à Paris. Transferts aéroports CDG/Orly, Disneyland, Fashion Week et prestations sur mesure en Mercedes EQV.",
  keywords: ["Onyx Drive Paris", "VTC Electrique Paris", "Mercedes EQV Paris", "Chauffeur Privé Paris", "Transfert Aéroport Luxe"],
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
