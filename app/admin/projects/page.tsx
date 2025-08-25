
import { getProjects } from "@/lib/data";
import ProjectsClient from "./ProjectsClient";

export default async function AdminProjectsPage() {
    const projects = await getProjects();
    
    return (
        <div>
            <ProjectsClient projects={projects} />
        </div>
    );
}
