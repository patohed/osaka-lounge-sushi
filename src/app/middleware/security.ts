import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Configuración del rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 10, // Número de solicitudes
  duration: 1, // Por segundo
});

// Mapa para almacenar intentos de inicio de sesión fallidos
const loginAttempts = new Map();

// Headers de seguridad
const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "frame-src 'self' https://www.google.com/maps/; " +
    "connect-src 'self' https://api.osaka-sushi.com",
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};

// Función para sanitizar input
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Previene XSS básico
    .replace(/'/g, '′')   // Previene SQL injection básica
    .trim();
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Aplicar headers de seguridad
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Rate limiting
  const ip = request.ip ?? 'unknown';
  try {
    rateLimiter.consume(ip);
  } catch (err) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Prevención de ataques de fuerza bruta en login
  if (request.nextUrl.pathname === '/api/login') {
    const attempts = loginAttempts.get(ip) || 0;
    if (attempts >= 5) {
      return new NextResponse('Too Many Login Attempts', { status: 429 });
    }
    if (request.method === 'POST') {
      loginAttempts.set(ip, attempts + 1);
      // Reset después de 15 minutos
      setTimeout(() => loginAttempts.delete(ip), 15 * 60 * 1000);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};