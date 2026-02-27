"use client";

import { motion } from "framer-motion";
import { Plane, ChevronRight, Star, Globe } from "lucide-react";
import Link from "next/link";
import PricingCalculator from "@/components/PricingCalculator";

export default function AirportSilo() {
    return (
        <main className="min-h-screen bg-white">
            {/* Mini Nav */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-black/5 h-12 flex items-center justify-center px-4">
                <div className="max-w-5xl w-full flex justify-between items-center text-[12px] font-medium">
                    <Link href="/" className="font-semibold tracking-tight text-sm">ONYX DRIVE</Link>
                    <div className="flex gap-8 text-onyx-grey">
                        <Link href="/vtc-cormeilles-en-parisis" className="hover:text-black transition-colors">Local</Link>
                        <Link href="/vtc-business-paris" className="hover:text-black transition-colors">Business</Link>
                    </div>
                    <a href="tel:+33602565680" className="text-onyx-blue font-bold">Appeler</a>
                </div>
            </nav>

            {/* Hero Section Airport */}
            <section className="pt-24 pb-12 px-6">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="apple-headline mb-4">Voyagez en première <br />avant même de décoller.</h1>
                        <p className="apple-subheadline text-onyx-grey">Transferts CDG & Orly. Ponctualité absolue.</p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-4 max-w-[2000px] mx-auto px-4">
                    {/* Card: Meet & Greet */}
                    <div className="bg-[#f5f5f7] rounded-[40px] p-12 md:p-20 flex flex-col justify-between h-[500px] md:h-[700px] overflow-hidden group">
                        <div className="relative z-10">
                            <span className="text-onyx-grey font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Meet & Greet</span>
                            <h3 className="text-3xl md:text-5xl font-bold mb-6">Accueil personnalisé à la sortie des bagages.</h3>
                            <p className="text-[19px] text-onyx-grey max-w-sm">Oubliez les files d'attente. Votre chauffeur vous attend avec une pancarte dès votre arrivée.</p>
                        </div>
                        <div className="relative h-40 bg-white/50 rounded-2xl border border-black/5 backdrop-blur-sm flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-transform duration-700">
                            <Plane size={64} className="text-onyx-blue opacity-50" />
                        </div>
                    </div>

                    {/* Calculator Integrated */}
                    <div className="bg-white border-2 border-onyx-ice rounded-[40px] p-8 md:p-12 flex flex-col justify-center items-center h-[500px] md:h-[700px]">
                        <h3 className="text-[28px] font-semibold mb-10">Estimez votre trajet.</h3>
                        <PricingCalculator />
                    </div>
                </div>
            </section>

            {/* Features Grid like Apple */}
            <section className="py-24 px-6 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-16 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-onyx-ice rounded-[20px] flex items-center justify-center mx-auto">
                            <Globe className="text-onyx-blue" size={28} />
                        </div>
                        <h4 className="text-[21px] font-semibold">Suivi de Vol</h4>
                        <p className="text-sm text-onyx-grey leading-relaxed">Nous ajustons l'heure de prise en charge gratuitement en cas de retard de votre vol.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-onyx-ice rounded-[20px] flex items-center justify-center mx-auto">
                            <Star className="text-onyx-blue" size={28} />
                        </div>
                        <h4 className="text-[21px] font-semibold">Prestige EQV</h4>
                        <p className="text-sm text-onyx-grey leading-relaxed">Voyagez dans le dernier né de la gamme Mercedes 100% électrique. Silence royal.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-onyx-ice rounded-[20px] flex items-center justify-center mx-auto">
                            <Plane className="text-onyx-blue" size={28} />
                        </div>
                        <h4 className="text-[21px] font-semibold">Forfaits Fixes</h4>
                        <p className="text-sm text-onyx-grey leading-relaxed">Aucun supplément bagages ou attente. Des forfaits clairs dès la réservation.</p>
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center border-t border-black/5 mt-20">
                <p className="text-[12px] font-bold tracking-widest text-onyx-grey uppercase underline cursor-pointer hover:text-black transition-all">Retourner à l'accueil</p>
            </footer>
        </main>
    );
}
