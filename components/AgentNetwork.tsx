type ToolId = "search" | "code" | "browser" | "memory" | "api";

type ToolNode = {
  id: ToolId;
  label: string;
  x: number;
  y: number;
  accent: string;
  ink: string;
  pulse: string;
  d: string;
};

type Particle = {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  delay: string;
  dur: string;
};

type CoreSpec = {
  glow: number;
  slow: number;
  fast?: number;
  outer?: number;
  body: number;
  tickIn: number;
  tickOut: number;
  spark: number;
};

type CssVars = React.CSSProperties & {
  "--i"?: number;
  "--d"?: string;
  "--dur"?: string;
};

const FULL_CORE: CoreSpec = {
  glow: 74,
  slow: 56,
  fast: 44,
  outer: 210,
  body: 26,
  tickIn: 31,
  tickOut: 38,
  spark: 1,
};

const COMPACT_CORE: CoreSpec = {
  glow: 52,
  slow: 40,
  body: 22,
  tickIn: 26,
  tickOut: 32,
  spark: 0.82,
};

const FULL_NODES: ToolNode[] = [
  {
    id: "search",
    label: "Search",
    x: 320,
    y: 88,
    accent: "#14b8a6",
    ink: "#f7fbff",
    pulse: "#3ee1c8",
    d: "M 320 256 Q 352 172 320 88",
  },
  {
    id: "code",
    label: "Code",
    x: 479.8,
    y: 204.1,
    accent: "#2f9dff",
    ink: "#f7fbff",
    pulse: "#2f9dff",
    d: "M 320 256 Q 409.8 260.5 479.8 204.1",
  },
  {
    id: "browser",
    label: "Browser",
    x: 418.7,
    y: 391.9,
    accent: "#0f766e",
    ink: "#f7fbff",
    pulse: "#5eead4",
    d: "M 320 256 Q 343.5 342.8 418.7 391.9",
  },
  {
    id: "memory",
    label: "Memory",
    x: 221.3,
    y: 391.9,
    accent: "#e0b04a",
    ink: "#1a2c40",
    pulse: "#f0d48a",
    d: "M 320 256 Q 244.8 305.1 221.3 391.9",
  },
  {
    id: "api",
    label: "API",
    x: 160.2,
    y: 204.1,
    accent: "#0c5cad",
    ink: "#f7fbff",
    pulse: "#8ec8ff",
    d: "M 320 256 Q 250 199.6 160.2 204.1",
  },
];

const COMPACT_NODES: ToolNode[] = [
  {
    id: "search",
    label: "Search",
    x: 170,
    y: 46,
    accent: "#14b8a6",
    ink: "#f7fbff",
    pulse: "#3ee1c8",
    d: "M 170 162 L 170 46",
  },
  {
    id: "code",
    label: "Code",
    x: 268,
    y: 112,
    accent: "#2f9dff",
    ink: "#f7fbff",
    pulse: "#2f9dff",
    d: "M 170 162 L 268 112",
  },
  {
    id: "browser",
    label: "Browser",
    x: 262,
    y: 232,
    accent: "#0f766e",
    ink: "#f7fbff",
    pulse: "#5eead4",
    d: "M 170 162 L 262 232",
  },
  {
    id: "memory",
    label: "Memory",
    x: 78,
    y: 232,
    accent: "#e0b04a",
    ink: "#1a2c40",
    pulse: "#f0d48a",
    d: "M 170 162 L 78 232",
  },
  {
    id: "api",
    label: "API",
    x: 72,
    y: 112,
    accent: "#0c5cad",
    ink: "#f7fbff",
    pulse: "#8ec8ff",
    d: "M 170 162 L 72 112",
  },
];

