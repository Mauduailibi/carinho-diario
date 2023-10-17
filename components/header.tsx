'use client';

import { UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="w-full flex justify-between p-3 border-b-2">
      <div />
      <h1 className="text-2xl font-bold">Carinho Diário</h1>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}
