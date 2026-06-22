export default function ConfidentialitePage() {
    return (
        <main className="max-w-4xl mx-auto py-20 px-6 font-sans text-onyx-black">
            <h1 className="text-4xl font-serif font-bold mb-10">Politique de Confidentialité</h1>

            <section className="space-y-8 text-sm leading-relaxed text-onyx-silver">
                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">1. Responsable du Traitement</h2>
                    <p>
                        EASYMOVEVAN, dont le siège social est situé à Cormeilles-en-Parisis, France,
                        est responsable du traitement de vos données personnelles collectées via le site
                        Onyx Drive Paris.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">2. Données Collectées</h2>
                    <p>Lors d'une demande de réservation, nous collectons les informations suivantes :</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Nom complet</li>
                        <li>Adresse e-mail</li>
                        <li>Numéro de téléphone</li>
                        <li>Adresses de départ et d'arrivée</li>
                        <li>Date et heure du trajet</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">3. Finalité du Traitement</h2>
                    <p>
                        Ces données sont collectées exclusivement pour la gestion et l'exécution de votre
                        prestation de transport. Elles ne sont jamais revendues ni transmises à des tiers
                        à des fins commerciales.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">4. Durée de Conservation</h2>
                    <p>
                        Vos données sont conservées pendant une durée maximale de 3 ans à compter de la
                        dernière prestation réalisée, conformément aux obligations légales comptables.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">5. Vos Droits (RGPD)</h2>
                    <p>
                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
                        des droits suivants : accès, rectification, suppression, limitation et portabilité
                        de vos données. Pour exercer ces droits, contactez-nous à :{" "}
                        <a href="mailto:contact@onyxdriveparis.fr" className="underline hover:text-black transition-colors">
                            contact@onyxdriveparis.fr
                        </a>
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">6. Cookies</h2>
                    <p>
                        Ce site n'utilise pas de cookies publicitaires ou de tracking. Seuls des cookies
                        techniques strictement nécessaires au bon fonctionnement du site peuvent être utilisés.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">7. Sécurité</h2>
                    <p>
                        Vos données sont stockées de manière sécurisée via Firebase (Google Cloud), avec
                        chiffrement en transit et au repos. Aucun numéro de carte bancaire n'est stocké
                        sur nos serveurs.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-bold text-onyx-black mb-4">8. Contact & Réclamation</h2>
                    <p>
                        Pour toute question relative à vos données personnelles, contactez-nous par e-mail
                        ou adressez une réclamation à la CNIL :{" "}
                        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-black transition-colors">
                            www.cnil.fr
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}
