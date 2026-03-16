import type { Activity } from "@/components/ui/kibo-ui/contribution-graph";
import { GITHUB_USERNAME } from "@/config/personal.config";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export async function getGitHubContributions(): Promise<Activity[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 86400 } } as RequestInit // Cache for 1 day
    );

    if (!res.ok) {
      console.error(`GitHub contributions API returned ${res.status}`);
      return [];
    }

    const data = (await res.json()) as GitHubContributionsResponse;
    return data.contributions ?? [];
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return [];
  }
}
