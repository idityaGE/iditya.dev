import { unstable_cache } from "next/cache";
import { LeetCode } from "leetcode-query";

export const getLeetCodeStats = unstable_cache(
  async (username: string) => {
    const lc = new LeetCode();
    const user = await lc.user(username);
    return user;
  },
  ["leetcode-stats"],
  { revalidate: 86400 } // Cache for 1 day
);