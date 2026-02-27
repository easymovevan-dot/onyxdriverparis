"use client";

import { motion } from "framer-motion";
import { ChevronRight, MapPin, Shield, Zap } from "lucide-react";
import Link from "next/link";
import PricingCalculator from "@/components/PricingCalculator";

export default function LocalSiloPage() {
    return (
        <main className="min-h-screen bg-white font-sans text-foreground">
            {/* Mini Nav Apple style */}
            <nav className="sticky top-0 z-50 glass border-b border-black/5 py-3 px-6">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-[13px] font-semibold tracking-tight hover:opacity-70 transition-opacity uppercase">ONYX DRIVE</Link>
                    <div className="flex items-center gap-6">
                        <span className="hidden md:block text-[11px] text-onyx-grey uppercase tracking-widest font-bold">Cormeilles Edition</span>
                        <a href="tel:+33602565680" className="nav-button">Appeler</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section Local */}
            <section className="pt-24 pb-32 px-6 max-w-7xl mx-auto text-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <h1 className="apple-headline mb-4">Cormeilles-en-Parisis.</h1>
                    <p className="apple-subheadline text-onyx-grey mb-20">Le VTC local, l'exigence globale.</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-20 items-start text-left">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold">Une présence affirmée.</h3>
                            <p className="text-[19px] text-onyx-grey leading-relaxed">Basé à Cormeilles, nous connaissons chaque raccourci, chaque axe stratégique du 95. Nous sommes là quand les autres ne le sont plus.</p>
                        </div>
                        <div className="space-y-6 pt-6 border-t border-black/5">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-onyx-ice rounded-2xl flex items-center justify-center">
                                    <Zap className="text-onyx-blue" size={28} />
                                </div>
                                <span className="text-[19px] font-semibold">Électrique & Silencieux</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-onyx-ice rounded-2xl flex items-center justify-center">
                                    <Shield className="text-onyx-blue" size={28} />
                                </div>
                                <span className="text-[19px] font-semibold">Sécurité Certifiée</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#fafafa] p-6 rounded-[40px] shadow-sm">
                        <PricingCalculator />
                    </div>
                </div>
            </section>

            {/* Narrative Section */}
            <section className="bg-black text-white py-32 overflow-hidden">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">Plus qu'un trajet. Une transition.</h2>
                    <div className="grid md:grid-cols-2 gap-16 text-onyx-grey text-[19px] leading-relaxed">
                        <p>Habiter <span className="text-white">Cormeilles-en-Parisis</span> exige une ponctualité sans faille, surtout pour ces départs matinaux à 4h00 vers Roissy. C'est notre spécialité.</p>
                        <p>Dans le confort feutré de notre <span className="text-white">Mercedes EQV</span>, les bouchons de l'A15 ne sont plus un obstacle, mais un moment privilégié pour vous préparer ou vous reposer.</p>
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center text-onyx-grey text-[12px] font-medium uppercase tracking-[0.3em]">
                © 2026 ONYX DRIVE • CORMEILLES EDITION
            </footer>
        </main>
    );
}
