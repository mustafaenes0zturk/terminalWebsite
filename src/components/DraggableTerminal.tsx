'use client';

import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode, useLayoutEffect, useState } from 'react';

function DraggableWindow({ position, onPositionChange, children }: { 
  position: { x: number; y: number }; 
  onPositionChange: (pos: { x: number; y: number }) => void;
  children: ReactNode 
}) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'terminal',
  });

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!isMobile) {
      const centerX = (window.innerWidth - 1300) / 2;
      const centerY = (window.innerHeight - 700) / 2;
      onPositionChange({ x: centerX, y: centerY });
    }
    setMounted(true);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return null;
  }

  const style = isMobile ? {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  } : {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <div ref={setNodeRef} style={style} className={`terminal-window ${isMobile ? 'mobile-terminal' : ''}`}>
      {!isMobile && (
        <div {...listeners} {...attributes} className="terminal-header cursor-grab active:cursor-grabbing">
          <div className="terminal-dots">
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
            <div className="terminal-dot"></div>
          </div>
          <div className="text-xs opacity-50">~~~</div>
        </div>
      )}
      {children}
    </div>
  );
}

export default function DraggableTerminal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleDragEnd = (event: any) => {
    const { delta } = event;
    setPosition(current => ({
      x: current.x + delta.x,
      y: current.y + delta.y
    }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DraggableWindow 
        position={position} 
        onPositionChange={setPosition}
      >
        {children}
      </DraggableWindow>
    </DndContext>
  );
} 