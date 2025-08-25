
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";
    const activeLinkClasses = "text-foreground bg-secondary";

    return (
        <Link href={href} className={cn(navLinkClasses, isActive && activeLinkClasses)}>
            {children}
        </Link>
    );
}
