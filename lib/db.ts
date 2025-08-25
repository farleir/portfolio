
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';
import type { D1Database } from '@cloudflare/workers-types';

// Esta é a forma correta de obter o binding do D1 no ambiente Cloudflare.
// O 'process.env.DB' é injetado pelo runtime da Cloudflare.
const d1 = process.env.DB as D1Database;

export const db = drizzle(d1, { schema });