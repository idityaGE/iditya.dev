import { Suspense } from "react";
import { getGitHubContributions } from "@/server/gh-contribution";
import { GitHubContributionGraph, GitHubContributionFallback } from "./gh-client";

export async function GitHubContributions() {
  const contributions = await getGitHubContributions();
  return <GitHubContributionGraph data={contributions} />;
}

export function GitHubContributionsWithSuspense() {
  return (
    <Suspense fallback={<GitHubContributionFallback />}>
      <GitHubContributions />
    </Suspense>
  );
}