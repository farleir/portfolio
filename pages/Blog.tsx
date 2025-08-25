import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/mockData';

const Blog = (): React.ReactNode => {
  return (
    <div className="max-w-4xl mx-auto">
       <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2">Blog</h1>
        <p className="text-lg text-slate-400 mb-10">Artigos sobre tecnologia, desenvolvimento e arquitetura de software.</p>
      </div>
      
      <div className="space-y-8">
        {blogPosts.map(post => (
          <article key={post.slug} className="group">
             <Link to={`/blog/${post.slug}`}>
              <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 group-hover:border-brand-600 transition-all duration-300 hover:shadow-lg hover:shadow-brand-900/20">
                <p className="text-sm text-slate-400">{new Date(post.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h2 className="text-2xl font-bold text-slate-100 group-hover:text-brand-400 mt-2 transition-colors">{post.title}</h2>
                <p className="text-slate-300 mt-3">{post.summary}</p>
                <span className="inline-block mt-4 text-brand-400 font-semibold group-hover:underline">
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

export default Blog;