import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { firstname, lastname, email, password, city, phone } = await req.json();
  if (!firstname || !lastname || !email || !password || !city || !phone) {
    return NextResponse.json(
      { error: 'Not all required parameters are sent' },
      { status: 400 }
    );
  }

  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(firstname, {
        min: 1,
        max: 25
      }),
      errorMessage: 'Firstname is invalid'
    },
    {
      valid: validator.isLength(lastname, {
        min: 1,
        max: 25
      }),
      errorMessage: 'Lastname is invalid'
    },
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is invalid'
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: 'Phone number is invalid'
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMessage: 'City is invalid'
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: 'Password is not strong'
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
      email: email
    }
  });

  if (userWithEmail) {
    return NextResponse.json(
      { error: 'User with this email already exists' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstname,
      last_name: lastname,
      password: hashedPassword,
      city: city,
      phone: phone,
      email: email
    }
  });

  const alg = 'HS256';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime('24h')
    .sign(secret);

  return NextResponse.json({ token: token }, { status: 200 });
}
