import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1] as string;
  if (!token) {
    return NextResponse.json({ error: 'No bearer token' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  return NextResponse.json();
}
