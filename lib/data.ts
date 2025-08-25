
import 'server-only';
import { db } from '@/lib/db';
import { blogPosts, projects } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

export const getProjects = unstable_cache(
  async () => {
    return db.query.projects.findMany({
      orderBy: [desc(projects.createdAt)],
    });
  },
  ['projects'],
  { revalidate: 3600 } // Revalida a cada hora
);

export const getBlogPosts = unstable_cache(
  async () => {
    return db.query.blogPosts.findMany({
      orderBy: [desc(blogPosts.publishedAt)],
      with: {
        author: {
          columns: {
            name: true,
            image: true,
          }
        }
      }
    });
  },
  ['blog_posts'],
  { revalidate: 3600 } // Revalida a cada hora
);

export const getBlogPostBySlug = unstable_cache(
  async (slug: string) => {
    return db.query.blogPosts.findFirst({
      where: eq(blogPosts.slug, slug),
      with: {
        author: {
           columns: {
            name: true,
            image: true,
          }
        }
      }
    });
  },
  ['blog_posts'],
  { revalidate: 3600 }
);