import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is invalid'
    },
    {
      valid: validator.isLength(password, { min: 1 }),
      errorMessage: 'Password is invalid'
    }
  ];

  validationSchema.forEach(check => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!userWithEmail) {
    return NextResponse.json({ error: 'Email or password is invalid' }, { status: 401 });
  }

  const isMatch = bcrypt.compare(password, userWithEmail.password);

  if (!isMatch) {
    return NextResponse.json({ error: 'Email or password is invalid' }, { status: 401 });
  }

  const alg = 'HS256';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  const token = await new jose.SignJWT({ email: userWithEmail.email })
    .setProtectedHeader({ alg })
    .setExpirationTime('24h')
    .sign(secret);

  return NextResponse.json({ token: token }, { status: 200 });
}