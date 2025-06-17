import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl font-bold text-neutral-900 dark:text-neutral-100">404</h1>
        <div className="h-px w-32 bg-muted my-6"></div>
        <h2 className="text-xl text-neutral-600 dark:text-neutral-400 font-light tracking-wide">Page not found</h2>
      </div>

      <Button variant="outline" asChild className="mt-8 group transition-all">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return home</span>
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
