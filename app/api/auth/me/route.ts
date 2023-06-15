import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const bearerToken = req.headers.get('authorization')?.split(' ')[1] as string;
  if (!bearerToken) {
    return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
  }

  return NextResponse.json(bearerToken);
}
