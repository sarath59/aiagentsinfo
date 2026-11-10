"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { DataSourceLine } from "@/components/DataSourceLine";
import { trackGoal } from "@/lib/analytics";
import type { PageSource } from "@/lib/attribution";
import type { SortableColumn, SortableRow, TableFilterKey } from "@/lib/sortable";
import { formatDate } from "@/lib/utils";

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
  filters = [],
  starsReadOn,
  source,
}: {
  columns: SortableColumn[];
  rows: SortableRow[];
  defaultSort: string;
  defaultDirection?: "asc" | "desc";
  caption: string;
  filters?: TableFilterKey[];
  /** ISO day for a star count that comes from the GitHub snapshot, when it is not the page's own date. */
  starsReadOn?: string;
  source?: PageSource;
}) {
  const [sortKey, setSortKey] = useState(defaultSort);
  const [direction, setDirection] = useState<"asc" | "desc">(defaultDirection);
  const [minStars, setMinStars] = useState("");
  const [price, setPrice] = useState<"all" | "free" | "paid">("all");
  const [licenceFilter, setLicenceFilter] = useState<"all" | "open" | "closed">("all");
  const [useCase, setUseCase] = useState("all");
  const sortedOnce = useRef(false);

  const showStars = filters.includes("stars") && rows.some((row) => typeof row.facets?.stars === "number");
  const showFree = filters.includes("free") && rows.some((row) => typeof row.facets?.free === "boolean");
  const showSource = filters.includes("openSource") && rows.some((row) => typeof row.facets?.openSource === "boolean");
  const useCases = filters.includes("useCase")
    ? [...new Set(rows.map((row) => row.facets?.useCase).filter((value): value is string => Boolean(value)))].sort((a, b) =>
        a.localeCompare(b),
      )
    : [];

  const filtered = useMemo(() => {
    const minimum = minStars.trim() === "" ? null : Number(minStars);
    return rows.filter((row) => {
      if (showStars && minimum != null && Number.isFinite(minimum)) {
        if (typeof row.facets?.stars !== "number" || row.facets.stars < minimum) return false;
      }
      if (showFree && price !== "all" && row.facets?.free !== (price === "free")) return false;
      if (showSource && licenceFilter !== "all" && row.facets?.openSource !== (licenceFilter === "open")) return false;
      if (useCase !== "all" && row.facets?.useCase !== useCase) return false;
      return true;
    });
  }, [rows, minStars, price, licenceFilter, useCase, showStars, showFree, showSource]);

  const ordered = useMemo(
    () => [...filtered].sort((a, b) => compare(a, b, sortKey, direction)),
    [filtered, sortKey, direction],
  );

  function onSort(key: string) {
    if (!sortedOnce.current) {
      sortedOnce.current = true;
      trackGoal("table_sort");
    }
    if (key === sortKey) {
      setDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    const column = columns.find((item) => item.key === key);
    setSortKey(key);
    setDirection(column?.numeric ? "desc" : "asc");
  }

  const selectClass = "focus-ring rounded-full border border-[var(--stroke)] bg-white px-3 py-2 text-sm";

  return (
    <div className="table-block">
      {showStars || showFree || showSource || useCases.length ? (
        <div className="no-print mb-3 flex flex-wrap items-end gap-3">
          {showStars ? (
            <label className="grid gap-1 text-sm">
              <span className="kicker">Minimum stars</span>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={minStars}
                onChange={(event) => setMinStars(event.target.value)}
                placeholder="Any"
                className="focus-ring w-32 rounded-full border border-[var(--stroke)] bg-white px-3 py-2"
              />
            </label>
          ) : null}
          {showFree ? (
            <label className="grid gap-1 text-sm">
              <span className="kicker">Price</span>
              <select className={selectClass} value={price} onChange={(event) => setPrice(event.target.value as typeof price)}>
                <option value="all">All</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </label>
          ) : null}
          {showSource ? (
            <label className="grid gap-1 text-sm">
              <span className="kicker">Open source</span>
              <select className={selectClass} value={licenceFilter} onChange={(event) => setLicenceFilter(event.target.value as typeof licenceFilter)}>
                <option value="all">All</option>
                <option value="open">Open source</option>
                <option value="closed">Not open source</option>
              </select>
            </label>
          ) : null}
          {useCases.length ? (
            <label className="grid gap-1 text-sm">
              <span className="kicker">Use case</span>
              <select className={selectClass} value={useCase} onChange={(event) => setUseCase(event.target.value)}>
                <option value="all">All</option>
                {useCases.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      ) : null}
      {showStars && starsReadOn ? (
        <p className="mb-3 max-w-3xl text-sm text-[var(--muted)]">
          Star counts are the GitHub snapshot from <time dateTime={starsReadOn}>{formatDate(starsReadOn)}</time>. A row
          without a count drops out when a minimum is set. A blank licence stays in All only.
        </p>
      ) : null}
      {ordered.length === 0 ? <p className="mb-3 text-sm text-[var(--muted)]">No rows match these filters.</p> : null}
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
      {source ? <DataSourceLine title={source.title} updated={source.updated} path={source.path} /> : null}
    </div>
  );
}
