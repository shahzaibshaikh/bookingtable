import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const bearerToken = req.headers.get('authorization') as string;
  return NextResponse.json(bearerToken);
}
