import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";

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
        lightTheme="monokai"
        darkTheme="vitesse-dark"
        commandMap={command}
      />
    </div>
  );
}
