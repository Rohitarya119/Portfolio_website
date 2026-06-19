'use client';

import { useState, useEffect } from 'react';
import { Palette, ShieldAlert, Sparkles, Orbit, Leaf } from 'lucide-react';

export type ThemeMode = 'deep-space' | 'cyberpunk' | 'forest-aurora';

interface ThemeToggleProps {
  onThemeChange?: (theme: ThemeMode) => void;
}

export default function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>('deep-space');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load initial theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeMode;
    if (savedTheme && ['deep-space', 'cyberpunk', 'forest-aurora'].includes(savedTheme)) {
      applyTheme(savedTheme);
    } else {
      applyTheme('deep-space');
    }
    setMounted(true);
  }, []);

  const applyTheme = (theme: ThemeMode) => {
    const root = document.documentElement;
    
    // Remove existing themes
    root.classList.remove('theme-deep-space', 'theme-cyberpunk', 'theme-forest-aurora');
    
    // Add chosen theme class
    root.classList.add(`theme-${theme}`);
    
    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
    setActiveTheme(theme);
    
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  if (!mounted) return null;

  const themesList = [
    {
      id: 'deep-space' as ThemeMode,
      name: 'Deep Space',
      icon: Orbit,
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      textColor: 'text-blue-400',
    },
    {
      id: 'cyberpunk' as ThemeMode,
      name: 'Cyberpunk',
      icon: Sparkles,
      color: 'from-fuchsia-500 to-pink-500',
      bgColor: 'bg-fuchsia-500/10 border-fuchsia-500/30',
      textColor: 'text-fuchsia-400',
    },
    {
      id: 'forest-aurora' as ThemeMode,
      name: 'Emerald Aurora',
      icon: Leaf,
      color: 'from-emerald-500 to-teal-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      textColor: 'text-emerald-400',
    },
  ];

  const currentThemeInfo = themesList.find((t) => t.id === activeTheme) || themesList[0];

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium border border-border hover:border-primary/50 transition-all duration-300 shadow-lg"
      >
        <currentThemeInfo.icon className={`h-4 w-4 ${currentThemeInfo.textColor}`} />
        <span className="hidden sm:inline">{currentThemeInfo.name}</span>
        <Palette className="h-3 w-3 opacity-60" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-xl glass-panel border border-border p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Select Visual Theme
            </div>
            <div className="space-y-1 mt-1">
              {themesList.map((theme) => {
                const IconComponent = theme.icon;
                const isSelected = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      applyTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                      isSelected
                        ? 'bg-primary/15 text-primary border border-primary/25 font-semibold'
                        : 'text-foreground/80 hover:bg-muted/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className={`h-3.5 w-3.5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span>{theme.name}</span>
                    </div>
                    <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${theme.color}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
