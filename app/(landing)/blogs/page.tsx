import React from 'react'
import { getAllBlogPostsMeta } from '@/lib/mdx'
import { BlogCard } from '@/components/blog/blog-card'

const Blogs = async () => {
  const posts = await getAllBlogPostsMeta()

  return (
    <div className="container px-4 py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog Posts</h1>
        <p className="text-lg text-muted-foreground">
          I like to write when I get stuck into some problem or learn something new which might help others.
          Here you'll find my thoughts, solutions, and discoveries from my coding journey.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No blog posts available at the moment.</p>
          <p className="mt-2">Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.title} blog={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Blogs
