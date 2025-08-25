
'use client';

import { useState } from "react";
import { Project } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteProject } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { ProjectForm } from "./ProjectForm";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";

export default function ProjectsClient({ projects }: { projects: Project[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const router = useRouter();

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setSelectedProject(null);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja deletar este projeto?')) {
            await deleteProject(id);
            router.refresh();
        }
    };

    const onFormClose = () => {
        setIsFormOpen(false);
        setSelectedProject(null);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Gerenciar Projetos</h1>
                <Button onClick={handleAdd}><PlusCircle className="mr-2 h-4 w-4"/> Adicionar Projeto</Button>
            </div>
            
            <ProjectForm
                isOpen={isFormOpen}
                onClose={onFormClose}
                project={selectedProject}
            />

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead className="hidden md:table-cell">Tags</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.title}</TableCell>
                                <TableCell className="hidden md:table-cell">{project.tags.join(', ')}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
