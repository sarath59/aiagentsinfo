"use client";

import { useEffect, useRef, useState } from "react";
import type { AltchaWidgetElement } from "altcha/types/generic";

type Props = {
  error?: string;
  onPayload: (payload: string) => void;
  onUnavailable: (unavailable: boolean) => void;
};

export function HumanCheck({ error, onPayload, onUnavailable }: Props) {
  const widgetRef = useRef<AltchaWidgetElement | null>(null);
  const [ready, setReady] = useState(false);
  const [challengeJson, setChallengeJson] = useState("");
  const [loadError, setLoadError] = useState("");
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void import("altcha").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    void loadChallenge(
      () => cancelled,
      setChallengeJson,
      setLoadError,
      setUnavailable,
      onUnavailable,
      onPayload,
    );
    return () => {
      cancelled = true;
    };
  }, [onPayload, onUnavailable]);

  useEffect(() => {
    const node = widgetRef.current;
    if (!ready || !node || !challengeJson) return;

    const apply = () => {
      void node.configure({
        auto: "off",
        challenge: challengeJson,
        language: "en",
        type: "checkbox",
      });
    };
    const onVerified = (event: Event) => {
      const detail = (event as CustomEvent<{ payload?: string }>).detail;
      onPayload(typeof detail?.payload === "string" ? detail.payload : "");
    };
    const onState = (event: Event) => {
      const detail = (event as CustomEvent<{ state?: string; payload?: string }>).detail;
      if (!detail?.state) return;
      if (detail.state === "verified" && typeof detail.payload === "string" && detail.payload) {
        onPayload(detail.payload);
        return;
      }
      if (detail.state === "expired") {
        onPayload("");
        setChallengeJson("");
        void loadChallenge(
          () => false,
          setChallengeJson,
          setLoadError,
          setUnavailable,
          onUnavailable,
          onPayload,
        );
        return;
      }
      if (detail.state === "error" || detail.state === "unverified") onPayload("");
    };

    node.addEventListener("load", apply);
    node.addEventListener("verified", onVerified);
    node.addEventListener("statechange", onState);
    apply();
    return () => {
      node.removeEventListener("load", apply);
      node.removeEventListener("verified", onVerified);
      node.removeEventListener("statechange", onState);
    };
  }, [challengeJson, onPayload, onUnavailable, ready]);

  return (
    <fieldset
      className="human-check grid gap-1.5 border-0 p-0"
      aria-describedby={error ? "human-check-error" : undefined}
      aria-invalid={error ? true : undefined}
    >
      <legend className="text-sm font-medium">Human check</legend>
      <p className="text-xs leading-relaxed text-[var(--muted)]">Check the box, then submit.</p>
      {loadError ? <p className="text-sm text-red-800">{loadError}</p> : null}
      {unavailable ? (
        <p className="text-sm text-[var(--muted)]">The human check is unavailable right now.</p>
      ) : null}
      {ready && challengeJson ? (
        <altcha-widget
          id="human-check"
          ref={widgetRef}
          challenge={challengeJson}
          auto="off"
          language="en"
          name="altcha"
          type="checkbox"
        />
      ) : !loadError && !unavailable ? (
        <p className="text-sm text-[var(--muted)]">Loading human check.</p>
      ) : null}
      {error ? (
        <p id="human-check-error" className="text-sm text-red-800">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

async function loadChallenge(
  cancelled: () => boolean,
  setChallengeJson: (value: string) => void,
  setLoadError: (value: string) => void,
  setUnavailable: (value: boolean) => void,
  onUnavailable: (unavailable: boolean) => void,
  onPayload: (payload: string) => void,
) {
  try {
    const response = await fetch("/api/altcha/challenge", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (cancelled()) return;
    if (response.status === 503) {
      const body = (await response.json().catch(() => ({}))) as { code?: string };
      if (cancelled()) return;
      if (body.code === "unconfigured") {
        setUnavailable(true);
        onUnavailable(true);
        setChallengeJson("");
        setLoadError("");
        onPayload("");
        return;
      }
    }
    if (!response.ok) {
      setUnavailable(false);
      onUnavailable(false);
      setChallengeJson("");
      setLoadError("The human check could not load. Refresh the page.");
      onPayload("");
      return;
    }
    const body = (await response.json()) as unknown;
    if (cancelled()) return;
    if (!body || typeof body !== "object") {
      setLoadError("The human check could not load. Refresh the page.");
      onPayload("");
      return;
    }
    setUnavailable(false);
    onUnavailable(false);
    setLoadError("");
    setChallengeJson(JSON.stringify(body));
  } catch {
    if (cancelled()) return;
    setUnavailable(false);
    onUnavailable(false);
    setChallengeJson("");
    setLoadError("The human check could not load. Refresh the page.");
    onPayload("");
  }
}
