"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function BookingForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "Transfert Aéroport",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Enregistrement dans Firestore
            await addDoc(collection(db, "bookings"), {
                ...formData,
                createdAt: serverTimestamp(),
                status: "nouveau",
            });

            setSuccess(true);
            setFormData({ name: "", email: "", phone: "", service: "Transfert Aéroport", message: "" });
        } catch (error) {
            console.error("Erreur Firestore:", error);
            alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 px-4 bg-black/50 backdrop-blur-md rounded-3xl border border-white/10 max-w-2xl mx-auto my-10 shadow-2xl">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent mb-2">
                    Réserver votre trajet Premium
                </h2>
                <p className="text-gray-400">ONYX DRIVE PARIS — Excellence Opérationnelle</p>
            </div>

            <AnimatePresence mode="wait">
                {success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                    >
                        <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
                        <h3 className="text-2xl font-semibold text-white">Demande envoyée !</h3>
                        <p className="text-gray-400 mt-2">Un agent Onyx reviendra vers vous dans les plus brefs délais.</p>
                        <button
                            onClick={() => setSuccess(false)}
                            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10"
                        >
                            Faire une autre demande
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                required
                                type="text"
                                placeholder="Nom complet"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                required
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                required
                                type="tel"
                                placeholder="Téléphone"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                            <select
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            >
                                <option value="Transfert Aéroport">Transfert Aéroport</option>
                                <option value="Mise à Disposition">Mise à Disposition</option>
                                <option value="Événementiel">Événementiel / Business</option>
                                <option value="Autre">Autre demande</option>
                            </select>
                        </div>

                        <textarea
                            required
                            rows={4}
                            placeholder="Détails de votre trajet (Date, Heure, Adresse...)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Valider la réservation
                                </>
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </section>
    );
}
