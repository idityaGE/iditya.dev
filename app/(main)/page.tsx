import { Bento } from "@/features/home/components/bento";
import { Hero } from "@/features/home/components/hero";
import { ExperienceSection } from "@/features/home/components/experience-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my personal portfolio - Software Engineer, Full Stack Developer, and Open Source Enthusiast",
};

const Home = () => {
  return (
    <div className="mt-10 font-mono">
      <Hero />
      <Bento />

      <div className="h-10 border-b border-border mb-10" />

      <ExperienceSection />
    </div>
  );
};

export default Home;
