
import { auth } from '@/lib/auth';

export default auth((req) => {
  // Se o usuário não estiver logado e tentar acessar uma página de admin,
  // redireciona para a página de login.
  if (!req.auth && req.nextUrl.pathname.startsWith('/admin')) {
    const newUrl = new URL('/api/auth/signin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// O matcher garante que o middleware só será executado nas rotas de admin.
export const config = {
  matcher: ['/admin/:path*'],
};
