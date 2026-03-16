import { unstable_cache } from "next/cache";
import { LeetCode } from "leetcode-query";

export const getLeetCodeStats = unstable_cache(
  async (username: string) => {
    try {
      const lc = new LeetCode();
      const user = await lc.user(username);
      return user;
    } catch (error) {
      console.error("Failed to fetch LeetCode stats:", error);
      return { matchedUser: null, allQuestionsCount: [] };
    }
  },
  ["leetcode-stats"],
  { revalidate: 86400 } // Cache for 1 day
);