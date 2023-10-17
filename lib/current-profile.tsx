import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import db from '@/lib/db';

export default async function currentProfile() {
  const user = await currentUser();

  if (!user) return redirectToSignIn();

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile)
    return {
      ...profile,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    };

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
    },
  });

  return newProfile;
}
