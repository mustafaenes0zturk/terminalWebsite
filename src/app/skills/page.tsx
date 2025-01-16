import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import type { ComponentPropsWithoutRef } from 'react'
import PageLayout from '@/components/PageLayout'

const components = {
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <span className="inline-block px-3 py-1 m-1 text-sm font-medium rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors" {...props} />
  ),
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="text-2xl font-bold mt-8 mb-4 text-zinc-200" {...props} />
  )
}

async function getSkills() {
  const skillsDirectory = path.join(process.cwd(), 'src/content/skills')
  const filePath = path.join(skillsDirectory, 'skills.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { title: data.title, content }
}

export default async function Skills() {
  const { title, content } = await getSkills()

  return (
    <PageLayout>
      <div className="prose prose-invert prose-sm max-w-none opacity-90">
        <h1 className="text-xl font-bold mb-6">{title}</h1>
        <ReactMarkdown components={components}>{content}</ReactMarkdown>
      </div>
    </PageLayout>
  )
} 