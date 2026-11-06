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

export function announcementPostsAreClean(input: ListingAnnouncement) {
  const posts = announcementPosts(input);
  return !BANNED.test(posts.x) && !BANNED.test(posts.linkedin) && posts.x.length <= 280 && posts.x.includes(input.url.trim());
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
