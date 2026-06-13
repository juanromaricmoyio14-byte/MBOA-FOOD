import React, { useState } from 'react';
import { Catalogue_Plats, Aliments_Saisonniers, type Plat } from '../data/mboaData';
import { MenuCard } from './MenuCard';

interface ChatAssistantProps {
  userProfile: {
    firstName: string;
    role: string;
    peopleCount: number;
  };
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ userProfile }) => {
  const [input, setInput] = useState('');
  const [recommendation, setRecommendation] = useState<{
    petitDej: Plat | null;
    platPrincipal: Plat | null;
  } | null>(null);

  const currentMonth = new Date().getMonth() + 1; // 1-12

  const parseInput = (text: string) => {
    let budget = null;
    let people = userProfile.peopleCount;
    let timeConstraint = null;

    // Extraire budget
    const budgetMatch = text.match(/(\d+)\s*(fcfa|francs?)/i);
    if (budgetMatch) budget = parseInt(budgetMatch[1], 10);

    // Extraire personnes
    const peopleMatch = text.match(/(\d+)\s*(personnes?)/i);
    if (peopleMatch) people = parseInt(peopleMatch[1], 10);

    // Extraire temps
    const timeMatch = text.match(/(moins\s*de|rapide|maximum)\s*(\d+)\s*min/i);
    if (timeMatch) timeConstraint = parseInt(timeMatch[2], 10);

    return { budget, people, timeConstraint };
  };

  const isDishSeasonal = (dish: Plat) => {
    if (dish.ingredients_saisonniers.length === 0) return false;

    return dish.ingredients_saisonniers.some(ingName => {
      const ingredient = Aliments_Saisonniers.find(a => a.nom === ingName);
      return ingredient ? ingredient.mois.includes(currentMonth) : false;
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const { budget, people, timeConstraint } = parseInput(input);

    // Filtres
    let availablePetitDej = Catalogue_Plats.filter(p => p.type === 'PETIT_DEJEUNER');
    let availablePlats = Catalogue_Plats.filter(p => p.type === 'PLAT_PRINCIPAL');

    if (timeConstraint) {
      availablePetitDej = availablePetitDej.filter(p => p.temps_preparation <= timeConstraint);
      availablePlats = availablePlats.filter(p => p.temps_preparation <= timeConstraint);
    }

    if (budget) {
      // Pour une personne
      const budgetPerPerson = budget / people;
      const budgetPetitDej = budgetPerPerson / 2;
      const budgetPlat = budgetPerPerson / 2;

      availablePetitDej = availablePetitDej.filter(p => p.prix_fcfa <= budgetPetitDej);
      availablePlats = availablePlats.filter(p => p.prix_fcfa <= budgetPlat);
    }

    // Prioriser les plats de saison
    const sortSeasonal = (a: Plat, b: Plat) => {
      const aSeas = isDishSeasonal(a);
      const bSeas = isDishSeasonal(b);
      if (aSeas && !bSeas) return -1;
      if (!aSeas && bSeas) return 1;
      return 0;
    };

    availablePetitDej.sort(sortSeasonal);
    availablePlats.sort(sortSeasonal);

    // Si on n'a rien trouvé, on prend le moins cher par défaut pour éviter un écran vide
    const selectedPetitDej = availablePetitDej.length > 0
      ? availablePetitDej[Math.floor(Math.random() * Math.min(3, availablePetitDej.length))]
      : Catalogue_Plats.filter(p => p.type === 'PETIT_DEJEUNER').sort((a,b) => a.prix_fcfa - b.prix_fcfa)[0];

    const selectedPlat = availablePlats.length > 0
      ? availablePlats[Math.floor(Math.random() * Math.min(3, availablePlats.length))]
      : Catalogue_Plats.filter(p => p.type === 'PLAT_PRINCIPAL').sort((a,b) => a.prix_fcfa - b.prix_fcfa)[0];

    setRecommendation({ petitDej: selectedPetitDej, platPrincipal: selectedPlat });
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 max-w-4xl mx-auto w-full">
      <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10 shadow-lg">
        <p className="text-sm sm:text-base opacity-90 mb-4">
          Que cherches-tu aujourd'hui ? Dis-moi ton budget, ton temps, ou le nombre de personnes...
          <br/>
          <span className="opacity-50 italic text-xs">Ex: "Aujourd'hui j'ai 2000 FCFA et 4 personnes à nourrir" ou "Je veux un menu rapide moins de 20 min"</span>
        </p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tape ta requête ici..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-mboa-gold focus:ring-1 focus:ring-mboa-gold transition-all"
          />
          <button
            onClick={handleSend}
            className="bg-mboa-gold text-mboa-green font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors whitespace-nowrap"
          >
            Suggérer
          </button>
        </div>
      </div>

      {recommendation && (
        <div className="animate-fade-in flex-1">
          <h2 className="text-xl font-bold font-poppins mb-4 text-mboa-gold">Ta suggestion du jour</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="h-full">
              <h3 className="text-sm uppercase tracking-wider mb-2 opacity-70 font-semibold">Petit Déjeuner</h3>
              <MenuCard
                plat={recommendation.petitDej!}
                isSeasonal={isDishSeasonal(recommendation.petitDej!)}
              />
            </div>
            <div className="h-full">
              <h3 className="text-sm uppercase tracking-wider mb-2 opacity-70 font-semibold">Plat Principal</h3>
              <MenuCard
                plat={recommendation.platPrincipal!}
                isSeasonal={isDishSeasonal(recommendation.platPrincipal!)}
              />
            </div>
          </div>

          <div className="bg-mboa-cream text-mboa-green rounded-xl p-4 flex justify-between items-center shadow-lg border border-mboa-gold/30">
            <span className="font-bold">Coût total estimé / personne</span>
            <span className="text-xl font-bold text-mboa-gold">
              {(recommendation.petitDej!.prix_fcfa + recommendation.platPrincipal!.prix_fcfa)} FCFA
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
