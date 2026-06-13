import { useState, useEffect } from 'react';
import { ProfileSetup } from './components/ProfileSetup';
import { Header } from './components/Header';
import { ChatAssistant } from './components/ChatAssistant';

interface UserProfile {
  firstName: string;
  role: string;
  peopleCount: number;
}

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem('mboaUserProfile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Erreur de parsing du profil", e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-mboa-gold">
        <div className="text-center">
          <span className="text-4xl block mb-4 animate-pulse">🍲</span>
          <p className="font-playfair italic text-xl">Préparation en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {!profile ? (
        <ProfileSetup onComplete={setProfile} />
      ) : (
        <>
          <Header firstName={profile.firstName} />
          <main className="flex-1 flex flex-col w-full relative z-0">
            <ChatAssistant userProfile={profile} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
