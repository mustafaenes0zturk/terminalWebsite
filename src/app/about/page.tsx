import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import PageLayout from '@/components/PageLayout'

interface AboutContent {
  title: string
  image: string
  content: string
}

const components: Components = {
  h1: ({ node, ...props }) => (
    <h1 className="text-xl font-bold mt-6 mb-4" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-lg font-medium mt-4 mb-2" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="mb-4" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li className="text-gray-300" {...props} />
  ),
  pre: ({ node, ...props }) => {
    const content = props.children as string;
    if (content.includes('Skills')) {
      const skills = content.split('\n')
        .filter(line => line.trim() && !line.includes('Skills'))
        .map(line => line.trim());
      
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-2 rounded bg-[#1C1C1C] border border-gray-800 hover:border-gray-700 transition-all duration-300 text-center"
            >
              <span className="text-gray-300 text-sm">{skill}</span>
            </div>
          ))}
        </div>
      );
    }
    return <pre {...props} />;
  }
}

async function getAboutContent(): Promise<AboutContent> {
  const filePath = path.join(process.cwd(), 'src/content/about/about.md')
  const fileContent = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return { 
    title: data.title as string,
    image: data.image as string,
    content 
  }
}

export default async function About() {
  const { title, image, content } = await getAboutContent()

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-start gap-8">
          {image && (
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={image}
                alt="Profile"
                width={300}
                height={300}
                className="rounded-lg shadow-lg aspect-square object-cover"
                priority
              />
            </div>
          )}
          <div className="flex-1">
            <div className="prose prose-invert prose-sm max-w-none opacity-90 [&>*:first-child]:mt-0">
              <ReactMarkdown components={components}>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 