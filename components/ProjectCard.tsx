import type { Project } from '@/db/schema';
import { Github, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex flex-col bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-border hover:border-primary/50">
      <div className="relative w-full h-48">
        <Image
          className="object-cover"
          src={project.imageUrl || 'https://picsum.photos/600/400'}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-card-foreground mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-base mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div className="px-6 pb-4 flex justify-end space-x-4">
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="text-muted-foreground hover:text-primary transition-colors">
            <LinkIcon className="h-6 w-6" />
          </a>
        )}
      </div>
    </div>
  );
};
