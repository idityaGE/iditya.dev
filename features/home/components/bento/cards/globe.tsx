import { Globe } from "@/components/magicui/globe";

export function GlobeCard() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden pb-60 md:pb-60 sm:pb-80 md:shadow-xl">
      <Globe className="top-[-10%]" />
    </div>
  );
}

