
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Farleir. Todos os direitos reservados.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="https://github.com/farleir" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-colors">
             <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-400 hover:text-white transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
