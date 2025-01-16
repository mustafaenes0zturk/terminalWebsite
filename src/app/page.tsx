import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import * as FaIcons from 'react-icons/fa6'
import * as SiIcons from 'react-icons/si'
import matter from 'gray-matter'
import PageLayout from '@/components/PageLayout'

interface SocialLink {
  platform: string
  url: string
  icon: string
  order: number
  content: string
  slug: string
}

async function getSocialLinks(): Promise<SocialLink[]> {
  const socialDirectory = path.join(process.cwd(), 'src/content/social')
  const files = await fs.readdir(socialDirectory)
  
  const links = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(socialDirectory, filename)
      const fileContent = await fs.readFile(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      
      return {
        platform: data.platform,
        url: data.url,
        icon: data.icon,
        order: data.order,
        content: content.trim(),
        slug: filename.replace('.md', '')
      } as SocialLink
    })
  )
  
  // Sort by order field
  return links.sort((a, b) => (a.order || 0) - (b.order || 0))
}

export default async function Home() {
  const socialLinks = await getSocialLinks()

  const getIcon = (iconName: string) => {
    if (iconName.startsWith('Fa')) {
      return FaIcons[iconName as keyof typeof FaIcons]
    }
    return SiIcons[iconName as keyof typeof SiIcons]
  }

  return (
    <PageLayout>
      <div className="p-4 h-full flex flex-col items-center justify-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          <pre className="hidden md:block text-xs sm:text-sm text-center whitespace-pre opacity-75 font-mono">
{`
___ ___  __ __  _____ ______   ____  _____   ____        ___  ____     ___  _____
|   |   ||  |  |/ ___/|      | /    ||     | /    |      /  _]|    \\   /  _]/ ___/
| _   _ ||  |  (   \\_ |      ||  o  ||   __||  o  |     /  [_ |  _  | /  [_(   \\_ 
|  \\_/  ||  |  |\\__  ||_|  |_||     ||  |_  |     |    |    _]|  |  ||    _]\\__  |
|   |   ||  :  |/  \\ |  |  |  |  _  ||   _] |  _  |    |   [_ |  |  ||   [_ /  \\ |
|   |   ||     |\\    |  |  |  |  |  ||  |   |  |  |    |     ||  |  ||     |\\    |
|___|___| \\__,_| \\___|  |__|  |__|__||__|   |__|__|    |_____||__|__||_____| \\___|
                                                                                  
                                       ___   _____  ______  __ __  ____   __  _                                        
                                      /   \\ |     ||      ||  |  ||    \\ |  |/ ]                                       
                                     |     ||__/  ||      ||  |  ||  D  )|  ' /                                        
                                     |  O  ||   __||_|  |_||  |  ||    / |    \\                                        
                                     |     ||  /  |  |  |  |  :  ||    \\ |     \\                                       
                                     |     ||     |  |  |  |     ||  .  \\|  .  |                                       
                                      \\___/ |_____|  |__|   \\__,_||__|\\_||__|\\_|                                       `}
          </pre>
          <pre className="md:hidden text-[8px] text-center whitespace-pre opacity-75 font-mono leading-[1.2]">
{`
            __  ___           __        ____         
           /  |/  /_  _ ____ / /_______/   ______    
          / /|_/ / / / / ___/ __/ __ \`/ /_/ __ \`/    
         / /  / / /_/ (__  / /_/ /_/ / __/ /_/ /     
        /_/  /_/\\__,_/____/\\__/\\__,_/_/  \\__,_/      

                      ______                                
                     / __  ____  ___  _____                 
                    / __/ / __ \\/ _ \\/ ___/                 
                   / /___/ / / /  __(__  )                  
                  /_____/_/ /_/\\___/____/                   

                 ____       __             __              
                / __ \\____ / /___  _______/ /__            
               / / / /_  // __/ / / / ___/ //_/            
              / /_/ / / // /_/ /_/ / /  / ,<               
              \\____/ /___\\__/\\__,_/_/  /_/|_|              
`}
          </pre>
          <p className="mt-4 text-sm opacity-50 text-center">~Computer Engineer~</p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {socialLinks.map((link) => {
              const Icon = getIcon(link.icon)
              return Icon ? (
                <a
                  key={`${link.platform}-${link.slug}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-3xl opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Icon />
                </a>
              ) : null
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
