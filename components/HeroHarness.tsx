import { HeroStage } from "@/components/HeroStage";

const STARS: Array<[number, number, number, string]> = [
  [48, 72, 1.1, "#F7FBFF"],
  [96, 148, 0.8, "#F0D48A"],
  [140, 46, 1.3, "#7EE0FF"],
  [188, 210, 0.7, "#F7FBFF"],
  [230, 88, 1.0, "#F7FBFF"],
  [274, 36, 0.8, "#F0D48A"],
  [360, 58, 1.2, "#7EE0FF"],
  [418, 96, 0.7, "#F7FBFF"],
  [470, 42, 1.1, "#F7FBFF"],
  [528, 120, 0.9, "#F0D48A"],
  [586, 70, 1.4, "#7EE0FF"],
  [610, 188, 0.8, "#F7FBFF"],
  [70, 250, 1.0, "#7EE0FF"],
  [36, 340, 1.3, "#F7FBFF"],
  [92, 420, 0.8, "#F0D48A"],
  [150, 500, 1.1, "#F7FBFF"],
  [210, 560, 0.7, "#7EE0FF"],
  [390, 540, 1.2, "#F7FBFF"],
  [460, 500, 0.8, "#F0D48A"],
  [530, 560, 1.0, "#7EE0FF"],
  [590, 470, 1.3, "#F7FBFF"],
  [560, 390, 0.7, "#F0D48A"],
  [600, 300, 1.1, "#7EE0FF"],
  [40, 480, 0.9, "#F7FBFF"],
  [300, 600, 0.8, "#7EE0FF"],
  [120, 580, 1.2, "#F7FBFF"],
  [500, 180, 0.7, "#F7FBFF"],
  [250, 480, 0.9, "#F0D48A"],
];

const LINKS = [
  { d: "M320 236 C320 188 338 150 320 116", stroke: "#7EE0FF", delay: "0s", duration: "3.4s" },
  { d: "M248 318 C214 286 200 300 188 318", stroke: "#F0D48A", delay: "-1.1s", duration: "4.1s" },
  { d: "M392 318 C428 286 444 304 452 318", stroke: "#3EE1C8", delay: "-2.2s", duration: "3.7s" },
  { d: "M320 400 C304 452 340 492 320 522", stroke: "#8EC8FF", delay: "-0.6s", duration: "4.4s" },
];

function AgentCard({
  x,
  y,
  label,
  accent,
}: {
  x: number;
  y: number;
  label: string;
  accent: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="168" height="60" rx="18" fill="rgba(214,240,255,0.1)" stroke="rgba(190,230,255,0.7)" />
      <rect x="16" y="18" width="24" height="24" rx="6" fill={accent} />
      <rect x="23" y="25" width="10" height="10" rx="2" fill="#F7FBFF" />
      <text x="52" y="39" fill="#F5F9FD" fontSize="24" fontWeight="600">
        {label}
      </text>
    </g>
  );
}

export function HeroHarness() {
  return (
    <HeroStage>
        <div className="hero-glow hero-glow-cyan" />
        <div className="hero-glow hero-glow-blue" />
        <div className="hero-glow hero-glow-gold" />
        <svg viewBox="0 0 640 640" className="absolute inset-x-0 top-1 h-[calc(100%-2.85rem)] w-full font-sans">
          <defs>
            <radialGradient id="hh-fade" cx="50%" cy="48%" r="62%">
              <stop offset="0.55" stopColor="white" />
              <stop offset="1" stopColor="black" />
            </radialGradient>
            <mask id="hh-mask">
              <rect width="640" height="640" fill="url(#hh-fade)" />
            </mask>
            <pattern id="hh-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 H0 V40" fill="none" stroke="rgba(186,220,255,0.16)" strokeWidth="1" />
            </pattern>
            <linearGradient id="hh-core" x1="274" y1="272" x2="366" y2="364" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#123A6B" />
              <stop offset="0.52" stopColor="#1568C0" />
              <stop offset="1" stopColor="#1EC8BE" />
            </linearGradient>
            <linearGradient id="hh-gold" x1="304" y1="302" x2="336" y2="334" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#F6D56A" />
              <stop offset="1" stopColor="#C4921A" />
            </linearGradient>
          </defs>

          <g className="hero-layer-back" mask="url(#hh-mask)">
            <rect width="640" height="640" fill="url(#hh-grid)" />
            {STARS.map(([cx, cy, r, fill], index) => (
              <circle
                key={`${cx}-${cy}`}
                className="hero-star"
                cx={cx}
                cy={cy}
                r={r}
                fill={fill}
                style={{ animationDelay: `${(index % 8) * 0.35}s` }}
              />
            ))}
          </g>

          <g className="hero-layer-mid">
            <g className="hero-spin-slow">
              <path
                d="M320 222 L403.1 270 L403.1 366 L320 414 L236.9 366 L236.9 270 Z"
                fill="none"
                stroke="rgba(240,212,138,0.45)"
                strokeWidth="1.2"
                strokeDasharray="5 8"
              />
            </g>
            <g className="hero-spin">
              <path
                d="M320 240 L387.5 279 L387.5 357 L320 396 L252.5 357 L252.5 279 Z"
                fill="none"
                stroke="rgba(170,230,255,0.7)"
                strokeWidth="1.6"
              />
              <rect x="362.6" y="277.1" width="13" height="13" rx="3" fill="#3EE1C8" />
              <rect x="318.7" y="371.3" width="13" height="13" rx="3" fill="#F0D48A" />
              <rect x="259.1" y="286.1" width="13" height="13" rx="3" fill="#2F9DFF" />
            </g>
            <path d="M320 318 L430 218" fill="none" stroke="rgba(240,212,138,0.4)" strokeWidth="1.2" strokeDasharray="3 6" />
            {LINKS.map((link) => (
              <path key={link.d} d={link.d} fill="none" stroke="rgba(186,230,255,0.28)" strokeWidth="1.4" />
            ))}
            {LINKS.map((link) => (
              <path
                key={`${link.d}-packet`}
                className="hero-packet"
                d={link.d}
                stroke={link.stroke}
                style={{ animationDelay: link.delay, animationDuration: link.duration }}
              />
            ))}
          </g>

          <g className="hero-layer-front">
            <path d="M320 272 L359.8 295 L359.8 341 L320 364 L280.2 341 L280.2 295 Z" fill="url(#hh-core)" />
            <path d="M320 302 L336 318 L320 334 L304 318 Z" fill="url(#hh-gold)" />
            <AgentCard x={236} y={48} label="Memory" accent="#3EE1C8" />
            <AgentCard x={16} y={290} label="Tools" accent="#F0D48A" />
            <AgentCard x={456} y={290} label="Browser" accent="#2F9DFF" />
            <AgentCard x={236} y={528} label="Code" accent="#14B8A6" />
          </g>
        </svg>
        <span className="hero-copy">
          <span className="hero-copy-mark" aria-hidden />
          Copy
        </span>
        <p className="hero-caption">
          <span>Harness core</span>
          <span className="text-[#f0d48a]">Agents replicating</span>
        </p>
    </HeroStage>
  );
}
