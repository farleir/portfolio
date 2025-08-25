import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/geminiService';
import { projects } from '../data/mockData';
import { blogPosts } from '../data/mockData';
import { ChatMessage } from '../types';

const Home = (): React.ReactNode => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Initial welcome message from the model
        setMessages([{ role: 'model', text: 'Olá! Sou o assistente de IA do Farleir. Como posso ajudar a saber mais sobre seus projetos, artigos ou habilidades?' }]);
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        const responseText = await sendChatMessage(currentInput, projects, blogPosts);
        const modelMessage: ChatMessage = { role: 'model', text: responseText };
        
        setMessages(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center min-h-[70vh]">
            <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
                    Farleir
                </h1>
                <p className="text-xl md:text-2xl text-brand-400 mb-6 font-semibold">
                    Principal Engineer & Arquiteto de Soluções Edge
                </p>
                <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0">
                    Construindo aplicações full-stack de alta performance com TypeScript, Next.js, e Cloudflare. Focado em código limpo, modular e na melhor experiência para o desenvolvedor e usuário.
                </p>
            </div>
            <div className="lg:w-1/2 w-full max-w-lg h-[65vh] flex flex-col bg-slate-800/50 border border-slate-700 rounded-lg shadow-2xl">
                <div className="p-4 border-b border-slate-700">
                    <h2 className="text-lg font-semibold text-center text-white">Converse com meu Assistente de IA</h2>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="max-w-[80%] p-3 rounded-lg bg-slate-700 text-slate-200">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSend} className="p-4 border-t border-slate-700">
                    <div className="flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Pergunte sobre meus projetos..."
                            className="flex-1 bg-slate-900 border border-slate-600 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="bg-brand-600 text-white px-6 py-2 rounded-r-md hover:bg-brand-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors font-semibold">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;