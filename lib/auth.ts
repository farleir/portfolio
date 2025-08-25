
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { getDb } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { D1Database } from '@cloudflare/workers-types';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & Omit<typeof users.$inferSelect, 'id'>;
  }
}

// Uma função para obter a instância do banco de dados a partir do runtime.
// No ambiente Cloudflare, `process.env.DB` é o binding para o D1.
function dbInstance() {
    // Esta é a forma de acessar o binding do D1 no Cloudflare Pages/Workers.
    const d1 = process.env.DB as D1Database;
    return getDb(d1);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(dbInstance()),
  providers: [
    GitHub,
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Lógica de autorização para email/senha.
        // NOTA: Em um projeto real, você precisaria de hash de senha.
        // Este é um exemplo simplificado.
        const { email } = credentials;
        const db = dbInstance();
        const user = await db.query.users.findFirst({
            where: eq(users.email, email as string),
        });

        if (user) {
          // Retorna o usuário se encontrado.
          return user;
        }
        // Retorna null se o usuário não for encontrado.
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Página de login customizada (opcional)
  },
});
