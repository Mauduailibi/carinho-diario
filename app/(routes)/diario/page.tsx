import axios from 'axios';
import DiarioClient from './components/client';
import currentProfile from '@/lib/current-profile';
import translate from 'translate';
import { getPortugueseSign, getZodiacSign } from '@/functions/getZodiacSign';

export default async function DiarioPage() {
  const profile = await currentProfile();

  if (!profile) return null;

  //    Request Tarot
  async function getTodayTarot() {
    try {
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
    } catch (error) {
      return {};
    }
  }

  // Request Motivational Phrase
  async function getMotivationalPhrase() {
    try {
      const response = await axios.get(
        `${process.env.QUOTE_API_URL}/random?tags=love|happiness`,
      );

      const phrase = response.data.content;
      const phraseTranslated = await translate(phrase, {
        from: 'en',
        to: 'pt',
      });

      return {
        content: phraseTranslated,
        author: response.data.author,
      };
    } catch (error) {
      return {
        content: '',
        author: '',
      };
    }
  }

  // Request todays horoscope
  async function getTodayHoroscope() {
    try {
      const sign = await getZodiacSign(
        profile.birthday.toISOString().split('T')[0],
      );

      const response = await axios.post(`${process.env.HOROSCOPE_API_URL}`, {
        date: new Date().toISOString().split('T')[0],
        sign,
        lang: 'pt',
      });

      return {
        ...response.data,
        sign: await getPortugueseSign(sign),
      };
    } catch (error) {
      return {};
    }
  }

  // Request movie recommendation
  async function getMovieRecommendation() {
    // random int number until 40536
    const randomPage = Math.floor(Math.random() * 500) + 1;
    const randomResults = Math.floor(Math.random() * 20);

    try {
      const response = await axios.get(
        `${process.env.TMDB_API_URL}/discover/movie`,
        {
          params: {
            include_adult: 'false',
            include_video: 'false',
            language: 'pt-BR',
            page: randomPage,
          },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_AUTH}`,
          },
        },
      );

      return response.data.results[randomResults];
    } catch (error) {
      return {};
    }
  }

  // Request dog image
  async function getDogImage() {
    try {
      const response = await axios.get(
        `${process.env.DOG_API_URL}/breeds/image/random`,
      );

      return response.data.message;
    } catch (error) {
      return '';
    }
  }

  const tarotCard = await getTodayTarot();
  const motivationalPhrase = await getMotivationalPhrase();
  const horoscope = await getTodayHoroscope();
  const movieRecommendation = await getMovieRecommendation();
  const dogImage = await getDogImage();

  return (
    <div className="w-full">
      <DiarioClient
        profile={profile}
        motivationalPhrase={motivationalPhrase}
        tarotCard={tarotCard}
        horoscope={horoscope}
        movie={movieRecommendation}
        dog={dogImage}
      />
    </div>
  );
}