const FULL_PARTICLES: Particle[] = [
  { cx: 78, cy: 58, r: 1.15, fill: "#F7FBFF", delay: "0.2s", dur: "5.2s" },
  { cx: 146, cy: 36, r: 0.7, fill: "#F0D48A", delay: "1.4s", dur: "6.4s" },
  { cx: 214, cy: 28, r: 0.95, fill: "#7EE0FF", delay: "2.1s", dur: "4.8s" },
  { cx: 438, cy: 34, r: 1.05, fill: "#F7FBFF", delay: "0.6s", dur: "5.8s" },
  { cx: 528, cy: 52, r: 0.7, fill: "#F0D48A", delay: "3.2s", dur: "6.1s" },
  { cx: 586, cy: 102, r: 1.35, fill: "#7EE0FF", delay: "1.1s", dur: "5.4s" },
  { cx: 46, cy: 168, r: 0.8, fill: "#7EE0FF", delay: "2.8s", dur: "6.6s" },
  { cx: 64, cy: 268, r: 1.1, fill: "#F7FBFF", delay: "0.4s", dur: "4.6s" },
  { cx: 38, cy: 360, r: 0.65, fill: "#F0D48A", delay: "1.8s", dur: "5.9s" },
  { cx: 108, cy: 448, r: 1.15, fill: "#7EE0FF", delay: "3.6s", dur: "6.2s" },
  { cx: 250, cy: 492, r: 0.75, fill: "#F7FBFF", delay: "0.9s", dur: "5.1s" },
  { cx: 390, cy: 486, r: 1, fill: "#F0D48A", delay: "2.4s", dur: "6.8s" },
  { cx: 548, cy: 430, r: 1.25, fill: "#F7FBFF", delay: "1.6s", dur: "4.9s" },
  { cx: 604, cy: 286, r: 0.8, fill: "#7EE0FF", delay: "3.9s", dur: "5.7s" },
  { cx: 572, cy: 168, r: 0.95, fill: "#F0D48A", delay: "0.3s", dur: "6.3s" },
  { cx: 246, cy: 156, r: 0.7, fill: "#3EE1C8", delay: "2.2s", dur: "5.5s" },
  { cx: 404, cy: 142, r: 0.85, fill: "#F0D48A", delay: "1.3s", dur: "4.7s" },
  { cx: 132, cy: 330, r: 0.6, fill: "#7EE0FF", delay: "3.1s", dur: "6.5s" },
];

const COMPACT_PARTICLES: Particle[] = [
  { cx: 28, cy: 28, r: 1.2, fill: "#F7FBFF", delay: "0.4s", dur: "5.4s" },
  { cx: 308, cy: 36, r: 0.9, fill: "#F0D48A", delay: "1.6s", dur: "6.2s" },
  { cx: 22, cy: 168, r: 1, fill: "#7EE0FF", delay: "2.4s", dur: "4.9s" },
  { cx: 318, cy: 176, r: 0.8, fill: "#F7FBFF", delay: "0.8s", dur: "5.8s" },
  { cx: 46, cy: 278, r: 1.1, fill: "#F0D48A", delay: "3.2s", dur: "6.4s" },
  { cx: 300, cy: 274, r: 0.7, fill: "#7EE0FF", delay: "1.2s", dur: "5.1s" },
  { cx: 170, cy: 286, r: 0.85, fill: "#3EE1C8", delay: "2.1s", dur: "6.6s" },
  { cx: 196, cy: 22, r: 0.65, fill: "#F7FBFF", delay: "3.5s", dur: "4.8s" },
];

const STATION_TICKS = [
  "M 320 98 L 320 78",
  "M 470.3 207.2 L 489.3 201",
  "M 412.9 383.8 L 424.6 400",
  "M 227.1 383.8 L 215.4 400",
  "M 169.7 207.2 L 150.7 201",
];

function dialTicks(r1: number, r2: number, count = 8) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x1: +(Math.cos(angle) * r1).toFixed(2),
      y1: +(Math.sin(angle) * r1).toFixed(2),
      x2: +(Math.cos(angle) * r2).toFixed(2),
      y2: +(Math.sin(angle) * r2).toFixed(2),
    };
  });
}

const FULL_DIAL = dialTicks(FULL_CORE.tickIn, FULL_CORE.tickOut);
const COMPACT_DIAL = dialTicks(COMPACT_CORE.tickIn, COMPACT_CORE.tickOut);

