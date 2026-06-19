'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Code2, 
  Share2, 
  Send, 
  ExternalLink, 
  Database, 
  Cpu, 
  Layers, 
  Wrench, 
  GraduationCap, 
  Calendar, 
  Menu, 
  X, 
  ArrowUpRight,
  ChevronDown,
  Trophy,
  Award,
  Terminal,
  Activity,
  Server,
  Network,
  Phone,
  Mail,
  User,
  Sliders,
  Sparkles,
  SearchCheck,
  Zap,
  Coffee,
  Leaf,
  Atom,
  Globe,
  Brain,
  Box,
  Cloud,
  GitBranch,
  Download
} from 'lucide-react';


import TerminalConsole from '@/components/TerminalConsole';

import ProjectVisualizer from '@/components/ProjectVisualizer';
import ContactForm from '@/components/ContactForm';
import TiltCard from '@/components/TiltCard';
import { motion, AnimatePresence } from 'framer-motion';


const projects = [
  {
    key: 'resume-analyser' as const,
    title: 'Resume Analyser',
    subtitle: 'AI-Powered Career Tool',
    image: '/resume-analyser.png',
    description: 'An AI-powered ATS scoring and job-matching platform using Spring Boot and Gemini AI, designed to automate profile validation and placement workflows.',
    tech: ['Java 21', 'Spring Boot', 'React', 'Gemini AI', 'Docker', 'Apache Tika', 'Adzuna API', 'Brevo'],
    highlights: [
      'Developed an AI platform using Spring Boot and Gemini AI for automated ATS scoring, achieving 95% accuracy in skill extraction via Apache Tika.',
      'Integrated Adzuna API to provide real-time job matches, reducing manual job search time for testers by approximately 40%.',
      'Engineered a 100% secure authentication system using JWT and OAuth2, featuring encrypted email verification via Brevo.'
    ],
    link: '#',
  },
  {
    key: 'quiz-app' as const,
    title: 'Quiz Application (Microservices)',
    subtitle: 'Distributed Session Orchestration',
    image: '/quiz-app.png',
    description: 'A highly scalable, multi-service quiz application designed in Spring Boot to isolate database instances and manage session telemetry.',
    tech: ['Spring Boot', 'Microservices', 'React', 'PostgreSQL', 'Docker', 'Spring Cloud', 'Netflix OSS'],
    highlights: [
      'Architected a Microservices system that decoupled quiz logic from question bank services, improving system reliability by 25%.',
      'Optimized inter-service REST communication with Spring Cloud, reducing API response latency by 30% across distributed nodes.',
      'Designed a responsive React dashboard capable of handling real-time scoring analytics for 100+ concurrent users.'
    ],
    link: '#',
  },
  {
    key: 'chat-pdf' as const,
    title: 'Chat with PDF',
    subtitle: 'RAG-Based Document Assistant',
    image: '/chat-pdf.png',
    description: 'A vector-based semantic document reader enabling users to chat naturally with uploaded PDFs via retrieval-augmented pipelines.',
    tech: ['Python', 'LangChain', 'Gemini API', 'Vector Store', 'Streamlit', 'ChromaDB'],
    highlights: [
      'Developed a RAG pipeline enabling contextual Q&A, increasing answer relevance by 50% compared to standard LLM prompting.',
      'Implemented automated text chunking and storage in a Vector Store, allowing for sub-second semantic retrieval across multi-page PDFs.',
      'Reduced model hallucinations by 35% by grounding AI responses strictly in similarity-based context from uploaded documents.'
    ],
    link: '#',
  },
];

const capabilities = [
  {
    title: 'AI/ML Product Engineering',
    icon: Sparkles,
    desc: 'Designing custom LLM workflows, Retrieval-Augmented Generation (RAG) pipelines, and context-grounded AI copilots with sub-second vector search.',
  },
  {
    title: 'Backend Systems & API Design',
    icon: Server,
    desc: 'Building containerized microservices architectures, decoupled service gateways, JWT auth tokens, and robust Spring Boot REST interfaces.',
  },
  {
    title: 'Databases & Distributed Storage',
    icon: Database,
    desc: 'Structuring complex PostgreSQL schemas, database replication structures, and ChromaDB vector search indexes for optimal latency.',
  },
];

