
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { blogPostSchema } from "@/lib/definitions";
import { BlogPost } from "@/db/schema";
import { createBlogPost, updateBlogPost } from "@/lib/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

interface BlogPostFormProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}

export function BlogPostForm({ isOpen, onClose, post }: BlogPostFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      slug: post?.slug || "",
      title: post?.title || "",
      summary: post?.summary || "",
      content: post?.content || "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof blogPostSchema>) => {
    startTransition(async () => {
      if (post) {
        await updateBlogPost(post.slug, values);
      } else {
        await createBlogPost(values);
      }
      router.refresh();
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{post ? 'Editar Post' : 'Adicionar Novo Post'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Título</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="slug" render={({ field }) => (
              <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} disabled={!!post} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="summary" render={({ field }) => (
              <FormItem><FormLabel>Resumo</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem><FormLabel>Conteúdo (Markdown)</FormLabel><FormControl><Textarea {...field} rows={15} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" disabled={isPending}>{isPending ? "Salvando..." : "Salvar"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
