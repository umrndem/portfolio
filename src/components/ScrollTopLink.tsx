"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type ScrollTopLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/**
 * Soft-navigates like a normal Link, but also scrolls to the top when the
 * destination is already the current path (pathname alone does not change).
 */
export function ScrollTopLink({ href, children, className }: ScrollTopLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={className}
      href={href}
      onClick={() => {
        if (pathname === href) {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }}
    >
      {children}
    </Link>
  );
}
