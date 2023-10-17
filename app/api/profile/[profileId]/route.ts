import currentProfile from '@/lib/current-profile';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } },
) {
  try {
    const profile = await currentProfile();
    const body = await req.json();
    const birthday = body.birthday;

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!birthday) {
      return new NextResponse('Birthday is required', { status: 400 });
    }
    if (profile.id !== params.profileId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const updatedProfile = await db.profile.update({
      where: { id: profile.id },
      data: { birthday },
    });
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log('[PROFILE_PATCH]', error);
    return new NextResponse('Erro interno', { status: 500 });
  }
}
