"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { scrollToId } from "@/lib/scrollState";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * next/link that also smooth-scrolls (via Lenis) when the target is a "#hash" on the page we're already on.
 * Cross-page hash links navigate normally; RouteEffects scrolls to the hash afterwards.
 */
export function SiteLink({ href, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const i = href.indexOf("#");
    if (i === -1) return;
    const path = href.slice(0, i);
    if (path === "" || path === pathname) {
      e.preventDefault();
      scrollToId(href.slice(i + 1));
    }
  };
  return <Link href={href} onClick={handle} {...rest} />;
}
