
import { getBlogPosts } from '@/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Blog | Farleir',
    description: 'Artigos sobre tecnologia, desenvolvimento full-stack, arquitetura de software e performance.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-4xl mx-auto">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-2">Blog</h1>
        <p className="text-lg text-muted-foreground">Artigos sobre tecnologia, desenvolvimento e arquitetura de software.</p>
      </div>
      
      <div className="space-y-8">
        {posts.map(post => (
          <article key={post.slug} className="group">
             <Link href={`/blog/${post.slug}`}>
              <div className="p-6 bg-card rounded-lg border border-border group-hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <p className="text-sm text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h2 className="text-2xl font-bold text-card-foreground group-hover:text-primary mt-2 transition-colors">{post.title}</h2>
                <p className="text-muted-foreground mt-3">{post.summary}</p>
                <span className="inline-block mt-4 text-primary font-semibold group-hover:underline">
                  Ler mais &rarr;
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};
