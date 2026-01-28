import { Bento } from "@/features/home/components/bento";
import { Hero } from "@/features/home/components/hero";
import { ExperienceSection } from "@/features/home/components/experience-card";


const Home = () => {
  return (
    <div className="mt-10">
      <Hero />
      <Bento />

      <div
        className="relative border-b h-8"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            color-mix(in srgb, currentColor 10%, transparent) 20px,
            color-mix(in srgb, currentColor 10%, transparent) 21px
          )`,
        }}
      />

      <ExperienceSection />
    </div>
  );
};

export default Home;
