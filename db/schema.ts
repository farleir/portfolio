
import { integer, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from '@auth/core/adapters';
import { relations } from 'drizzle-orm';

// Tabelas para Auth.js
export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
});
export type User = typeof users.$inferSelect;


export const accounts = sqliteTable(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = sqliteTable('sessions', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokens = sqliteTable(
  'verificationTokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);


// Tabelas da Aplicação
export const projects = sqliteTable('projects', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    tags: text('tags', { mode: 'json' }).$type<string[]>().notNull(),
    imageUrl: text('imageUrl'),
    liveUrl: text('liveUrl'),
    repoUrl: text('repoUrl'),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
export type Project = typeof projects.$inferSelect;


export const blogPosts = sqliteTable('blog_posts', {
    slug: text('slug').primaryKey(),
    title: text('title').notNull(),
    summary: text('summary').notNull(),
    content: text('content').notNull(),
    publishedAt: integer('publishedAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    authorId: text('authorId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    updatedAt: integer('updatedAt', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
export type BlogPost = typeof blogPosts.$inferSelect;


// Relações
export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
    author: one(users, {
        fields: [blogPosts.authorId],
        references: [users.id],
    }),
}));

export const usersRelations = relations(users, ({ many }) => ({
    posts: many(blogPosts),
}));
