"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2, AlertTriangle, Plane, Hotel, ChevronRight, ShieldCheck,
    ArrowRight, Star, Zap, DollarSign, Sparkles, Heart,
    ShieldAlert, Car, Check, Calendar, MapPin, Globe, TrainFront, Wallet
} from 'lucide-react';

/* ═══ DATA ═══ */
const PREFS = [
    { label: "Front de Mer", emoji: "🌊" },
    { label: "Vue Panoramique", emoji: "🏔" },
    { label: "Spa & Wellness", emoji: "🧖‍♀️" },
    { label: "Design & Architecture", emoji: "🏛" },
    { label: "Piscine à Débordement", emoji: "🏊" },
    { label: "Calme Absolu", emoji: "🤫" },
    { label: "Petit-Déjeuner Gourmet", emoji: "🥐" },
    { label: "Gastronomie Étoilée", emoji: "⭐" },
];

const BREAKS = [
    { label: "Bruit excessif", emoji: "🔊" },
    { label: "Escale > 3h", emoji: "⏱" },
    { label: "Chantier à proximité", emoji: "🚧" },
    { label: "Climatisation payante", emoji: "❄️" },
    { label: "Sur-tourisme", emoji: "👥" },
    { label: "Pas d'ascenseur", emoji: "🪜" },
];

/* ═══ TYPES ═══ */
interface TravelOption {
    id: string; tag: string; tagLabel: string; title: string; location: string;
    propertyType?: string; priceTotal: number; priceDetail: string; score: number;
    image: string; scoutReport: string; truthReport: string; logisticsReport: string; guardianReport: string;
}

/* ═══ ANIMATION ═══ */
const ease = [0.25, 1, 0.5, 1] as const;
const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30, transition: { duration: 0.35 } }
};

