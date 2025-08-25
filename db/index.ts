
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import type { D1Database } from '@cloudflare/workers-types';

// A função `getDb` garante que a conexão com o D1 seja estabelecida
// corretamente no ambiente da Cloudflare (Pages/Workers).
export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}
