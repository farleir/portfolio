
import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }),
  description: z.string().min(10, { message: 'A descrição deve ter pelo menos 10 caracteres.' }),
  tags: z.string().min(1, { message: 'Adicione pelo menos uma tag.' }),
  imageUrl: z.string().url({ message: 'URL da imagem inválida.' }).optional().or(z.literal('')),
  liveUrl: z.string().url({ message: 'URL do projeto inválida.' }).optional().or(z.literal('')),
  repoUrl: z.string().url({ message: 'URL do repositório inválida.' }).optional().or(z.literal('')),
});


export const blogPostSchema = z.object({
  slug: z.string().min(3, { message: 'O slug deve ter pelo menos 3 caracteres.' }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug inválido. Use apenas letras minúsculas, números e hífens.' }),
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }),
  summary: z.string().min(10, { message: 'O resumo deve ter pelo menos 10 caracteres.' }),
  content: z.string().min(50, { message: 'O conteúdo deve ter pelo menos 50 caracteres.' }),
});
