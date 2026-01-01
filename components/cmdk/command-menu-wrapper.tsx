import { CommandMenu } from "@/components/cmdk";
import { getAllBlogPostsMeta } from "@/lib/mdx";
import { ProjectData } from "@/config/project.config";

export async function CommandMenuWrapper() {
  const blogPosts = await getAllBlogPostsMeta();

  const blogs = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
  }));

  const projects = ProjectData.map((project) => ({
    slug: project.slug,
    title: project.title,
  }));

  return <CommandMenu blogs={blogs} projects={projects} />;
}
