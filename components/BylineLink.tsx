import Link from "next/link";
import { authorByName, authorPath } from "@/lib/authors";

export function BylineLink({ name }: { name: string }) {
  const author = authorByName(name);
  if (!author) return <>{name}</>;
  return <Link href={authorPath(author.slug)}>{author.name}</Link>;
}
