import type { Plat } from '../data/mboaData';

interface MenuCardProps {
  plat: Plat;
  isSeasonal: boolean;
}

export const MenuCard = ({ plat, isSeasonal }: MenuCardProps) => {
  const isBreakfast = plat.type === 'PETIT_DEJEUNER';
  const stripColor = isBreakfast ? 'bg-mboa-rose' : 'bg-mboa-soft-green';
  const emoji = isBreakfast ? '☕' : '🍲';

  return (
    <div className="bg-mboa-cream rounded-2xl shadow-soft hover:shadow-float hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full border border-black/5">
      {/* Top colored strip */}
      <div className={`h-2 w-full ${stripColor}`}></div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-xl font-bold font-playfair text-mboa-green leading-tight">
            <span className="mr-2">{emoji}</span>{plat.nom}
          </h3>
          {isSeasonal && (
            <span className="bg-mboa-gold/10 text-mboa-gold border border-mboa-gold/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
              Saison ✨
            </span>
          )}
        </div>

        <p className="text-sm text-mboa-dark-text/70 italic mb-5 flex-grow font-light leading-relaxed">
          {plat.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-black/5">
          <div className="flex items-center text-mboa-dark-text/80 bg-black/5 px-3 py-1.5 rounded-full">
            <span className="mr-1.5 text-lg">⏱️</span>
            <span className="text-sm font-semibold">{plat.temps_preparation} min</span>
          </div>

          <div className="text-right flex items-center bg-mboa-gold/10 px-3 py-1.5 rounded-full">
            <span className="font-bold text-mboa-gold text-lg mr-1.5">{plat.prix_fcfa}</span>
            <span className="text-xs font-bold text-mboa-gold/70">FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
