export type SortCell = string | number | null;

export type SortableColumn = {
  key: string;
  label: string;
  numeric?: boolean;
};

export type SortableRow = {
  id: string;
  sort: Record<string, SortCell>;
  display: Record<string, string>;
  href?: Record<string, string>;
};
