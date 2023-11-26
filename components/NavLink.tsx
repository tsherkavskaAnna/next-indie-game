'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export interface LinkProps {
  children: ReactNode;
  prefetch: boolean;
  href: string;
}


export default function NavLink({ href, children, prefetch }: LinkProps) {
    const pathname = usePathname();
    if (href === pathname) {
        return (
            <span className='text-cyan-700'>
                {children}
            </span>
        );
    }
  return (
      <Link href={href} prefetch={prefetch}
          className='text-cyan-800 hover:underline'>
      {children}
    </Link>
  );
}