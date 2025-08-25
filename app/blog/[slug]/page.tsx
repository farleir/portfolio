
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }
  return {
    title: `${post.title} | Farleir`,
    description: post.summary,
  };
}

// Gera as rotas estáticas no momento do build
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostDetailPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8 prose prose-invert prose-lg">
      <header className="mb-8">
        <Link href="/blog" className="text-primary hover:underline mb-4 inline-block">&larr; Voltar para o Blog</Link>
        <h1 className="text-4xl font-extrabold text-primary tracking-tight">{post.title}</h1>
        <p className="text-muted-foreground mt-2">
          Por {post.author.name} em {new Date(post.publishedAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>
      
      <MarkdownRenderer content={post.content} />

    </article>
  );
};
