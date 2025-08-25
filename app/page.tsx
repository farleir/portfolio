
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] py-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 mb-4">
        Farleir
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-semibold max-w-2xl">
        Principal Engineer & Arquiteto de Soluções Edge
      </p>
      <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-10">
        Construindo aplicações full-stack de alta performance com TypeScript, Next.js, e Cloudflare. Focado em código limpo, modular e na melhor experiência para o desenvolvedor e usuário.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/projects">Ver Projetos</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/blog">Ler o Blog</Link>
        </Button>
      </div>
    </div>
  );
}
