#!/usr/bin/env python3
"""Store one GitHub star observation per repository per UTC day, plus release rows.

Never invent a count. A failed request leaves that repository's previous rows in
place. Days with no successful read are not filled in.

Star history covers every repository in lib/trackers/catalog.ts STAR_REPOS, plus
the three coding CLIs in lib/trackers/entities.ts. Release rows cover the ten
framework repositories with the most stars in stars-snapshot.json, plus those CLIs.
CLI npm ranges are stored so the download pages have a fallback.
"""

from __future__ import annotations

import json
import os
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
TOP_FRAMEWORKS = 10

# Keep aligned with lib/trackers/catalog.ts STAR_REPOS.
FRAMEWORKS = [
    ("langchain", "LangChain", "langchain-ai/langchain"),
    ("langgraph", "LangGraph", "langchain-ai/langgraph"),
    ("crewai", "CrewAI", "crewAIInc/crewAI"),
    ("autogen", "AutoGen", "microsoft/autogen"),
    ("ag2", "AG2", "ag2ai/ag2"),
    ("llama-index", "LlamaIndex", "run-llama/llama_index"),
    ("openai-agents", "OpenAI Agents SDK", "openai/openai-agents-python"),
    ("openai-agents-js", "OpenAI Agents JS", "openai/openai-agents-js"),
    ("pydantic-ai", "Pydantic AI", "pydantic/pydantic-ai"),
    ("smolagents", "smolagents", "huggingface/smolagents"),
    ("google-adk", "Google ADK", "google/adk-python"),
    ("google-adk-js", "Google ADK JS", "google/adk-js"),
    ("mastra", "Mastra", "mastra-ai/mastra"),
    ("strands", "Strands Agents", "strands-agents/harness-sdk"),
    ("claude-agent-sdk", "Claude Agent SDK", "anthropics/claude-agent-sdk-python"),
    ("ai-sdk", "Vercel AI SDK", "vercel/ai"),
]

# Keep aligned with lib/trackers/entities.ts CLI_STAR_REPOS and CLI_NPM_PACKAGES.
CLIS = [
    ("claude-code", "Claude Code", "anthropics/claude-code", "@anthropic-ai/claude-code", "claude-code"),
    ("codex", "Codex CLI", "openai/codex", "@openai/codex", "codex"),
    ("gemini-cli", "Gemini CLI", "google-gemini/gemini-cli", "@google/gemini-cli", "gemini"),
]


def headers() -> dict[str, str]:
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN") or ""
    base = {"User-Agent": UA, "Accept": "application/vnd.github+json"}
    if token:
        base["Authorization"] = f"Bearer {token}"
    return base


def get(url: str, accept: str | None = None, timeout: int = 25):
    hdrs = headers()
    if accept:
        hdrs["Accept"] = accept
    req = urllib.request.Request(url, headers=hdrs)
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


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def iso_day(value: datetime | None = None) -> str:
    current = value or datetime.now(timezone.utc)
    return current.date().isoformat()


def write_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(payload, indent=2) + "\n")
    tmp.replace(path)


def load_json(path: Path) -> dict | None:
    if not path.exists():
        return None
    return json.loads(path.read_text())


def upsert_point(points: list[dict], point: dict) -> None:
    for index, existing in enumerate(points):
        if existing.get("date") == point["date"]:
            points[index] = point
            break
    else:
        points.append(point)
    points.sort(key=lambda row: (row["date"], row["retrievedAt"]))


def seed_history(history: dict, snapshot: dict) -> None:
    by_id = {series["id"]: series for series in history["series"]}
    for row in snapshot.get("rows") or []:
        if row["id"] in by_id:
            continue
        series = {
            "id": row["id"],
            "name": row["name"],
            "repo": row["repo"],
            "points": [
                {
                    "date": snapshot["retrievedDay"],
                    "stars": row["stars"],
                    "retrievedAt": snapshot["retrievedAt"],
                }
            ],
        }
        history["series"].append(series)
        by_id[row["id"]] = series


def record_stars() -> None:
    snapshot = load_json(OUT / "stars-snapshot.json") or {"rows": [], "retrievedDay": "", "retrievedAt": ""}
    history = load_json(OUT / "stars-history.json") or {
        "source": "GitHub REST API https://api.github.com/repos/{owner}/{repo} field stargazers_count",
        "series": [],
    }
    if "series" not in history:
        history["series"] = []
    seed_history(history, snapshot)
    by_id = {series["id"]: series for series in history["series"]}
    day = iso_day()
    retrieved_at = now_iso()
    repos = [(item[0], item[1], item[2]) for item in FRAMEWORKS]
    repos.extend((item[0], item[1], item[2]) for item in CLIS)
    for pid, name, repo in repos:
        status, payload = get(f"https://api.github.com/repos/{repo}")
        stars = payload.get("stargazers_count") if isinstance(payload, dict) else None
        print("stars", repo, status, stars)
        if not isinstance(stars, int):
            time.sleep(0.15)
            continue
        series = by_id.get(pid)
        if series is None:
            series = {"id": pid, "name": name, "repo": repo, "points": []}
            history["series"].append(series)
            by_id[pid] = series
        series["name"] = name
        series["repo"] = repo
        upsert_point(
            series["points"],
            {"date": day, "stars": stars, "retrievedAt": retrieved_at},
        )
        time.sleep(0.15)
    history["source"] = "GitHub REST API https://api.github.com/repos/{owner}/{repo} field stargazers_count"
    write_json(OUT / "stars-history.json", history)
    print("wrote stars-history", len(history["series"]), "series")


