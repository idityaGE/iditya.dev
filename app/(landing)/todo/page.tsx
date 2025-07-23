import Image from "next/image"
import { NotionAPI } from "notion-client"

const getPage = async (pageId: string) => {
  const notion = new NotionAPI()
  try {
    const page = await notion.getPage(pageId)
    return page
  } catch (error) {
    console.error("Error fetching page:", error)
    return null
  }
}

const ToDoPage = async () => {
  const pageId = "23967c3fabda806f826aef58366068e3"
  const page = await getPage(pageId)
  console.log("Fetched page:", JSON.stringify(page, null, 2))

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Image
        src="https://www.notion.so/image/attachment%3Ad5af33f9-2ad3-480d-ba8e-d6c5113144f2%3ADa_Vincis_creation_of_adam_ASCII_Wallpaper.jpg?table=block&id=22cca11c-6d65-808b-8453-ca55e4032397&cache=v2"
        alt="To-Do Image"
        width={1200}
        height={630}
        className="w-full rounded-lg mb-6"
      />
      <p className="px-3 py-1.5 font-semibold rounded text-xs bg-secondary inline-block self-start mb-2">
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <h1 className="text-4xl font-extrabold mb-4">To-Do</h1>

    </div>
  )
}

export default ToDoPage
