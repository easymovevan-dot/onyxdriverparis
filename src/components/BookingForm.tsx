"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight, Plane, MapPin, Calendar, Clock } from "lucide-react";

export default function BookingForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        departure: "",
        arrival: "",
        date: "",
        time: "",
        returnDate: "",
        returnTime: "",
        service: "Transfert Aéroport",
        passengers: "1-4",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "bookings"), {
                ...formData,
                tripType,
                status: "nouveau",
                createdAt: serverTimestamp(),
            });
            setSuccess(true);
            setFormData({
                name: "", email: "", phone: "", departure: "", arrival: "",
                date: "", time: "", returnDate: "", returnTime: "",
                service: "Transfert Aéroport", passengers: "1-4", message: ""
            });
        } catch (error) {
            console.error("Error:", error);
            alert("Une erreur est survenue lors de l'envoi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 md:p-12 shadow-[0_0_80px_rgba(0,132,255,0.15)] relative overflow-hidden">
                {/* Decorative Blue Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />

                <div className="relative z-10">
                    <div className="mb-10 text-left">
                        <h2 className="text-4xl font-black tracking-tighter mb-4 text-white">Planifiez votre trajet</h2>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setTripType("one-way")}
                                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${tripType === "one-way" ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "bg-white/5 border-white/10 text-white/40 hover:text-white"}`}
                            >
                                Aller Simple
                            </button>
                            <button
                                type="button"
                                onClick={() => setTripType("round-trip")}
                                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${tripType === "round-trip" ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "bg-white/5 border-white/10 text-white/40 hover:text-white"}`}
                            >
                                Aller-Retour
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-20 text-center">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/50">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-3xl font-black mb-3 text-white">REQUÊTE TRANSMISE</h3>
                                <p className="text-white/40 mb-10 uppercase tracking-widest text-xs font-bold">Un chauffeur Onyx vous contactera sous 15 minutes.</p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-amber-400 transition-all uppercase tracking-widest text-xs"
                                >
                                    Nouvelle réservation
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">
                                            <MapPin size={12} className="text-blue-500" /> Lieu de Départ
                                        </label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-white/10"
                                            placeholder="Adresse, Aéroport, Gare..."
                                            value={formData.departure}
                                            onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">
                                            <MapPin size={12} className="text-amber-500" /> Destination
                                        </label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/10"
                                            placeholder="Votre destination"
                                            value={formData.arrival}
                                            onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="space-y-3 col-span-1">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-white/30 ml-2">
                                            <Calendar size={12} /> Date
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-white/20"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3 col-span-1">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-white/30 ml-2">
                                            <Clock size={12} /> Heure
                                        </label>
                                        <input
                                            required
                                            type="time"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-white/20"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        />
                                    </div>
                                    {tripType === "round-trip" && (
                                        <>
                                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3 col-span-1 border-l border-white/5 pl-4">
                                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 ml-2">
                                                    <Calendar size={12} /> Retour Date
                                                </label>
                                                <input
                                                    required
                                                    type="date"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500/30"
                                                    value={formData.returnDate}
                                                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                                                />
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3 col-span-1">
                                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 ml-2">
                                                    <Clock size={12} /> Retour Heure
                                                </label>
                                                <input
                                                    required
                                                    type="time"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500/30"
                                                    value={formData.returnTime}
                                                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                                                />
                                            </motion.div>
                                        </>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Passagers</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none appearance-none cursor-pointer focus:border-white/20"
                                            value={formData.passengers}
                                            onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                                        >
                                            <option value="1-4">1-4 Personnes (Berline)</option>
                                            <option value="5-7">5-7 Personnes (Van EQV)</option>
                                            <option value="8+">Groupe 8+ (Multi-Vans)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Type de Service</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none appearance-none cursor-pointer focus:border-white/20"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        >
                                            <option value="Transfert Aéroport">Transfert Aéroport</option>
                                            <option value="Mise à Disposition">Mise à Disposition (Heure)</option>
                                            <option value="Longue Distance">Longue Distance</option>
                                            <option value="Événementiel">Événementiel / Mariage</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Contact</label>
                                        <input
                                            required
                                            placeholder="Nom complet"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-white/20"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email professionnel"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-white/20"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="Numéro de téléphone (avec indicatif)"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-white/20"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-7 bg-white text-black font-black uppercase tracking-[0.3em] text-sm rounded-3xl hover:bg-blue-600 hover:text-white transition-all transform active:scale-[0.98] shadow-xl flex items-center justify-center gap-4 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <span className="relative z-10 flex items-center gap-4">
                                        {loading ? <Loader2 className="animate-spin" /> : <>Confirmer ma réservation <ArrowRight size={20} /></>}
                                    </span>
                                </button>

                                <p className="text-center text-[9px] uppercase tracking-[0.3em] font-black text-white/20 pt-4">
                                    Zéro Carbone • Discrétion Totale • Standards Mercedes-Benz
                                </p>
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
