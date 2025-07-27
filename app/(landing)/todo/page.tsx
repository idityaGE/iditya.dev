import { convertPage } from "@/server/notion-to-mdx";
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { useMDXComponents } from "@/mdx-components";
import type { MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import remarkGfm from 'remark-gfm'
// import Image from "next/image";

export const revalidate = 60; // revalidate at most every minute
export const dynamic = 'force-dynamic'; // always re-render on request

const ToDoPage = async () => {
  const pageId = process.env.NOTION_PAGE_ID || '23967c3fabda806f826aef58366068e3';
  const components = useMDXComponents({});
  const options: MDXRemoteOptions = {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
      ],
    }
  }

  try {
    const content = await convertPage(pageId);

    return (
      <div className="w-full max-w-3xl mx-auto">
        {/* <Image
        src="https://www.notion.so/image/attachment%3Ad5af33f9-2ad3-480d-ba8e-d6c5113144f2%3ADa_Vincis_creation_of_adam_ASCII_Wallpaper.jpg?table=block&id=22cca11c-6d65-808b-8453-ca55e4032397&cache=v2"
        alt="To-Do Image"
        width={1200}
        height={630}
        className="w-full rounded-lg mb-6"
      /> */}
        <p className="px-3 py-1.5 font-semibold rounded text-xs bg-secondary inline-block self-start mb-4">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h1 className="text-4xl font-extrabold mb-4">To-Do</h1>
        <MDXRemote
          components={components}
          source={content}
          options={options}
        />
      </div>
    );
  } catch (error) {
    return <div>Error loading todo content</div>;
  }
}

export default ToDoPage
