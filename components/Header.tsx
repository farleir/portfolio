import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (): React.ReactNode => {
  const linkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClass = 'bg-slate-700 text-white';
  const inactiveLinkClass = 'text-slate-300 hover:bg-slate-800 hover:text-white';

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-white tracking-tight hover:text-brand-400 transition-colors">
              @farleir
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}
              >
                Início
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}
              >
                Projetos
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}
              >
                Blog
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;