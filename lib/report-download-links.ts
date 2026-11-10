export function reportPdfHref(slug: string, token: string) {
  const params = new URLSearchParams({ token });
  return `/reports/${slug}/pdf?${params.toString()}`;
}

export function reportCsvHref(slug: string, token: string, table: string | null) {
  const params = new URLSearchParams({ token });
  if (table) params.set("table", table);
  return `/reports/${slug}/csv?${params.toString()}`;
}
