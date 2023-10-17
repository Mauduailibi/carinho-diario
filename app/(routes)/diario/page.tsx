import axios from 'axios';
import DiarioClient from './components/client';
import currentProfile from '@/lib/current-profile';
import translate from 'translate';

export default async function DiarioPage() {
  const profile = await currentProfile();

  if (!profile) return null;

  async function getTodayTarot() {
    const response = await axios.get(
      `${process.env.TAROT_API_URL}/cards/random?n=1`,
    );

    const tarotCard = response.data.cards[0];
    const tarotCardKeys = Object.keys(tarotCard);

    for (const key of tarotCardKeys) {
      tarotCard[key] = await translate(tarotCard[key], {
        from: 'en',
        to: 'pt',
      });
    }

    return tarotCard;
  }

  async function getMotivationalPhrase() {
    const response = await axios.get(
      'https://api.quotable.io/random?tags=love|happiness',
    );

    const phrase = response.data.content;
    const phraseTranslated = await translate(phrase, { from: 'en', to: 'pt' });
    return {
      content: phraseTranslated,
      author: response.data.author,
    };
  }

  const tarotCard = await getTodayTarot();
  const motivationalPhrase = await getMotivationalPhrase();

  return (
    <div className="w-full">
      <DiarioClient
        profile={profile}
        motivationalPhrase={motivationalPhrase}
        tarotCard={tarotCard}
      />
    </div>
  );
}
