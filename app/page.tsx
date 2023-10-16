import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Carinho diário</h1>
      <Link href="/diario">
        <Button>Começar</Button>
      </Link>
    </div>
  );
}
