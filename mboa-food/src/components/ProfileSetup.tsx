import { useState } from 'react';

interface ProfileSetupProps {
  onComplete: (profile: any) => void;
}

export const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [role, setRole] = useState<'etudiant' | 'foyer' | ''>('');
  const [peopleCount, setPeopleCount] = useState<number | ''>('');

  const handleNext = () => {
    if (step === 1 && firstName.trim() !== '') {
      setStep(2);
    } else if (step === 2 && role !== '') {
      setStep(3);
    } else if (step === 3 && peopleCount !== '' && Number(peopleCount) > 0) {
      const profile = {
        firstName: firstName.trim(),
        role,
        peopleCount: Number(peopleCount)
      };
      localStorage.setItem('mboaUserProfile', JSON.stringify(profile));
      onComplete(profile);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-screen relative overflow-hidden">
      {/* Background illustration emojis */}
      <div className="absolute inset-0 z-0 opacity-[0.03] text-[10rem] flex flex-wrap justify-around items-center gap-12 select-none pointer-events-none" aria-hidden="true">
        <span>🥑</span><span>🍌</span><span>🍳</span><span>🍲</span><span>🥥</span><span>🌶️</span><span>🥭</span><span>🍗</span><span>🍚</span><span>🍅</span><span>🌽</span><span>🧅</span>
      </div>

      <div className="w-full max-w-md bg-mboa-cream p-10 rounded-3xl shadow-float relative z-10 text-mboa-dark-text border border-mboa-gold/10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-mboa-gold font-playfair italic mb-2">Mboa Food</h1>
          <p className="text-sm italic text-mboa-dark-text/60">Votre assistant culinaire camerounais</p>
        </div>

        <div className="mb-10 min-h-[140px] flex flex-col justify-center">
          {step === 1 && (
            <div className="animate-fade-in w-full">
              <label className="block text-xl mb-4 font-playfair font-semibold text-center text-mboa-green">
                Bienvenue ! Comment tu t'appelles ?
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ton prénom..."
                className="w-full bg-white border-2 border-mboa-gold/30 rounded-2xl px-5 py-4 text-mboa-dark-text placeholder-mboa-dark-text/30 focus:outline-none focus:border-mboa-gold focus:ring-4 focus:ring-mboa-gold/10 transition-all text-center text-lg font-medium shadow-sm"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in w-full">
              <label className="block text-xl mb-4 font-playfair font-semibold text-center text-mboa-green">
                Enchanté <span className="text-mboa-gold italic">{firstName}</span> !<br/>Tu es étudiant(e) ou tu gères un foyer ?
              </label>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => { setRole('etudiant'); setTimeout(() => setStep(3), 300); }}
                  className={`w-full px-5 py-4 rounded-2xl border-2 transition-all font-medium shadow-sm text-lg ${role === 'etudiant' ? 'bg-mboa-rose border-mboa-gold text-mboa-green shadow-inner' : 'bg-white border-mboa-gold/20 hover:border-mboa-gold/50 hover:bg-mboa-rose/30 text-mboa-dark-text'}`}
                >
                  🎓 Je suis étudiant(e)
                </button>
                <button
                  onClick={() => { setRole('foyer'); setTimeout(() => setStep(3), 300); }}
                  className={`w-full px-5 py-4 rounded-2xl border-2 transition-all font-medium shadow-sm text-lg ${role === 'foyer' ? 'bg-mboa-soft-green border-mboa-green text-mboa-green shadow-inner' : 'bg-white border-mboa-green/20 hover:border-mboa-green/50 hover:bg-mboa-soft-green/30 text-mboa-dark-text'}`}
                >
                  🏡 Je gère un foyer
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in w-full">
              <label className="block text-xl mb-4 font-playfair font-semibold text-center text-mboa-green">
                Super ! Combien de personnes nourris-tu en général ?
              </label>
              <input
                type="number"
                min="1"
                value={peopleCount}
                onChange={(e) => setPeopleCount(parseInt(e.target.value) || '')}
                placeholder="Ex: 4"
                className="w-full bg-white border-2 border-mboa-gold/30 rounded-2xl px-5 py-4 text-mboa-dark-text placeholder-mboa-dark-text/30 focus:outline-none focus:border-mboa-gold focus:ring-4 focus:ring-mboa-gold/10 transition-all text-center text-2xl font-bold shadow-sm"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mt-4">
          <button
            onClick={handleNext}
            disabled={(step === 1 && !firstName.trim()) || (step === 2 && !role) || (step === 3 && (!peopleCount || Number(peopleCount) < 1))}
            className="w-full bg-mboa-gold text-mboa-green font-bold text-lg px-6 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 hover:shadow-lg transition-all transform active:scale-[0.98]"
          >
            {step === 3 ? 'Commencer l\'aventure ✨' : 'Continuer ➔'}
          </button>

          <div className="flex space-x-3 mt-6">
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-mboa-gold w-6' : 'bg-mboa-green/20'}`}></div>
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-mboa-gold w-6' : 'bg-mboa-green/20'}`}></div>
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-mboa-gold w-6' : 'bg-mboa-green/20'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
