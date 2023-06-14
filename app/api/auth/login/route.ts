import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';

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
}
