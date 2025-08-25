
'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { askGemini } from '@/lib/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export default function ChatAssistant() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isPending, startTransition] = useTransition();
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setMessages([{ role: 'model', text: 'Olá! Sou o assistente de IA do Farleir. Como posso ajudar a saber mais sobre seus projetos, artigos ou habilidades?' }]);
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isPending) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        const currentInput = input;
        setInput('');

        startTransition(async () => {
            // A Server Action é chamada aqui
            const responseText = await askGemini(newMessages.slice(1), currentInput);
            const modelMessage: ChatMessage = { role: 'model', text: responseText };
            setMessages(prev => [...prev, modelMessage]);
        });
    };

    return (
        <div className="h-[65vh] flex flex-col bg-card border border-border rounded-lg shadow-2xl">
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-center text-card-foreground">Converse com meu Assistente de IA</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isPending && (
                    <div className="flex justify-start">
                         <div className="max-w-[80%] p-3 rounded-lg bg-secondary text-secondary-foreground">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0.4s]"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="p-4 border-t border-border">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Pergunte sobre meus projetos..."
                        disabled={isPending}
                    />
                    <Button type="submit" disabled={isPending || !input.trim()} size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
