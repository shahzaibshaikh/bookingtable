import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1] as string;

  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload?.email
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true
    }
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  return NextResponse.json(
    {
      id: user.id,
      firstname: user.first_name,
      lastname: user.last_name,
      phone: user.phone,
      city: user.city,
      email: user.email
    },
    { status: 200 }
  );
}
