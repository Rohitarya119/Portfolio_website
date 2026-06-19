'use client';

import { useState } from 'react';
import { Award, Target, BookOpen, Users, HelpCircle, Trophy, Sparkles, TrendingUp, Calendar, Zap, Star } from 'lucide-react';

interface TopicStat {
  name: string;
  solved: number;
  total: number;
  color: string;
}

export default function DsaDashboard() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  // Exact LeetCode stats from Rohit's profile
  const totalSolved = 634;
  const totalDsaProblems = 3962;
  const easySolved = 244;
  const easyTotal = 950;
  const mediumSolved = 360;
  const mediumTotal = 2069;
  const hardSolved = 30;
  const hardTotal = 943;
  const attemptingCount = 6;

  // Contest metrics
  const contestRating = 1532;
  const maxContestRating = 1580;
  const globalContestRank = 310485;
  const globalContestTotal = 874367;
  const contestsAttended = 6;
  const topPercentile = 35.93;

  // Submission stats
  const totalSubmissionsYear = 948;
  const totalActiveDays = 195;
  const maxStreak = 45;

  const topics: TopicStat[] = [
    { name: 'Arrays & Hashing', solved: 112, total: 120, color: 'bg-emerald-500' },
    { name: 'Two Pointers & Sl. Window', solved: 78, total: 90, color: 'bg-emerald-500' },
    { name: 'Stacks & Queues', solved: 55, total: 60, color: 'bg-teal-500' },
    { name: 'Trees & Graphs', solved: 108, total: 140, color: 'bg-blue-500' },
    { name: 'Dynamic Programming', solved: 62, total: 100, color: 'bg-fuchsia-500' },
    { name: 'Recursion & Backtracking', solved: 50, total: 65, color: 'bg-violet-500' },
    { name: 'Heap & Priority Queue', solved: 40, total: 50, color: 'bg-cyan-500' },
    { name: 'Binary Search', solved: 48, total: 60, color: 'bg-amber-500' },
  ];

  // SVG circular parameters
  const size = 130;
  const strokeWidth = 10;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  // Percentages
  const easyPct = (easySolved / easyTotal) * 100;
  const mediumPct = (mediumSolved / mediumTotal) * 100;
  const hardPct = (hardSolved / hardTotal) * 100;
  const totalPct = (totalSolved / totalDsaProblems) * 100;

  // Mock contribution grid matching LeetCode activity (195 active days)
  // Render a mini 7 rows x 24 columns heat map (168 squares)
  const activityLevels = [
    0, 1, 0, 2, 3, 1, 0, 0, 4, 3, 1, 0, 2, 4, 3, 2, 0, 1, 0, 0, 3, 4, 1, 2,
    1, 0, 2, 0, 1, 0, 3, 4, 2, 1, 0, 0, 3, 4, 0, 1, 2, 3, 0, 0, 4, 3, 2, 1,
    0, 2, 4, 3, 1, 0, 0, 1, 2, 0, 3, 4, 1, 0, 2, 3, 0, 0, 4, 4, 2, 1, 0, 0,
    3, 1, 0, 4, 2, 1, 0, 0, 3, 4, 2, 1, 0, 2, 3, 4, 0, 1, 2, 0, 3, 4, 1, 2,
    4, 3, 1, 0, 2, 4, 3, 2, 0, 1, 0, 0, 3, 4, 1, 2, 0, 2, 4, 3, 0, 0, 1, 0,
    0, 1, 2, 3, 0, 0, 4, 3, 2, 1, 0, 2, 4, 3, 1, 0, 0, 1, 2, 0, 3, 4, 1, 0,
    2, 0, 3, 4, 1, 0, 2, 3, 0, 0, 4, 4, 2, 1, 0, 0, 3, 1, 0, 4, 2, 1, 0, 0
  ];

  const getHeatColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-emerald-950/40 border border-emerald-900/20'; // light activity
      case 2: return 'bg-emerald-800/60'; // medium
      case 3: return 'bg-emerald-600/80'; // high
      case 4: return 'bg-emerald-400'; // ultra high
      default: return 'bg-muted/15 border border-border/20'; // no activity
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-border shadow-xl hover:border-primary/20 transition-all duration-300">
      
      {/* Upper Grid Layout: Solved Stats + Contest Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Solved radial progress (LeetCode layout) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center bg-muted/10 border border-border/40 rounded-2xl p-6 text-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
            <Trophy className="h-4 w-4 text-primary animate-pulse" /> LeetCode Profile
          </div>

          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--border)"
                strokeWidth={strokeWidth}
                className="opacity-30"
              />
              {/* Dynamic Progress Circle */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--primary)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (totalPct / 100) * circumference}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{ filter: 'drop-shadow(0 0 5px var(--primary-glow))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-foreground">{totalSolved}</span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Solved</span>
              <span className="text-[9px] text-accent/80 font-mono mt-0.5">{attemptingCount} Attempting</span>
            </div>
          </div>

          <div className="mt-5 space-y-2 w-full">
            <div className="text-[11px] text-muted-foreground font-mono">
              Username: <span className="text-foreground font-bold font-sans">rohit_arya119</span>
            </div>
            <div className="text-[11px] text-muted-foreground font-mono">
              Global Rank: <span className="text-foreground font-bold font-sans">#115,133</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/25 text-primary text-[10px] rounded-full font-bold uppercase tracking-wider mt-1">
              <Star className="h-3.5 w-3.5 fill-current" /> 100 Days Badge 2026
            </div>
          </div>
        </div>

        {/* Middle column: Difficulty sliders */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
              <Target className="h-4.5 w-4.5 text-primary" /> Problem Solving Distribution
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Real-time problem volume solved on LeetCode. Focused primarily on Medium-level challenges to build scalable backend optimization skills.
            </p>
          </div>

          {/* Progress list */}
          <div className="space-y-3">
            {/* Easy */}
            <div className="bg-muted/5 border border-border/30 rounded-xl p-3">
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span className="text-emerald-400">EASY</span>
                <span className="text-muted-foreground">{easySolved} <span className="text-[10px] opacity-60">/ {easyTotal}</span></span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${easyPct}%` }} />
              </div>
            </div>

            {/* Medium */}
            <div className="bg-muted/5 border border-border/30 rounded-xl p-3">
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span className="text-amber-400">MEDIUM</span>
                <span className="text-muted-foreground">{mediumSolved} <span className="text-[10px] opacity-60">/ {mediumTotal}</span></span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${mediumPct}%` }} />
              </div>
            </div>

            {/* Hard */}
            <div className="bg-muted/5 border border-border/30 rounded-xl p-3">
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span className="text-rose-400">HARD</span>
                <span className="text-muted-foreground">{hardSolved} <span className="text-[10px] opacity-60">/ {hardTotal}</span></span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${hardPct}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Contest performance (Namannagi style capability block) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-muted/10 border border-border/40 rounded-2xl p-5">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-accent" /> Contest Standing
            </h3>
            
            {/* Rating Stat */}
            <div className="flex justify-between items-end border-b border-border/40 pb-3">
              <div>
                <span className="text-2xl font-extrabold text-foreground">{contestRating}</span>
                <span className="text-[10px] text-muted-foreground ml-2">Rating</span>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground">Max Rating</div>
                <div className="text-xs font-bold text-accent">1,580</div>
              </div>
            </div>

            {/* Percentile Stats */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-mono">Attended</span>
                <span className="font-bold text-foreground">{contestsAttended} Contests</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-mono">Global Rank</span>
                <span className="font-bold text-foreground">Top {topPercentile}%</span>
              </div>
            </div>
            
            <p className="text-[10px] text-muted-foreground leading-relaxed italic">
              Rating path peaked at 1,580 in May 2026. Consistent participant in weekly contest modules.
            </p>
          </div>

          <div className="border-t border-border/40 pt-3 flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>Rank: 310,485 / 874,367</span>
            <span className="text-accent font-bold">ACTIVE COMPETITOR</span>
          </div>
        </div>

      </div>

      {/* Contribution Heatmap Section (Namannagi-inspired data visualization) */}
      <div className="mt-8 border-t border-border/40 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" /> {totalSubmissionsYear} Submissions in the past year
          </h4>
          <div className="flex gap-4 text-[10px] font-mono text-muted-foreground">
            <span>Active Days: <strong className="text-foreground">{totalActiveDays}</strong></span>
            <span>Max Streak: <strong className="text-accent">{maxStreak} days</strong></span>
          </div>
        </div>

        {/* Heat Map Grid */}
        <div className="bg-slate-950/60 border border-border/30 rounded-xl p-4 overflow-x-auto scrollbar-thin">
          <div className="min-w-[460px] flex flex-col gap-1 select-none">
            {/* Grid Container */}
            <div className="grid grid-flow-col grid-rows-7 gap-1 h-20 w-full">
              {activityLevels.map((lvl, index) => (
                <div 
                  key={index} 
                  className={`h-2.5 w-2.5 rounded-sm transition-all hover:scale-110 ${getHeatColor(lvl)}`}
                  title={`Activity Level: ${lvl}`}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground px-1 mt-1.5">
              <span>Past 12 Months Activity Matrix</span>
              <div className="flex items-center gap-1">
                <span>Less</span>
                <span className="h-2 w-2 rounded-sm bg-muted/15" />
                <span className="h-2 w-2 rounded-sm bg-emerald-950/40" />
                <span className="h-2 w-2 rounded-sm bg-emerald-800/60" />
                <span className="h-2 w-2 rounded-sm bg-emerald-600/80" />
                <span className="h-2 w-2 rounded-sm bg-emerald-400" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Grid */}
      <div className="mt-6 border-t border-border/40 pt-6">
        <h4 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5 text-primary" /> Topic Distribution
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {topics.map((t, idx) => (
            <div key={idx} className="p-3 bg-muted/10 border border-border/30 rounded-xl hover:border-primary/20 transition-all">
              <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                <span className="text-foreground/90">{t.name}</span>
                <span className="text-muted-foreground font-mono text-[10px]">{t.solved}/{t.total}</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${t.color} rounded-full`}
                  style={{ width: `${(t.solved / t.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
