import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Astronaut from '../public/assets/img/astronaut.png';
import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="h-min-screen md:h-screen w-full bg-[url(/assets/img/cover.png)] md:bg-[url(/assets/img/md-cover.png)] bg-cover bg-center flex flex-col">
      <div className="pt-48 pb-12">
        <h1 className="text-6xl font-bold text-center">Carinho Diário</h1>
      </div>

      <div className="w-full flex justify-center items-center">
        <Image
          src={Astronaut}
          alt="astronauta"
          className="w-2/3 md:w-1/5 animate-bounce"
        />
      </div>

      <div className="flex-1 flex justify-center py-12">
        <Link href="/diario" className="w-1/2 md:w-1/4">
          <Button className="w-full font-medium" size="lg">
            Começar
          </Button>
        </Link>
      </div>

      <footer className="w-full flex justify-center items-center font-medium text-sm p-3">
        <span>Feito com </span>
        <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" />
        <span> por </span>
        <Link href="https://mauricioneto.dev" target="_blank">
          <span className="underline ml-1">Mauricio Neto</span>
        </Link>
      </footer>
    </div>
  );
}
