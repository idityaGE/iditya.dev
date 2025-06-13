import { buttonVariants } from "@/components/ui/button"
import { EducationList } from "./education-section"
import { skillList } from "@/config/skill.config"
import { PersonalData } from "@/config/personal.config"
import { EducationData } from "@/config/education.config"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { LinkData } from "@/config/links.config"

const socialLinks = [
  {
    name: "GitHub",
    url: LinkData.github,
    Icon: Github,
  },
  {
    name: "LinkedIn",
    url: LinkData.linkedin,
    Icon: Linkedin,
  },
  {
    name: "Twitter",
    url: LinkData.twitter,
    Icon: Twitter,
  },
  {
    name: "Email",
    url: LinkData.mail,
    Icon: Mail,
  },
]

export function AboutPage() {
  return (
    <div className="min-h-screen pt-6 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-lg opacity-75" />
              <Image
                alt="Profile Image"
                src={PersonalData.avatar}
                className="w-48 h-48 border-4 border-background relative rounded-full"
                width={200}
                height={200}
              />
            </div>
            <h1 className="text-4xl font-bold mt-6 mb-2 text-center">
              {PersonalData.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-4 text-center">
              {PersonalData.title}
            </p>
            <div className="flex space-x-6">
                {socialLinks.map(({ name, Icon, url }) => (
                <Link href={url} key={name} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 rounded-full hover:bg-accent/50 transition-colors duration-200 hover:text-primary"
                >
                  <Icon className="w-6 h-6" />
                  <span className="sr-only">{name}</span>
                </Link>
                ))}
            </div>
          </div>

          {/* About Me Section */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <div className="space-y-4">
              {PersonalData.about.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-muted-foreground">
                  {paragraph.includes(':') ? (
                    <>
                      <span className="font-semibold text-foreground">
                        {paragraph.split(':')[0]}:
                      </span>
                      {paragraph.split(':').slice(1).join(':')}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="space-y-4">
            {Object.entries(skillList).map(([category, skills]) => (
              <div key={category}>
                <div className="flex flex-wrap gap-1">
                  <h3 className="text-md font-bold">{category}: </h3>
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-1 py-1 rounded bg-muted text-muted-foreground text-xs cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <ol className="relative border-l border-primary/30 space-y-8 pl-5">
            {EducationData.map((item, index) => (
              <EducationList key={index} {...item} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
