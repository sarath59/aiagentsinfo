"use client";

import { useEffect, useRef } from "react";

function plain(cell: Element | null | undefined) {
  return (cell?.textContent ?? "").replace(/\s+/g, " ").trim();
}

/** A cell sorts as a number only when the whole cell is one number, optional $ % and commas. */
export function numericCell(value: string): number | null {
  const cleaned = value.replace(/[$,%]/g, "").replace(/,/g, "").trim();
  if (!/^-?\d+(?:\.\d+)?$/.test(cleaned)) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function compareCells(left: string, right: string, direction: 1 | -1) {
  const leftN = numericCell(left);
  const rightN = numericCell(right);
  if (leftN == null && rightN == null) {
    return left.localeCompare(right, "en", { numeric: true, sensitivity: "base" }) * direction;
  }
  if (leftN == null) return 1;
  if (rightN == null) return -1;
  return (leftN - rightN) * direction;
}

/**
 * Article HTML with click-to-sort tables. Header buttons are added after mount
 * so the server HTML, the CSV download, and the source line stay intact.
 */
export function SortableArticleHtml({ html, className = "" }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];

    for (const table of root.querySelectorAll("table")) {
      const headRow = table.querySelector("thead tr");
      const body = table.querySelector("tbody");
      if (!headRow || !body) continue;
      const headers = [...headRow.children].filter(
        (cell): cell is HTMLTableCellElement => cell instanceof HTMLTableCellElement && cell.tagName === "TH",
      );

      headers.forEach((th, index) => {
        const label = plain(th);
        th.dataset.sortLabel = label;
        th.textContent = "";
        th.setAttribute("aria-sort", "none");

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.style.background = "transparent";
        button.style.border = "0";
        button.style.padding = "0";
        button.style.margin = "0";
        button.style.font = "inherit";
        button.style.letterSpacing = "inherit";
        button.style.textTransform = "inherit";
        button.style.color = "inherit";
        button.style.cursor = "pointer";
        button.style.textAlign = "left";
        th.append(button);

        const onClick = () => {
          const current = th.getAttribute("aria-sort");
          const rows = [...body.querySelectorAll(":scope > tr")];
          const numericCount = rows.filter((row) => numericCell(plain(row.children[index])) != null).length;
          const mostlyNumeric = rows.length > 0 && numericCount >= Math.ceil(rows.length / 2);
          const next =
            current === "ascending"
              ? "descending"
              : current === "descending"
                ? "ascending"
                : mostlyNumeric
                  ? "descending"
                  : "ascending";
          const direction: 1 | -1 = next === "ascending" ? 1 : -1;

          for (const other of headers) other.setAttribute("aria-sort", other === th ? next : "none");
          rows.sort((a, b) => compareCells(plain(a.children[index]), plain(b.children[index]), direction));
          for (const row of rows) body.append(row);

          const arrow = next === "ascending" ? " ↑" : " ↓";
          for (const other of headers) {
            const otherButton = other.querySelector("button");
            const stored = other.dataset.sortLabel ?? "";
            if (otherButton) otherButton.textContent = other === th ? `${stored}${arrow}` : stored;
          }
        };

        button.addEventListener("click", onClick);
        cleanups.push(() => button.removeEventListener("click", onClick));
      });
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, [html]);

  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
