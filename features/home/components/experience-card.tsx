"use client";

import type { ExperienceItemProps } from "@/types";
import { Calendar, MapPin, Globe, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ExperienceData } from "@/config/personal.config";
import {
  TrafficLightDots,
  TerminalPath,
  TerminalCommand,
  GreenArrow,
  Tag,
  BlinkingCursor,
} from "@/components/ui/terminal";

function ExperienceDetails({ experience }: { experience: ExperienceItemProps }) {
  const duration = `${experience.startDate} - ${experience.endDate}`;

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px">
      {/* Terminal Header Block */}
      <div className="bg-background p-3 md:col-span-2 border-b">
        <div className="flex items-center gap-2 mb-2">
          <TrafficLightDots />
          <TerminalPath>~/career/{experience.company.toLowerCase().replace(/\s+/g, '-')}</TerminalPath>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted border flex items-center justify-center flex-shrink-0">
            {experience.logo ? (
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={40}
                height={40}
                className="object-contain w-full h-full p-1.5 bg-foreground dark:bg-card"
              />
            ) : (
              <span className="text-sm font-bold font-mono">{experience.company.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold font-mono truncate">{experience.company}</h2>
              {experience.companyUrl && (
                <Link
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground p-1"
                  aria-label={`Visit ${experience.company} website`}
                >
                  <Globe size={12} />
                </Link>
              )}
            </div>
            <p className="text-xs font-mono text-muted-foreground">{experience.position}</p>
          </div>
        </div>
      </div>

      {/* Meta Info Block */}
      <div className="bg-background p-3 border-b md:border-r">
        <TerminalCommand className="mb-1.5">$ info</TerminalCommand>
        <div className="space-y-1 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Calendar size={11} className="text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={11} className="text-muted-foreground" />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Block */}
      <div className="bg-background p-3 border-b">
        <TerminalCommand className="mb-1.5">$ stack</TerminalCommand>
        <div className="flex flex-wrap gap-1">
          {experience.techStack.slice(0, 8).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>

      {/* Description Block */}
      <div className="bg-background p-3 md:col-span-2">
        <TerminalCommand className="mb-1.5">$ output</TerminalCommand>
        <ul className="space-y-1 text-xs font-mono text-muted-foreground">
          {experience.description.map((item) => (
            <li key={item} className="flex gap-2">
              <GreenArrow />
              <span className="leading-relaxed break-words min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (ExperienceData.length === 0) return null;

  const selectedExperience = ExperienceData[selectedIndex];

  return (
    <div className="mt-10">
      {/* Terminal-style Section Header */}
      <div className="border-t bg-background p-3">
        <div className="flex items-center gap-2 mb-2">
          <TrafficLightDots />
          <TerminalPath>~/experience | wc -l</TerminalPath>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-muted-foreground" />
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider">Experience</h2>
          <TerminalPath>({ExperienceData.length} entries)</TerminalPath>
        </div>
      </div>

      {/* Experience Tabs */}
      <div className="flex border-y flex-col md:flex-row gap-0 min-h-[350px]">
        {/* Left Sidebar - Company Tabs */}
        <div className="w-full md:w-44 flex md:flex-col overflow-x-auto md:overflow-x-visible bg-background border-r">
          <div className="hidden md:block px-2 py-1 border-b">
            <TerminalPath>$ ls companies/</TerminalPath>
          </div>
          {ExperienceData.map((exp, idx) => (
            <button
              key={exp.company}
              onClick={() => setSelectedIndex(idx)}
              className={`
                px-3 py-2.5 text-left text-xs font-mono transition-all flex-shrink-0 border-b md:border-b-0 border-r md:border-r-0
                ${selectedIndex === idx
                  ? "bg-muted/50 text-foreground border-l-2 border-l-green-500"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border-l-2 border-l-transparent"
                }
              `}
            >
              <span className="text-green-500 mr-1.5">{selectedIndex === idx ? "▸" : " "}</span>
              {exp.company}
            </button>
          ))}
          <div className="hidden md:flex flex-1 items-end p-3">
            <BlinkingCursor />
          </div>
        </div>

        {/* Right Content Area - Bento Style */}
        <ExperienceDetails experience={selectedExperience} />
      </div>
    </div>
  );
}
