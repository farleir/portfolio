import { Project, BlogPost } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Infraestrutura Cloudflare',
    description: 'Um projeto full-stack de alta performance implantado na infraestrutura serverless da Cloudflare, utilizando Pages, D1 e Workers.',
    tags: ['Next.js', 'Cloudflare', 'Drizzle ORM', 'TypeScript'],
    imageUrl: 'https://picsum.photos/seed/cloudflare/600/400',
    liveUrl: '#',
    repoUrl: 'https://github.com/farleir',
  },
  {
    id: '2',
    title: 'Dashboard de Análise de Dados',
    description: 'Uma interface rica para visualização e análise de dados em tempo real, construída com React e D3.js para gráficos interativos.',
    tags: ['React', 'D3.js', 'Tailwind CSS', 'API REST'],
    imageUrl: 'https://picsum.photos/seed/dashboard/600/400',
    repoUrl: 'https://github.com/farleir',
  },
  {
    id: '3',
    title: 'Assistente de Código AI',
    description: 'Uma aplicação que se integra à API Gemini para fornecer sugestões de código, refatoração e explicações, melhorando a produtividade.',
    tags: ['Gemini API', 'React', 'TypeScript', 'WebSockets'],
    imageUrl: 'https://picsum.photos/seed/ai/600/400',
    repoUrl: 'https://github.com/farleir',
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'arquitetura-serverless-com-cloudflare',
    title: 'Construindo Aplicações de Alta Performance com Arquitetura Serverless na Cloudflare',
    date: '2024-07-28',
    author: 'Farleir',
    summary: 'Uma exploração profunda de como utilizar Cloudflare Pages, D1 e Workers para criar aplicações web robustas, escaláveis e incrivelmente rápidas.',
    content: `## A Revolução Serverless
A computação serverless mudou a forma como desenvolvemos e implantamos aplicações. Ela nos permite focar no código, enquanto o provedor de nuvem gerencia a infraestrutura subjacente.

### Vantagens da Stack Cloudflare
- **Performance:** Com a rede Edge da Cloudflare, sua aplicação fica mais perto do usuário final, resultando em latência extremamente baixa.
- **Custo:** Pague apenas pelos recursos que utiliza, sem a necessidade de manter servidores ociosos.
- **Escalabilidade:** A infraestrutura escala automaticamente para atender à demanda, não importa quão grande ela seja.

## Drizzle ORM e D1: Uma Dupla Poderosa
O D1, o banco de dados SQLite da Cloudflare, combinado com o Drizzle ORM, oferece uma experiência de desenvolvimento fantástica, com segurança de tipos de ponta a ponta e consultas performáticas na Edge.
    `,
  },
  {
    slug: 'typescript-boas-praticas',
    title: 'TypeScript: Além do Básico - Boas Práticas para Projetos Escaláveis',
    date: '2024-07-15',
    author: 'Farleir',
    summary: 'Este post aborda padrões avançados e boas práticas em TypeScript que garantem a manutenibilidade e a qualidade do código em projetos de larga escala.',
    content: `## Tipagem Estrita é Sua Amiga
Ativar o modo \`strict\` no seu \`tsconfig.json\` é o primeiro passo para um código mais seguro. Ele ativa uma série de verificações que ajudam a capturar erros em tempo de compilação.

### Generics e Tipos Utilitários
Aprenda a usar Generics para criar componentes e funções reutilizáveis e explore tipos utilitários como \`Pick\`, \`Omit\`, e \`Partial\` para manipular tipos existentes de forma eficiente, evitando a repetição de código e mantendo seu sistema de tipos limpo e DRY (Don't Repeat Yourself).
    `,
  },
];
