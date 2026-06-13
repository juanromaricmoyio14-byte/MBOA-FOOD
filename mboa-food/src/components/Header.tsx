import { useState, useEffect } from 'react';

interface HeaderProps {
  firstName: string;
}

export const Header = ({ firstName }: HeaderProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const currentDate = new Date();
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const formattedDate = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  return (
    <header className="w-full bg-gradient-to-b from-mboa-green to-mboa-green-light py-8 px-6 sm:px-8 shadow-soft relative z-10 rounded-b-3xl">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-[2.5rem] font-playfair font-bold italic text-mboa-gold m-0 leading-none mb-2 drop-shadow-md">
            Mboa Food
          </h1>
          <p className="text-sm italic text-white/90 font-lato tracking-wide">
            Votre assistant culinaire camerounais
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium shadow-sm transition-all hover:bg-white/15">
            <span className="capitalize">{formattedDate}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium shadow-sm transition-all hover:bg-white/15">
            <span>Bonjour, <span className="font-bold text-mboa-rose">{firstName}</span></span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 rounded-full flex items-center space-x-2 text-xs font-medium shadow-sm" title={isOnline ? "Connecté" : "Mode Hors Ligne"}>
            <div className={`w-2.5 h-2.5 rounded-full shadow-inner ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="hidden sm:inline-block">{isOnline ? 'En ligne' : 'Hors ligne'}</span>
          </div>
        </div>

      </div>
    </header>
  );
};
