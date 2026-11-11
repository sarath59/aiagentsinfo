#!/usr/bin/env python3
"""Pull public tracker snapshots. Never invent counts; skip a row if the source fails.

Daily star observations, GitHub release rows, and the coding-CLI npm fallback
are written by scripts/record-star-history.py. This script does not fill missing days.
"""

from __future__ import annotations

import json
import ssl
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

UA = "AIAgentsInfo/1.0 (+https://www.aiagentsinfo.com; hello@aiagentsinfo.com)"
CTX = ssl.create_default_context()
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "trackers"
OUT.mkdir(parents=True, exist_ok=True)

PYPI = [
    ("langchain", "LangChain", "langchain-ai/langchain", "langchain", None),
    ("langgraph", "LangGraph", "langchain-ai/langgraph", None, None),
    ("crewai", "CrewAI", "crewAIInc/crewAI", "crewai", None),
    ("autogen-agentchat", "AutoGen AgentChat", "microsoft/autogen", None, "The install name printed in the AutoGen README."),
    ("ag2", "AG2", "ag2ai/ag2", None, "The AG2 distribution. Related to, but not the same file as, autogen-agentchat."),
    ("llama-index", "LlamaIndex", "run-llama/llama_index", None, None),
    ("openai-agents", "OpenAI Agents SDK", "openai/openai-agents-python", "openai-agents-sdk", None),
    ("pydantic-ai", "Pydantic AI", "pydantic/pydantic-ai", "pydantic-ai", None),
    ("pydantic-ai-slim", "Pydantic AI slim", "pydantic/pydantic-ai", "pydantic-ai", "The slim distribution that pydantic-ai depends on. Not a second product."),
    ("smolagents", "smolagents", "huggingface/smolagents", "smolagents", None),
    ("google-adk", "Google ADK", "google/adk-python", "google-adk", None),
    ("strands-agents", "Strands Agents", "strands-agents/harness-sdk", None, None),
    ("claude-agent-sdk", "Claude Agent SDK", "anthropics/claude-agent-sdk-python", "claude-agent-sdk", None),
]
NPM = [
    ("mastra", "Mastra", "@mastra/core", "mastra-ai/mastra", None),
    ("langgraph-js", "LangGraph JS", "@langchain/langgraph", "langchain-ai/langgraphjs", None),
    ("openai-agents-js", "OpenAI Agents JS", "@openai/agents", "openai/openai-agents-js", None),
    ("google-adk-js", "Google ADK JS", "@google/adk", "google/adk-js", None),
    ("ai-sdk", "Vercel AI SDK", "ai", "vercel/ai", "The registry describes this as a model-provider toolkit. Apps that never run an agent loop still increment this count."),
]
REPOS = [
    ("langchain", "LangChain", "langchain-ai/langchain", "langchain", None),
    ("langgraph", "LangGraph", "langchain-ai/langgraph", None, None),
    ("crewai", "CrewAI", "crewAIInc/crewAI", "crewai", None),
    ("autogen", "AutoGen", "microsoft/autogen", None, None),
    ("ag2", "AG2", "ag2ai/ag2", None, None),
    ("llama-index", "LlamaIndex", "run-llama/llama_index", None, None),
    ("openai-agents", "OpenAI Agents SDK", "openai/openai-agents-python", "openai-agents-sdk", None),
    ("openai-agents-js", "OpenAI Agents JS", "openai/openai-agents-js", None, None),
    ("pydantic-ai", "Pydantic AI", "pydantic/pydantic-ai", "pydantic-ai", None),
    ("smolagents", "smolagents", "huggingface/smolagents", "smolagents", None),
    ("google-adk", "Google ADK", "google/adk-python", "google-adk", None),
    ("google-adk-js", "Google ADK JS", "google/adk-js", None, None),
    ("mastra", "Mastra", "mastra-ai/mastra", None, None),
    ("strands", "Strands Agents", "strands-agents/harness-sdk", None, None),
    ("claude-agent-sdk", "Claude Agent SDK", "anthropics/claude-agent-sdk-python", "claude-agent-sdk", None),
    ("ai-sdk", "Vercel AI SDK", "vercel/ai", None, "Broader than agent frameworks. Kept because the npm tracker rows the same repository."),
]


