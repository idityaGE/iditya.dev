import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ExternalLink,
  Github,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
} from "lucide-react";
import { BackButton } from "@/features/blog/components/back-button";
import { TerminalHeader } from "@/components/shared/TerminalHeader";
import {
  TerminalCommand,
  TerminalPath,
  Tag,
} from "@/components/ui/terminal";
import { GITHUB_USERNAME } from "@/config/personal.config";

export const metadata: Metadata = {
  title: "Open Source Proof of Work",
  description: "Public pull requests authored by Aditya across open source projects.",
};

export const revalidate = 21600;

type PullRequestStatus = "open" | "merged" | "closed";

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubPullRequestSearchItem[];
}

interface GitHubPullRequestSearchItem {
  html_url: string;
  number: number;
  title: string;
  repository_url: string;
  state: "open" | "closed";
  labels: { name: string }[];
  comments: number;
  created_at: string;
  updated_at: string;
  pull_request: {
    html_url: string;
    merged_at: string | null;
  };
}

interface PullRequestItem {
  title: string;
  repo: string;
  number: number;
  href: string;
  status: PullRequestStatus;
  labels: string[];
  comments: number;
  createdAt: string;
  updatedAt: string;
}

interface PullRequestResult {
  pullRequests: PullRequestItem[];
  totalCount: number;
  error?: string;
}

