
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white transition-colors";
  const activeLinkClasses = "text-white bg-slate-800/50";

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-slate-300 transition-colors">
              @farleir
            </Link>
          </div>
          <div className="flex items-center space-x-2">
             <NavLink to="/projects" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                Projetos
              </NavLink>
              <NavLink to="/blog" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                Blog
              </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};
