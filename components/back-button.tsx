import Link from "next/link";

export const BackButton = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return (
    <div className="flex items-baseline">
      <Link href={href} className="text-xs hover:text-green-500 font-mono">
        {label}
      </Link>
    </div>
  );
};
