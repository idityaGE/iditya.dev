import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

export const CodeBlock = ({
  children,
  className,
  ...props
}: CodeBlockProps) => {
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    return '';
  };

  const textContent = getTextContent(children);

  return (
    <div className="mb-4 mt-6 relative rounded-lg font-mono text-sm">
      <div className="flex justify-end py-1 pr-3 bg-zinc-600 text-gray-300 rounded-t-lg">
        <CopyButton
          text={textContent}
          className="text-xs px-2 py-1 hover:bg-zinc-500 rounded transition-colors"
        />
      </div>
      <pre
        className={cn("overflow-x-auto bg-black py-4 rounded-b-lg", className)}
        {...props}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
};
