import Test, { metadata } from '@/content/blogs/test.mdx'

const page = async () => {

  console.log("Metadata:", metadata)

  return (
    <div>
      <Test />
    </div>
  )
}

export default page
