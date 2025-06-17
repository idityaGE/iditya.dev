import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";

export function CommandBtn({
  command,
  className = "",
}: {
  command: Record<string, string>;
  className?: string;
}) {
  return (
    <div className={`flex-1 ${className}`}>
      <ScriptCopyBtn
        showMultiplePackageOptions={true}
        codeLanguage="shell"
        lightTheme="nord"
        darkTheme="vitesse-dark"
        commandMap={command}
      />
    </div>
  );
}
