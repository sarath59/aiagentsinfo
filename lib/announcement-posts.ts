const BANNED = /\b(badge|featured|verified|plain english)\b/i;

export type ListingAnnouncement = {
  name: string;
  tagline: string;
  url: string;
};

/** Maker-written posts. They announce a listing. They do not claim a seal or a review. */
export function announcementPosts(input: ListingAnnouncement) {
  const name = input.name.trim();
  const tagline = input.tagline.trim();
  const url = input.url.trim();
  const head = `${name} is now listed on AI Agents Info.`;
  const linkedin = [head, tagline, url].filter(Boolean).join("\n\n");
  return {
    x: fitPost(head, tagline, url, 280),
    linkedin,
  };
}

/** Visible words of the optional site link. */
export function listingSiteLabel(input: ListingAnnouncement) {
  const name = input.name.trim();
  return name ? `${name} is listed on AI Agents Info` : "Listed on AI Agents Info";
}

/** Optional HTML the maker can paste on their own site. A text link, not an image. */
export function listingSiteSnippet(input: ListingAnnouncement) {
  return `<a href="${escapeHtml(input.url.trim())}">${escapeHtml(listingSiteLabel(input))}</a>`;
}

export function announcementPostsAreClean(input: ListingAnnouncement) {
  const posts = announcementPosts(input);
  const snippet = listingSiteSnippet(input);
  return (
    !BANNED.test(posts.x) &&
    !BANNED.test(posts.linkedin) &&
    !BANNED.test(snippet) &&
    posts.x.length <= 280 &&
    posts.x.includes(input.url.trim()) &&
    snippet.startsWith("<a href=") &&
    snippet.includes(escapeHtml(input.url.trim())) &&
    !/<img\b/i.test(snippet)
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fitPost(head: string, tagline: string, url: string, limit: number) {
  const withTagline = tagline ? `${head}\n\n${tagline}\n\n${url}` : `${head}\n\n${url}`;
  if (withTagline.length <= limit) return withTagline;
  const room = limit - (head.length + 4 + url.length);
  if (!tagline || room < 8) {
    const short = `${head}\n\n${url}`;
    return short.length <= limit ? short : short.slice(0, limit);
  }
  const cut = `${tagline.slice(0, room - 1).trimEnd()}…`;
  return `${head}\n\n${cut}\n\n${url}`;
}
