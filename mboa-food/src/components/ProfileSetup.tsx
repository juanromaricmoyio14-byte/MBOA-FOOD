import { useState } from 'react';

interface ProfileSetupProps {
  onComplete: (profile: any) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
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
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-mboa-green text-white min-h-screen">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-mboa-gold mb-6 text-center font-poppins">Mboa Food</h1>

        <div className="mb-8 min-h-[120px]">
          {step === 1 && (
            <div className="animate-fade-in">
              <p className="text-xl mb-4 font-medium">Bienvenue ! Comment tu t'appelles ?</p>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ton prénom..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-mboa-gold focus:ring-1 focus:ring-mboa-gold transition-all"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              />
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <p className="text-xl mb-4 font-medium">Enchanté {firstName} ! Tu es étudiant(e) ou tu gères un foyer familial ?</p>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => { setRole('etudiant'); setTimeout(() => setStep(3), 300); }}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${role === 'etudiant' ? 'bg-mboa-gold/20 border-mboa-gold text-mboa-gold' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                >
                  Je suis étudiant(e)
                </button>
                <button
                  onClick={() => { setRole('foyer'); setTimeout(() => setStep(3), 300); }}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${role === 'foyer' ? 'bg-mboa-gold/20 border-mboa-gold text-mboa-gold' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                >
                  Je gère un foyer
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <p className="text-xl mb-4 font-medium">Super ! Combien de personnes nourris-tu en général ?</p>
              <input
                type="number"
                min="1"
                value={peopleCount}
                onChange={(e) => setPeopleCount(parseInt(e.target.value) || '')}
                placeholder="Nombre de personnes..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-mboa-gold focus:ring-1 focus:ring-mboa-gold transition-all"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-2">
            <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-mboa-gold' : 'bg-white/20'}`}></div>
            <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-mboa-gold' : 'bg-white/20'}`}></div>
            <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-mboa-gold' : 'bg-white/20'}`}></div>
          </div>

          <button
            onClick={handleNext}
            disabled={(step === 1 && !firstName.trim()) || (step === 2 && !role) || (step === 3 && (!peopleCount || Number(peopleCount) < 1))}
            className="bg-mboa-gold text-mboa-green font-bold px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors"
          >
            {step === 3 ? 'C\'est parti !' : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
};
