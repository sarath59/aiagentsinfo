import Link from "next/link";
import type { ReactNode } from "react";

const TOKEN = /(\[[^\]]+\]\([^)]+\))/g;

export function LinkedText({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  const nodes: ReactNode[] = [];
  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) {
      nodes.push(<span key={index}>{part}</span>);
      continue;
    }
    const [, label, href] = match;
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={index} href={href}>
          {label}
        </Link>,
      );
      continue;
    }
    nodes.push(
      <a key={index} href={href} rel="noopener noreferrer">
        {label}
      </a>,
    );
  }
  return <>{nodes}</>;
}
