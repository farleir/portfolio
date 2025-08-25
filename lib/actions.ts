
'use server';

import { GoogleGenAI } from '@google/genai';
import { getBlogPosts, getProjects } from './data';
import { auth, signIn, signOut } from './auth';
import { z } from 'zod';
import { blogPostSchema, projectSchema } from './definitions';
import { db } from './db';
import { blogPosts, projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// --- Gemini AI Action ---
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function askGemini(chatHistory: { role: 'user' | 'model', text: string }[], question: string) {
    if (!process.env.GOOGLE_API_KEY) {
        return "A funcionalidade de IA está desativada. A chave da API não foi configurada no servidor.";
    }

    try {
        const projectsData = await getProjects();
        const blogPostsData = await getBlogPosts();

        const context = `
            Você é um assistente de IA para Farleir, um Principal Engineer e Arquiteto de Soluções Edge.
            Seu objetivo é responder a perguntas sobre Farleir de forma profissional e amigável, com base nas informações fornecidas.
            Não invente informações. Se você não sabe a resposta, diga que não tem essa informação.

            Habilidades e interesses de Farleir:
            - Expertise: TypeScript, Next.js (App Router), Drizzle ORM, Cloudflare (Pages, D1, Workers), React.
            - Foco: código limpo, modular, documentado, alta performance, DX e UX.

            Projetos em Destaque:
            ${projectsData.map(p => `- ${p.title}: ${p.description}`).join('\n')}

            Artigos do Blog:
            ${blogPostsData.map(b => `- ${b.title}: ${b.summary}`).join('\n')}

            Sempre responda em português do Brasil. Seja conciso e direto.
        `;
        
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: context,
            },
            history: chatHistory.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.text }]
            }))
        });

        const result = await chat.sendMessage({ message: question });
        return result.text;
    } catch (error) {
        console.error("Error communicating with Gemini API:", error);
        return "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente mais tarde.";
    }
}

// --- Auth Actions ---
export async function signInWithGithub() {
  await signIn('github', { redirectTo: '/admin' });
}

export async function doSignOut() {
  await signOut({ redirectTo: '/' });
}

// --- Project Actions ---
export async function createProject(values: z.infer<typeof projectSchema>) {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Não autorizado');
    }

    const validatedFields = projectSchema.safeParse(values);
    if (!validatedFields.success) {
        throw new Error('Campos inválidos');
    }

    await db.insert(projects).values({
        ...validatedFields.data,
        tags: validatedFields.data.tags.split(',').map(tag => tag.trim()),
    });

    revalidatePath('/projects');
    revalidatePath('/admin/projects');
}

export async function updateProject(id: string, values: z.infer<typeof projectSchema>) {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Não autorizado');
    }

    const validatedFields = projectSchema.safeParse(values);
    if (!validatedFields.success) {
        throw new Error('Campos inválidos');
    }

    await db.update(projects).set({
        ...validatedFields.data,
        tags: validatedFields.data.tags.split(',').map(tag => tag.trim()),
        updatedAt: new Date(),
    }).where(eq(projects.id, id));

    revalidatePath('/projects');
    revalidatePath('/admin/projects');
}

export async function deleteProject(id: string) {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Não autorizado');
    }
    
    await db.delete(projects).where(eq(projects.id, id));

    revalidatePath('/projects');
    revalidatePath('/admin/projects');
}


// --- Blog Post Actions ---
export async function createBlogPost(values: z.infer<typeof blogPostSchema>) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        throw new Error('Não autorizado');
    }

    const validatedFields = blogPostSchema.safeParse(values);
    if (!validatedFields.success) {
        throw new Error('Campos inválidos');
    }

    await db.insert(blogPosts).values({
        ...validatedFields.data,
        authorId: userId,
    });
    
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidatePath(`/blog/${validatedFields.data.slug}`);
}

export async function updateBlogPost(slug: string, values: z.infer<typeof blogPostSchema>) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Não autorizado');
    }

    const validatedFields = blogPostSchema.safeParse(values);
    if (!validatedFields.success) {
        throw new Error('Campos inválidos');
    }

    await db.update(blogPosts).set({
        ...validatedFields.data,
        updatedAt: new Date(),
    }).where(eq(blogPosts.slug, slug));

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/blog/${validatedFields.data.slug}`);
}


export async function deleteBlogPost(slug: string) {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Não autorizado');
    }
    
    await db.delete(blogPosts).where(eq(blogPosts.slug, slug));

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidatePath(`/blog/${slug}`);
}
