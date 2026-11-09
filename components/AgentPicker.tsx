"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { trackGoal } from "@/lib/analytics";
import {
  availableUses,
  recommendAgents,
  type PickerAnswers,
  type PickerListing,
  type PickerMatch,
} from "@/lib/agent-picker";

export function AgentPicker({ listings, compact = false }: { listings: PickerListing[]; compact?: boolean }) {
  const uses = useMemo(() => availableUses(listings), [listings]);
  const [useCase, setUseCase] = useState<PickerAnswers["useCase"]>(uses[0]?.id ?? "any");
  const [budget, setBudget] = useState<PickerAnswers["budget"]>("paid-ok");
  const [openSource, setOpenSource] = useState<PickerAnswers["openSource"]>("either");
  const [build, setBuild] = useState<PickerAnswers["build"]>("either");
  const [result, setResult] = useState<{ note: string; matches: PickerMatch[] } | null>(null);
  const tracked = useRef(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = recommendAgents(listings, { useCase, budget, openSource, build });
    setResult(next);
    if (!tracked.current && next.matches.length) {
      tracked.current = true;
      trackGoal("picker_complete");
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "glass rounded-3xl p-5" : "glass rounded-3xl p-6 sm:p-8"}>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Select label="Use case" value={useCase} onChange={(value) => setUseCase(value as PickerAnswers["useCase"])}>
          {uses.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </Select>
        <Select label="Budget" value={budget} onChange={(value) => setBudget(value as PickerAnswers["budget"])}>
          <option value="free-path">A free plan or open-source code</option>
          <option value="paid-ok">Paid is fine</option>
        </Select>
        <Select label="Open source" value={openSource} onChange={(value) => setOpenSource(value as PickerAnswers["openSource"])}>
          <option value="required">I need open source</option>
          <option value="either">No preference</option>
        </Select>
        <Select label="How you want to work" value={build} onChange={(value) => setBuild(value as PickerAnswers["build"])}>
          <option value="code">I will write code</option>
          <option value="nocode">No code</option>
          <option value="either">Either</option>
        </Select>
      </div>
      <button type="submit" className="btn-primary mt-4 px-4 py-2 text-sm">
        Show 3 listings
      </button>
      {result ? (
        <div className="mt-5">
          <p className="text-sm leading-relaxed text-[var(--muted)]">{result.note}</p>
          <ol className="mt-4 grid gap-3">
            {result.matches.map((match) => (
              <li key={match.slug} className="rounded-2xl border border-[var(--stroke)] bg-white p-4">
                <Link href={match.href} className="font-semibold text-[var(--link)] underline">
                  {match.name}
                </Link>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{match.summary}</p>
                <p className="mt-2 text-sm leading-relaxed">{match.why}</p>
                {match.missed.length ? (
                  <p className="mt-1 text-sm text-[var(--muted)]">Misses: {match.missed.join(". ")}.</p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </form>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="kicker">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3"
      >
        {children}
      </select>
    </label>
  );
}
