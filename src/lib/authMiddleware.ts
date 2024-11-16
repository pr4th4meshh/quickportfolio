import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './auth'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const decodedToken = verifyToken(token)
  if (!decodedToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', decodedToken.userId)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/dashboard/:path*'],
}