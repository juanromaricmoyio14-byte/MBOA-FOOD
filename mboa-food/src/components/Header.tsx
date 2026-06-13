import { useState, useEffect } from 'react';

interface HeaderProps {
  firstName: string;
}

export const Header: React.FC<HeaderProps> = ({ firstName }) => {
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
    <header className="py-4 px-6 bg-mboa-green border-b border-white/10 flex justify-between items-center sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold text-mboa-gold m-0">Mboa Food</h1>
        <p className="text-sm opacity-80 capitalize">{formattedDate}</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm hidden sm:inline-block">Bonjour, <span className="font-semibold">{firstName}</span></span>
        </div>

        <div className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-full text-xs">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span>{isOnline ? 'En ligne' : 'Hors ligne'}</span>
        </div>
      </div>
    </header>
  );
};
