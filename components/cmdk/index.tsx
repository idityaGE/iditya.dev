"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Home,
  FolderKanban,
  FileText,
  Award,
  Sun,
  Moon,
  Download,
  Rss,
  Twitter,
  Github,
  Linkedin,
  Copy,
  ExternalLink,
  Share2,
  Check,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { LinkData } from "@/config/links.config";
import { Separator } from "../ui/separator";

// Types
interface Blog {
  slug: string;
  title: string;
}

interface Project {
  slug: string;
  title: string;
}

interface CommandMenuProps {
  blogs?: Blog[];
  projects?: Project[];
}

type ActionType = "navigate" | "action" | "external" | "copy";

export function CommandMenu({ blogs = [], projects = [] }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState<string | null>(null);
  const [selectedAction, setSelectedAction] = React.useState<ActionType>("navigate");
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  // Track what type of action is currently selected
  const updateSelectedAction = React.useCallback((type: ActionType) => {
    setSelectedAction(type);
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K and page shortcuts
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Cmd+K / Ctrl+K to open
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
        return;
      }

      // Page shortcuts (only when dialog is closed and no modifier keys)
      if (!open && !e.metaKey && !e.ctrlKey && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case "h":
            e.preventDefault();
            router.push("/");
            break;
          case "p":
            e.preventDefault();
            router.push("/projects");
            break;
          case "b":
            e.preventDefault();
            router.push("/blogs");
            break;
          case "w":
            e.preventDefault();
            router.push("/PoW");
            break;
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, router]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const navigate = React.useCallback(
    (path: string) => {
      runCommand(() => router.push(path));
    },
    [router, runCommand]
  );

  const openExternal = React.useCallback(
    (url: string) => {
      runCommand(() => window.open(url, "_blank"));
    },
    [runCommand]
  );

  const toggleTheme = React.useCallback(() => {
    runCommand(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"));
  }, [resolvedTheme, setTheme, runCommand]);

  const downloadResume = React.useCallback(() => {
    runCommand(() => {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Aditya_Resume.pdf";
      link.click();
    });
  }, [runCommand]);

  const copyEmail = React.useCallback(() => {
    const email = "am44910606@gmail.com";
    navigator.clipboard.writeText(email);
    setCopied("email");
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const sharePortfolio = React.useCallback(() => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url);
    setCopied("portfolio");
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const openRssFeed = React.useCallback(() => {
    runCommand(() => {
      window.location.href = "/rss.xml";
    });
  }, [runCommand]);

  // Get footer action text based on selected action type
  const getActionText = () => {
    switch (selectedAction) {
      case "navigate":
        return "Go to Page";
      case "action":
        return "Run Action";
      case "external":
        return "Open Link";
      case "copy":
        return "Copy";
      default:
        return "Select";
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="hidden lg:inline">Press</span>
        <Kbd className="pointer-events-none">
          <span className="text-xs">⌘</span>K
        </Kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Pages */}
          <CommandGroup heading="Pages">
            <CommandItem 
              onSelect={() => navigate("/")}
              onMouseEnter={() => updateSelectedAction("navigate")}
              onFocus={() => updateSelectedAction("navigate")}
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
              <Kbd className="ml-auto">H</Kbd>
            </CommandItem>
            <CommandItem 
              onSelect={() => navigate("/projects")}
              onMouseEnter={() => updateSelectedAction("navigate")}
              onFocus={() => updateSelectedAction("navigate")}
            >
              <FolderKanban className="mr-2 h-4 w-4" />
              <span>Projects</span>
              <Kbd className="ml-auto">P</Kbd>
            </CommandItem>
            <CommandItem 
              onSelect={() => navigate("/blogs")}
              onMouseEnter={() => updateSelectedAction("navigate")}
              onFocus={() => updateSelectedAction("navigate")}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Blogs</span>
              <Kbd className="ml-auto">B</Kbd>
            </CommandItem>
            <CommandItem 
              onSelect={() => navigate("/PoW")}
              onMouseEnter={() => updateSelectedAction("navigate")}
              onFocus={() => updateSelectedAction("navigate")}
            >
              <Award className="mr-2 h-4 w-4" />
              <span>Proof of Work</span>
              <Kbd className="ml-auto">W</Kbd>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Theme */}
          <CommandGroup heading="Theme">
            <CommandItem 
              onSelect={toggleTheme}
              onMouseEnter={() => updateSelectedAction("action")}
              onFocus={() => updateSelectedAction("action")}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="mr-2 h-4 w-4" />
              ) : (
                <Moon className="mr-2 h-4 w-4" />
              )}
              <span>Toggle Theme</span>
              <Kbd className="ml-auto">D</Kbd>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Actions */}
          <CommandGroup heading="Actions">
            <CommandItem 
              onSelect={downloadResume}
              onMouseEnter={() => updateSelectedAction("action")}
              onFocus={() => updateSelectedAction("action")}
            >
              <Download className="mr-2 h-4 w-4" />
              <span>Download Resume</span>
            </CommandItem>
            <CommandItem 
              onSelect={openRssFeed}
              onMouseEnter={() => updateSelectedAction("navigate")}
              onFocus={() => updateSelectedAction("navigate")}
            >
              <Rss className="mr-2 h-4 w-4" />
              <span>RSS Feed</span>
            </CommandItem>
            <CommandItem 
              onSelect={sharePortfolio}
              onMouseEnter={() => updateSelectedAction("copy")}
              onFocus={() => updateSelectedAction("copy")}
            >
              {copied === "portfolio" ? (
                <Check className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <Share2 className="mr-2 h-4 w-4" />
              )}
              <span>{copied === "portfolio" ? "Link Copied!" : "Share Portfolio"}</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Social Links */}
          <CommandGroup heading="Social">
            <CommandItem 
              onSelect={() => openExternal(LinkData.twitter)}
              onMouseEnter={() => updateSelectedAction("external")}
              onFocus={() => updateSelectedAction("external")}
            >
              <Twitter className="mr-2 h-4 w-4" />
              <span>X (Twitter)</span>
              <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
            </CommandItem>
            <CommandItem 
              onSelect={() => openExternal(LinkData.github)}
              onMouseEnter={() => updateSelectedAction("external")}
              onFocus={() => updateSelectedAction("external")}
            >
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
              <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
            </CommandItem>
            <CommandItem 
              onSelect={() => openExternal(LinkData.linkedin)}
              onMouseEnter={() => updateSelectedAction("external")}
              onFocus={() => updateSelectedAction("external")}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
              <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
            </CommandItem>
            <CommandItem 
              onSelect={copyEmail}
              onMouseEnter={() => updateSelectedAction("copy")}
              onFocus={() => updateSelectedAction("copy")}
            >
              {copied === "email" ? (
                <Check className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              <span>{copied === "email" ? "Email Copied!" : "Copy Email"}</span>
            </CommandItem>
          </CommandGroup>

          {/* Blogs */}
          {blogs.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Blogs">
                {blogs.map((blog) => (
                  <CommandItem
                    key={blog.slug}
                    onSelect={() => navigate(`/blogs/${blog.slug}`)}
                    onMouseEnter={() => updateSelectedAction("navigate")}
                    onFocus={() => updateSelectedAction("navigate")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{blog.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Projects">
                {projects.map((project) => (
                  <CommandItem
                    key={project.slug}
                    onSelect={() => navigate(`/projects/${project.slug}`)}
                    onMouseEnter={() => updateSelectedAction("navigate")}
                    onFocus={() => updateSelectedAction("navigate")}
                  >
                    <FolderKanban className="mr-2 h-4 w-4" />
                    <span>{project.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 border-t px-3 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>{getActionText()}</span>
            <Kbd>↵</Kbd>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1">
            <span>Exit</span>
            <Kbd>Esc</Kbd>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}