import { type Plat } from '../data/mboaData';

export async function getMenuRecommendation(
  userMessage: string,
  userProfile: { firstName: string; role: string; peopleCount: number },
  availableDishes: Plat[],
  _currentMonth: number
): Promise<{ breakfast: string; mainDish: string } | null> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Gemini API key missing");
    return null;
  }

  const prompt = `Tu es un assistant culinaire camerounais intelligent. Message utilisateur : ${userMessage}. Profil : ${JSON.stringify(userProfile)}. Plats disponibles ce mois-ci : ${JSON.stringify(availableDishes)}. Analyse le message, extrais le budget en FCFA et le nombre de personnes, tiens compte du temps de préparation si l utilisateur est pressé. Réponds UNIQUEMENT en JSON valide avec exactement ces deux champs : breakfast contenant l id du meilleur petit déjeuner choisi, mainDish contenant l id du meilleur plat principal choisi. Aucun texte en dehors du JSON.`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extraire le texte de la réponse Gemini
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
      let responseText = data.candidates[0].content.parts[0].text;

      // Nettoyer le JSON potentiel s'il est enveloppé dans des backticks markdown (ex: ```json\n {...} \n```)
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

      const parsedJson = JSON.parse(responseText);

      if (parsedJson.breakfast && parsedJson.mainDish) {
        return {
          breakfast: parsedJson.breakfast,
          mainDish: parsedJson.mainDish
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch from Gemini:", error);
    return null;
  }
}
