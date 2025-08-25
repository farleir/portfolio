
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projetos | Farleir',
    description: 'Uma seleção de projetos que demonstram minhas habilidades e interesses em tecnologia.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-2">Meus Projetos</h1>
        <p className="text-lg text-muted-foreground">Uma seleção de projetos que demonstram minhas habilidades e interesses.</p>
      </div>
      
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">Nenhum projeto encontrado.</p>
      )}
    </div>
  );
};
