
'use client';

import { useState } from "react";
import { BlogPost } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteBlogPost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { BlogPostForm } from "./BlogPostForm";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const router = useRouter();

    const handleEdit = (post: BlogPost) => {
        setSelectedPost(post);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setSelectedPost(null);
        setIsFormOpen(true);
    };

    const handleDelete = async (slug: string) => {
        if (confirm('Tem certeza que deseja deletar este post?')) {
            await deleteBlogPost(slug);
            router.refresh();
        }
    };

    const onFormClose = () => {
        setIsFormOpen(false);
        setSelectedPost(null);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Gerenciar Blog</h1>
                <Button onClick={handleAdd}><PlusCircle className="mr-2 h-4 w-4"/> Adicionar Post</Button>
            </div>
            
            <BlogPostForm
                isOpen={isFormOpen}
                onClose={onFormClose}
                post={selectedPost}
            />

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead className="hidden md:table-cell">Publicado em</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.slug}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.slug)}>
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
