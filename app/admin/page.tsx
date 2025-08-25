
import { auth } from "@/lib/auth";

export default async function AdminDashboardPage() {
    const session = await auth();

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-4">Painel de Administração</h1>
            <p className="text-lg text-muted-foreground">
                Bem-vindo, {session?.user?.name || 'Administrador'}!
            </p>
            <p className="mt-2 text-muted-foreground">
                Use o menu à esquerda para gerenciar os projetos e posts do blog.
            </p>
        </div>
    );
}
