"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight, ShieldCheck, Clock, Coffee } from "lucide-react";
import Link from "next/link";

export default function BusinessSilo() {
    return (
        <main className="min-h-screen bg-[#000000] text-white">
            {/* Mini Nav Dark Mode */}
            <nav className="fixed top-0 w-full z-50 dark-glass border-b border-white/10 h-12 flex items-center justify-center px-4">
                <div className="max-w-5xl w-full flex justify-between items-center text-[12px] font-medium">
                    <Link href="/" className="font-semibold tracking-tight text-sm">ONYX DRIVE</Link>
                    <div className="flex gap-8 text-onyx-grey">
                        <Link href="/vtc-cormeilles-en-parisis" className="hover:text-white transition-colors">Local</Link>
                        <Link href="/transfert-aeroport-paris" className="hover:text-white transition-colors">Aéroports</Link>
                    </div>
                    <a href="tel:+33602565680" className="text-white border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/10 transition-all font-semibold">Devis Pro</a>
                </div>
            </nav>

            {/* Hero Section Business */}
            <section className="pt-40 pb-20 px-6 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                    <h1 className="apple-headline mb-4">Onyx Business.</h1>
                    <p className="apple-subheadline text-onyx-grey mb-12">Professionnel. Privé. Permanent.</p>
                </motion.div>

                {/* Full Width Image Space (Simulated) */}
                <div className="max-w-7xl mx-auto h-[400px] md:h-[600px] bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center group overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="z-10 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Mise à disposition.</h2>
                        <p className="text-xl text-onyx-grey max-w-lg mx-auto mb-8">Votre chauffeur dédié pour vos roadshows, séminaires et événements VIP à Paris.</p>
                        <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">Demander un partenariat</button>
                    </div>
                </div>
            </section>

            {/* Features Grid like Apple Pro */}
            <section className="py-32 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-16">
                <div className="space-y-4">
                    <ShieldCheck className="text-white mb-6" size={40} />
                    <h4 className="text-[21px] font-semibold">Confidentialité</h4>
                    <p className="text-sm text-onyx-grey leading-relaxed">Chauffeurs formés à la discrétion totale. Vos échanges en cabine restent strictement confidentiels.</p>
                </div>
                <div className="space-y-4">
                    <Clock className="text-white mb-6" size={40} />
                    <h4 className="text-[21px] font-semibold">Réactivité</h4>
                    <p className="text-sm text-onyx-grey leading-relaxed">Modification d'itinéraire en temps réel et flexibilité horaire pour vos rendez-vous imprévus.</p>
                </div>
                <div className="space-y-4">
                    <Coffee className="text-white mb-6" size={40} />
                    <h4 className="text-[21px] font-semibold">Prestation Elite</h4>
                    <p className="text-sm text-onyx-grey leading-relaxed">Bouteille d'eau, Wi-Fi 5G, chargeurs toutes marques et presse à disposition.</p>
                </div>
            </section>

            {/* Narrative Section Pro */}
            <section className="bg-white text-black py-32 rounded-t-[60px]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">Une extension de <br />votre cabinet.</h2>
                    <p className="text-xl md:text-2xl text-onyx-grey leading-relaxed">
                        Le silence de l'EQV permet des calls et des réunions de travail en toute sérénité. Nous ne transportons pas seulement des passagers, nous facilitons votre productivité.
                    </p>
                    <div className="mt-16 flex justify-center">
                        <a href="https://wa.me/33602565680" className="apple-link text-[21px]">Contacter notre pôle Business <ChevronRight size={20} /></a>
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center text-onyx-grey text-[12px] bg-white border-t border-black/5">
                ONYX DRIVE • CORPORATE DIVISION • PARIS 2026
            </footer>
        </main>
    );
}
