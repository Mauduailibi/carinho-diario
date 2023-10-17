'use client';

import Header from '@/components/header';
import BirthdayModal from '@/components/modals/birthday-modal';
import { useEffect, useState } from 'react';

interface DiarioClientProps {
  profile: {
    id: string;
    userId: string;
    birthday: Date | null;
  };
}

export default function DiarioClient({ profile }: DiarioClientProps) {
  const [hasBirthday, setHasBirthday] = useState(false);

  useEffect(() => {
    if (profile.birthday) {
      setHasBirthday(true);
    }
  }, [profile]);

  return (
    <>
      <BirthdayModal profileId={profile.id} isOpen={!hasBirthday} />
      <Header />
      <div className="w-full p-3">
        <span>
          {profile.birthday?.toLocaleDateString('pt-BR', {
            timeZone: 'UTC',
          })}
        </span>
      </div>
    </>
  );
}
