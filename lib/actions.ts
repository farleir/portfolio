
'use server';

import { GoogleGenAI } from '@google/genai';
import { getBlogPosts, getProjects } from './data';
import { signIn, signOut } from './auth';

// A inicialização do cliente GenAI acontece DENTRO da Server Action,
// garantindo que nunca seja exposta ao cliente.
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function askGemini(chatHistory: { role: 'user' | 'model', text: string }[], question: string) {
    if (!process.env.GOOGLE_API_KEY) {
        return "A funcionalidade de IA está desativada. A chave da API não foi configurada no servidor.";
    }

    try {
        const projects = await getProjects();
        const blogPosts = await getBlogPosts();

        const context = `
            Você é um assistente de IA para Farleir, um Principal Engineer e Arquiteto de Soluções Edge.
            Seu objetivo é responder a perguntas sobre Farleir de forma profissional e amigável, com base nas informações fornecidas.
            Não invente informações. Se você não sabe a resposta, diga que não tem essa informação.

            Habilidades e interesses de Farleir:
            - Expertise: TypeScript, Next.js (App Router), Drizzle ORM, Cloudflare (Pages, D1, Workers), React.
            - Foco: código limpo, modular, documentado, alta performance, DX e UX.

            Projetos em Destaque:
            ${projects.map(p => `- ${p.title}: ${p.description}`).join('\n')}

            Artigos do Blog:
            ${blogPosts.map(b => `- ${b.title}: ${b.summary}`).join('\n')}

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

export async function signInWithGithub() {
  await signIn('github');
}

export async function doSignOut() {
  await signOut();
}
