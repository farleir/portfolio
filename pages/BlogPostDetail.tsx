import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/mockData';

const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const elements = content.trim().split('\n').map((line, index) => {
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-semibold text-slate-100 mt-8 mb-4 pb-2 border-b border-slate-700">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-semibold text-slate-200 mt-6 mb-3">{line.substring(4)}</h3>;
        }
        if (line.startsWith('- ')) {
            return <li key={index} className="ml-6 list-disc mb-2">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
            return null; // Ignore empty lines to avoid extra space
        }
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
    }).filter(Boolean);

    return <div className="text-slate-300">{elements}</div>;
};

const BlogPostDetail = (): React.ReactNode => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Post não encontrado</h1>
        <Link to="/blog" className="text-brand-400 hover:underline mt-4 inline-block">Voltar para o Blog</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-8">
      <header className="mb-8">
        <Link to="/blog" className="text-brand-400 hover:text-brand-300 mb-4 inline-block">&larr; Voltar para o Blog</Link>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">{post.title}</h1>
        <p className="text-slate-400 mt-2">
          Por {post.author} em {new Date(post.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>
      
      <div>
        <SimpleMarkdownRenderer content={post.content} />
      </div>

    </article>
  );
};

export default BlogPostDetail;