function ToolIcon({ id, ink }: { id: ToolId; ink: string }) {
  const stroke = {
    fill: "none",
    stroke: ink,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (id === "search") {
    return (
      <g>
        <circle cx="7" cy="7" r="3.7" {...stroke} />
        <path d="M9.8 9.8 L13.4 13.4" {...stroke} />
      </g>
    );
  }

  if (id === "code") {
    return (
      <g>
        <path d="M6.2 4 L2.4 8 L6.2 12" {...stroke} />
        <path d="M9.8 4 L13.6 8 L9.8 12" {...stroke} />
      </g>
    );
  }

  if (id === "browser") {
    return (
      <g>
        <rect x="2.1" y="2.8" width="11.8" height="10.2" rx="1.8" {...stroke} />
        <path d="M2.1 6 H13.9" {...stroke} />
      </g>
    );
  }

  if (id === "memory") {
    return (
      <g>
        <path d="M2.4 6.1 L8 3.5 L13.6 6.1 L8 8.7 Z" {...stroke} />
        <path d="M2.4 9.3 L8 11.9 L13.6 9.3" {...stroke} />
        <path d="M4.2 12.2 L8 14.2 L11.8 12.2" {...stroke} />
      </g>
    );
  }

  return (
    <g>
      <circle cx="3.3" cy="8" r="1.45" fill={ink} />
      <circle cx="12.4" cy="4.1" r="1.45" fill={ink} />
      <circle cx="12.4" cy="11.9" r="1.45" fill={ink} />
      <path d="M4.7 7.3 L10.7 4.7 M4.7 8.7 L10.7 11.3" {...stroke} />
    </g>
  );
}

function NodePill({
  node,
  index,
  width,
  height,
  tile,
  textX,
  halo,
  prefix,
  spin,
}: {
  node: ToolNode;
  index: number;
  width: number;
  height: number;
  tile: number;
  textX: number;
  halo: number;
  prefix: string;
  spin: boolean;
}) {
  const tileX = -width / 2 + 10;
  const style: CssVars = { "--i": index };

  return (
    <g transform={`translate(${node.x} ${node.y})`}>
      <g className={spin ? "agent-node" : undefined} style={style}>
        <circle className="agent-halo" r={halo} fill={`url(#${prefix}-${node.id}-halo)`} />
        <rect className="agent-pill" x={-width / 2} y={-height / 2} width={width} height={height} rx={height / 2} />
        <rect
          className="agent-pill-edge"
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
          rx={height / 2}
          stroke={node.accent}
        />
        <rect x={tileX} y={-tile / 2} width={tile} height={tile} rx="8" fill={node.accent} />
        <g transform={`translate(${tileX + (tile - 16) / 2} ${-8})`}>
          <ToolIcon id={node.id} ink={node.ink} />
        </g>
        <text className="agent-label" x={textX} y="0.5" textAnchor="start" dominantBaseline="central">
          {node.label}
        </text>
      </g>
    </g>
  );
}

function Core({ prefix, cx, cy, spec, dial }: { prefix: string; cx: number; cy: number; spec: CoreSpec; dial: ReturnType<typeof dialTicks> }) {
  return (
    <g className="agent-core">
      {spec.outer ? (
        <circle
          className="agent-ring agent-ring-outer"
          cx={cx}
          cy={cy}
          r={spec.outer}
          stroke="rgba(240,212,138,0.28)"
          strokeWidth="1.1"
          strokeDasharray="2 11"
        />
      ) : null}
      <g transform={`translate(${cx} ${cy})`}>
        <circle className="agent-core-glow" r={spec.glow} fill={`url(#${prefix}-glow)`} />
        <circle
          className="agent-ring agent-ring-slow"
          r={spec.slow}
          stroke="rgba(240,212,138,0.62)"
          strokeWidth="1.25"
          strokeDasharray="2 6"
        />
        {spec.fast ? (
          <circle
            className="agent-ring agent-ring-fast"
            r={spec.fast}
            stroke="rgba(126,224,255,0.8)"
            strokeWidth="1.4"
            strokeDasharray="8 10"
          />
        ) : null}
        <g stroke="rgba(232,244,255,0.72)" strokeWidth="1.5" strokeLinecap="round">
          {dial.map((tick) => (
            <line key={`${tick.x1}-${tick.y1}`} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} />
          ))}
        </g>
        <circle r={spec.body} fill={`url(#${prefix}-body)`} />
        <circle r={spec.body} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <path
          d="M 0 -15.5 L 3.1 -3.3 L 15.5 0 L 3.1 3.3 L 0 15.5 L -3.1 3.3 L -15.5 0 L -3.1 -3.3 Z"
          fill={`url(#${prefix}-gold)`}
          transform={`scale(${spec.spark})`}
        />
        <circle r="2.4" fill="#f7fbff" />
      </g>
    </g>
  );
}

