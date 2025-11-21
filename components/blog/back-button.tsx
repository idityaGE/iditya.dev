import Link from "next/link";

export const BackButton = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return (
    <div className="flex items-center">
      &lt;&nbsp;
      <Link href={href} className="text-xs hover:underline font-mono">
        {label}
      </Link>
    </div>
  );
};
