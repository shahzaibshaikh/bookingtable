import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';

export async function POST(req: NextRequest) {
  const { firstname, lastname } = await req.json();
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
      errorMessage: 'Firstname is invalid'
    }
  ];

  return NextResponse.json('body', { status: 200 });
}
