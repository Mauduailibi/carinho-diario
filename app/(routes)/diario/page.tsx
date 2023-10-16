import { UserButton } from '@clerk/nextjs';

export default function DiarioPage() {
  return (
    <div>
      <h1>Logado</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