function Scene({
  prefix,
  className,
  viewBox,
  cx,
  cy,
  orbit,
  orbiting,
  nodes,
  particles,
  core,
  dial,
  pill,
}: {
  prefix: string;
  className: string;
  viewBox: string;
  cx: number;
  cy: number;
  orbit: number;
  orbiting: boolean;
  nodes: ToolNode[];
  particles: Particle[];
  core: CoreSpec;
  dial: ReturnType<typeof dialTicks>;
  pill: { width: number; height: number; tile: number; textX: number; halo: number };
}) {
  const links = (
    <>
      {orbiting ? (
        <path
          d="M 320 88 L 479.8 204.1 L 418.7 391.9 L 221.3 391.9 L 160.2 204.1 Z"
          fill="none"
          stroke="rgba(142,200,255,0.22)"
          strokeWidth="1.15"
        />
      ) : null}
      {nodes.map((node) => (
        <path key={`${node.id}-wire`} d={node.d} fill="none" stroke="rgba(186,220,255,0.34)" strokeWidth="1.35" />
      ))}
      {nodes.map((node, index) => (
        <path
          key={`${node.id}-pulse`}
          className="agent-pulse"
          d={node.d}
          pathLength={100}
          stroke={node.pulse}
          style={{ "--i": index } as CssVars}
        />
      ))}
      {nodes.map((node, index) => (
        <NodePill key={node.id} node={node} index={index} prefix={prefix} spin={orbiting} {...pill} />
      ))}
    </>
  );

  return (
    <svg className={className} viewBox={viewBox} fill="none" aria-hidden="true" textRendering="geometricPrecision">
      <defs>
        <pattern id={`${prefix}-dots`} width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.85" fill="rgba(186,220,255,0.2)" />
        </pattern>
        <radialGradient id={`${prefix}-fade`} cx="50%" cy="48%" r="62%">
          <stop offset="0.58" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        <mask id={`${prefix}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${prefix}-fade)`} />
        </mask>
        <radialGradient id={`${prefix}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#2f9dff" stopOpacity="0.58" />
          <stop offset="0.45" stopColor="#14b8a6" stopOpacity="0.14" />
          <stop offset="1" stopColor="#2f9dff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${prefix}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a4f86" />
          <stop offset="0.52" stopColor="#1568c0" />
          <stop offset="1" stopColor="#149e96" />
        </linearGradient>
        <linearGradient id={`${prefix}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6d56a" />
          <stop offset="1" stopColor="#c4921a" />
        </linearGradient>
        {nodes.map((node) => (
          <radialGradient key={node.id} id={`${prefix}-${node.id}-halo`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={node.pulse} stopOpacity="0.95" />
            <stop offset="0.55" stopColor={node.pulse} stopOpacity="0.18" />
            <stop offset="1" stopColor={node.pulse} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      <g className="hero-layer-back" mask={`url(#${prefix}-mask)`}>
        <rect width="100%" height="100%" fill={`url(#${prefix}-dots)`} />
        {particles.map((particle) => (
          <circle
            key={`${particle.cx}-${particle.cy}`}
            className="agent-star"
            cx={particle.cx}
            cy={particle.cy}
            r={particle.r}
            fill={particle.fill}
            style={{ "--d": particle.delay, "--dur": particle.dur } as CssVars}
          />
        ))}
      </g>

      <g className="hero-layer-mid">
        {orbiting ? (
          <>
            <circle cx={cx} cy={cy} r={orbit} stroke="rgba(142,200,255,0.32)" strokeWidth="1.2" strokeDasharray="1.6 8" />
            <circle className="agent-comet" cx={cx} cy={cy} r={orbit} pathLength={100} />
            <g stroke="rgba(126,224,255,0.55)" strokeWidth="1.5" strokeLinecap="round">
              {STATION_TICKS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </>
        ) : null}
        {orbiting ? (
          <g className="agent-orbit">
            {/* Centered box keeps the spin origin on the core, not the pill bounds. */}
            <rect x={cx - 256} y={cy - 256} width="512" height="512" fill="transparent" />
            {links}
          </g>
        ) : (
          links
        )}
        <Core prefix={prefix} cx={cx} cy={cy} spec={core} dial={dial} />
      </g>
    </svg>
  );
}

export function AgentNetwork({ animated = true }: { animated?: boolean }) {
  return (
    <div className={animated ? "agent-net agent-net-live" : "agent-net"} data-agent-network={animated ? "live" : "still"}>
      <Scene
        prefix="full"
        className="agent-svg agent-svg-full font-sans"
        viewBox="0 0 640 520"
        cx={320}
        cy={256}
        orbit={168}
        orbiting
        nodes={FULL_NODES}
        particles={FULL_PARTICLES}
        core={FULL_CORE}
        dial={FULL_DIAL}
        pill={{ width: 150, height: 46, tile: 26, textX: -30, halo: 46 }}
      />
      <Scene
        prefix="compact"
        className="agent-svg agent-svg-compact font-sans"
        viewBox="0 0 340 300"
        cx={170}
        cy={162}
        orbit={0}
        orbiting={false}
        nodes={COMPACT_NODES}
        particles={COMPACT_PARTICLES}
        core={COMPACT_CORE}
        dial={COMPACT_DIAL}
        pill={{ width: 124, height: 40, tile: 22, textX: -22, halo: 30 }}
      />
    </div>
  );
}
