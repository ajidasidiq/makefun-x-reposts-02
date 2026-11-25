// makefun-x-reposts-02 entry program (Node 22, standard library only).
//
// The entry itself is the posts on X: posts of the entrant's own, all from one
// public account, each quoting or replying directly to a different one of
// make.fun's newest posts on x.com/makefunai. POSTS.json at the repository
// root names those posts; this program reads it, checks its shape, and copies
// it to the output directory, where the house reads it and scores each post's
// reposts (2 points), quotes (2 points) and likes (1 point) at the deadline.
//
// No network, no wall clock, no files outside the repository: the two runs of
// an entry write the same bytes. On success it prints nothing.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POSTS_FILE = 'POSTS.json';
const MAX_POSTS = 15;

// An X post address as X's Share button gives it, id digits only. The same
// shape on twitter.com (www. or mobile. in front) is accepted too.
const POST_ADDRESS =
  /^https?:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/[0-9]+$/;

function fail(message: string): never {
  console.error(`makefun-x-reposts-02: ${message}`);
  process.exit(1);
}

function readPosts(): string[] {
  const path = join(BOT_DIR, POSTS_FILE);
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch (err) {
    fail(`could not read ${path}: ${(err as Error).message}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw!);
  } catch (err) {
    fail(`${POSTS_FILE} is not valid JSON: ${(err as Error).message}`);
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    fail(`${POSTS_FILE} must be a JSON object of the form {"posts": [...]}`);
  }
  const posts = (parsed as { posts?: unknown }).posts;
  if (!Array.isArray(posts)) {
    fail(`${POSTS_FILE} must hold a "posts" list`);
  }
  if (posts.length < 1 || posts.length > MAX_POSTS) {
    fail(`"posts" must name 1 to ${MAX_POSTS} posts, got ${posts.length}`);
  }

  const seen = new Set<string>();
  for (const post of posts) {
    if (typeof post !== 'string' || !POST_ADDRESS.test(post)) {
      fail(`not an X post address: ${JSON.stringify(post)}`);
    }
    if (post.includes('<') || post.includes('REPLACE')) {
      fail(`placeholder still in ${POSTS_FILE}: ${post}`);
    }
    const id = post.split('/status/')[1];
    const handle = post.split('/')[3].toLowerCase();
    if (handle === 'makefunai') {
      fail(`a post by @makefunai is not an entry post: ${post}`);
    }
    if (seen.has(id)) {
      fail(`post named twice: ${post}`);
    }
    seen.add(id);
  }
  return posts as string[];
}

const posts = readPosts();

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, POSTS_FILE), join(OUTPUT_DIR, POSTS_FILE));
} catch (err) {
  fail(`could not copy ${POSTS_FILE} to ${OUTPUT_DIR}: ${(err as Error).message}`);
}

// Silence is success: the house reads POSTS.json from the output directory
// and scores the posts it names. Nothing printed here is scored.
void posts;