def get(url: str, headers: dict | None = None, timeout: int = 20):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json", **(headers or {})})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as res:
            body = res.read().decode("utf-8", "replace")
            return res.status, json.loads(body)
    except urllib.error.HTTPError as exc:
        print(f"HTTP {exc.code} {url}")
        return exc.code, None
    except Exception as exc:
        print(f"ERR {url}: {exc}")
        return "ERR", None


def iso_day(dt: datetime | None = None) -> str:
    value = dt or datetime.now(timezone.utc)
    return value.date().isoformat()


def monthly(daily: list[dict]) -> list[dict]:
    months: dict[str, int] = {}
    for row in daily:
        month = row["date"][:7]
        months[month] = months.get(month, 0) + row["downloads"]
    return [{"month": month, "downloads": months[month]} for month in sorted(months)]


def complete_daily(daily: list[dict]) -> list[dict]:
    rows = list(daily)
    while rows and rows[-1]["downloads"] == 0:
        rows.pop()
    return rows


def window_sum(daily: list[dict], days: int = 30):
    slice_ = complete_daily(daily)[-days:]
    if not slice_:
        return None
    return {
        "start": slice_[0]["date"],
        "end": slice_[-1]["date"],
        "downloads": sum(row["downloads"] for row in slice_),
        "slice": slice_,
    }


def pypi_package(item):
    pid, name, repo, directory, note = item
    overall_url = f"https://pypistats.org/api/packages/{pid}/overall?mirrors=false"
    recent_url = f"https://pypistats.org/api/packages/{pid}/recent"
    status, overall = get(overall_url, timeout=25)
    if not overall:
        return None
    daily = [
        {"date": row["date"], "downloads": int(row["downloads"])}
        for row in overall.get("data") or []
        if row.get("category") == "without_mirrors" and isinstance(row.get("downloads"), (int, float))
    ]
    daily.sort(key=lambda row: row["date"])
    window = window_sum(daily)
    if not window:
        return None
    _, recent = get(recent_url)
    recent_data = (recent or {}).get("data") or {}
    packed = {
        "id": pid,
        "name": name,
        "package": pid,
        "registry": "pypi",
        "repo": repo,
        "windowStart": window["start"],
        "windowEnd": window["end"],
        "windowDownloads": window["downloads"],
        "lastDay": recent_data.get("last_day"),
        "lastWeek": recent_data.get("last_week"),
        "lastMonth": recent_data.get("last_month"),
        "daily": daily[-90:],
        "monthly": monthly(daily),
        "sourceUrl": overall_url,
    }
    if directory:
        packed["directory"] = directory
    if note:
        packed["note"] = note
    return packed


def npm_package(item):
    pid, name, package, repo, note = item
    end = iso_day()
    start = (datetime.now(timezone.utc) - timedelta(days=180)).date().isoformat()
    url = f"https://api.npmjs.org/downloads/range/{start}:{end}/{package}"
    status, payload = get(url, timeout=20)
    if not payload:
        return None
    daily = [
        {"date": row["day"], "downloads": int(row["downloads"])}
        for row in payload.get("downloads") or []
        if row.get("day") and isinstance(row.get("downloads"), (int, float))
    ]
    daily.sort(key=lambda row: row["date"])
    window = window_sum(daily)
    if not window:
        return None
    packed = {
        "id": pid,
        "name": name,
        "package": package,
        "registry": "npm",
        "repo": repo,
        "windowStart": window["start"],
        "windowEnd": window["end"],
        "windowDownloads": window["downloads"],
        "lastDay": window["slice"][-1]["downloads"],
        "lastWeek": sum(row["downloads"] for row in daily[-7:]),
        "lastMonth": window["downloads"],
        "daily": daily[-90:],
        "monthly": monthly(daily),
        "sourceUrl": url,
    }
    if note:
        packed["note"] = note
    return packed


