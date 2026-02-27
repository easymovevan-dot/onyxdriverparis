"use client";

import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Globe, Zap, Sparkles, Search, CheckCircle2, ArrowRight, Plane, Hotel, Calculator } from "lucide-react";
import Link from "next/link";

const ease = [0.25, 1, 0.5, 1] as any;

export default function Home() {
    return (
        <main className="bg-[#000] min-h-screen text-white selection:bg-gold/30">
            {/* ═══ NAVIGATION ═══ */}
            <nav className="fixed top-0 w-full z-[100] h-16 glass border-b border-white/5 flex items-center justify-center px-6">
                <div className="max-w-7xl w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                            <Zap size={18} className="text-black fill-black" />
                        </div>
                        <span className="text-xl font-bold tracking-tighter">ONYX PLATINUM</span>
                    </div>
                    <div className="hidden md:flex gap-10 text-[13px] font-bold tracking-widest uppercase text-white/40">
                        <Link href="/travel-curation" className="hover:text-gold transition-colors">Lancer un Audit</Link>
                        <a href="#agents" className="hover:text-gold transition-colors">La Task Force</a>
                        <a href="#method" className="hover:text-gold transition-colors">Méthodologie</a>
                    </div>
                    <Link href="/travel-curation" className="btn-gold px-6 py-2 text-sm">Curation Live</Link>
                </div>
            </nav>

            {/* ═══ HERO: AGENCE 2.0 ═══ */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gold text-[11px] font-black tracking-[0.2em] mb-8 uppercase">
                            <Sparkles size={14} /> Bienvenue dans l'Agence 2.0
                        </span>
                        <h1 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.9] mb-10">
                            Tuer le choix.<br />
                            <span className="hero-accent">Exiger la vérité.</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-white/50 max-w-3xl mx-auto mb-16 leading-tight font-medium">
                            Onyx Platinum n'est pas un site de réservation. C'est une <span className="text-white">Task Force d'IA</span> qui audite le web pour ne vous livrer que la perfection.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <Link href="/travel-curation" className="btn-gold px-12 py-6 text-xl rounded-2xl group text-black font-black">
                                Commencer ma Curation <ChevronRight className="inline group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Background Orbs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                    <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
                </div>
            </section>

            {/* ═══ STATS BENTO ═══ */}
            <section className="px-6 py-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-center text-center">
                        <h3 className="text-5xl font-black text-gold mb-2">28M+</h3>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Propriétés scannées</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-center text-center">
                        <h3 className="text-5xl font-black text-gold mb-2">0</h3>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Friction décisionnelle</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-center text-center">
                        <h3 className="text-5xl font-black text-gold mb-2">100%</h3>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Audit de vérité</p>
                    </div>
                </div>
            </section>

            {/* ═══ THE TASK FORCE — AGENTS ═══ */}
            <section id="agents" className="py-32 px-6 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 text-center md:text-left">
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6">Votre État-Major <br /><span className="text-white/30">privé de voyage.</span></h2>
                        <p className="text-xl text-white/40 max-w-2xl">Cinq agents IA spécialisés qui travaillent en parallèle pour éliminer le doute.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {[
                            { name: "MAJOR SCOUT", role: "Audit Visuel", desc: "Analyse des vues réelles via Street View et satellites. Pas de mauvaises surprises au balcon.", color: "#0a84ff" },
                            { name: "CDR. LOGISTICS", role: "Flux & Temps", desc: "Synchronisation chirurgicale des vols et transferts. Zéro temps mort, zéro stress.", color: "#af82ff" },
                            { name: "AGENT TRUTH", role: "Anti-Scam", desc: "Audit sémantique de 1000+ avis réels pour détecter les chantiers et nuisances cachés.", color: "var(--emerald)" },
                            { name: "GUARDIAN BUDGET", role: "Finance", desc: "Contrôle total des coûts. Aucun frais caché, aucune taxe surprise. Certification de prix.", color: "#ff9f0a" },
                            { name: "ONYX CORE", role: "Curation", desc: "L'intelligence centrale qui classe et élimine 99% des options pour ne garder que l'excellence.", color: "var(--gold)" }
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

            {/* ═══ METHODOLOGY ═══ */}
            <section id="method" className="py-40 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-16 inline-flex px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold font-bold text-xs uppercase tracking-widest">
                        Pourquoi nous sommes différents
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-20 whitespace-pre-line">
                        {"Nous ne vendons pas de billets.\nNous vendons de la certitude."}
                    </h2>

                    <div className="space-y-12">
                        {[
                            { t: "L'Audit de Vérité", d: "Pendant que les autres sites affichent des photos marketing de 2012, nos agents scannent les données de la semaine dernière pour confirmer que la vue est toujours là." },
                            { t: "L'Isolation Sensorielle", d: "Notre agent TRUTH isole les mots-clés liés au bruit et aux chantiers dans les avis multilingues pour garantir votre calme absolu." },
                            { t: "Curation Radicale", d: "Nous préférons vous dire 'Aucun résultat' plutôt que de vous proposer un compromis médiocre. Mais avec 28M d'options, nous trouvons toujours la pépite." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-8 text-left group">
                                <div className="text-gold font-black text-4xl opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                                <div>
                                    <h4 className="text-2xl font-bold mb-4">{item.t}</h4>
                                    <p className="text-lg text-white/40 leading-relaxed">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FINAL CTA ═══ */}
            <section className="py-40 px-6 bg-gold">
                <div className="max-w-5xl mx-auto text-center text-black">
                    <h2 className="text-5xl md:text-9xl font-black tracking-tighter mb-12">PRÊT POUR <br />L'AUDIT ?</h2>
                    <p className="text-xl md:text-3xl font-bold mb-16 opacity-70">Rejoignez l'élite du voyage. Laissez la Task Force travailler.</p>
                    <Link href="/travel-curation" className="inline-flex items-center justify-center bg-black text-white px-12 py-8 rounded-[32px] text-2xl font-black hover:scale-105 transition-transform group">
                        LANCER LA CURATION <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer className="py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gold rounded flex items-center justify-center">
                            <Zap size={14} className="text-black fill-black" />
                        </div>
                        <span className="font-bold tracking-tighter">ONYX PLATINUM</span>
                    </div>
                    <div className="flex gap-10 text-[10px] font-black tracking-widest uppercase text-white/30">
                        <Link href="/travel-curation" className="hover:text-white">Audit</Link>
                        <Link href="/mentions-legales" className="hover:text-white">Légal</Link>
                        <Link href="/contact" className="hover:text-white">Contact</Link>
                    </div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">© 2026 ONYX PLATINUM — TRAVEL TASK FORCE</p>
                </div>
            </footer>
        </main>
    );
}
