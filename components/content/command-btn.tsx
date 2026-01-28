import { ScriptCopyBtn } from "@/components/ui/magicui/script-copy-btn";

export function CommandBtn({
  command,
  className = "",
}: {
  command: Record<string, string>;
  showPackageManager?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex-1 ${className} my-4`}>
      <ScriptCopyBtn
        showMultiplePackageOptions={true}
        codeLanguage="shell"
        lightTheme="one-light"
        darkTheme="dracula"
        commandMap={command}
      />
    </div>
  );
}
