'use client';

import Header from '@/components/header';
import BirthdayModal from '@/components/modals/birthday-modal';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface DiarioClientProps {
  profile: {
    id: string;
    userId: string;
    birthday: Date | null;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  motivationalPhrase: {
    content: string;
    author: string;
  };
  tarotCard: {
    type: string;
    name: string;
    name_short: string;
    value: string;
    value_int: number;
    meaning_up: string;
    desc: string;
  };
  horoscope: {
    horoscope: string;
    sign: string;
    date: string;
  };
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
  dog: string;
}

export default function DiarioClient({
  profile,
  motivationalPhrase,
  tarotCard,
  horoscope,
  movie,
  dog,
}: DiarioClientProps) {
  const [hasBirthday, setHasBirthday] = useState(false);
  const [isTarotBlur, setIsTarotBlur] = useState(true);

  useEffect(() => {
    if (profile.birthday) {
      setHasBirthday(true);
    }
  }, [profile]);

  const movieDate = new Date(movie.release_date).toLocaleDateString();

  return (
    <>
      <BirthdayModal profileId={profile.id} isOpen={!hasBirthday} />
      <Header />
      <div className="w-full px-3 py-6 space-y-6">
        <div className="w-full flex flex-col items-center">
          <Avatar className="w-1/3 md:w-[100px] h-auto">
            <AvatarImage src={profile.imageUrl} />
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-medium mt-2">
            {profile.firstName} {profile.lastName}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frase do dia</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-justify">
            <p>&quot;{motivationalPhrase.content}&quot;</p>
          </CardContent>
          <CardFooter>
            <span className="text-muted-foreground italic font-medium">
              {motivationalPhrase.author}
            </span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doguinho aleatório</CardTitle>
            <CardDescription>Só porque é fofo mesmo</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={dog}
              width={1080}
              height={720}
              alt="dog"
              className="rounded-md md:w-[200px] md:h-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={cn('', isTarotBlur && 'blur')}>
            <CardTitle>{tarotCard.name}</CardTitle>
          </CardHeader>
          <CardContent className={cn('', isTarotBlur && 'blur')}>
            <div className="space-y-2 font-medium text-sm text-justify">
              <p>{tarotCard.desc}</p>
              <p className="text-muted-foreground">
                Significado:{' '}
                <span className="italic">{tarotCard.meaning_up}</span>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setIsTarotBlur(!isTarotBlur)}
              className="w-full md:w-auto"
            >
              {isTarotBlur ? 'Revelar Tarot' : 'Esconder Tarot'}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Horóscopo</CardTitle>
            <CardDescription>{horoscope.sign}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-justify">
            <p>{horoscope.horoscope}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{movie.title}</CardTitle>
            <CardDescription>{movieDate}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-justify space-y-3">
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              width={500}
              height={750}
              alt={movie.title}
              className="w-full lg:w-[200px] h-auto rounded-md"
            />
            <p>
              {movie.overview.length === 0 ? 'Sem descrição' : movie.overview}
            </p>
          </CardContent>
          <CardFooter>
            <Link
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              className="w-full"
            >
              <Button className="w-full md:w-auto">Assistir</Button>
            </Link>
          </CardFooter>
        </Card>

        <footer className="w-full flex justify-center items-center font-medium text-sm p-3">
          <span>Feito com </span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" />
          <span> por </span>
          <Link href="https://mauricioneto.dev" target="_blank">
            <span className="underline ml-1">Mauricio Neto</span>
          </Link>
        </footer>
      </div>
    </>
  );
}
