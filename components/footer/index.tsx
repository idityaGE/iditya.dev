import React from 'react'
import { Separator } from "@/components/ui/separator"
import { LinkData } from "@/config/links.config";
import { Mail } from "lucide-react";
import Link from 'next/link';


export const Footer = () => {
  return (
    <footer className="mt-5 text-sm px-1 md:px-5 w-full flex-shrink-0">
      <Separator />
      <p className="font-[300] px-2 flex justify-between items-center h-8">
        <Link href={LinkData.twitter} className="hover:underline">
          made by @{LinkData.twitter.split("/").pop()}
        </Link>
        <Link href={LinkData.mail} className='dark:hover:text-white hover:text-black duration-300' about="Mail Link">
          <Mail size={18} className='inline-block' />
          <b className="ml-1 hover:underline">{LinkData.gmail}</b>
        </Link>
      </p>
    </footer>
  )
}

