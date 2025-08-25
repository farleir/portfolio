import React from 'react';
import { projects } from '../data/mockData';
import ProjectCard from '../components/ProjectCard';

const Projects = (): React.ReactNode => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2">Meus Projetos</h1>
        <p className="text-lg text-slate-400 mb-10">Uma seleção de projetos que demonstram minhas habilidades e interesses.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;