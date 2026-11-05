"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SortableColumn, SortableRow } from "@/lib/sortable";

function compare(a: SortableRow, b: SortableRow, key: string, direction: "asc" | "desc") {
  const left = a.sort[key];
  const right = b.sort[key];
  const blank = (value: typeof left) => value == null || value === "";
  if (blank(left) && blank(right)) return a.id.localeCompare(b.id);
  if (blank(left)) return 1;
  if (blank(right)) return -1;
  let order = 0;
  if (typeof left === "number" && typeof right === "number") order = left - right;
  else order = String(left).localeCompare(String(right), "en", { numeric: true, sensitivity: "base" });
  if (order === 0) order = a.id.localeCompare(b.id);
  return direction === "asc" ? order : -order;
}

export function SortableTable({
  columns,
  rows,
  defaultSort,
  defaultDirection = "desc",
  caption,
  downloadHref,
}: {
  columns: SortableColumn[];
  rows: SortableRow[];
  defaultSort: string;
  defaultDirection?: "asc" | "desc";
  caption: string;
  downloadHref?: string;
}) {
  const [sortKey, setSortKey] = useState(defaultSort);
  const [direction, setDirection] = useState<"asc" | "desc">(defaultDirection);

  const ordered = useMemo(
    () => [...rows].sort((a, b) => compare(a, b, sortKey, direction)),
    [rows, sortKey, direction],
  );

  function onSort(key: string) {
    if (key === sortKey) {
      setDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    const column = columns.find((item) => item.key === key);
    setSortKey(key);
    setDirection(column?.numeric ? "desc" : "asc");
  }

  return (
    <div className="table-block">
      {downloadHref ? (
        <p className="table-actions no-print">
          <a className="btn-ghost px-3 py-1.5 text-sm" href={downloadHref}>
            Download CSV
          </a>
        </p>
      ) : null}
      <div className="table-scroll">
      <table className="w-full min-w-[40rem] border-collapse text-sm" aria-label={caption}>
        <thead>
          <tr className="border-b border-[var(--stroke)] text-left">
            {columns.map((column) => {
              const active = column.key === sortKey;
              const ariaSort = active ? (direction === "asc" ? "ascending" : "descending") : "none";
              return (
                <th key={column.key} scope="col" aria-sort={ariaSort} className={column.numeric ? "text-right" : "text-left"}>
                  <button
                    type="button"
                    onClick={() => onSort(column.key)}
                    className={`focus-ring w-full px-3 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--fg)] ${column.numeric ? "text-right" : "text-left"}`}
                  >
                    {column.label}
                    {active ? (direction === "asc" ? " ↑" : " ↓") : ""}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {ordered.map((row) => (
            <tr key={row.id} className="border-b border-[var(--stroke)] last:border-0">
              {columns.map((column) => {
                const text = row.display[column.key] || "—";
                const href = row.href?.[column.key];
                const className = `px-3 py-3 align-top ${column.numeric ? "text-right tabular-nums" : "text-left"}`;
                return (
                  <td key={column.key} className={className}>
                    {href ? (
                      href.startsWith("/") ? (
                        <Link href={href} className="text-[var(--link)] underline">
                          {text}
                        </Link>
                      ) : (
                        <a href={href} className="text-[var(--link)] underline" rel="noopener noreferrer" target="_blank">
                          {text}
                        </a>
                      )
                    ) : (
                      text
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
