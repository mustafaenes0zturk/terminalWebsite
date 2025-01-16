import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { FaGithub, FaLink } from 'react-icons/fa6'
import PageLayout from '@/components/PageLayout'

interface Project {
  title: string
  description: string
  technologies: string[]
  github: string
  demo: string
  featured: boolean
  createdAt: number
}

async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(process.cwd(), 'src/content/projects')
  const files = await fs.readdir(projectsDirectory)
  
  const projects = await Promise.all(
    files.map(async (filename) => {
      if (!filename.endsWith('.md')) return null
      
      const filePath = path.join(projectsDirectory, filename)
      const fileContent = await fs.readFile(filePath, 'utf8')
      const { data } = matter(fileContent)
      const stats = await fs.stat(filePath)
      
      // Skip if required fields are missing
      if (!data.title || !data.description || !data.technologies) {
        console.warn(`Missing required fields in ${filename}`)
        return null
      }
      
      return {
        title: data.title,
        description: data.description,
        technologies: data.technologies || [],
        github: data.github || '#',
        demo: data.demo || '#',
        featured: data.featured || false,
        createdAt: stats.birthtimeMs
      } as Project
    })
  )
  
  // Filter out null values and sort by creation time (newest first)
  return projects
    .filter((proj): proj is Project => proj !== null)
    .sort((a, b) => b.createdAt - a.createdAt)
}

export default async function Projects() {
  const projects = await getProjects()
  
  return (
    <PageLayout>
      <h1 className="text-xl font-bold mb-6">Projects</h1>
      
      <div className="project-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">{project.title}</h2>
                <div className="flex gap-3 -mt-3">
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FaGithub className="text-3xl opacity-60 hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {project.demo && project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FaLink className="text-3xl opacity-60 hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm opacity-80 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="text-xs px-2 py-1 bg-gray-800 rounded-full opacity-75"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
} 