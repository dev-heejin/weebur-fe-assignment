import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookie = request.cookies.get('viewMode');

  if (!cookie) {
    const view = Math.random() < 0.5 ? 'grid' : 'list';
    console.log('Set view mode:', view);
    response.cookies.set('viewMode', view, {
      path: '/',
      //@TODO: Set a proper expiration date
      expires: new Date(0),
    });
  }

  return response;
}

export const config = {
  matcher: ['/products'],
};