def clip_line(line: str) -> str:
    if len(line) <= 400:
        return line
    return line[:399].rstrip() + "…"


def excerpt(body: object) -> str | None:
    if not isinstance(body, str) or not body.strip():
        return None
    lines = [clip_line(line) for line in body.splitlines()[:12]]
    text = "\n".join(lines).strip()
    return text or None


def record_releases() -> None:
    snapshot = load_json(OUT / "stars-snapshot.json") or {"rows": []}
    ranked = sorted(
        snapshot.get("rows") or [],
        key=lambda row: (-int(row.get("stars") or 0), row.get("repo") or ""),
    )
    wanted: list[tuple[str, str, str]] = []
    for row in ranked:
        match = next((item for item in FRAMEWORKS if item[0] == row.get("id")), None)
        if not match:
            continue
        wanted.append(match)
        if len(wanted) == TOP_FRAMEWORKS:
            break
    for item in CLIS:
        wanted.append((item[0], item[1], item[2]))

    previous = load_json(OUT / "releases-snapshot.json") or {"repos": []}
    previous_by_id = {repo["id"]: repo for repo in previous.get("repos") or []}
    repos = []
    retrieved_at = now_iso()
    for pid, name, repo in wanted:
        status, payload = get(f"https://api.github.com/repos/{repo}/releases?per_page=100&page=1")
        print("releases", repo, status, len(payload) if isinstance(payload, list) else None)
        if not isinstance(payload, list):
            if pid in previous_by_id:
                repos.append(previous_by_id[pid])
                print("releases kept previous", repo)
            time.sleep(0.2)
            continue
        releases = []
        for item in payload:
            if not isinstance(item, dict) or item.get("draft") is True:
                continue
            tag = item.get("tag_name")
            published = item.get("published_at")
            if not isinstance(tag, str) or not tag or not isinstance(published, str) or not published:
                continue
            html = item.get("html_url")
            if not isinstance(html, str) or not html:
                html = f"https://github.com/{repo}/releases/tag/{tag}"
            name_value = item.get("name") if isinstance(item.get("name"), str) else None
            releases.append(
                {
                    "tag": tag,
                    "name": name_value,
                    "body": excerpt(item.get("body")),
                    "publishedAt": published,
                    "htmlUrl": html,
                    "prerelease": item.get("prerelease") is True,
                }
            )
        repos.append(
            {
                "id": pid,
                "name": name,
                "repo": repo,
                "retrievedAt": retrieved_at,
                "capped": len(payload) >= 100,
                "releases": releases,
            }
        )
        time.sleep(0.2)
    payload = {
        "retrievedAt": retrieved_at,
        "retrievedDay": iso_day(),
        "source": "GitHub REST API https://api.github.com/repos/{owner}/{repo}/releases?per_page=100&page=1",
        "repos": repos,
    }
    if repos:
        write_json(OUT / "releases-snapshot.json", payload)
        print("wrote releases", len(repos), "repos")
    else:
        print("releases unchanged; no repository returned a list")


def monthly(daily: list[dict]) -> list[dict]:
    months: dict[str, int] = {}
    for row in daily:
        month = row["date"][:7]
        months[month] = months.get(month, 0) + row["downloads"]
    return [{"month": month, "downloads": months[month]} for month in sorted(months)]


def record_cli_downloads() -> None:
    end = iso_day()
    start = (datetime.now(timezone.utc) - timedelta(days=180)).date().isoformat()
    packages = []
    retrieved = []
    for pid, name, repo, package, directory in CLIS:
        url = f"https://api.npmjs.org/downloads/range/{start}:{end}/{package}"
        status, payload = get(url, accept="application/json", timeout=20)
        print("npm", package, status)
        if not isinstance(payload, dict):
            time.sleep(0.2)
            continue
        daily = [
            {"date": row["day"], "downloads": int(row["downloads"])}
            for row in payload.get("downloads") or []
            if isinstance(row, dict) and row.get("day") and isinstance(row.get("downloads"), int)
        ]
        daily.sort(key=lambda row: row["date"])
        while daily and daily[-1]["downloads"] == 0:
            daily.pop()
        window = daily[-30:]
        if len(daily) < 7 or not window:
            print("npm short", package, len(daily))
            time.sleep(0.2)
            continue
        retrieved_at = now_iso()
        retrieved.append(retrieved_at)
        packages.append(
            {
                "id": pid,
                "name": name,
                "package": package,
                "registry": "npm",
                "repo": repo,
                "directory": directory,
                "windowStart": window[0]["date"],
                "windowEnd": window[-1]["date"],
                "windowDownloads": sum(row["downloads"] for row in window),
                "lastDay": window[-1]["downloads"],
                "lastWeek": sum(row["downloads"] for row in daily[-7:]),
                "lastMonth": sum(row["downloads"] for row in window),
                "daily": daily[-90:],
                "monthly": monthly(daily),
                "sourceUrl": url,
            }
        )
        time.sleep(0.2)
    if not packages:
        print("cli downloads unchanged")
        return
    write_json(
        OUT / "cli-downloads-snapshot.json",
        {
            "retrievedAt": max(retrieved),
            "retrievedDay": iso_day(),
            "packages": packages,
        },
    )
    print("wrote cli downloads", len(packages))


if __name__ == "__main__":
    record_stars()
    record_releases()
    record_cli_downloads()
