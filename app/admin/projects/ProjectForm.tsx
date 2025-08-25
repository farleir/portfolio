
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { projectSchema } from "@/lib/definitions";
import { Project } from "@/db/schema";
import { createProject, updateProject } from "@/lib/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function ProjectForm({ isOpen, onClose, project }: ProjectFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      tags: project?.tags.join(", ") || "",
      imageUrl: project?.imageUrl || "",
      liveUrl: project?.liveUrl || "",
      repoUrl: project?.repoUrl || "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    startTransition(async () => {
      if (project) {
        await updateProject(project.id, values);
      } else {
        await createProject(values);
      }
      router.refresh();
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Título</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Descrição</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="tags" render={({ field }) => (
                <FormItem><FormLabel>Tags (separadas por vírgula)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem><FormLabel>URL da Imagem</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="liveUrl" render={({ field }) => (
                <FormItem><FormLabel>URL do Projeto (Live)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="repoUrl" render={({ field }) => (
                <FormItem><FormLabel>URL do Repositório</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" disabled={isPending}>{isPending ? "Salvando..." : "Salvar"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
