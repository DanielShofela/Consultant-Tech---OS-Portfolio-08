
import React from 'react';

const AboutApp: React.FC<{windowId: string}> = () => {
    return (
        <div className="p-6 bg-gray-900/30 rounded-lg text-gray-200 h-full overflow-y-auto">
            <div className="flex items-center mb-6">
                <img src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" className="w-24 h-24 rounded-full mr-6 border-4 border-cyan-500"/>
                <div>
                    <h1 className="text-4xl font-bold text-white">Consultant Tech</h1>
                    <p className="text-xl text-cyan-400">Senior Frontend & AI Integration Specialist</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold border-b-2 border-cyan-700 pb-2 mb-3">Philosophie</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Je crois en la création d'interfaces qui ne sont pas seulement fonctionnelles, mais aussi intuitives et esthétiquement plaisantes. En adoptant une approche systémique, je conçois des solutions logicielles robustes et évolutives qui s'alignent parfaitement avec les objectifs métier. Ma passion est de transformer des problèmes complexes en expériences utilisateur fluides et élégantes, en tirant parti des dernières avancées en matière de technologies web et d'intelligence artificielle.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold border-b-2 border-cyan-700 pb-2 mb-3">Compétences Clés</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-300 list-disc list-inside">
                        <li>React & TypeScript</li>
                        <li>UI/UX Design & Architecture</li>
                        <li>Intégration d'API (Gemini, OpenAI)</li>
                        <li>State Management (Redux, Zustand)</li>
                        <li>Data Visualization (D3.js, Recharts)</li>
                        <li>Node.js & Express</li>
                        <li>CI/CD & DevOps Principles</li>
                        <li>Cloud Platforms (GCP, AWS)</li>
                    </ul>
                </div>

                 <div>
                    <h2 className="text-2xl font-semibold border-b-2 border-cyan-700 pb-2 mb-3">Contact</h2>
                    <p className="text-gray-300">
                        Prêt à discuter de votre prochain projet ? Contactez-moi via le terminal avec la commande <code className="bg-gray-700 text-cyan-300 px-1.5 py-0.5 rounded-md text-sm">contact</code>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutApp;
