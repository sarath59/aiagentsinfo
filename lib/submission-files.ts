import fs from "node:fs";
import path from "node:path";
import {
  RESERVED_DIRECTORY_SLUGS,
  parseStoredSubmission,
  submissionToListing,
  websiteDomain,
  type ToolSubmission,
} from "@/lib/submissions";

export function localListingDomains() {
  const domains = new Set<string>();
  const directory = path.join(process.cwd(), "content", "directory");
  if (fs.existsSync(directory)) {
    for (const file of fs.readdirSync(directory)) {
      if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
      const raw = fs.readFileSync(path.join(directory, file), "utf8");
      const match = /^website:\s*["']?(\S+?)["']?\s*$/m.exec(raw);
      const domain = match ? websiteDomain(match[1]) : "";
      if (domain) domains.add(domain);
    }
  }
  for (const record of readSubmissionRecords()) {
    const domain = websiteDomain(record.website);
    if (domain) domains.add(domain);
  }
  return domains;
}

export function collectTakenSlugs() {
  const taken = new Set<string>(RESERVED_DIRECTORY_SLUGS);
  const directory = path.join(process.cwd(), "content", "directory");
  if (fs.existsSync(directory)) {
    for (const file of fs.readdirSync(directory)) {
      if (file.endsWith(".md") || file.endsWith(".mdx")) {
        taken.add(file.replace(/\.mdx?$/, ""));
      }
    }
  }
  const submissions = path.join(process.cwd(), "data", "submissions");
  if (fs.existsSync(submissions)) {
    for (const file of fs.readdirSync(submissions)) {
      if (isSubmissionFile(file)) taken.add(file.replace(/\.json$/, ""));
    }
  }
  return taken;
}

export function readSubmissionRecords() {
  const directory = path.join(process.cwd(), "data", "submissions");
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter(isSubmissionFile)
    .sort()
    .map((file) => {
      const slug = file.replace(/\.json$/, "");
      const fullPath = path.join(directory, file);
      let parsed: unknown;
      try {
        parsed = JSON.parse(fs.readFileSync(fullPath, "utf8"));
      } catch {
        throw new Error(`data/submissions/${file} is not valid JSON.`);
      }
      return parseStoredSubmission(parsed, slug);
    });
}

/** Directory entries for approved submissions only. Pending files are parsed and skipped. */
export function approvedSubmissionListings(existingSlugs: Iterable<string>) {
  return listingsFromSubmissionRecords(readSubmissionRecords(), existingSlugs);
}

export function listingsFromSubmissionRecords(
  records: ToolSubmission[],
  existingSlugs: Iterable<string>,
) {
  const taken = new Set(existingSlugs);
  const listings = [];
  for (const record of records) {
    if (record.status !== "approved") continue;
    if (taken.has(record.slug) || RESERVED_DIRECTORY_SLUGS.has(record.slug)) {
      throw new Error(
        `Approved submission data/submissions/${record.slug}.json uses slug "${record.slug}", which is already a directory page. Rename the file and the slug field together.`,
      );
    }
    taken.add(record.slug);
    listings.push(submissionToListing(record));
  }
  return listings;
}

function isSubmissionFile(file: string) {
  return file.endsWith(".json") && !file.startsWith(".") && !file.startsWith("_");
}
