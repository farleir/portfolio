
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'database', // Usar 'database' é mais robusto com um adapter
  },
  callbacks: {
    async session({ session, user }) {
      // Adiciona o id do usuário do banco de dados para a sessão
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    // Opcional: Adicionar lógica extra no signIn se necessário
    // async signIn({ user, account, profile }) {
    //   return true
    // },
  },
  pages: {
    signIn: '/login',
    error: '/auth-error', // Página para exibir erros de autenticação
  },
});