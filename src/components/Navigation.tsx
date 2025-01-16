"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="terminal-nav">
      <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>home</Link>
      <Link href="/about" className={`nav-item ${pathname === '/about' ? 'active' : ''}`}>about</Link>
      <Link href="/experience" className={`nav-item ${pathname === '/experience' ? 'active' : ''}`}>experience</Link>
      <Link href="/skills" className={`nav-item ${pathname === '/skills' ? 'active' : ''}`}>skills</Link>
      <Link href="/projects" className={`nav-item ${pathname === '/projects' ? 'active' : ''}`}>projects</Link>
      <Link href="/contact" className={`nav-item ${pathname === '/contact' ? 'active' : ''}`}>contact</Link>
    </nav>
  );
} 