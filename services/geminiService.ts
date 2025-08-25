import { GoogleGenAI, Chat } from '@google/genai';
import { Project, BlogPost } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder key. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "API_KEY_NOT_SET" });

let chat: Chat | null = null;

const initializeChat = (projects: Project[], blogPosts: BlogPost[]) => {
    const context = `
        Você é um assistente de IA para Farleir, um Principal Engineer e Arquiteto de Soluções Edge.
        Seu objetivo é responder a perguntas sobre Farleir de forma profissional e amigável, com base nas informações fornecidas.
        Não invente informações que não estão aqui. Se você não sabe a resposta, diga que não tem essa informação.

        Aqui está um resumo das habilidades e interesses de Farleir:
        - Expertise em: ecossistema TypeScript, Next.js (App Router), Drizzle ORM, arquitetura serverless da Cloudflare (Pages, D1, Workers), React.
        - Foco em: código limpo, modular, documentado, alta performance e excelente experiência do desenvolvedor (DX) e do usuário (UX).

        Projetos em Destaque:
        ${projects.map(p => `- ${p.title}: ${p.description}`).join('\n')}

        Artigos do Blog:
        ${blogPosts.map(b => `- ${b.title}: ${b.summary}`).join('\n')}

        Sempre responda em português do Brasil. Seja conciso e direto.
    `;

    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: context,
        },
    });
};


export const sendChatMessage = async (message: string, projects: Project[], blogPosts: BlogPost[]) => {
    if (!process.env.API_KEY || process.env.API_KEY === "API_KEY_NOT_SET") {
      return "A funcionalidade de IA está desativada. Configure a API_KEY para habilitá-la.";
    }
  
    if (!chat) {
        initializeChat(projects, blogPosts);
    }
    
    if (!chat) {
        throw new Error("Chat initialization failed.");
    }

    try {
        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "Desculpe, ocorreu um erro ao me comunicar com a IA. Por favor, tente novamente mais tarde.";
    }
};