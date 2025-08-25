import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth()`, `useSession()`, `getSession()` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: DefaultSession["user"] & {
      id: string;
    };
  }

  /**
   * The user object passed to the `session` callback from the database.
   */
  interface User extends DefaultUser {
    id: string;
  }
}