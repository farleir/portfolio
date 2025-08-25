
'use client';

import type { Session } from "next-auth";
import { Button } from "../ui/button";
import { signInWithGithub, doSignOut } from "@/lib/actions";
import { useTransition } from "react";

export default function LoginButtons({ session }: { session: Session | null }) {
    const [isPending, startTransition] = useTransition();

    const handleSignIn = () => {
        startTransition(() => {
            signInWithGithub();
        });
    };

    const handleSignOut = () => {
        startTransition(() => {
            doSignOut();
        });
    };

    if (session) {
        return (
            <Button variant="secondary" onClick={handleSignOut} disabled={isPending}>
                {isPending ? "Saindo..." : "Sair"}
            </Button>
        );
    }
    
    return (
        <Button onClick={handleSignIn} disabled={isPending}>
            {isPending ? "Entrando..." : "Entrar com GitHub"}
        </Button>
    );
}