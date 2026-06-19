'use client';

import React, { useState, useRef, MouseEvent } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export default function TiltCard({ children, className = '', innerClassName = 'flex flex-col h-full' }: TiltCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative mouse position inside card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Card dimensions
    const width = rect.width;
    const height = rect.height;
    
    // Calculate tilt angles (max tilt +/- 8 degrees)
    const rotateY = ((x - width / 2) / (width / 2)) * 8;
    const rotateX = -((y - height / 2) / (height / 2)) * 8;
    
    setRotate({ x: rotateX, y: rotateY });
    setSpotlight({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`glass-card rounded-2xl relative overflow-hidden select-none transition-all duration-300 ease-out ${className}`}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.015, 1.015, 1.015)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'none' : 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Moving Spotlight Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(138, 124, 186, 0.15), transparent 80%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Content wrapper */}
      <div 
        className={`relative z-10 w-full ${innerClassName}`} 
        style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
}
