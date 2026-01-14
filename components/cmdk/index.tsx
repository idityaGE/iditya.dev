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

// Map of value prefixes to action types
const ACTION_TYPE_MAP: Record<string, ActionType> = {
  "nav:": "navigate",
  "action:": "action",
  "ext:": "external",
  "copy:": "copy",
};

function getActionTypeFromValue(value: string): ActionType {
  for (const [prefix, type] of Object.entries(ACTION_TYPE_MAP)) {
    if (value.startsWith(prefix)) return type;
  }
  return "navigate";
}

export function CommandMenu({ blogs = [], projects = [] }: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState<string | null>(null);
  const [value, setValue] = React.useState("");
  const [selectedAction, setSelectedAction] = React.useState<ActionType>("navigate");
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  // Map action type to display text
  const actionText = React.useMemo(() => {
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
  }, [selectedAction]);

  // Handle selection change from cmdk
  const handleValueChange = React.useCallback((newValue: string) => {
    setValue(newValue);
    const actionType = getActionTypeFromValue(newValue);
    setSelectedAction(actionType);
  }, []);

  // Reset to default when dialog opens
  React.useEffect(() => {
    if (open) {
      setValue("");
      setSelectedAction("navigate");
    }
  }, [open]);

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
    runCommand(() => router.push("/rss"));
  }, [router, runCommand]);



  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-green-500 transition-colors font-mono"
      >
        <span className="text-green-500">$</span>
        <span className="hidden sm:inline">cmd</span>
        <Kbd className="pointer-events-none text-[10px]">
          ⌘ K
        </Kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={handleValueChange}
      >
        <CommandInput placeholder="type a command or search..." />
        <CommandList>
          <CommandEmpty>command not found.</CommandEmpty>

          {/* Pages */}
          <CommandGroup heading="Pages">
            <CommandItem
              value="nav:home"
              onSelect={() => navigate("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
              <Kbd className="ml-auto">H</Kbd>
            </CommandItem>
            <CommandItem
              value="nav:projects"
              onSelect={() => navigate("/projects")}
            >
              <FolderKanban className="mr-2 h-4 w-4" />
              <span>Projects</span>
              <Kbd className="ml-auto">P</Kbd>
            </CommandItem>
            <CommandItem
              value="nav:blogs"
              onSelect={() => navigate("/blogs")}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Blogs</span>
              <Kbd className="ml-auto">B</Kbd>
            </CommandItem>
            <CommandItem
              value="nav:pow"
              onSelect={() => navigate("/PoW")}
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
              value="action:toggle-theme"
              onSelect={toggleTheme}
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
              value="action:download-resume"
              onSelect={downloadResume}
            >
              <Download className="mr-2 h-4 w-4" />
              <span>Download Resume</span>
            </CommandItem>
            <CommandItem
              value="nav:rss-feed"
              onSelect={openRssFeed}
            >
              <Rss className="mr-2 h-4 w-4" />
              <span>RSS Feed</span>
            </CommandItem>
            <CommandItem
              value="copy:share-portfolio"
              onSelect={sharePortfolio}
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
              value="ext:twitter"
              onSelect={() => openExternal(LinkData.twitter)}
            >
              <Twitter className="mr-2 h-4 w-4" />
              <span>X (Twitter)</span>
              <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
            </CommandItem>
            <CommandItem
              value="ext:github"
              onSelect={() => openExternal(LinkData.github)}
            >
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
              <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
            </CommandItem>
            <CommandItem
              value="ext:linkedin"
              onSelect={() => openExternal(LinkData.linkedin)}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
              <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
            </CommandItem>
            <CommandItem
              value="copy:email"
              onSelect={copyEmail}
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
                    value={`nav:blog-${blog.slug}`}
                    onSelect={() => navigate(`/blogs/${blog.slug}`)}
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
                    value={`nav:project-${project.slug}`}
                    onSelect={() => navigate(`/projects/${project.slug}`)}
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
        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[10px] text-muted-foreground bg-background font-mono">
          <div className="flex justify-end w-full gap-3">
            <div className="flex items-center gap-1">
              <span>{actionText}</span>
              <Kbd className="text-[10px]">↵</Kbd>
            </div>
            <div className="flex items-center gap-1">
              <span>exit</span>
              <Kbd className="text-[10px]">esc</Kbd>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}