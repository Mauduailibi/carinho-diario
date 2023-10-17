import DiarioClient from './components/client';
import currentProfile from '@/lib/current-profile';

export default async function DiarioPage() {
  const profile = await currentProfile();

  if (!profile) return null;

  return (
    <div className="w-full">
      <DiarioClient profile={profile} />
    </div>
  );
}
