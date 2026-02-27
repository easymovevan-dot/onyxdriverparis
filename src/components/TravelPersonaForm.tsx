"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    MapPin,
    Heart,
    ShieldAlert,
    Car,
    ChevronRight,
    Save,
    Check,
    Sparkles
} from 'lucide-react';

interface PersonaData {
    name: string;
    baseCity: string;
    preferences: string[];
    dealBreakers: string[];
    carPreference: string;
    budgetRange: string;
}

export default function TravelPersonaForm({ onSave }: { onSave: (data: PersonaData) => void }) {
    const [step, setStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [data, setData] = useState<PersonaData>({
        name: "",
        baseCity: "Paris",
        preferences: [],
        dealBreakers: [],
        carPreference: "",
        budgetRange: "1000€ - 2500€"
    });

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            onSave(data);
            setIsSaving(false);
        }, 1500);
    };

    const stepLabels = ["Identité", "Incontournables", "Deal-Breakers"];

    return (
        <div className="max-w-3xl mx-auto">
            {/* Premium Card Container */}
            <div className="premium-card p-8 md:p-12 gold-glow">

                {/* Stepper */}
                <div className="flex justify-between items-center mb-14 relative">
                    <div className="stepper-line" />
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center gap-2">
                            <div className={`stepper-dot ${step >= s ? 'stepper-dot--active' : 'stepper-dot--inactive'}`}>
                                {step > s ? <Check className="w-5 h-5" /> : s}
                            </div>
                            <span className={`text-xs font-semibold ${step >= s ? 'text-onyx-gold' : 'text-onyx-grey'}`}>
                                {stepLabels[s - 1]}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="min-h-[380px]">
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-onyx-gold/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-onyx-gold" />
                                </div>
                                <h3 className="text-2xl font-bold">Identité du Voyageur</h3>
                            </div>
                            <p className="text-onyx-grey mb-10 ml-[52px]">Nos agents Scout et Truth s'adaptent à votre profil.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="section-label flex items-center gap-2">
                                        <User className="w-3 h-3" /> Nom Complet
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        placeholder="Ex: Thomas Laurent"
                                        className="premium-input"
                                    />
                                </div>
                                <div>
                                    <label className="section-label flex items-center gap-2">
                                        <MapPin className="w-3 h-3" /> Ville de Départ
                                    </label>
                                    <input
                                        type="text"
                                        value={data.baseCity}
                                        onChange={(e) => setData({ ...data, baseCity: e.target.value })}
                                        placeholder="Ex: Paris, Lyon, Marseille"
                                        className="premium-input"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-red-400" />
                                </div>
                                <h3 className="text-2xl font-bold">Vos Incontournables</h3>
                            </div>
                            <p className="text-onyx-grey mb-10 ml-[52px]">L'Agent Scout élimine 100% des options qui ne cochent pas ces cases.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {["Front de Mer", "Vue Dégagée", "Spa & Wellness", "Design Moderne", "Piscine Privée", "Restaurant Étoilé", "Petit-déj Gourmet", "Calme Absolu"].map((pref) => (
                                    <button
                                        key={pref}
                                        onClick={() => {
                                            const exists = data.preferences.includes(pref);
                                            setData({
                                                ...data,
                                                preferences: exists ? data.preferences.filter(p => p !== pref) : [...data.preferences, pref]
                                            });
                                        }}
                                        className={`pref-chip ${data.preferences.includes(pref) ? 'pref-chip--selected' : ''}`}
                                    >
                                        <span>{pref}</span>
                                        {data.preferences.includes(pref) && <Check className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                    <ShieldAlert className="w-5 h-5 text-orange-400" />
                                </div>
                                <h3 className="text-2xl font-bold">Vos Deal-Breakers</h3>
                            </div>
                            <p className="text-onyx-grey mb-10 ml-[52px]">L'Agent Truth rejette immédiatement toute option avec ces signaux.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                                {["Bruit de rue", "Escale > 3h", "Pas d'ascenseur", "Clim payante", "Zone Touristique", "Chantier à proximité"].map((db) => (
                                    <button
                                        key={db}
                                        onClick={() => {
                                            const exists = data.dealBreakers.includes(db);
                                            setData({
                                                ...data,
                                                dealBreakers: exists ? data.dealBreakers.filter(d => d !== db) : [...data.dealBreakers, db]
                                            });
                                        }}
                                        className={`pref-chip ${data.dealBreakers.includes(db) ? 'border-red-500/60 bg-red-500/5 text-red-400' : ''}`}
                                    >
                                        <span>{db}</span>
                                        {data.dealBreakers.includes(db) && <Check className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-6" style={{ borderTop: '1px solid var(--onyx-border)' }}>
                                <label className="section-label flex items-center gap-2">
                                    <Car className="w-3 h-3" /> Location de Voiture
                                </label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {["Automatique", "Électrique", "Pas de location", "Cabriolet"].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setData({ ...data, carPreference: opt })}
                                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${data.carPreference === opt
                                                    ? 'bg-onyx-gold text-black'
                                                    : 'bg-onyx-dark text-onyx-grey border border-onyx-border hover:border-onyx-gold/40'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Footer Navigation */}
                <div className="flex items-center justify-between mt-10 pt-8" style={{ borderTop: '1px solid var(--onyx-border)' }}>
                    <button
                        onClick={() => setStep(s => Math.max(1, s - 1))}
                        className={`premium-btn-dark px-6 py-3 text-sm ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        Retour
                    </button>

                    {step < 3 ? (
                        <button
                            onClick={() => setStep(s => s + 1)}
                            className="premium-btn flex items-center gap-2"
                        >
                            Suivant <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`premium-btn flex items-center gap-2 ${isSaving ? 'opacity-70 scale-95' : ''}`}
                        >
                            {isSaving ? (
                                <>Lancement des Agents...</>
                            ) : (
                                <><Sparkles className="w-5 h-5" /> Lancer la Curation</>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
