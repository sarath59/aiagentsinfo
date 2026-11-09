export type SortCell = string | number | null;

export type SortableColumn = {
  key: string;
  label: string;
  numeric?: boolean;
};

export type RowFacets = {
  stars?: number | null;
  free?: boolean | null;
  openSource?: boolean | null;
  useCase?: string | null;
};

export type TableFilterKey = "stars" | "free" | "openSource" | "useCase";

export type SortableRow = {
  id: string;
  sort: Record<string, SortCell>;
  display: Record<string, string>;
  href?: Record<string, string>;
  facets?: RowFacets;
};
