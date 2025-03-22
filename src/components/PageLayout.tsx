"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="terminal-content">
        {children}
      </div>

      <nav className="terminal-nav">
        <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>home</Link>
        <Link href="/about" className={`nav-item ${pathname === '/about' ? 'active' : ''}`}>about</Link>
        <Link href="/experience" className={`nav-item ${pathname === '/experience' ? 'active' : ''}`}>experience</Link>
        <Link href="/projects" className={`nav-item ${pathname === '/projects' ? 'active' : ''}`}>projects</Link>
        <Link href="/contact" className={`nav-item ${pathname === '/contact' ? 'active' : ''}`}>contact</Link>
      </nav>
    </>
  );
} 