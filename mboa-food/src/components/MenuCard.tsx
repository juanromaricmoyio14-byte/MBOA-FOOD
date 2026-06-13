
import type { Plat } from '../data/mboaData';

interface MenuCardProps {
  plat: Plat;
  isSeasonal: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({ plat, isSeasonal }) => {
  return (
    <div className="bg-mboa-cream rounded-xl p-5 shadow-lg border-l-4 border-mboa-gold text-mboa-green flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold font-poppins">{plat.nom}</h3>
        {isSeasonal && (
          <span className="bg-mboa-green text-mboa-gold text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            De Saison
          </span>
        )}
      </div>

      <p className="text-sm opacity-90 mb-4 flex-grow">{plat.description}</p>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-mboa-green/20">
        <div className="flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold">{plat.temps_preparation} min</span>
        </div>

        <div className="text-right">
          <span className="block text-xs opacity-70">Est. Coût</span>
          <span className="font-bold text-mboa-gold text-lg">{plat.prix_fcfa} FCFA</span>
        </div>
      </div>
    </div>
  );
};
