"use client";

import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Globe, Zap, Sparkles, Plane, Hotel, Phone } from "lucide-react";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";

const ease = [0.25, 1, 0.5, 1] as any;

export default function Home() {
    return (
        <main className="bg-[#000] min-h-screen text-white selection:bg-blue-500/30">
            {/* ═══ NAVIGATION ═══ */}
            <nav className="fixed top-0 w-full z-[100] h-20 glass border-b border-white/5 flex items-center justify-center px-6">
                <div className="max-w-7xl w-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                            <Zap size={22} className="text-white fill-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter">ONYX <span className="text-blue-500">DRIVE</span> PARIS</span>
                    </div>
                    <div className="hidden md:flex gap-10 text-[11px] font-black tracking-[0.2em] uppercase text-white/40">
                        <a href="#booking" className="hover:text-white transition-colors">Réserver</a>
                        <a href="#services" className="hover:text-white transition-colors">Services</a>
                        <a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="tel:+33602565680" className="hidden sm:flex items-center gap-2 text-[11px] font-black text-white/50 hover:text-white transition-colors">
                            <Phone size={14} /> 06 02 56 56 80
                        </a>
                        <a href="#booking" className="bg-white text-black px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                            RÉSERVER
                        </a>
                    </div>
                </div>
            </nav>

            {/* ═══ HERO: REPENSER LE TRAJET ═══ */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[11px] font-black tracking-[0.2em] mb-8 uppercase">
                            <Zap size={14} /> Expert Mobilité Électrique
                        </span>
                        <h1 className="text-7xl md:text-[130px] font-black tracking-tighter leading-[0.85] mb-12">
                            REPENSER<br />
                            LE TRAJET<br />
                            <span className="text-blue-600">EN SILENCE.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/50 max-w-xl mb-16 leading-tight font-medium">
                            Vivez l'excellence du transport premium 100% électrique à Paris. <span className="text-white">Mercedes EQV 300</span> configuré en salon privé.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6">
                            <a href="#booking" className="bg-white text-black px-12 py-6 text-xl rounded-2xl group text-black font-black flex items-center justify-center gap-4 hover:bg-blue-600 hover:text-white transition-all">
                                Réserver mon Salon <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease }}>
                        <BookingForm />
                    </motion.div>
                </div>

                {/* Background Glows */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]" />
                </div>
            </section>

            {/* ═══ TARIFS SECTION ═══ */}
            <section id="tarifs" className="py-32 px-6 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">Nos Tarifs <br /><span className="text-white/30">fixes & garantis.</span></h2>
                        <p className="text-white/40 text-lg font-medium">Aucune surprise. Le prix annoncé est le prix payé.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {[
                            { route: "Paris ↔ CDG", price: "80", detail: "Terminaux 1, 2 & 3", badge: "Le plus demandé" },
                            { route: "Paris ↔ Orly", price: "65", detail: "Orly 1, 2, 3 & 4", badge: null },
                            { route: "Paris ↔ Disneyland", price: "90", detail: "Hôtels & Parcs inclus", badge: null },
                            { route: "Paris ↔ Le Bourget", price: "95", detail: "Aviation privée", badge: null },
                            { route: "Paris ↔ Beauvais", price: "120", detail: "Aéroport Ryanair", badge: null },
                            { route: "Mise à disposition", price: "120", detail: "Par heure, minimum 2h", badge: null },
                        ].map((t, i) => (
                            <div key={i} className="relative p-8 rounded-[32px] bg-white/[0.03] border border-white/5 hover:border-blue-500/20 transition-all group">
                                {t.badge && (
                                    <span className="absolute -top-3 left-6 px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{t.badge}</span>
                                )}
                                <p className="text-white/30 text-[11px] font-black uppercase tracking-[0.2em] mb-3">{t.detail}</p>
                                <h3 className="text-xl font-black mb-4">{t.route}</h3>
                                <div className="flex items-end gap-1">
                                    <span className="text-white/40 text-sm font-bold mb-1">à partir de</span>
                                    <span className="text-5xl font-black tracking-tighter">{t.price}€</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center p-8 rounded-[32px] bg-blue-600/5 border border-blue-500/10">
                        <p className="text-white/50 text-sm font-medium">Course minimum <span className="text-white font-black">55€</span> · Sièges bébé <span className="text-white font-black">gratuits</span> · Attente aéroport <span className="text-white font-black">gratuite</span> · Annulation <span className="text-white font-black">gratuite -24h</span></p>
                    </div>
                </div>
            </section>

            {/* ═══ SERVICES SECTION (MIGRATED CONTENT) ═══ */}
            <section id="services" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-24 text-center">Nos Spécialités <br /><span className="text-white/30">sur mesure.</span></h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "0g CO2 Entreprise", desc: "Décarbonez vos déplacements professionnels sans compromis. Plan RSE inclus.", icon: <Globe />, detail: "Idéal pour les dirigeants exigeants." },
                            { title: "Disneyland Paris", desc: "Transfert famille 7 places. Sièges auto gratuits et confort absolu pour les enfants.", icon: <Sparkles />, detail: "Accueil personnalisé en gare/aéroport." },
                            { title: "Mariage & Cérémonie", desc: "Mercedes EQV blanche (sur demande), service chauffeur protocolaire pour votre jour unique.", icon: <ShieldCheck />, detail: "Décoration florale possible." },
                            { title: "Transferts Aéroports", desc: "CDG, Orly, Le Bourget. Accueil avec tablette nominative et gestion des bagages.", icon: <Plane />, detail: "Suivi des vols en temps réel." },
                            { title: "Shopping Premium", desc: "Mise à disposition pour vos sessions shopping Avenue Montaigne ou Faubourg St-Honoré.", icon: <Hotel />, detail: "Le chauffeur garde vos achats." },
                            { title: "Fashion Week", desc: "Logistique VIP pour les défilés. Mobilité rapide et discrète entre les shows.", icon: <Zap />, detail: "Accès zones restreintes." }
                        ].map((s, i) => (
                            <div key={i} className="p-10 rounded-[40px] bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    {s.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-4">{s.title}</h3>
                                <p className="text-white/40 mb-6 font-medium leading-relaxed">{s.desc}</p>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">{s.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ THE TASK FORCE — AGENTS ═══ */}
            <section id="agents" className="py-32 px-6 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 text-center">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 italic">THE TASK FORCE <br /><span className="text-white/30 opacity-50">BY ONYX DRIVE.</span></h2>
                        <p className="text-xl text-white/40 max-w-2xl mx-auto uppercase tracking-widest font-black text-xs">L'excellence opérationnelle pilotée par l'intelligence artificielle.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {[
                            { name: "MAJOR SCOUT", role: "Audit Visuel", desc: "Analyse des vues réelles via Street View et satellites. Pas de mauvaises surprises au balcon.", color: "#0a84ff" },
                            { name: "CDR. LOGISTICS", role: "Flux & Temps", desc: "Synchronisation chirurgicale des vols et transferts. Zéro temps mort, zéro stress.", color: "#af82ff" },
                            { name: "AGENT TRUTH", role: "Anti-Scam", desc: "Audit sémantique de 1000+ avis réels pour détecter les chantiers et nuisances cachés.", color: "#34c759" },
                            { name: "GUARDIAN BUDGET", role: "Finance", desc: "Contrôle total des coûts. Aucun frais caché, aucune taxe surprise. Certification de prix.", color: "#ff9f0a" },
                            { name: "ONYX CORE", role: "Curation", desc: "L'intelligence centrale qui classe et élimine 99% des options pour ne garder que l'excellence.", color: "#00d2ff" }
                        ].map((a, i) => (
                            <div key={i} className="group p-8 rounded-[32px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6" style={{ color: a.color }}>
                                    <ShieldCheck size={24} />
                                </div>
                                <h4 className="text-[10px] font-black tracking-[0.2em] mb-2" style={{ color: a.color }}>{a.name}</h4>
                                <h5 className="text-xl font-bold mb-4">{a.role}</h5>
                                <p className="text-sm text-white/40 leading-relaxed font-medium">{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FAQ SECTION (MIGRATED CONTENT) ═══ */}
            <section className="py-40 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-20 text-center">
                        <h2 className="text-5xl font-black tracking-tighter mb-4">Questions Fréquentes</h2>
                        <p className="text-white/30 uppercase tracking-widest text-[10px] font-black">Tout ce que vous devez savoir sur Onyx Drive Paris</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { q: "Combien de passagers peuvent monter ?", a: "Nos Mercedes EQV accueillent jusqu'à 7 passagers avec 7 bagages larges." },
                            { q: "Proposez-vous des sièges bébé ?", a: "Oui, nous fournissons gratuitement des sièges auto et réhausseurs sur simple demande lors de la réservation." },
                            { q: "Quelle est l'autonomie de vos véhicules ?", a: "Nos véhicules ont une autonomie de plus de 350km, couvrant 100% des trajets en Île-de-France et alentours." },
                            { q: "Où se trouve le chauffeur à l'aéroport ?", a: "Votre chauffeur vous attendra après la douane avec une tablette affichant votre nom." },
                            { q: "Quels sont les modes de paiement ?", a: "Nous acceptons Amex, Visa, Mastercard, Apple Pay, Google Pay, Alipay et WeChat Pay." },
                            { q: "Puis-je modifier ma réservation ?", a: "Oui, modification gratuite jusqu'à 24h avant le départ via notre support ou WhatsApp." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col gap-4">
                                <h4 className="text-xl font-bold flex items-center gap-4">
                                    <span className="text-blue-500 font-black">0{i + 1}</span> {item.q}
                                </h4>
                                <p className="text-white/40 leading-relaxed pl-10">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer className="py-20 px-6 border-t border-white/5 bg-[#050505]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Zap size={18} className="text-white fill-white" />
                            </div>
                            <span className="text-xl font-black tracking-tighter uppercase">Onyx Drive Paris</span>
                        </div>
                        <p className="text-3xl font-black tracking-tighter leading-tight mb-8">LE SILENCE EST LE NOUVEAU<br /><span className="text-blue-600">STANDARD PREMIUM.</span></p>
                        <div className="flex flex-col gap-3">
                            <a href="tel:+33602565680" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-bold">
                                <Phone size={16} className="text-blue-500" /> 06 02 56 56 80
                            </a>
                            <a href="https://wa.me/33602565680" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors font-bold">
                                <span className="text-green-400 text-base">●</span> WhatsApp disponible
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Navigation</h4>
                        <ul className="space-y-4 text-sm font-bold text-white/50">
                            <li><a href="#booking" className="hover:text-white transition-colors">Réserver un trajet</a></li>
                            <li><a href="#tarifs" className="hover:text-white transition-colors">Nos Tarifs</a></li>
                            <li><a href="#services" className="hover:text-white transition-colors">Nos Services</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Légal</h4>
                        <ul className="space-y-4 text-sm font-bold text-white/50">
                            <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link></li>
                            <li><Link href="/conditions" className="hover:text-white transition-colors">CGV</Link></li>
                            <li><Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/20">
                    <p>© 2026 ONYX DRIVE PARIS — EXCELLENCE MOBILITÉ ÉLECTRIQUE</p>
                    <div className="flex gap-8">
                        <span>EV SOLUTIONS</span>
                        <span>LUXURY TRANSPORT</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}
