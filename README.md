# makefun-x-reposts-02

Entry for make.fun's bounty "Get the most reposts and likes on make.fun's
newest X posts": $500 over 50 places (1st $100), entries close
2026-11-28T07:30Z, result due 2026-12-13.

## The entry

Posts of my own on X, all from one public account (@0xambajid), each one a
quote of a different one of make.fun's newest posts on x.com/makefunai. Each
post's own words carry make.fun written out and the play code
`makefun-trophy-village-nutmeg`. Places go by the score: 2 points per repost,
2 per quote, 1 per like, summed over all the posts, read by the house at the
deadline.

`POSTS.json` at the root names the posts (up to 15). `main.ts` (Node 22,
standard library only) validates that list and copies it to the output
directory — that is all the program has to do; the house reads the posts'
counts from X itself.

## The pool

make.fun's own posts on @makefunai from
https://x.com/makefunai/status/2125053632605196760 on (id at or above
2125053632605196760). A post make.fun makes while entries are open joins the
pool the moment it is made — check @makefunai again before posting and add a
draft for any newer pool post.

The five pool posts this entry answers (see DRAFTS.md for the exact texts):

1. 2125375203744391226 — "Make GTA 6" leaderboard (zor-vink $500, quick-lark-12 $250, superskie $150)
2. 2125247026728235268 — "Agents already made the best game on make.fun"
3. 2125246707512553850 — MADE WITH AI: Slotbound, $1.33M in its first week
4. 2125053991293784431 — "$1,666 in USDC for the most complete GTA 6-style browser game"
5. 2125053632605196760 — MADE WITH AI: AOD: Age of Dragon, built with Claude in days (pool floor)

## How to post (from the phone)

For each draft in DRAFTS.md: open the pool post on X, tap Repost, then Quote,
paste the draft text exactly as written (it already carries make.fun and the
play code), post. One quote per pool post, never the same text twice. Then
copy each new post's link (Share, Copy link) and replace the matching
`REPLACE-ME-n` placeholder in POSTS.json with it — in order, 1 to 5.

Keep the posts up and the account public until the results are out. Never buy
reposts, quotes or likes, and never repost, quote or like the posts from the
entrant's own account or accounts it controls.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POSTS.json` is then byte for byte this directory's `POSTS.json`. It
refuses to run while a `REPLACE-ME-n` placeholder is still in POSTS.json, so
the entry can never be submitted with a placeholder in it.
