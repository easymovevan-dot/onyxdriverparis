"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight, MapPin, Calendar, Clock, User, Mail, Phone, MessageSquare, Hash } from "lucide-react";

function generateRef(): string {
    return "OD-" + Date.now().toString(36).toUpperCase().slice(-6);
}

export default function BookingForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [bookingRef, setBookingRef] = useState("");
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
        passengers: "1-7",
        flightNumber: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const ref = generateRef();
        try {
            await addDoc(collection(db, "bookings"), {
                ...formData,
                tripType,
                ref,
                status: "nouveau",
                createdAt: serverTimestamp(),
            });
            setBookingRef(ref);
            setSuccess(true);
            setFormData({
                name: "", email: "", phone: "", departure: "", arrival: "",
                date: "", time: "", returnDate: "", returnTime: "",
                service: "Transfert Aéroport", passengers: "1-7",
                flightNumber: "", message: ""
            });
        } catch (err) {
            console.error("Error:", err);
            setError("Une erreur est survenue lors de l'envoi. Veuillez réessayer ou appeler le 06 02 56 56 80.");
        } finally {
            setLoading(false);
        }
    };

    const isAirport = formData.service === "Transfert Aéroport";

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 md:p-12 shadow-[0_0_80px_rgba(0,132,255,0.15)] relative overflow-hidden">
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
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/50">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-3xl font-black mb-2 text-white">Demande envoyée !</h3>
                                <p className="text-white/50 mb-6 text-base font-medium">Votre chauffeur vous contacte dans les <span className="text-white font-black">15 minutes</span>.</p>

                                <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl mb-8">
                                    <Hash size={16} className="text-blue-400" />
                                    <div className="text-left">
                                        <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">Référence de réservation</p>
                                        <p className="text-white font-black text-xl tracking-widest">{bookingRef}</p>
                                    </div>
                                </div>

                                <p className="text-white/30 text-xs mb-8 font-medium">Notez cette référence pour tout contact ultérieur.</p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="tel:+33602565680"
                                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all"
                                    >
                                        <Phone size={16} /> 06 02 56 56 80
                                    </a>
                                    <button
                                        onClick={() => { setSuccess(false); setBookingRef(""); }}
                                        className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-500 hover:text-white transition-all text-sm uppercase tracking-widest"
                                    >
                                        Nouvelle réservation
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Départ / Destination */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">
                                            <MapPin size={12} className="text-blue-500" /> Lieu de Départ
                                        </label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-white/20"
                                            placeholder="Adresse, Aéroport, Gare..."
                                            value={formData.departure}
                                            onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">
                                            <MapPin size={12} className="text-amber-500" /> Destination
                                        </label>
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/20"
                                            placeholder="Votre destination"
                                            value={formData.arrival}
                                            onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Date / Heure */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="space-y-2">
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
                                    <div className="space-y-2">
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
                                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2 border-l border-white/5 pl-4">
                                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 ml-2">
                                                    <Calendar size={12} /> Retour
                                                </label>
                                                <input
                                                    required
                                                    type="date"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500/30"
                                                    value={formData.returnDate}
                                                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                                                />
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 ml-2">
                                                    <Clock size={12} /> Heure retour
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

                                {/* Passagers / Service */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Nombre de passagers</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none appearance-none cursor-pointer focus:border-white/20"
                                            value={formData.passengers}
                                            onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                                        >
                                            <option value="1-3">1 à 3 passagers</option>
                                            <option value="4-7">4 à 7 passagers (Mercedes EQV)</option>
                                            <option value="8+">8+ passagers (Multi-Vans)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Type de prestation</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none appearance-none cursor-pointer focus:border-white/20"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        >
                                            <option value="Transfert Aéroport">Transfert Aéroport</option>
                                            <option value="Mise à Disposition">Mise à Disposition (à l'heure)</option>
                                            <option value="Longue Distance">Longue Distance</option>
                                            <option value="Événementiel">Événementiel / Mariage</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Numéro de vol si aéroport */}
                                {isAirport && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">
                                            <Hash size={12} className="text-blue-400" /> Numéro de vol <span className="text-white/20 normal-case font-medium">(facultatif — pour le suivi en temps réel)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ex : AF1234, EK761..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-blue-500/30 transition-all placeholder:text-white/20"
                                            value={formData.flightNumber}
                                            onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                                        />
                                    </motion.div>
                                )}

                                {/* Coordonnées */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">
                                            <User size={12} /> Nom complet
                                        </label>
                                        <input
                                            required
                                            placeholder="Prénom Nom"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-white/20 placeholder:text-white/20"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">
                                            <Mail size={12} /> Email
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="votre@email.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-white/20 placeholder:text-white/20"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">
                                            <Phone size={12} /> Téléphone
                                        </label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+33 6 XX XX XX XX"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-white/20 placeholder:text-white/20"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Instructions spéciales */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">
                                        <MessageSquare size={12} /> Instructions spéciales <span className="text-white/20 normal-case font-medium">(facultatif)</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Siège bébé, adresse précise d'entrée, bagages volumineux, demandes particulières..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-white/20 transition-all placeholder:text-white/20 resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-400 text-sm text-center font-medium">{error}</p>
                                )}

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-7 bg-white text-black font-black uppercase tracking-[0.3em] text-sm rounded-3xl hover:bg-blue-600 hover:text-white transition-all transform active:scale-[0.98] shadow-xl flex items-center justify-center gap-4 relative overflow-hidden group disabled:opacity-60"
                                >
                                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <span className="relative z-10 flex items-center gap-4">
                                        {loading ? <Loader2 className="animate-spin" /> : <>Envoyer ma demande <ArrowRight size={20} /></>}
                                    </span>
                                </button>

                                <p className="text-center text-[9px] uppercase tracking-[0.3em] font-black text-white/20 pt-2">
                                    Réponse garantie sous 15 min • Zéro Carbone • 06 02 56 56 80
                                </p>
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
