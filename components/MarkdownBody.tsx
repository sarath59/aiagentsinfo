export function MarkdownBody({ html, className = "" }: { html: string; className?: string }) {
  return (
    <div
      className={`prose-article ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
