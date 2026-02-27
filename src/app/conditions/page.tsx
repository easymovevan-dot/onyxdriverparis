export default function CGVPage() {
    return (
        <main className="max-w-4xl mx-auto py-20 px-6 font-sans text-onyx-black">
            <h1 className="text-4xl font-serif font-bold mb-10">Conditions Générales de Vente</h1>

            <section className="space-y-8 text-sm leading-relaxed text-onyx-silver">
                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">1. Objet du Service</h2>
                    <p>Onyx Platinum fournit des prestations de transport de personnes en Voiture de Transport avec Chauffeur (VTC) exclusivement sur réservation préalable.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">2. Tarification</h2>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        <li><strong>Forfaits :</strong> Les tarifs pour les aéroports et Disneyland sont des tarifs fixes annoncés à l'avance.</li>
                        <li><strong>Trajets Minimum :</strong> Toute course dans notre zone d'intervention est facturée au minimum 55€.</li>
                        <li><strong>Mise à disposition :</strong> Sur devis, basée sur un tarif horaire ou journalier.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">3. Annulation</h2>
                    <p>L'annulation est gratuite jusqu'à 24h avant la prise en charge. Passé ce délai, des frais de 50% peuvent être appliqués. En cas de non-présentation du client ("No-show"), la totalité de la course est due.</p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">4. Bagages et Sécurité</h2>
                    <p>La capacité de notre van Mercedes EQV est de 7 passagers et environ 8 bagages volumineux. Le chauffeur se réserve le droit de refuser tout bagage mettant en péril la sécurité du véhicule.</p>
                </div>
            </section>
        </main>
    );
}
