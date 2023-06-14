import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';

export async function POST(req: NextRequest) {
  const { firstname, lastname, email, password, city, phone } = await req.json();
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

  return NextResponse.json('body', { status: 200 });
}
