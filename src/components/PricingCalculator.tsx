"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShieldCheck, MapPin, Send, Zap, Star } from "lucide-react";

const ease = [0.25, 1, 0.5, 1] as any;

export default function PricingCalculator() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    const handleEstimate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (origin && destination) {
            setIsCalculating(true);
            // Simulate agent audit
            await new Promise(r => setTimeout(r, 1500));
            setIsCalculating(false);
            setShowResult(true);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="bg-white rounded-[32px] p-8 md:p-12 overflow-hidden shadow-2xl shadow-black/5 border border-black/[0.03]">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
                        <Zap size={20} className="text-gold" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold leading-none mb-1">Audit Tarifaire Instantané</h3>
                        <p className="text-[12px] text-black/40 font-semibold uppercase tracking-wider">Algorithme Onyx Platinum v2.4</p>
                    </div>
                </div>

                <form onSubmit={handleEstimate} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="relative group">
                            <label className="absolute left-6 top-4 text-[10px] font-bold text-black/30 uppercase tracking-widest z-10 transition-colors group-focus-within:text-onyx-blue">Point de Départ</label>
                            <MapPin className="absolute left-6 bottom-4 text-black/20 group-focus-within:text-onyx-blue transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cormeilles-en-Parisis, Paris..."
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                className="w-full bg-[#f5f5f7] pt-10 pb-4 px-14 rounded-2xl border-2 border-transparent focus:border-onyx-blue/20 focus:bg-white transition-all outline-none text-[17px] font-semibold placeholder:text-black/10"
                            />
                        </div>
                        <div className="relative group">
                            <label className="absolute left-6 top-4 text-[10px] font-bold text-black/30 uppercase tracking-widest z-10 transition-colors group-focus-within:text-onyx-blue">Destination</label>
                            <div className="absolute left-6 bottom-4 w-[18px] h-[18px] rounded-full border-2 border-black/20 group-focus-within:border-onyx-blue transition-colors" />
                            <input
                                type="text"
                                placeholder="Aéroport CDG, Orly, Disney..."
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="w-full bg-[#f5f5f7] pt-10 pb-4 px-14 rounded-2xl border-2 border-transparent focus:border-onyx-blue/20 focus:bg-white transition-all outline-none text-[17px] font-semibold placeholder:text-black/10"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isCalculating}
                        className="w-full h-16 bg-black text-white rounded-2xl font-bold text-[17px] flex items-center justify-center gap-3 hover:bg-black/90 transition-all active:scale-[0.98] disabled:opacity-50 group overflow-hidden relative"
                    >
                        {isCalculating ? (
                            <span className="flex items-center gap-3">
                                <span className="w-5 h-5 border-2 border-white/20 border-t-gold rounded-full animate-spin" />
                                Audit des tarifs en cours...
                            </span>
                        ) : (
                            <>
                                Calculer le tarif Platinum <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </button>
                </form>

                <AnimatePresence>
                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-10 overflow-hidden"
                            transition={{ duration: 0.5, ease }}
                        >
                            <div className="p-8 rounded-[32px] bg-onyx-ice/50 border border-black/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                                    <Star size={120} />
                                </div>

                                <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                    <div>
                                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] tracking-[0.2em] uppercase mb-2">
                                            <ShieldCheck size={14} /> Tarif Garanti
                                        </div>
                                        <h4 className="text-5xl font-black tracking-tighter">55,00€</h4>
                                        <p className="text-[14px] text-black/40 font-bold uppercase tracking-tight mt-1">Mercedes EQV Signature</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex glass px-4 py-2 rounded-xl border border-black/5 items-center gap-2 text-[11px] font-bold">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Disponibilité Immédiate
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href={`https://wa.me/33602565680?text=Bonjour, je souhaite réserver un trajet de ${origin} vers ${destination}.`}
                                        target="_blank"
                                        className="btn-gold w-full h-16 flex items-center justify-center gap-3 text-lg"
                                    >
                                        Réserver sur WhatsApp <Send size={18} />
                                    </a>
                                    <p className="text-center text-[10px] text-black/30 font-bold uppercase tracking-[0.1em] px-4">
                                        Accueil pancarte inclus • Attente gratuite • 100% Électrique
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
