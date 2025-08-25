import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './icons/SocialIcons';

const Footer = (): React.ReactNode => {
  return (
    <footer className="bg-slate-950/50 border-t border-slate-800">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Farleir. Todos os direitos reservados.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="https://github.com/farleir" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-brand-400 transition-colors">
            <GithubIcon className="h-6 w-6" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-brand-400 transition-colors">
             <LinkedinIcon className="h-6 w-6" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-400 hover:text-brand-400 transition-colors">
            <TwitterIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;