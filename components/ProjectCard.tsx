import React from 'react';
import { Project } from '../types';
import { GithubIcon, LinkIcon } from './icons/SocialIcons';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="flex flex-col bg-slate-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-brand-700/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-slate-700">
      <img className="w-full h-48 object-cover" src={project.imageUrl} alt={project.title} />
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-slate-100 mb-2">{project.title}</h3>
        <p className="text-slate-400 text-base mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="bg-brand-950 text-brand-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div className="px-6 pb-4 flex justify-end space-x-4">
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="text-slate-400 hover:text-brand-400 transition-colors">
            <GithubIcon className="h-6 w-6" />
          </a>
        )}
        {project.liveUrl && project.liveUrl !== '#' && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="text-slate-400 hover:text-brand-400 transition-colors">
            <LinkIcon className="h-6 w-6" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;