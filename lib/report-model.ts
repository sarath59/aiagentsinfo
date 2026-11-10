export type ChartSpec = {
  id: string;
  title: string;
  caption: string;
  unit: string;
  source: string;
  series: string[];
  categories: { label: string; values: number[]; displays: string[] }[];
};

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "quote"; text: string; cite: string }
  | { kind: "callout"; title: string; text: string }
  | { kind: "means"; audience: "Builders" | "Buyers" | "Builders and buyers"; text: string }
  | { kind: "chart"; id: string }
  | { kind: "table"; caption: string; headers: string[]; rows: string[][] };

export type ReportChapter = {
  id: string;
  title: string;
  blocks: Block[];
};