const marqueeSkills = [
  { name: 'Python', category: 'Development', icon: Code2, color: 'text-amber-400 bg-amber-400/10 border-amber-400/25' },
  { name: 'Java', category: 'Development', icon: Coffee, color: 'text-orange-400 bg-orange-400/10 border-orange-400/25' },
  { name: 'Spring Boot', category: 'Frameworks', icon: Leaf, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25' },
  { name: 'React', category: 'Frontend', icon: Atom, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25' },
  { name: 'Next.js', category: 'Frontend', icon: Globe, color: 'text-white bg-white/10 border-white/25' },
  { name: 'FastAPI', category: 'Development', icon: Zap, color: 'text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/25' },
  { name: 'PostgreSQL', category: 'Databases', icon: Database, color: 'text-blue-400 bg-blue-400/10 border-blue-400/25' },
  { name: 'MySQL', category: 'Databases', icon: Database, color: 'text-sky-400 bg-sky-400/10 border-sky-400/25' },
  { name: 'ChromaDB', category: 'AI & LLMs', icon: Brain, color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/25' },
  { name: 'LangChain', category: 'AI & LLMs', icon: Cpu, color: 'text-violet-400 bg-violet-400/10 border-violet-400/25' },
  { name: 'RAG Pipelines', category: 'AI & LLMs', icon: Server, color: 'text-rose-400 bg-rose-400/10 border-rose-400/25' },
  { name: 'Docker', category: 'Tools & Cloud', icon: Box, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25' },
  { name: 'AWS', category: 'Tools & Cloud', icon: Cloud, color: 'text-orange-400 bg-orange-400/10 border-orange-400/25' },
  { name: 'Git & GitHub', category: 'Tools & Cloud', icon: GitBranch, color: 'text-slate-300 bg-slate-300/10 border-slate-300/25' },
  { name: 'RESTful APIs', category: 'Integration', icon: Sliders, color: 'text-teal-400 bg-teal-400/10 border-teal-400/25' },
  { name: 'DSA & OOP', category: 'Core Concepts', icon: Terminal, color: 'text-amber-500 bg-amber-500/10 border-amber-500/25' },
];

const detailedSkills = [
  {
    title: 'Languages',
    items: ['Java', 'Python', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Frameworks',
    items: ['Spring Boot', 'Microservices', 'JDBC', 'RESTful APIs', 'Tailwind CSS'],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'Vector Databases (ChromaDB)'],
  },
  {
    title: 'AI & LLMs',
    items: ['Prompt Engineering', 'RAG (Retrieval-Augmented Generation)', 'LangChain', 'LangGraph'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Maven', 'Docker', 'AWS', 'Linux', 'IntelliJ IDEA', 'VS Code'],
  },
  {
    title: 'Core Concepts',
    items: ['OOP (Object-Oriented Programming)', 'Data Structures & Algorithms (DSA)', 'DBMS (Database Management Systems)'],
  },
];

const timeline = [
  {
    role: 'B.Tech in Computer Science & Engineering',
    institution: 'Uttaranchal University',
    period: '2022 - 2026',
    description: 'Maintaining a 9.4 / 10.0 CGPA over 7 semesters. Rigorous study in OOP, database management systems, DSA, and computer networking.',
    badge: 'Education',
  },
  {
    role: '12th From CBSE',
    institution: 'Gurukul International School',
    period: '2022',
    description: 'Completed Senior Secondary education with focus on science and mathematics streams under CBSE curriculum.',
    badge: 'Education',
  },
  {
    role: '10th From CBSE',
    institution: 'Gurukul International School',
    period: '2020',
    description: 'Completed Secondary school education under CBSE board curriculum.',
    badge: 'Education',
  },
];

const achievements = [
  {
    title: '500+ Algorithmic Challenges Solved',
    desc: 'Solved 500+ problems on LeetCode and GFG, ranking in the Top 30% globally.',
  },
  {
    title: 'Academic Performance Tier',
    desc: 'Ranked in the top tier of the Uttaranchal University engineering cohort with a consistent 9.4 CGPA.',
  },
  {
    title: 'HackerRank Certifications',
    desc: 'Certified in Problem Solving (Basic) and Java (Basic) in the 2024 - 2025 assessment windows.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18
      }
    }
  };

  const heroLeftVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const heroChildVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const terminalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: 0.5
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 75);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const sections = ['about', 'services', 'projects', 'skills', 'achievements', 'contact'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">

      {/* Dynamic Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#03030b] z-[9999] flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Glowing ambient light behind the loader */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
            
            <div className="space-y-8 text-center max-w-md px-6 w-full relative z-10 flex flex-col items-center justify-center">
              
              {/* Circular HUD Graphic Container */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 flex items-center justify-center">
                {/* Rotating Outer Tech Ring */}
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 select-none pointer-events-none"
                  style={{ originX: 0.5, originY: 0.5 }}
                >
                  <img 
                    src="/loading-graphic.png" 
                    alt="Loading Interface" 
                    className="w-full h-full object-contain animate-[spin_50s_linear_infinite]"
                  />
                </motion.div>

                {/* Static Black Mask to cover baked-in 74% and place dynamic percentage */}
                <div className="absolute w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-full bg-[#03030b] border border-white/5 flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]">
                  {/* Small sub-label */}
                  <span className="text-[7px] text-accent/60 font-mono tracking-widest uppercase mb-1">PROG</span>
                  {/* Dynamic counter */}
                  <span className="text-lg sm:text-xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                    {loadingProgress}%
                  </span>
                </div>

                {/* Outer pulsing decoration ring */}
                <div className="absolute inset-0 rounded-full border border-primary/5 animate-pulse" />
              </div>

              {/* Console Logs Display */}
              <div className="h-6 font-mono text-[10px] text-accent tracking-wider font-semibold">
                {loadingProgress < 20 && "> Initializing core modules..."}
                {loadingProgress >= 20 && loadingProgress < 40 && "> Calibrating system components..."}
                {loadingProgress >= 40 && loadingProgress < 60 && "> Loading portfolio assets..."}
                {loadingProgress >= 60 && loadingProgress < 75 && "> Optimizing database interfaces..."}
                {loadingProgress >= 75 && loadingProgress < 90 && "> Mounting dashboard telemetry..."}
                {loadingProgress >= 90 && loadingProgress < 100 && "> Finalizing neural handshake..."}
                {loadingProgress === 100 && "> System boot complete."}
              </div>

              {/* Progress bar container */}
              <div className="space-y-2 w-72">
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                    style={{ width: `${loadingProgress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between items-center text-[9px] text-muted-foreground font-mono">
                  <span>TELEMETRY SYNC</span>
                  <span>{loadingProgress}%</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content with Entrance Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!loading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >

      {/* Background grid visual overlay */}
      <div className="fixed inset-0 grid-bg-overlay pointer-events-none z-0" />
      
      {/* Cosmic Nebula background graphic stretched across the whole website */}
      <div className="global-nebula-bg" />

      {/* Floating Background Ambient Glow Lights */}
      <div 
        className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full pointer-events-none z-0 animate-pulse duration-[10000ms]" 
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[35%] right-[5%] w-[450px] h-[450px] rounded-full pointer-events-none z-0 animate-pulse duration-[8000ms]" 
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 8%, transparent) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[60%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none z-0 animate-pulse duration-[7000ms]" 
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-[15%] right-[10%] w-[380px] h-[380px] rounded-full pointer-events-none z-0 animate-pulse duration-[9000ms]" 
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 8%, transparent) 0%, transparent 70%)' }}
      />

      {/* Top Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <motion.nav 
        variants={navVariants}
        initial="hidden"
        animate={!loading ? "visible" : "hidden"}
        className="fixed top-0 w-full bg-transparent border-b border-border/20 z-40 transition-all duration-300"
      >
        <div className="max-w-[1300px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          
          {/* Desktop Nav Links (Left aligned) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 flex-shrink-0">
            <a 
              href="#" 
              className={`text-xs font-semibold transition-colors nav-link-underline ${
                activeSection === 'about' ? 'text-primary nav-link-active' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </a>
            <a 
              href="#services" 
              className={`text-xs font-semibold transition-colors nav-link-underline ${
                activeSection === 'services' ? 'text-primary nav-link-active' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Services
            </a>
            <a 
              href="#projects" 
              className={`text-xs font-semibold transition-colors nav-link-underline ${
                activeSection === 'projects' ? 'text-primary nav-link-active' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Projects
            </a>
            <a 
              href="#skills" 
              className={`text-xs font-semibold transition-colors nav-link-underline ${
                activeSection === 'skills' ? 'text-primary nav-link-active' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Skills
            </a>

            <a 
              href="#about" 
              className={`text-xs font-semibold transition-colors nav-link-underline ${
                activeSection === 'about' ? 'text-primary nav-link-active' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Experience
            </a>
            <a 
              href="#about" 
              className={`text-xs font-semibold transition-colors nav-link-underline ${
                activeSection === 'about' ? 'text-primary nav-link-active' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Education
            </a>
          </div>

          {/* Desktop Logo and Say Hi on Right */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0">
            <div className="flex items-center gap-3.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center font-bold text-white text-xs select-none shadow-sm shadow-primary/35">
                  R
                </div>
                <span className="font-bold text-sm text-foreground tracking-wide font-heading">Rohit</span>
              </div>
              <a 
                href="mailto:raviarya201016@gmail.com"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-medium group"
              >
                <span className="hidden xl:inline">Say hi - <span className="text-muted-foreground/80 group-hover:text-foreground transition-colors font-mono">raviarya201016@gmail.com</span></span>
                <span className="inline xl:hidden">Say hi</span>
                <span className="text-primary group-hover:translate-x-0.5 transition-transform font-mono">→</span>
              </a>
            </div>
          </div>

          {/* Mobile Layout Logo */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center font-bold text-white text-xs select-none">
              R
            </div>
            <span className="font-bold text-sm text-foreground tracking-wide font-heading">Rohit</span>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-muted/40 border border-border/50 text-foreground"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-b border-border/60 px-6 py-4 space-y-4 animate-in fade-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-3.5">
              <a 
                href="#" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-colors ${activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Home
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-colors ${activeSection === 'services' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Services
              </a>
              <a 
                href="#projects" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-colors ${activeSection === 'projects' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Projects
              </a>
              <a 
                href="#skills" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-colors ${activeSection === 'skills' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Skills
              </a>

              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-colors ${activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Experience & Education
              </a>
              <a 
                href="mailto:raviarya201016@gmail.com" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-primary"
              >
                Say Hi
              </a>
            </div>
          </div>
        )}
      </motion.nav>      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 z-10">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Hero Content */}
          <motion.div 
            variants={heroLeftVariants}
            initial="hidden"
            animate={!loading ? "visible" : "hidden"}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div variants={heroChildVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold select-none animate-pulse-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              <span>B.Tech CSE Graduate (2022 - 2026)</span>
            </motion.div>
            
            <motion.div variants={heroChildVariants} className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight flex items-center gap-3 font-heading">
                  Hey!!! <span className="animate-wiggle inline-block origin-bottom-right select-none">👋</span>
                </h2>
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading">
                  I am Rohit
                </h1>
              </div>
              
              <div className="pt-1 flex flex-col font-heading">
                <span className="text-5xl sm:text-7xl font-black tracking-tight leading-none bg-gradient-to-r from-[#06b6d4] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent uppercase">
                  Software
                </span>
                <span className="text-5xl sm:text-7xl font-black tracking-tight leading-none bg-gradient-to-r from-[#06b6d4] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent uppercase">
                  Engineer
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed font-sans">
                Dynamic Software Engineer building energy-efficient, automated, and scalable AI & backend solutions.
              </p>
            </motion.div>

            <motion.div variants={heroChildVariants} className="flex flex-wrap gap-4 pt-1">
              <a 
                href="/Rohit_Arya_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                download="Rohit_Arya_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl text-xs font-semibold transition-all duration-300 glow-btn-hover"
              >
                Download CV <Download className="h-3.5 w-3.5" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted/40 text-foreground text-xs font-semibold transition-all glow-btn-hover"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div variants={heroChildVariants} className="flex items-center gap-4 pt-2">
              <a 
                href="https://github.com/Rohitarya119" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl border border-border/40 bg-muted/20 text-muted-foreground hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 group"
                title="GitHub"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/rohit-arya-805954251/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl border border-border/40 bg-muted/20 text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#0A66C2]/20 group"
                title="LinkedIn"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a 
                href="https://leetcode.com/u/rohit_arya119/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl border border-border/40 bg-muted/20 text-muted-foreground hover:text-[#FFA116] hover:border-[#FFA116]/50 hover:bg-[#FFA116]/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FFA116]/20 group"
                title="LeetCode"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/></svg>
              </a>
              <a 
                href="https://www.instagram.com/rohit_arya119/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl border border-border/40 bg-muted/20 text-muted-foreground hover:text-[#E4405F] hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#E4405F]/20 group"
                title="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Terminal Console */}
          <motion.div 
            variants={terminalVariants}
            initial="hidden"
            animate={!loading ? "visible" : "hidden"}
            className="lg:col-span-5 w-full flex flex-col justify-center animate-float"
          >
            <TerminalConsole />
          </motion.div>

        </div>

        <div className="flex justify-center mt-16">
          <a href="#about" className="animate-bounce p-2.5 rounded-full bg-muted/30 border border-border/50 text-muted-foreground hover:text-foreground transition-colors" title="Scroll Down">
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* About & Timeline Section */}
      <section id="about" className="relative py-20 px-6 border-t border-border/40 z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Profile Overview</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">About Me</h3>
            </div>
            <div className="text-sm text-muted-foreground max-w-md space-y-1">
              <p className="flex items-center gap-2 text-foreground font-semibold"><Phone className="h-3.5 w-3.5 text-primary" /> +91 7088929781</p>
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary" /> raviarya201016@gmail.com</p>
            </div>
          </motion.div>

          {/* Bio Summary */}
          <motion.div variants={itemVariants} className="mb-12 max-w-3xl">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Detail-oriented Computer Science graduate with a strong academic record (9.4 CGPA) and proficiency in Data Structures and Algorithms. Proficient in Java, Spring Boot, and Python, with hands-on experience building scalable Microservices and AI-integrated applications. Proven ability to design secure, efficient backend systems and a quick learner of emerging technologies. Eager to contribute technical expertise to high-impact software engineering teams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Timeline info */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                <GraduationCap className="h-4.5 w-4.5 text-primary" /> Educational & Professional Milestones
              </h4>
              
              <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-accent before:to-primary before:opacity-35 before:animate-line-glow">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pl-10 group">
                    {/* Node circle bullet */}
                    <div className="absolute left-1 top-1.5 h-5 w-5 rounded-full bg-background border-2 border-primary timeline-dot z-10 flex items-center justify-center shadow-lg shadow-primary/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>
                    
                    <TiltCard className="hover:border-primary/20 group" innerClassName="p-5 flex flex-col h-full w-full">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                          {item.badge}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {item.period}
                        </span>
                      </div>
                      <h5 className="text-base font-bold text-foreground">{item.role}</h5>
                      <p className="text-xs text-primary font-medium mt-0.5 mb-2">{item.institution}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </TiltCard>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick stats panel */}
            <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-center gap-4">
              <TiltCard className="stats-card-hover border border-border/50 text-center animate-pulse-glow" innerClassName="p-6 flex flex-col items-center justify-center h-full w-full">
                <div className="text-4xl font-extrabold text-gradient mb-2">9.4</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cumulative Grade Point Average (CGPA)</div>
                <p className="text-[10px] text-muted-foreground mt-2 italic">Ranked in the top tier of B.Tech CSE engineering batch</p>
              </TiltCard>

              <TiltCard className="stats-card-hover border border-border/50 text-center animate-pulse-glow" innerClassName="p-6 flex flex-col items-center justify-center h-full w-full">
                <div className="text-4xl font-extrabold text-gradient mb-2">500+</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Algorithmic Problems Solved</div>
                <p className="text-[10px] text-muted-foreground mt-2 italic">LeetCode & GFG profiles, global top 30% rank</p>
              </TiltCard>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* Services / Capabilities Section (Naman Nagi style block) */}
      <section id="services" className="relative py-20 px-6 border-t border-border/40 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Core Competencies</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">Services & Capabilities</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Providing production-ready technical architecture spanning systems engineering, microservices orchestration, and RAG pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <TiltCard 
                  key={idx}
                  className="stats-card-hover border-border/40 hover:border-primary/30 group animate-pulse-glow"
                  innerClassName="p-6 flex flex-col justify-between h-full w-full"
                >
                  <div className="space-y-4">
                    <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{srv.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{srv.desc}</p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-[10px] font-bold text-primary font-mono uppercase tracking-wider group-hover:tracking-widest transition-all duration-300">
                    Reliability & Scale <Activity className="h-3 w-3 animate-pulse" />
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>



      {/* Featured Projects Section */}
      <section id="projects" className="relative py-20 px-6 border-t border-border/40 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Featured Systems</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">Technical Projects</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Explore the system workflow topologies and interactive mock UI graphics below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {projects.map((project, idx) => (
              <div 
                key={idx}
                className="glass-card rounded-3xl border border-border/40 hover:border-primary/45 transition-all duration-300 animate-pulse-glow"
              >
                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full h-full">
                
                {/* Project Details left column */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-accent">0{idx + 1}.</span>
                      <h4 className="text-xl sm:text-2xl font-bold text-foreground">{project.title}</h4>
                    </div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{project.subtitle}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    <div>
                      <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Tech Stack</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded bg-muted/50 border border-border/60 text-muted-foreground text-[10px] font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">System Outcomes</h5>
                      <ul className="space-y-2">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <a 
                      href={project.link} 
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-accent transition-colors"
                    >
                      View Project Source Code <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Project Visuals right column */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                  {/* Modern and sleek generated mockup graphic */}
                  <div className="relative rounded-xl overflow-hidden border border-border/50 aspect-video lg:h-52 w-full group">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 filter brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-black/60 border border-border/40 text-[9px] font-mono text-accent font-semibold tracking-wider uppercase select-none">
                      Active Architecture
                    </span>
                  </div>

                  {/* Flow pipeline visualizer */}
                  <ProjectVisualizer projectKey={project.key} />
                </div>

              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-6 border-t border-border/40 z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12 gap-4">
            <h2 className="text-xs uppercase tracking-widest text-primary font-bold">Toolkit</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
              Skills & <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Technologies</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              A comprehensive toolkit for building intelligent, scalable, and production-ready AI solutions.
            </p>
          </div>
        </div>

        {/* Infinite Marquee Carousel */}
        <div 
          className="relative w-full overflow-hidden py-4"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
          }}
        >
          <div className="animate-marquee flex gap-6">
            
            {/* First half of items */}
            {marqueeSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div 
                  key={`marquee-1-${index}`}
                  className="glass-card rounded-2xl border border-border/40 hover:border-primary/45 p-6 flex flex-col justify-between w-[220px] h-[160px] flex-shrink-0 transition-all duration-300 hover:scale-105"
                >
                  <div className={`p-3 w-fit rounded-xl border ${skill.color} shadow-sm`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-foreground">{skill.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{skill.category}</p>
                  </div>
                </div>
              );
            })}

            {/* Second half of items (duplicated for seamless wrapping) */}
            {marqueeSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div 
                  key={`marquee-2-${index}`}
                  className="glass-card rounded-2xl border border-border/40 hover:border-primary/45 p-6 flex flex-col justify-between w-[220px] h-[160px] flex-shrink-0 transition-all duration-300 hover:scale-105"
                >
                  <div className={`p-3 w-fit rounded-xl border ${skill.color} shadow-sm`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-foreground">{skill.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{skill.category}</p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Detailed Skills Grid */}
        <div className="max-w-6xl mx-auto mt-20 pt-16 border-t border-border/20">
          <div className="flex flex-col items-center text-center mb-12 gap-3.5">
            <span className="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Technical Skills
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight font-heading max-w-2xl">
              Breadth across the stack, depth in production AI
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              A comprehensive toolkit covering machine learning, deep learning, cloud-native deployments, databases, and backend services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedSkills.map((cat, index) => (
              <TiltCard 
                key={index}
                className="border-border/40 hover:border-primary/25 transition-all duration-300 animate-pulse-glow"
                innerClassName="p-6 flex flex-col h-full w-full"
              >
                <h4 className="text-base font-bold text-foreground mb-4 border-b border-border/30 pb-2">{cat.title}</h4>
                <ul className="space-y-2">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 animate-pulse" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Certifications Section (New section from resume) */}
      <section id="achievements" className="relative py-20 px-6 border-t border-border/40 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Milestone Metrics</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">Achievements & Certifications</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Academic credentials, coding rankings, and certified credentials earned over course modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach, idx) => (
              <TiltCard 
                key={idx}
                className="border-border/40 hover:border-primary/30 animate-pulse-glow"
                innerClassName="p-6 flex flex-row items-start gap-4 h-full w-full"
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-foreground">{ach.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{ach.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Let's Connect Section */}
      <section id="contact" className="relative py-20 px-6 border-t border-border/40 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm text-muted-foreground">
              Have a project in mind or want to collaborate? I&apos;d love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">Let&apos;s Connect</h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  I&apos;m currently looking for new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <a href="mailto:raviarya201016@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-muted/10 hover:border-primary/30 hover:bg-muted/20 transition-all duration-300 group">
                  <div className="p-3 rounded-full bg-purple-500/15 text-purple-400 group-hover:bg-purple-500/25 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-semibold text-foreground">raviarya201016@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+917088929781" className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-muted/10 hover:border-emerald-500/30 hover:bg-muted/20 transition-all duration-300 group">
                  <div className="p-3 rounded-full bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500/25 transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-semibold text-foreground">+91 7088929781</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-muted/10">
                  <div className="p-3 rounded-full bg-rose-500/15 text-rose-400">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-semibold text-foreground">India</p>
                  </div>
                </div>

                <a href="https://github.com/Rohitarya119" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-muted/10 hover:border-teal-500/30 hover:bg-muted/20 transition-all duration-300 group">
                  <div className="p-3 rounded-full bg-teal-500/15 text-teal-400 group-hover:bg-teal-500/25 transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Portfolio Site</p>
                    <p className="text-sm font-semibold text-foreground">github.com/Rohitarya119</p>
                  </div>
                </a>
              </div>

              {/* Follow Me */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-4">Follow Me</h4>
                <div className="flex items-center gap-3">
                  <a href="https://github.com/Rohitarya119" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-border/40 bg-muted/20 text-muted-foreground hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110" title="GitHub">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/rohit-arya-805954251/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-border/40 bg-muted/20 text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-all duration-300 hover:scale-110" title="LinkedIn">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="https://leetcode.com/u/rohit_arya119/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-border/40 bg-muted/20 text-muted-foreground hover:text-[#FFA116] hover:border-[#FFA116]/50 hover:bg-[#FFA116]/10 transition-all duration-300 hover:scale-110" title="LeetCode">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/rohit_arya119/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-border/40 bg-muted/20 text-muted-foreground hover:text-[#E4405F] hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 transition-all duration-300 hover:scale-110" title="Instagram">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="space-y-6">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/40 py-10 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Footer Top - Logo + Nav + Socials */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center font-bold text-white text-xs select-none shadow-sm shadow-primary/35">
                R
              </div>
              <span className="font-bold text-sm text-foreground tracking-wide font-heading">Rohit Arya</span>
            </div>

            {/* Footer Nav Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Home</a>
              <a href="#services" className="hover:text-foreground transition-colors">Services</a>
              <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
              <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
              <a href="#about" className="hover:text-foreground transition-colors">Education</a>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            </div>

            {/* Footer Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://github.com/Rohitarya119" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110" title="GitHub">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/rohit-arya-805954251/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0A66C2] transition-all duration-300 hover:scale-110" title="LinkedIn">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://leetcode.com/u/rohit_arya119/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#FFA116] transition-all duration-300 hover:scale-110" title="LeetCode">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/></svg>
              </a>
              <a href="https://www.instagram.com/rohit_arya119/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#E4405F] transition-all duration-300 hover:scale-110" title="Instagram">
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
              </a>
            </div>
          </div>

          {/* Footer Bottom - Divider + Copyright */}
          <div className="border-t border-border/30 pt-6 text-center">
            <p className="text-xs text-muted-foreground font-mono">
              &copy; {new Date().getFullYear()} Rohit Arya. Built with Next.js, Tailwind v4 &amp; React 19.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat/Message Bubble */}
      <a 
        href="#contact" 
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-white hover:bg-accent transition-all duration-300 shadow-2xl hover:scale-110 flex items-center justify-center border border-primary/50 group"
        title="Send Message"
      >
        <Send className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
      </motion.div>
    </main>
  );
}
