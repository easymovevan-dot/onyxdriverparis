export default function LegalPage() {
    return (
        <main className="max-w-4xl mx-auto py-20 px-6 font-sans text-onyx-black">
            <h1 className="text-4xl font-serif font-bold mb-10">Mentions Légales</h1>

            <section className="space-y-8 text-sm leading-relaxed text-onyx-silver">
                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">1. Éditeur du Site</h2>
                    <p>Le site Onyx Platinum est édité par l'entreprise <strong>EASYMOVEVAN</strong> (ou ton nom définitif).<br />
                        Siège social : Cormeilles-en-Parisis, France.<br />
                        Numéro SIRET : [À COMPLÉTER]<br />
                        Responsable de la publication : [TON NOM]</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">2. Hébergement</h2>
                    <p>Le site est hébergé par Netlify Inc.<br />
                        Adresse : 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">3. Propriété Intellectuelle</h2>
                    <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">4. Protection des Données (RGPD)</h2>
                    <p>Conformément au RGPD, les informations recueillies via le formulaire de réservation (nom, téléphone, itinéraire) sont uniquement destinées à la gestion de votre prestation de transport et ne sont jamais cédées à des tiers.</p>
                </div>
            </section>
        </main>
    );
}
