
import Link from 'next/link';
import NavLink from './NavLink';
import LoginButtons from './auth/LoginButtons';
import { auth } from '@/lib/auth';

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-tight text-primary hover:text-primary/80 transition-colors">
              @farleir
            </Link>
          </div>
          <div className="flex items-center space-x-2">
             <NavLink href="/projects">Projetos</NavLink>
             <NavLink href="/blog">Blog</NavLink>
             <div className="pl-4">
              <LoginButtons session={session} />
             </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
