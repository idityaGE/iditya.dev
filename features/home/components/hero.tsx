import { PersonalData } from "@/config/personal.config";
import { LinkData } from "@/config/links.config";

export const Hero = () => {
  return (
    <div className="ml-4 mb-10 relative">
      <div className="absolute -top-10 right-0 p-4">
        <div className="flex items-center gap-1.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </div>
          <span className="text-xs text-muted-foreground uppercase font-light">
            Available for hire
          </span>
        </div>
      </div>

      <div id="name">
        <div className="flex items-center gap-1.5 font-mono text-sm tracking-tighter text-muted-foreground">
          <span>Hey It&apos;s me</span>
        </div>

        <div className="flex items-baseline gap-2">
          <h1 className="font-dot text-4xl font-extrabold uppercase leading-8">
            <span className="relative">{PersonalData.name}</span>
          </h1>
          <a
            href={LinkData.twitter}
            target="_blank"
            className="group flex items-center gap-1 font-mono text-sm font-light tracking-tight text-muted-foreground duration-200 hover:text-foreground -translate-y-0.5"
          >
            <span className="font-light">/</span>
            <span className="text-[10px] sm:text-xs">@</span>
            <span>{LinkData.twitter.split("/").pop()}</span>
          </a>
        </div>
      </div>

      <div className="mt-4 max-w-xl">
        <div className="text-sm text-muted-foreground">
          <p>
            Just someone who loves{" "}
            <span className="font-medium text-foreground">coding</span>,{" "}
            <span className="font-medium text-foreground">Linux</span>, and{" "}
            <span className="font-medium text-foreground">breaking stuff</span>{" "}
            to learn.
          </p>
          <p>
            Exploring <span className="font-medium text-foreground">tech</span>,{" "}
            <span className="font-medium text-foreground">devops</span>,{" "}
            <span className="font-medium text-foreground">web3</span>, and
            enjoying the{" "}
            <span className="font-medium text-foreground">chaos</span>.
          </p>
          <p className="opacity-80">(you know what I&apos;m talking about!)</p>
        </div>
      </div>

      <div className="absolute -bottom-8 right-4">
        <a
          href="/resume.pdf"
          download="Aditya_Resume.pdf"
          className="text-xs font-light decoration-1 underline-offset-4 hover:text-primary hover:underline text-muted-foreground"
          about="Resume Link"
        >
          /resume.pdf
        </a>
      </div>
    </div>
  );
};
