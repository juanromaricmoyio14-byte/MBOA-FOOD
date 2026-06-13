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
    return <div className="min-h-screen bg-mboa-green flex items-center justify-center text-mboa-gold">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-mboa-green flex flex-col font-inter">
      {!profile ? (
        <ProfileSetup onComplete={setProfile} />
      ) : (
        <>
          <Header firstName={profile.firstName} />
          <main className="flex-1 flex flex-col">
            <ChatAssistant userProfile={profile} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
