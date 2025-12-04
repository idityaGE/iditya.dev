import { Mail } from "lucide-react";
import { PersonalData } from "@/config/personal.config";
import { LinkData } from "@/config/links.config";

export const Hero = () => {
  return (
    <div className="ml-4 mb-2 relative">
      <div className="absolute top-0 right-0 p-4">
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

      <h1 id="name" className="text-4xl font-semibold leading-11">
        I'm <br /> {PersonalData.name}
      </h1>

      <div>
        <h6 className="text-base text-muted-foreground pt-3 font-light">
          {PersonalData.age}y/o Tech Enthusiast, {PersonalData.address.country}
        </h6>
      </div>
      <div className="mt-4 xl:w-3/4">
        <h6 className="text-base text-muted-foreground font-light">
          {PersonalData.description.map((line, idx) => (
            <p className="mb-1">
              {line}
            </p>
          ))}
        </h6>
      </div>

      <div className="mt-5">
        <h6 className="text-base text-muted-foreground font-light">
          Feel free to reach me out at&nbsp;
          <a
            href={LinkData.twitter}
            target="_blank"
            className="hover:text-primary hover:underline decoration-1 underline-offset-4"
            about="Instagram Link"
          >
            @<b className="font-light">{LinkData.twitter.split("/").pop()}</b>{" "}
          </a>
          or&nbsp;
          <a
            href={LinkData.mail}
            className="hover:text-primary hover:underline decoration-1 underline-offset-4"
            about="Mail Link"
          >
            <Mail size={18} className="inline-block mr-1" />
            <b className="font-light">{LinkData.gmail}</b>
          </a>
          .
        </h6>
      </div>
      <div className="absolute bottom-2 right-4">
        <h6 className="text-base text-muted-foreground font-light">
          /
          <a
            href="/resume.pdf"
            download="Aditya_Resume.pdf"
            className="hover:text-primary hover:underline decoration-1 underline-offset-4 font-light"
            about="Resume Link"
          >
            resume.pdf
          </a>
        </h6>
      </div>
      <h2 id="name" className="text-3xl font-medium leading-12 pt-10">
        About me
      </h2>
    </div>
  );
};
