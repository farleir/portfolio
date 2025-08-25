
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center justify-center min-h-[70vh]">
        <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mb-4">
                Farleir
            </h1>
            <p className="text-xl md:text-2xl text-accent-foreground/80 mb-6 font-semibold">
                Principal Engineer & Arquiteto de Soluções Edge
            </p>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Construindo aplicações full-stack de alta performance com TypeScript, Next.js, e Cloudflare. Focado em código limpo, modular e na melhor experiência para o desenvolvedor e usuário.
            </p>
        </div>
        <div className="lg:w-1/2 w-full max-w-lg">
          <ChatAssistant />
        </div>
    </div>
  );
}