interface PullRequestGroup {
  repo: string;
  pullRequests: PullRequestItem[];
  counts: Record<PullRequestStatus, number>;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const getGitHubHeaders = () => {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const getStatus = (item: GitHubPullRequestSearchItem): PullRequestStatus => {
  if (item.state === "open") {
    return "open";
  }

  return item.pull_request.merged_at ? "merged" : "closed";
};

const getRepoName = (repositoryUrl: string) => {
  return repositoryUrl.replace("https://api.github.com/repos/", "");
};

const formatDate = (date: string) => dateFormatter.format(new Date(date));

const formatComments = (count: number) => {
  return `${count} ${count === 1 ? "comment" : "comments"}`;
};

const groupPullRequests = (pullRequests: PullRequestItem[]) => {
  const groups = new Map<string, PullRequestItem[]>();

  for (const pullRequest of pullRequests) {
    const repoPullRequests = groups.get(pullRequest.repo) || [];
    repoPullRequests.push(pullRequest);
    groups.set(pullRequest.repo, repoPullRequests);
  }

  return Array.from(groups, ([repo, repoPullRequests]) => ({
    repo,
    pullRequests: repoPullRequests,
    counts: repoPullRequests.reduce(
      (acc, pr) => {
        acc[pr.status] += 1;
        return acc;
      },
      { open: 0, merged: 0, closed: 0 } as Record<PullRequestStatus, number>,
    ),
  }));
};

const fetchPullRequests = async (): Promise<PullRequestResult> => {
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("q", `author:${GITHUB_USERNAME} type:pr`);
  url.searchParams.set("per_page", "100");
  url.searchParams.set("sort", "updated");
  url.searchParams.set("order", "desc");

  try {
    const response = await fetch(url, {
      headers: getGitHubHeaders(),
      next: { revalidate },
    });

    if (!response.ok) {
      return {
        pullRequests: [],
        totalCount: 0,
        error: `GitHub API returned ${response.status}`,
      };
    }

    const data = (await response.json()) as GitHubSearchResponse;

    return {
      totalCount: data.total_count,
      pullRequests: data.items.map((item) => ({
        title: item.title,
        repo: getRepoName(item.repository_url),
        number: item.number,
        href: item.pull_request.html_url || item.html_url,
        status: getStatus(item),
        labels: item.labels.map((label) => label.name),
        comments: item.comments,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
    };
  } catch (error) {
    return {
      pullRequests: [],
      totalCount: 0,
      error: error instanceof Error ? error.message : "Failed to reach GitHub",
    };
  }
};

const OpenSourcePage = async () => {
  const { pullRequests, totalCount, error } = await fetchPullRequests();
  const groupedPullRequests = groupPullRequests(pullRequests);
  const counts = pullRequests.reduce(
    (acc, pr) => {
      acc[pr.status] += 1;
      return acc;
    },
    { open: 0, merged: 0, closed: 0 } as Record<PullRequestStatus, number>,
  );

  return (
    <div className="mt-10">
      <TerminalHeader
        path="~/pow/open-source"
        title="Open Source"
        subtitle={`(${pullRequests.length} prs)`}
        actions={
          <Link
            href={`https://github.com/search?q=author%3A${GITHUB_USERNAME}+type%3Apr&type=pullrequests`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View pull requests on GitHub"
          >
            <Github size={14} aria-hidden="true" />
          </Link>
        }
      />

      <div className="border-b bg-background p-3">
        <TerminalCommand className="mb-1.5">$ gh search prs --author me</TerminalCommand>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          Public pull requests authored across GitHub, fetched from the REST
          Search API and cached with ISR. Open PRs, merged PRs, and closed
          unmerged PRs are labeled explicitly.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px border-b bg-border sm:grid-cols-4">
        <StatCell label="total" value={totalCount || pullRequests.length} />
        <StatCell label="open" value={counts.open} tone="open" />
        <StatCell label="merged" value={counts.merged} tone="merged" />
        <StatCell label="closed" value={counts.closed} tone="closed" />
      </div>

      {error && <GitHubError message={error} />}

      <div className="mt-6 p-2">
        {pullRequests.length > 0 ? (
          <div className="flex flex-col gap-2">
            {groupedPullRequests.map((group) => (
              <PullRequestRepoGroup key={group.repo} group={group} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      <div className="border-b bg-background px-3 py-2 flex items-center justify-between">
        <BackButton href="/pow" label="← cd .." />
        <TerminalPath>source: github/search/issues</TerminalPath>
      </div>
    </div>
  );
};

const PullRequestRepoGroup = ({ group }: { group: PullRequestGroup }) => {
  return (
    <details open className="group/repo border bg-background">
      <summary className="block cursor-pointer list-none bg-muted/20 px-3 py-2 transition-colors hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&::-webkit-details-marker]:hidden [&::marker]:content-['']">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <ChevronRight
              size={14}
              className="shrink-0 text-muted-foreground transition-transform group-open/repo:rotate-90"
              aria-hidden="true"
            />
            <Github
              size={13}
              className="shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <h2 className="truncate text-xs font-mono font-bold leading-5 text-foreground">
              {group.repo}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {group.counts.open > 0 && (
              <MiniStatus status="open" count={group.counts.open} />
            )}
            {group.counts.merged > 0 && (
              <MiniStatus status="merged" count={group.counts.merged} />
            )}
            {group.counts.closed > 0 && (
              <MiniStatus status="closed" count={group.counts.closed} />
            )}
            <span className="border bg-background px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
              {group.pullRequests.length} prs
            </span>
          </div>
        </div>
      </summary>

      <div className="bg-border p-px">
        <div className="flex flex-col gap-px">
          {group.pullRequests.map((pullRequest) => (
            <PullRequestCard
              key={`${pullRequest.repo}#${pullRequest.number}`}
              pullRequest={pullRequest}
            />
          ))}
        </div>
      </div>
    </details>
  );
};

const MiniStatus = ({
  status,
  count,
}: {
  status: PullRequestStatus;
  count: number;
}) => {
  return (
    <span
      className={`hidden items-center gap-1 text-xs font-mono sm:inline-flex ${getStatusTextClass(status)}`}
    >
      <StatusIcon status={status} size={12} />
      {count}
    </span>
  );
};

const StatCell = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: PullRequestStatus;
}) => {
  return (
    <div className="bg-background px-3 py-2">
      <div
        className={`text-xs font-mono font-bold tabular-nums ${getStatusTextClass(tone)}`}
      >
        {value}
      </div>
      <TerminalPath>{label}</TerminalPath>
    </div>
  );
};

const GitHubError = ({ message }: { message: string }) => {
  return (
    <div className="border-b bg-background p-3">
      <div className="flex items-start gap-2">
        <GitPullRequest size={12} className="mt-0.5 shrink-0 text-muted-foreground" />
        <div>
          <TerminalCommand className="mb-1">warning</TerminalCommand>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            Could not load GitHub PRs right now: {message}. Public requests work
            without a token, but a token raises the rate limit.
          </p>
        </div>
      </div>
    </div>
  );
};

const PullRequestCard = ({
  pullRequest,
}: {
  pullRequest: PullRequestItem;
}) => {
  return (
    <Link
      href={pullRequest.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/card block bg-background px-3 py-2 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      aria-label={`Open pull request ${pullRequest.repo} #${pullRequest.number}`}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-2">
        <StatusIcon status={pullRequest.status} />

        <div className="min-w-0">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="shrink-0 text-[13px] font-mono font-bold leading-5 text-foreground transition-colors group-hover/card:text-green-500">
              #{pullRequest.number}
            </span>
            <h3 className="min-w-0 flex-1 text-[13px] font-mono font-bold leading-5 text-foreground transition-colors group-hover/card:text-green-500 sm:truncate">
              {pullRequest.title}
            </h3>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-muted-foreground">
            <StatusTag status={pullRequest.status} />
            <span>updated {formatDate(pullRequest.updatedAt)}</span>
            <span>created {formatDate(pullRequest.createdAt)}</span>
            <span>{formatComments(pullRequest.comments)}</span>
          </div>

          {pullRequest.labels.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {pullRequest.labels.slice(0, 4).map((label) => (
                <Tag key={label} size="sm" className="bg-muted/60">
                  {label}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <ExternalLink
          size={13}
          className="mt-0.5 shrink-0 text-muted-foreground transition-colors group-hover/card:text-foreground"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
};

const StatusIcon = ({
  status,
  size = 14,
}: {
  status: PullRequestStatus;
  size?: number;
}) => {
  const Icon = status === "merged"
    ? GitMerge
    : status === "closed"
      ? GitPullRequestClosed
      : GitPullRequest;

  return <Icon size={size} className={`mt-px shrink-0 ${getStatusTextClass(status)}`} />;
};

const StatusTag = ({ status }: { status: PullRequestStatus }) => {
  return (
    <Tag
      size="sm"
      className={
        status === "merged"
          ? "inline-flex shrink-0 items-center gap-1 border-[#8250df]/30 bg-[#8250df]/10 text-[#8250df] dark:border-[#a371f7]/35 dark:bg-[#a371f7]/10 dark:text-[#a371f7]"
          : status === "closed"
            ? "inline-flex shrink-0 items-center gap-1 border-destructive/30 bg-destructive/10 text-destructive"
            : "inline-flex shrink-0 items-center gap-1 border-green-500/20 bg-green-500/10 text-green-500"
      }
    >
      {status}
    </Tag>
  );
};

const getStatusTextClass = (status?: PullRequestStatus) => {
  if (status === "merged") {
    return "text-[#8250df] dark:text-[#a371f7]";
  }

  if (status === "closed") {
    return "text-destructive";
  }

  if (status === "open") {
    return "text-green-500";
  }

  return "text-foreground";
};

const EmptyState = () => {
  return (
    <div className="border bg-background p-6 text-center">
      <TerminalCommand className="mb-2">$ ls pull-requests</TerminalCommand>
      <p className="text-xs font-mono text-muted-foreground">
        No pull requests available from GitHub right now.
      </p>
    </div>
  );
};

export default OpenSourcePage;
