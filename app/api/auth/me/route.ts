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

  return NextResponse.json(user, { status: 200 });
}
