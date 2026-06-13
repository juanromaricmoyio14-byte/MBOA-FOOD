import { useState } from 'react';
import { Catalogue_Plats, Aliments_Saisonniers, type Plat } from '../data/mboaData';
import { MenuCard } from './MenuCard';
import { getMenuRecommendation } from '../services/geminiService';

interface ChatAssistantProps {
  userProfile: {
    firstName: string;
    role: string;
    peopleCount: number;
  };
}

export const ChatAssistant = ({ userProfile }: ChatAssistantProps) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    petitDej: Plat | null;
    platPrincipal: Plat | null;
  } | null>(null);

  const currentMonth = new Date().getMonth() + 1; // 1-12

  const isDishSeasonal = (dish: Plat) => {
    if (dish.ingredients_saisonniers.length === 0) return false;

    return dish.ingredients_saisonniers.some(ingName => {
      const ingredient = Aliments_Saisonniers.find(a => a.nom === ingName);
      return ingredient ? ingredient.mois.includes(currentMonth) : false;
    });
  };

  const parseInputFallback = (text: string) => {
    let budget = null;
    let people = userProfile.peopleCount;
    let timeConstraint = null;

    const budgetMatch = text.match(/(\d+)\s*(fcfa|francs?)/i);
    if (budgetMatch) budget = parseInt(budgetMatch[1], 10);

    const peopleMatch = text.match(/(\d+)\s*(personnes?)/i);
    if (peopleMatch) people = parseInt(peopleMatch[1], 10);

    const timeMatch = text.match(/(moins\s*de|rapide|maximum)\s*(\d+)\s*min/i);
    if (timeMatch) timeConstraint = parseInt(timeMatch[2], 10);

    return { budget, people, timeConstraint };
  };

  const handleLocalFallback = (text: string) => {
    const { budget, people, timeConstraint } = parseInputFallback(text);

    let availablePetitDej = Catalogue_Plats.filter(p => p.type === 'PETIT_DEJEUNER');
    let availablePlats = Catalogue_Plats.filter(p => p.type === 'PLAT_PRINCIPAL');

    if (timeConstraint) {
      availablePetitDej = availablePetitDej.filter(p => p.temps_preparation <= timeConstraint);
      availablePlats = availablePlats.filter(p => p.temps_preparation <= timeConstraint);
    }

    if (budget) {
      const budgetPerPerson = budget / people;
      const budgetPetitDej = budgetPerPerson / 2;
      const budgetPlat = budgetPerPerson / 2;

      availablePetitDej = availablePetitDej.filter(p => p.prix_fcfa <= budgetPetitDej);
      availablePlats = availablePlats.filter(p => p.prix_fcfa <= budgetPlat);
    }

    const sortSeasonal = (a: Plat, b: Plat) => {
      const aSeas = isDishSeasonal(a);
      const bSeas = isDishSeasonal(b);
      if (aSeas && !bSeas) return -1;
      if (!aSeas && bSeas) return 1;
      return 0;
    };

    availablePetitDej.sort(sortSeasonal);
    availablePlats.sort(sortSeasonal);

    const selectedPetitDej = availablePetitDej.length > 0
      ? availablePetitDej[Math.floor(Math.random() * Math.min(3, availablePetitDej.length))]
      : Catalogue_Plats.filter(p => p.type === 'PETIT_DEJEUNER').sort((a,b) => a.prix_fcfa - b.prix_fcfa)[0];

    const selectedPlat = availablePlats.length > 0
      ? availablePlats[Math.floor(Math.random() * Math.min(3, availablePlats.length))]
      : Catalogue_Plats.filter(p => p.type === 'PLAT_PRINCIPAL').sort((a,b) => a.prix_fcfa - b.prix_fcfa)[0];

    setRecommendation({ petitDej: selectedPetitDej, platPrincipal: selectedPlat });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = input;
    setInput('');

    try {
      // 1. Tenter l'appel Gemini
      const geminiResult = await getMenuRecommendation(
        userMessage,
        userProfile,
        Catalogue_Plats,
        currentMonth
      );

      if (geminiResult && geminiResult.breakfast && geminiResult.mainDish) {
        const foundBreakfast = Catalogue_Plats.find(p => p.id === geminiResult.breakfast && p.type === 'PETIT_DEJEUNER');
        const foundMain = Catalogue_Plats.find(p => p.id === geminiResult.mainDish && p.type === 'PLAT_PRINCIPAL');

        if (foundBreakfast && foundMain) {
          setRecommendation({ petitDej: foundBreakfast, platPrincipal: foundMain });
          setIsLoading(false);
          return;
        }
      }

      // 2. Si échec API ou Ids non trouvés, utiliser le fallback
      handleLocalFallback(userMessage);

    } catch (e) {
      // En cas d'erreur réseau, fallback
      handleLocalFallback(userMessage);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 max-w-4xl mx-auto w-full relative pb-28">

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 border-4 border-mboa-gold border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-playfair italic text-xl text-mboa-gold animate-pulse">L'IA réfléchit à votre menu...</p>
        </div>
      ) : !recommendation ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-80 mt-10">
          <span className="text-6xl mb-6">🍽️</span>
          <h2 className="text-2xl font-playfair italic mb-2">Prêt à cuisiner ?</h2>
          <p className="font-light text-white/70 max-w-sm">Pose-moi tes questions en bas de l'écran et je te concocterai un menu sur mesure.</p>
        </div>
      ) : (
        <div className="animate-fade-in flex-1">
          <div className="text-center mb-8 mt-4">
            <h2 className="text-3xl font-bold font-playfair text-mboa-gold mb-2">Ton Menu du Jour</h2>
            <p className="text-sm italic opacity-80">Préparé avec amour spécialement pour toi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            <div className="h-full transform transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-sm uppercase tracking-widest mb-3 opacity-90 font-bold text-center">Matin</h3>
              <MenuCard
                plat={recommendation.petitDej!}
                isSeasonal={isDishSeasonal(recommendation.petitDej!)}
              />
            </div>
            <div className="h-full transform transition-transform hover:scale-[1.02] duration-300">
              <h3 className="text-sm uppercase tracking-widest mb-3 opacity-90 font-bold text-center">Soir</h3>
              <MenuCard
                plat={recommendation.platPrincipal!}
                isSeasonal={isDishSeasonal(recommendation.platPrincipal!)}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 flex justify-between items-center shadow-lg border border-white/20 mx-auto max-w-lg transition-all hover:bg-white/15">
            <div className="flex flex-col">
              <span className="font-medium text-sm opacity-80">Coût estimé / personne</span>
              <span className="text-xs italic opacity-60">Repas principal + Petit déj</span>
            </div>
            <span className="text-2xl font-bold text-mboa-gold font-playfair">
              {(recommendation.petitDej!.prix_fcfa + recommendation.platPrincipal!.prix_fcfa)} FCFA
            </span>
          </div>
        </div>
      )}

      {/* Floating Chat Input */}
      <div className="fixed bottom-6 left-0 right-0 px-4 z-20 pointer-events-none">
        <div className="max-w-3xl mx-auto flex bg-mboa-cream rounded-full p-2 shadow-float border border-mboa-gold/20 pointer-events-auto transition-transform focus-within:-translate-y-1 duration-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            placeholder="Ex : J ai 2000 FCFA pour 3 personnes ce soir..."
            className="flex-1 bg-transparent border-none px-6 py-3 text-mboa-dark-text placeholder-mboa-dark-text/40 italic focus:outline-none font-medium text-base sm:text-lg disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-mboa-gold text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-yellow-500 hover:scale-105 transition-all shadow-md ml-2 flex-shrink-0 disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Envoyer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
