import type { ReactNode } from "react";

type HeroPreview = {
  kicker: string;
  title: string;
  date: string;
};

const wideWires = [
  "M 22 50 C 16 34, 12 26, 11 22",
  "M 22 50 C 28 32, 32 22, 34 18",
  "M 22 50 C 16 64, 12 72, 10 78",
  "M 22 50 C 30 64, 34 74, 36 80",
];

const compactWires = [
  "M 50 50 C 32 32, 24 24, 20 20",
  "M 50 50 C 66 32, 74 24, 80 20",
  "M 50 50 C 32 64, 22 72, 18 78",
  "M 50 50 C 68 64, 76 72, 82 78",
];

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 20 20" className="h-[18px] w-[18px]" aria-hidden>
      {children}
    </svg>
  );
}

function ToolsGlyph() {
  return (
    <Glyph>
      <path d="M3.5 3.5h5.2v5.2H3.5zM11.3 3.5h5.2v5.2h-5.2zM3.5 11.3h5.2v5.2H3.5zM11.3 11.3h5.2v5.2h-5.2z" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </Glyph>
  );
}

function BrowserGlyph() {
  return (
    <Glyph>
      <rect x="3" y="4" width="14" height="12" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 8h14" stroke="currentColor" strokeWidth="1.4" />
    </Glyph>
  );
}

function CodeGlyph() {
  return (
    <Glyph>
      <path d="M7.6 6.2 4.4 10l3.2 3.8M12.4 6.2 15.6 10l-3.2 3.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
    </Glyph>
  );
}

function DataGlyph() {
  return (
    <Glyph>
      <path d="M3.5 6h13M3.5 10h8.5M3.5 14h13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </Glyph>
  );
}

function Wires({ wires, className }: { wires: string[]; className: string }) {
  return (
    <g className={className}>
      {wires.map((d, index) => (
        <g key={d}>
          <path d={d} className="hero-wire" pathLength={100} />
          <path
            d={d}
            className="hero-signal"
            pathLength={100}
            style={{ animationDelay: `${index * -1.7}s` }}
          />
        </g>
      ))}
    </g>
  );
}

const nodes = [
  { key: "tools", label: "Tools", className: "hero-node-tools", icon: <ToolsGlyph /> },
  { key: "browser", label: "Browser", className: "hero-node-browser", icon: <BrowserGlyph /> },
  { key: "code", label: "Code", className: "hero-node-code", icon: <CodeGlyph /> },
  { key: "data", label: "Data", className: "hero-node-data", icon: <DataGlyph /> },
] as const;

function roleFor(index: number, count: number) {
  if (count === 1) return "front";
  if (count === 2) return index === 0 ? "mid" : "front";
  return (["back", "mid", "front"] as const)[index] ?? "front";
}

export function HeroFigure({ previews }: { previews: HeroPreview[] }) {
  const stack = previews.slice(0, 3).reverse();

  return (
    <div className={stack.length ? "hero-figure" : "hero-figure hero-figure-solo"} aria-hidden="true">
      <div className="hero-diagram">
        <svg className="hero-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <Wires wires={compactWires} className="hero-wires-compact" />
          <Wires wires={wideWires} className="hero-wires-wide" />
        </svg>
        <div className="hero-hub">
          <span className="hero-hub-halo" />
          <span className="hero-hub-orbit" />
          <span className="hero-hub-ring" />
          <span className="hero-hub-core" />
        </div>
        {nodes.map((node) => (
          <div key={node.key} className={`hero-node ${node.className}`}>
            <span className="hero-node-plate">{node.icon}</span>
            <span className="hero-node-label">{node.label}</span>
          </div>
        ))}
      </div>
      {stack.length ? (
        <ol className="hero-stack">
          {stack.map((card, index) => (
            <li key={card.title} className={`hero-card hero-card-${roleFor(index, stack.length)}`}>
              <p className="hero-card-kicker">{card.kicker}</p>
              <p className="hero-card-title">{card.title}</p>
              <p className="hero-card-date">{card.date}</p>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