/* ═══ COMPONENT ═══ */
export default function TravelCurationPage() {
    const [view, setView] = useState<'hero' | 'prefs' | 'breaks' | 'budget' | 'loading' | 'results'>('hero');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [filterType, setFilterType] = useState('Tous');

    // Form state
    const [dateDepart, setDateDepart] = useState('');
    const [dateRetour, setDateRetour] = useState('');
    const [city, setCity] = useState('Paris');
    const [destination, setDestination] = useState('Toutes destinations');
    const [transport, setTransport] = useState('Avion');
    const [prefs, setPrefs] = useState<string[]>([]);
    const [breaks_, setBreaks_] = useState<string[]>([]);
    const [budget, setBudget] = useState(3000);
    const [curations, setCurations] = useState<TravelOption[]>([]);
    const [summary, setSummary] = useState({ rejected: 0, analyzed: 0 });
    const [budgetNote, setBudgetNote] = useState('');
    const [loadingStep, setLoadingStep] = useState(0);

    const LOADING_STEPS = [
        { agent: "MAJOR SCOUT", msg: "Initialisation du scan satellite...", color: "#0a84ff" },
        { agent: "CDR. LOGISTICS", msg: "Calcul des trajectoires optimales...", color: "#af82ff" },
        { agent: "AGENT TRUTH", msg: "Audit des sources et vérification anti-scam...", color: "var(--emerald)" },
        { agent: "GUARDIAN BUDGET", msg: "Filtrage financier et taxes locales...", color: "#ff9f0a" },
        { agent: "ONYX CORE", msg: "Génération de votre sélection Platinum...", color: "var(--gold)" }
    ];

    React.useEffect(() => {
        if (view === 'loading') {
            const timer = setInterval(() => {
                setLoadingStep(s => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setLoadingStep(0);
        }
    }, [view]);

    const toggle = (list: string[], item: string, setter: (v: string[]) => void) =>
        setter(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);

    // Filtered results
    const filtered = useMemo(() => {
        if (filterType === 'Tous') return curations;
        return curations.filter(c => c.propertyType === filterType);
    }, [curations, filterType]);

    const propertyTypes = useMemo(() => {
        const types = [...new Set(curations.map(c => c.propertyType).filter(Boolean))];
        return ['Tous', ...types];
    }, [curations]);

    const launch = async () => {
        setView('loading');
        const minDelay = new Promise(resolve => setTimeout(resolve, 5000));
        try {
            const apiCall = fetch('/api/curate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dates: `${dateDepart} – ${dateRetour}`,
                    persona: { city, destination, transport, prefs, breaks: breaks_, budget }
                })
            }).then(r => r.json());

            const [data] = await Promise.all([apiCall, minDelay]);
            if (data.success && data.curations?.length > 0) {
                setCurations(data.curations);
                setSummary(data.summary || { rejected: 0, analyzed: 0 });
                setBudgetNote(data.budgetNote || '');
            }
        } catch (e) { console.error(e); }
        setView('results');
    };

    return (
        <div style={{ background: '#000', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Dreamy Orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            {/* Navigation Navigation */}
            <nav style={{ position: 'fixed', top: 0, width: '100%', height: 60, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
                <div style={{ maxWidth: 1200, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ArrowRight size={14} style={{ transform: 'rotate(180deg)', color: 'var(--gold)' }} /> ONYX PLATINUM
                    </Link>
                    <div className="glass" style={{ padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.05em' }}>
                        TASK FORCE AI ACTIVE
                    </div>
                </div>
            </nav>

            <AnimatePresence mode="wait">

                {/* ═══════════ HERO ═══════════ */}
                {view === 'hero' && (
                    <motion.div key="hero" {...fadeUp} transition={{ duration: 1, ease }} className="screen">
                        <div className="narrow" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <motion.p className="overline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: 40 }}>
                                Agentic Travel Intelligence
                            </motion.p>
                            <motion.h1 className="hero-display" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }} style={{ marginBottom: 28 }}>
                                Dites-nous<br />juste <span className="hero-accent">quand.</span>
                            </motion.h1>
                            <motion.p className="body-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ marginBottom: 56, maxWidth: 420, margin: '0 auto 56px' }}>
                                Cinq agents IA font le reste.<br />Pas de recherche. Pas de doute.<br />Juste la certitude.
                            </motion.p>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7, ease }}
                                style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <div style={{ flex: 1 }}>
                                        <p className="caption" style={{ marginBottom: 8 }}>Départ</p>
                                        <div style={{ position: 'relative' }}>
                                            <Calendar className="w-5 h-5" style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
                                            <input type="date" value={dateDepart} onChange={e => setDateDepart(e.target.value)} className="apple-input" style={{ colorScheme: 'dark' }} />
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p className="caption" style={{ marginBottom: 8 }}>Retour</p>
                                        <div style={{ position: 'relative' }}>
                                            <Calendar className="w-5 h-5" style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
                                            <input type="date" value={dateRetour} onChange={e => setDateRetour(e.target.value)} min={dateDepart} className="apple-input" style={{ colorScheme: 'dark' }} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <MapPin className="w-5 h-5" style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                                    <input value={city} onChange={e => setCity(e.target.value)} placeholder="Ville de départ" className="apple-input" />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Globe className="w-5 h-5" style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
                                    <select value={destination} onChange={e => setDestination(e.target.value)} className="apple-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                                        <option>Toutes destinations</option>
                                        <option>Espagne</option><option>Grèce</option><option>Italie</option>
                                        <option>Portugal</option><option>France</option><option>Maroc</option>
                                        <option>Croatie</option><option>Thaïlande</option><option>Maldives</option>
                                        <option>Japon</option><option>Mexique</option><option>Émirats</option><option>Indonésie</option>
                                    </select>
                                </div>
                                <div>
                                    <p className="caption" style={{ marginBottom: 10 }}>Moyen de transport</p>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {[
                                            { label: 'Avion', icon: <Plane className="w-4 h-4" /> },
                                            { label: 'Train', icon: <TrainFront className="w-4 h-4" /> },
                                            { label: 'Voiture', icon: <Car className="w-4 h-4" /> },
                                        ].map(t => (
                                            <button key={t.label} onClick={() => setTransport(t.label)}
                                                className={`apple-chip ${transport === t.label ? 'selected' : ''}`}
                                                style={{ flex: 1, justifyContent: 'center', gap: 8, borderRadius: 980 }}>
                                                {t.icon} {t.label}
                                                {transport === t.label && <div className="chip-check"><Check className="w-3 h-3" style={{ color: '#000' }} /></div>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                <button onClick={() => setView('prefs')} className="btn-gold">Continuer <ChevronRight className="w-5 h-5" /></button>
                            </motion.div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                                style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 64, color: 'var(--text-tertiary)', fontSize: 13, fontWeight: 500 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ShieldCheck className="w-4 h-4" style={{ color: 'var(--emerald)' }} /> Vérifié</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><DollarSign className="w-4 h-4" style={{ color: 'var(--emerald)' }} /> Prix réel</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Zap className="w-4 h-4" style={{ color: 'var(--emerald)' }} /> Sans friction</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ PREFS ═══════════ */}
                {view === 'prefs' && (
                    <motion.div key="prefs" {...fadeUp} transition={{ duration: 0.6, ease }} className="screen">
                        <div className="narrow" style={{ position: 'relative', zIndex: 1 }}>
                            <div className="dots"><div className="dot dot-done" /><div className="dot dot-active" /><div className="dot dot-pending" /><div className="dot dot-pending" /></div>
                            <p className="overline" style={{ marginBottom: 16, textAlign: 'center' }}>Étape 2</p>
                            <h2 className="headline-lg" style={{ textAlign: 'center', marginBottom: 16 }}>Vos incontournables.</h2>
                            <p className="body-lg" style={{ textAlign: 'center', marginBottom: 48 }}>Tout ce qui manque un seul critère est éliminé.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 48 }}>
                                {PREFS.map(p => (
                                    <button key={p.label} onClick={() => toggle(prefs, p.label, setPrefs)}
                                        className={`apple-chip ${prefs.includes(p.label) ? 'selected' : ''}`}>
                                        <span style={{ fontSize: 20 }}>{p.emoji}</span><span>{p.label}</span>
                                        <div className="chip-check"><Check className="w-3 h-3" style={{ color: '#000' }} /></div>
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                                <button onClick={() => setView('hero')} className="btn-ghost">Retour</button>
                                <button onClick={() => setView('breaks')} className="btn-gold">Continuer <ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ BREAKS ═══════════ */}
                {view === 'breaks' && (
                    <motion.div key="breaks" {...fadeUp} transition={{ duration: 0.6, ease }} className="screen">
                        <div className="narrow" style={{ position: 'relative', zIndex: 1 }}>
                            <div className="dots"><div className="dot dot-done" /><div className="dot dot-done" /><div className="dot dot-active" /><div className="dot dot-pending" /></div>
                            <p className="overline" style={{ marginBottom: 16, textAlign: 'center' }}>Étape 3</p>
                            <h2 className="headline-lg" style={{ textAlign: 'center', marginBottom: 16 }}>Vos deal-breakers.</h2>
                            <p className="body-lg" style={{ textAlign: 'center', marginBottom: 48 }}>Rejet immédiat. Sans négociation.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 40 }}>
                                {BREAKS.map(b => (
                                    <button key={b.label} onClick={() => toggle(breaks_, b.label, setBreaks_)}
                                        className={`apple-chip ${breaks_.includes(b.label) ? 'danger' : ''}`}>
                                        <span style={{ fontSize: 20 }}>{b.emoji}</span><span>{b.label}</span>
                                        {breaks_.includes(b.label) && <div style={{ marginLeft: 'auto', width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,69,58,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check className="w-3 h-3" style={{ color: '#fff' }} /></div>}
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                                <button onClick={() => setView('prefs')} className="btn-ghost">Retour</button>
                                <button onClick={() => setView('budget')} className="btn-gold">Continuer <ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ BUDGET ═══════════ */}
                {view === 'budget' && (
                    <motion.div key="budget" {...fadeUp} transition={{ duration: 0.6, ease }} className="screen">
                        <div className="narrow" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                            <div className="dots"><div className="dot dot-done" /><div className="dot dot-done" /><div className="dot dot-done" /><div className="dot dot-active" /></div>
                            <p className="overline" style={{ marginBottom: 16 }}>Étape 4</p>
                            <h2 className="headline-lg" style={{ marginBottom: 16 }}>Votre budget.</h2>
                            <p className="body-lg" style={{ marginBottom: 64 }}>L'Agent Budget élimine tout dépassement.</p>

                            <div style={{ marginBottom: 24 }}>
                                <Wallet className="w-12 h-12 mx-auto" style={{ color: 'var(--gold)', marginBottom: 24 }} />
                                <p className="hero-display" style={{ fontSize: 'clamp(48px, 6vw, 72px)' }}>
                                    <span className="text-gold-gradient">{budget.toLocaleString()}€</span>
                                </p>
                                <p className="caption" style={{ marginTop: 8 }}>Budget total par personne</p>
                            </div>

                            <div style={{ padding: '0 20px', marginBottom: 48 }}>
                                <input
                                    type="range" min={200} max={10000} step={100} value={budget}
                                    onChange={e => setBudget(Number(e.target.value))}
                                    className="budget-slider"
                                    style={{ width: '100%' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: 'var(--text-tertiary)', fontSize: 13 }}>
                                    <span>200€</span><span>10 000€</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
                                {[500, 1000, 2000, 3000, 5000].map(v => (
                                    <button key={v} onClick={() => setBudget(v)}
                                        className={`category-pill ${budget === v ? 'active' : ''}`}>
                                        {v.toLocaleString()}€
                                    </button>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                                <button onClick={() => setView('breaks')} className="btn-ghost">Retour</button>
                                <button onClick={launch} className="btn-gold">
                                    <Sparkles className="w-5 h-5" /> Lancer la curation
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ LOADING ═══════════ */}
                {view === 'loading' && (
                    <motion.div key="loading" {...fadeUp} transition={{ duration: 0.6, ease }} className="screen">
                        <div className="narrow" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}
                                style={{ display: 'flex', justifyContent: 'center', marginBottom: 56 }}>
                                <div style={{ position: 'relative' }}>
                                    <div className="progress-ring" />
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Zap className="w-8 h-8 animate-pulse" style={{ color: 'var(--gold)' }} />
                                    </div>
                                </div>
                            </motion.div>
                            <h2 className="headline-lg" style={{ marginBottom: 12, color: '#fff' }}>Task Force en action.</h2>
                            <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'left', background: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 32, border: '1px solid rgba(255,255,255,0.05)' }}>
                                {LOADING_STEPS.map((s, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: i <= loadingStep ? 1 : 0.1, x: 0 }}
                                        style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: i < loadingStep ? 'var(--emerald)' : i === loadingStep ? s.color : 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
                                        <div>
                                            <p style={{ fontSize: 10, fontWeight: 800, color: i < loadingStep ? 'var(--emerald)' : s.color, letterSpacing: '0.05em', marginBottom: 2 }}>{s.agent}</p>
                                            <p style={{ fontSize: 13, color: i === loadingStep ? '#fff' : 'var(--text-tertiary)', fontWeight: i === loadingStep ? 500 : 400 }}>{s.msg}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ RESULTS ═══════════ */}
                {view === 'results' && (
                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                        style={{ position: 'relative', zIndex: 1 }}>

                        {/* Header */}
                        <section style={{ paddingTop: 120, paddingBottom: 40, textAlign: 'center', paddingLeft: 24, paddingRight: 24 }}>
                            <motion.p className="overline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: 20 }}>
                                ✓ {curations.length} hébergements sélectionnés sur {summary.analyzed}
                            </motion.p>
                            <motion.h1 className="hero-display" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }}
                                style={{ marginBottom: 16 }}>
                                Votre <span className="hero-accent">sélection.</span>
                            </motion.h1>
                            <motion.p className="body-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                style={{ maxWidth: 500, margin: '0 auto' }}>
                                Chaque option a été vérifiée, auditée et classée par nos 5 agents.
                            </motion.p>
                            {budgetNote && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                                    style={{ marginTop: 20, padding: '14px 24px', borderRadius: 16, background: 'rgba(255,180,0,0.1)', border: '1px solid rgba(255,180,0,0.3)', maxWidth: 600, margin: '20px auto 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <AlertTriangle size={18} style={{ color: '#FFB400', flexShrink: 0 }} />
                                    <span style={{ fontSize: 14, color: '#FFB400' }}>{budgetNote}</span>
                                </motion.div>
                            )}
                        </section>

                        {/* Filter Tabs */}
                        <section style={{ paddingBottom: 32, paddingLeft: 24, paddingRight: 24 }}>
                            <div className="wide" style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                                {propertyTypes.map(type => (
                                    <button key={type || 'all'} onClick={() => setFilterType(type || 'Tous')}
                                        className={`category-pill ${filterType === type ? 'active' : ''}`}>
                                        {type} {type !== 'Tous' && `(${curations.filter(c => c.propertyType === type).length})`}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Cards Grid */}
                        <section className="wide" style={{ paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                                {filtered.map((opt, i) => (
                                    <motion.div key={opt.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease }}
                                        onClick={() => setExpandedId(expandedId === opt.id ? null : opt.id)}>
                                        <div className={`dream-card ${expandedId === opt.id ? 'active' : ''}`}
                                            style={expandedId === opt.id ? { borderColor: 'var(--gold)' } : {}}>

                                            {/* Card Main */}
                                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                <div style={{ position: 'relative', height: 260 }}>
                                                    <img src={opt.image} alt={opt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                        <div className={`tag-pill ${opt.tag === 'PERFECTION' ? 'wide' : ''}`}
                                                            style={{ background: opt.tag === 'PERFECTION' ? 'var(--gold-gradient)' : 'rgba(0,0,0,0.6)', color: opt.tag === 'PERFECTION' ? 'black' : 'white', fontWeight: 700 }}>
                                                            {opt.tagLabel}
                                                        </div>
                                                        <div className="tag-pill" style={{ background: 'rgba(48,209,88,0.9)', color: 'white', display: 'flex', alignItems: 'center', gap: 4, backdropFilter: 'blur(10px)' }}>
                                                            <ShieldCheck size={12} />
                                                            <span>AUDIT COMPLET</span>
                                                        </div>
                                                    </div>
                                                    <div className="glass" style={{ position: 'absolute', bottom: 16, right: 16, padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                                                        {opt.propertyType || 'Hôtel'}
                                                    </div>
                                                </div>
                                                {/* Score */}
                                                <div className="glass" style={{ position: 'absolute', top: 20, right: 20, padding: '6px 14px', borderRadius: 980, display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: 13, fontWeight: 700 }}>
                                                    <Star className="w-3.5 h-3.5" style={{ fill: 'var(--gold)', color: 'var(--gold)' }} /> {opt.score}
                                                </div>

                                                {/* Bottom */}
                                                <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28, color: '#fff' }}>
                                                    <p style={{ fontSize: 12, fontWeight: 600, opacity: 0.5, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{opt.location}</p>
                                                    <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>{opt.title}</h3>
                                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                                        <div>
                                                            <p style={{ fontSize: 11, fontWeight: 700, opacity: 0.4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Total Vérifié</p>
                                                            <p className="price-reveal" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{opt.priceTotal.toLocaleString()}€</p>
                                                        </div>
                                                        <div className="glass" style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <ChevronRight className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded */}
                                            <AnimatePresence>
                                                {expandedId === opt.id && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.4, ease }} style={{ padding: 24, borderTop: '1px solid var(--border)' }}>
                                                        {[
                                                            { icon: <Hotel className="w-4 h-4" />, bg: 'rgba(10,132,255,0.1)', color: '#0a84ff', label: 'MAJOR SCOUT', text: opt.scoutReport },
                                                            { icon: <CheckCircle2 className="w-4 h-4" />, bg: 'rgba(48,209,88,0.1)', color: 'var(--emerald)', label: 'AGENT TRUTH', text: opt.truthReport },
                                                            { icon: <Plane className="w-4 h-4" />, bg: 'rgba(175,130,255,0.1)', color: '#af82ff', label: 'CDR. LOGISTICS', text: opt.logisticsReport },
                                                            { icon: <DollarSign className="w-4 h-4" />, bg: 'rgba(255,159,10,0.1)', color: '#ff9f0a', label: 'GUARDIAN BUDGET', text: opt.guardianReport },
                                                        ].map((r, j) => (
                                                            <div key={j} className="audit-line" style={{ alignItems: 'flex-start' }}>
                                                                <div className="audit-icon" style={{ background: r.bg, color: r.color, borderRadius: 8 }}>{r.icon}</div>
                                                                <div style={{ flex: 1 }}>
                                                                    <p className="caption" style={{ marginBottom: 4, fontSize: 10, fontWeight: 800, color: r.color }}>{r.label}</p>
                                                                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.text}</p>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: 'rgba(48,209,88,0.05)', border: '1px dashed rgba(48,209,88,0.3)', display: 'flex', alignItems: 'center', gap: 12 }}>
                                                            <ShieldCheck style={{ color: 'var(--emerald)' }} size={24} />
                                                            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--emerald)' }}>
                                                                SÉJOUR CERTIFIÉ SÉCURISÉ — Cet hébergement a passé avec succès les 48 points de contrôle de la Task Force Onyx.
                                                            </p>
                                                        </div>

                                                        <button className="btn-gold" style={{ width: '100%', marginTop: 24, borderRadius: 16, height: 56 }}>
                                                            Valider avec un concierge <ArrowRight className="w-5 h-5" />
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {filtered.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                                    <p className="headline-lg" style={{ marginBottom: 12 }}>Aucun résultat</p>
                                    <p className="body-lg">Essayez d'augmenter votre budget ou d'élargir vos critères.</p>
                                    <button onClick={() => setView('hero')} className="btn-gold" style={{ marginTop: 32 }}>Recommencer</button>
                                </div>
                            )}
                        </section>

                        {/* Stats */}
                        {curations.length > 0 && (
                            <section className="wide" style={{ paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
                                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                                    <h2 className="headline-lg" style={{ marginBottom: 12 }}>Pourquoi celles-ci.</h2>
                                    <p className="body-lg">{summary.rejected} options éliminées par la Task Force.</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                                    {[
                                        { icon: <AlertTriangle className="w-5 h-5" style={{ color: '#ff453a' }} />, n: "Vue/Bruit", desc: "Non vérifié ou bruit détecté." },
                                        { icon: <AlertTriangle className="w-5 h-5" style={{ color: '#ff9f0a' }} />, n: "Budget", desc: `Dépassement > ${budget.toLocaleString()}€.` },
                                        { icon: <AlertTriangle className="w-5 h-5" style={{ color: '#af82ff' }} />, n: "Logistique", desc: "Conflits identifiés." },
                                        { icon: <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--emerald)' }} />, n: `${curations.length} validés`, desc: "100% audités. Prêts à réserver.", gold: true },
                                    ].map((item, i) => (
                                        <div key={i} className="dream-card" style={{
                                            padding: 24, display: 'flex', gap: 16, cursor: 'default',
                                            ...(item.gold ? { borderColor: 'rgba(191,155,48,0.3)', boxShadow: '0 0 40px rgba(191,155,48,0.06)' } : {})
                                        }}>
                                            {item.icon}
                                            <div>
                                                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.n}</p>
                                                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* CTA */}
                        <section style={{ paddingBottom: 120, paddingLeft: 24, paddingRight: 24 }}>
                            <div className="wide">
                                <div className="dream-card" style={{ textAlign: 'center', padding: '80px 40px', cursor: 'default', borderColor: 'rgba(191,155,48,0.15)', boxShadow: '0 0 120px rgba(191,155,48,0.04)' }}>
                                    <h2 className="headline-lg" style={{ marginBottom: 12 }}>Prêt pour le départ ?</h2>
                                    <p className="body-lg" style={{ marginBottom: 40, maxWidth: 400, margin: '0 auto 40px' }}>Nos agents s'occupent de tout. Il ne reste qu'à dire oui.</p>
                                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', maxWidth: 440, margin: '0 auto', flexWrap: 'wrap' }}>
                                        <input type="email" placeholder="votre@email.com" className="apple-input" style={{ paddingLeft: 24, flex: 1, minWidth: 240 }} />
                                        <button className="btn-gold">Réserver</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </motion.div>
                )}

            </AnimatePresence>
        </div >
    );
}
