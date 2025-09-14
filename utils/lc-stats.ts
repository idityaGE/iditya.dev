import { LeetCode } from "leetcode-query";

export const getLeetCodeStats = async (username: string) => {
  const lc = new LeetCode();
  const user = await lc.user(username);
  return user
}