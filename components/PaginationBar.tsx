import Link from 'next/link';
import { ReactNode } from 'react';
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from "@heroicons/react/20/solid";

export interface PaginationBarProps {
  href: string;
  page: number;
  pageCount: number;
}


export default function PaginationBar({ href, page, pageCount } : PaginationBarProps) {
    return (
        <div className="flex justify-center gap-2 pb-4">
        <PaginationLink href={`${href}?page=${page - 1}`}
        enabled={page > 1}>
          <ChevronDoubleLeftIcon className="h-6 w-6 text-gray-500" />
        </PaginationLink>
            <span>Page {page } of { pageCount}</span>
        <PaginationLink href={`${href}?page=${page + 1}`}
        enabled={ page < pageCount}>
          <ChevronDoubleRightIcon className="h-6 w-6 text-gray-500" />
        </PaginationLink>
            </div>
    )  
}

interface PaginationLinkProps {
  children: ReactNode;
  enabled: boolean;
  href: string;
}

function PaginationLink({ href, enabled, children }: PaginationLinkProps) {
  if (!enabled) {
      return (
    <span className="border cursor-not-allowed rounded text-slate-300 text-sm">
      {children}
    </span>
  );
    }
  return (
    <Link href={href} className='border rounded text-slate-500 text-sm
                      hover:bg-cyan-300 hover:text-slate-700'>
      {children}
    </Link>
  );
}