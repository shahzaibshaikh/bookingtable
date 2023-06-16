import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('Hello I am middlware.');
}

export const config = {
  matcher: ['/api/auth/me']
};
