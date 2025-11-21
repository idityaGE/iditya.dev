import { ProjectCard } from "@/components/project/project-card";
import { ProjectData } from "@/config/project.config";
import { LinkData } from "@/config/links.config";
import { Mail, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Rss } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const getTwitterUsername = (url: string): string => {
  return url.split("/").pop() || "";
};

const Projects = () => {
  const twitterUsername = getTwitterUsername(LinkData.twitter);

  return (
    <div className="px-2">
      <header className="mb-9">

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <Link href="/projects/rss.xml" target="_blank" rel="noopener noreferrer">
                <Rss size={24} aria-hidden="true" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Subscribe to RSS Feed</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <p className="text-base text-muted-foreground mb-5">
          I love building side projects that solve either my own or someone else's problems.
          Here is an extensive list of all the stuff I have built.
        </p>

        <p className="text-base text-muted-foreground mb-6">
          Want to discuss on projects or collaborate on something? Feel free to&nbsp;
          <Link
            href={LinkData.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="dark:hover:text-white hover:text-black duration-300"
            aria-label={`Contact me on Twitter @${twitterUsername}`}
          >
            @<strong className="font-semibold underline underline-offset-2 px-1">
              {twitterUsername}
            </strong>
          </Link>
        </p>

        <aside className="bg-muted/50 rounded-lg p-4 border border-border flex items-start gap-3" role="note">
          <AlertTriangle
            size={20}
            className="text-amber-500 mt-0.5 flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            These projects are hosted on free services that may occasionally enter hibernation mode.
            <br />
            If you encounter any issues, please{" "}
            <Link
              href={LinkData.mail}
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 dark:hover:text-white hover:text-black duration-200"
              aria-label="Send me an email"
            >
              contact me
              <Mail size={18} aria-hidden="true" />
            </Link>
          </p>
        </aside>
      </header>

      <div className="border-b border-black/5 dark:border-white/10 w-full mb-8" />

      <main>
        <div className="flex flex-col gap-4">
          {ProjectData.map((project) => (
            <ProjectCard key={project.slug || project.title} {...project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