def downloads():
    pypi_rows = []
    npm_rows = []
    for item in PYPI:
        row = pypi_package(item)
        print("pypi", item[0], "ok" if row else "FAIL")
        if row:
            pypi_rows.append(row)
        time.sleep(0.4)
    for item in NPM:
        row = npm_package(item)
        print("npm", item[2], "ok" if row else "FAIL")
        if row:
            npm_rows.append(row)
        time.sleep(0.2)
    pypi_rows.sort(key=lambda row: (-row["windowDownloads"], row["package"]))
    npm_rows.sort(key=lambda row: (-row["windowDownloads"], row["package"]))
    now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    payload = {
        "retrievedAt": now,
        "retrievedDay": iso_day(),
        "pypi": pypi_rows,
        "npm": npm_rows,
        "sources": [
            {"title": "pypistats overall, without_mirrors", "url": "https://pypistats.org/api/packages/langchain/overall?mirrors=false"},
            {"title": "pypistats recent", "url": "https://pypistats.org/api/packages/langchain/recent"},
            {"title": "npm download counts", "url": "https://api.npmjs.org/downloads/range/last-month/@mastra/core"},
            {"title": "npm download-counts documentation", "url": "https://github.com/npm/registry/blob/master/docs/download-counts.md"},
        ],
    }
    (OUT / "downloads-snapshot.json").write_text(json.dumps(payload, indent=2) + "\n")
    print("wrote downloads", len(pypi_rows), "pypi", len(npm_rows), "npm")


def stars():
    rows = []
    now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    for item in REPOS:
        pid, name, repo, directory, note = item
        status, payload = get(
            f"https://api.github.com/repos/{repo}",
            headers={"Accept": "application/vnd.github+json"},
        )
        print("stars", repo, status)
        if not payload or not isinstance(payload.get("stargazers_count"), int):
            continue
        packed = {
            "id": pid,
            "name": name,
            "repo": repo,
            "stars": payload["stargazers_count"],
            "forks": payload.get("forks_count"),
            "openIssues": payload.get("open_issues_count"),
            "pushedAt": payload.get("pushed_at"),
            "archived": payload.get("archived"),
            "sourceUrl": f"https://api.github.com/repos/{repo}",
        }
        if directory:
            packed["directory"] = directory
        if note:
            packed["note"] = note
        rows.append(packed)
        time.sleep(0.15)
    rows.sort(key=lambda row: (-row["stars"], row["repo"]))
    payload = {
        "retrievedAt": now,
        "retrievedDay": iso_day(),
        "source": "GitHub REST API https://api.github.com/repos/{owner}/{repo}",
        "rows": rows,
    }
    (OUT / "stars-snapshot.json").write_text(json.dumps(payload, indent=2) + "\n")
    print("wrote stars", len(rows))


def agents_md():
    now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    spec_stars = None
    spec_at = None
    status, spec = get("https://api.github.com/repos/agentsmd/agents.md", headers={"Accept": "application/vnd.github+json"})
    if spec and isinstance(spec.get("stargazers_count"), int):
        spec_stars = spec["stargazers_count"]
        spec_at = now
        print("spec stars", spec_stars)
    homepage_claim = None
    homepage_at = None
    req = urllib.request.Request("https://agents.md/", headers={"User-Agent": UA, "Accept": "text/html"})
    try:
        with urllib.request.urlopen(req, timeout=15, context=CTX) as res:
            html = res.read().decode("utf-8", "replace")
        import re
        match = re.search(r"used by over\s+([0-9]+k)\s+open-source projects", html, re.I)
        if match:
            homepage_claim = f"over {match.group(1)} open-source projects"
            homepage_at = now
            print("homepage", homepage_claim)
    except Exception as exc:
        print("homepage err", exc)

    github = []
    # Code search may 401/429 without a suitable token; leave empty rather than invent.
    payload = {
        "retrievedAt": now,
        "retrievedDay": iso_day(),
        "github": github,
        "specStars": spec_stars,
        "specStarsRetrievedAt": spec_at,
        "homepageClaim": homepage_claim,
        "homepageRetrievedAt": homepage_at,
        "sourcegraph": {
            "retrievedAt": "2026-11-09T16:50:00Z",
            "queryRootAgentsMd": "context:global file:^AGENTS.md$ count:all",
            "queryRootClaudeMd": "context:global file:^CLAUDE.md$ count:all",
            "rootAgentsMd": 13756,
            "rootClaudeMd": 6744,
            "source": "Sourcegraph public code search of GitHub, excluding forks and archives",
            "warnings": [
                "Root AGENTS.md pass reported 2 backends unavailable.",
                "Root CLAUDE.md pass reported 4 backends unavailable.",
                "These are lower bounds from one public index, not a census of every GitHub repository.",
            ],
        },
    }
    (OUT / "agents-md-snapshot.json").write_text(json.dumps(payload, indent=2) + "\n")
    print("wrote agents-md")


if __name__ == "__main__":
    downloads()
    stars()
    agents_md()
