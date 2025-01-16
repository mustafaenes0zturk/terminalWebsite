import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import PageLayout from '@/components/PageLayout'

interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string
  createdAt: number
}

async function getExperiences(): Promise<Experience[]> {
  const experienceDirectory = path.join(process.cwd(), 'src/content/experience')
  const files = await fs.readdir(experienceDirectory)
  
  const experiences = await Promise.all(
    files.map(async (filename) => {
      if (!filename.endsWith('.md')) return null
      
      const filePath = path.join(experienceDirectory, filename)
      const fileContent = await fs.readFile(filePath, 'utf8')
      const { data } = matter(fileContent)
      const stats = await fs.stat(filePath)
      
      // Skip if required fields are missing
      if (!data.title || !data.company || !data.period || !data.description) {
        console.warn(`Missing required fields in ${filename}`)
        return null
      }
      
      return {
        title: data.title,
        company: data.company,
        location: data.location || 'Remote',
        period: data.period,
        description: data.description || '',
        createdAt: stats.birthtimeMs
      } as Experience
    })
  )
  
  // Filter out null values and sort by creation time (newest first)
  return experiences
    .filter((exp): exp is Experience => exp !== null)
    .sort((a, b) => b.createdAt - a.createdAt)
}

export default async function Experience() {
  const experiences = await getExperiences()
  
  return (
    <PageLayout>
      <h1 className="text-xl font-bold mb-6">Experience</h1>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-medium">{exp.title}</h2>
                  <span className="text-lg font-medium">{exp.period}</span>
                </div>
                <p className="text-sm opacity-80">{exp.company}</p>
                <p className="text-sm opacity-60">{exp.location}</p>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 opacity-80">
              {exp.description.split('\n').map((item, i) => {
                const trimmed = item.trim()
                if (!trimmed || !trimmed.startsWith('-')) return null
                return (
                  <li key={i} className="text-sm">
                    {trimmed.substring(2).trim()}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </PageLayout>
  )
} 