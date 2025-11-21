import React from "react";
import { LinkData } from "@/config/links.config";
import { Mail } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-5 text-sm w-full flex-shrink-0 border-t border-b">
      <p className="px-2 flex justify-between items-center h-8">
        <Link href={LinkData.twitter} className="hover:underline font-light">
          made by @{LinkData.twitter.split("/").pop()}
        </Link>
        <Link href={LinkData.mail} about="Mail Link">
          <Mail size={16} className="inline-block" />
          <b className="ml-1 font-light hover:underline">{LinkData.gmail}</b>
        </Link>
      </p>
    </footer>
  );
};
