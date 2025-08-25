
import NavLink from "@/components/NavLink";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="md:w-1/5">
        <h2 className="text-xl font-bold mb-4 text-primary">Admin</h2>
        <nav className="flex flex-col space-y-2">
            <NavLink href="/admin/projects">Projetos</NavLink>
            <NavLink href="/admin/blog">Blog</NavLink>
        </nav>
      </aside>
      <div className="md:w-4/5">
        {children}
      </div>
    </div>
  );
}
