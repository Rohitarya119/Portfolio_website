'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Terminal, Maximize2, Minimize2, Trash2 } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalConsole() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    // Welcome message
    setHistory([
      {
        command: '',
        output: (
          <div className="space-y-1.5 text-xs sm:text-sm">
            <p className="text-primary font-bold">Welcome to Rohit Arya's Interactive Terminal v1.2.0</p>
            <p className="text-muted-foreground">Type <span className="text-accent font-semibold">help</span> to list available commands and navigate the portfolio.</p>
            <p className="text-muted-foreground">Use Up/Down arrow keys for command history.</p>
          </div>
        )
      }
    ]);
  }, []);

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
      if (isMountedRef.current) {
        inputRef.current?.focus();
      } else {
        isMountedRef.current = true;
      }
    }
  }, [history, isMinimized]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const focusInput = () => {
    if (!isMinimized) {
      inputRef.current?.focus();
    }
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Save to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (command) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-xs">
            <div><span className="text-accent font-bold">about</span> - Brief biography and credentials</div>
            <div><span className="text-accent font-bold">skills</span> - Overview of technical proficiency</div>
            <div><span className="text-accent font-bold">projects</span> - View major academic & personal projects</div>
            <div><span className="text-accent font-bold">dsa</span> - Problem-solving stats & certifications</div>
            <div><span className="text-accent font-bold">contact</span> - Display email, LinkedIn & socials</div>
            <div><span className="text-accent font-bold">theme &lt;name&gt;</span> - Change mood (space, cyberpunk, forest)</div>
            <div><span className="text-accent font-bold">matrix</span> - Launch animated digital rain stream</div>
            <div><span className="text-accent font-bold">clear</span> - Reset terminal screens</div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-1 text-xs leading-relaxed">
            <p><span className="text-primary font-bold">Name:</span> Rohit Arya</p>
            <p><span className="text-primary font-bold">Role:</span> Full-Stack Developer / Backend Architect / AI Engineer</p>
            <p><span className="text-primary font-bold">GPA:</span> 9.4 / 10 CGPA (Computer Science Graduate)</p>
            <p className="mt-1.5 text-muted-foreground">
              Detail-oriented developer with expertise in scaling microservices architecture, implementing RAG-based AI tools (LangChain, LangGraph), and PostgreSQL databases. Solved over 500+ algorithmic questions.
            </p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="font-bold text-accent">Technical Skills & Proficiency:</p>
            <div className="space-y-1">
              <div>
                <span className="inline-block w-24 font-semibold text-primary">Languages:</span>
                <span>Java, Python, SQL, Javascript, HTML, CSS</span>
              </div>
              <div>
                <span className="inline-block w-24 font-semibold text-primary">Frameworks:</span>
                <span>Spring Boot, React, Next.js, Microservices, REST APIs, Tailwind CSS</span>
              </div>
              <div>
                <span className="inline-block w-24 font-semibold text-primary">Databases:</span>
                <span>PostgreSQL, MySQL, ChromaDB (Vector Store)</span>
              </div>
              <div>
                <span className="inline-block w-24 font-semibold text-primary">AI & LLMs:</span>
                <span>RAG, Prompt Eng., LangChain, LangGraph, Gemini API</span>
              </div>
              <div>
                <span className="inline-block w-24 font-semibold text-primary">Tools:</span>
                <span>Git, Docker, AWS, Maven, Linux</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="font-bold text-accent">Selected Project Portfolio:</p>
            
            <div className="border-l-2 border-border pl-2 space-y-0.5">
              <p className="font-semibold text-primary">1. Resume Analyser (AI + Spring Boot)</p>
              <p className="text-muted-foreground">Automated ATS scoring and job matching engine powered by Gemini AI.</p>
              <p className="text-xs text-accent">Java 21, Spring Boot, React, Gemini AI, Docker</p>
            </div>

            <div className="border-l-2 border-border pl-2 space-y-0.5">
              <p className="font-semibold text-primary">2. Distributed Quiz Application (Microservices)</p>
              <p className="text-muted-foreground">Real-time microservices architecture. Improved reliability by 25%.</p>
              <p className="text-xs text-accent">Spring Boot, React, PostgreSQL, Docker</p>
            </div>

            <div className="border-l-2 border-border pl-2 space-y-0.5">
              <p className="font-semibold text-primary">3. Chat with PDF (RAG Document Assistant)</p>
              <p className="text-muted-foreground">Semantic search tool. Reduced hallucinations using vectorized embeddings.</p>
              <p className="text-xs text-accent">Python, LangChain, Gemini API, ChromaDB</p>
            </div>
          </div>
        );
        break;

      case 'dsa':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="font-bold text-primary">Data Structures & Algorithms Profile:</p>
            <p>• Solved <span className="text-accent font-bold">500+</span> challenges across major platforms.</p>
            <p>• Strong academic background focusing on computational complexity and analysis of algorithms.</p>
            <p>• Mentored over 20+ junior students in coding fundamentals, recursion, and object-oriented design.</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs">
            <p>📧 Email: <a href="mailto:raviarya201016@gmail.com" className="text-accent underline hover:text-primary transition-colors">raviarya201016@gmail.com</a></p>
            <p>🔗 LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-primary transition-colors">linkedin.com/in/rohitarya</a></p>
            <p>💻 GitHub: <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-primary transition-colors">github.com/rohitarya</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'theme':
        const themeArg = args[0]?.toLowerCase();
        const root = document.documentElement;
        if (themeArg === 'space' || themeArg === 'deep-space') {
          root.classList.remove('theme-cyberpunk', 'theme-forest-aurora');
          root.classList.add('theme-deep-space');
          localStorage.setItem('portfolio-theme', 'deep-space');
          output = <p className="text-emerald-400">Applied Deep Space theme.</p>;
        } else if (themeArg === 'cyber' || themeArg === 'cyberpunk') {
          root.classList.remove('theme-deep-space', 'theme-forest-aurora');
          root.classList.add('theme-cyberpunk');
          localStorage.setItem('portfolio-theme', 'cyberpunk');
          output = <p className="text-emerald-400">Applied Cyberpunk theme.</p>;
        } else if (themeArg === 'forest' || themeArg === 'aurora' || themeArg === 'forest-aurora') {
          root.classList.remove('theme-deep-space', 'theme-cyberpunk');
          root.classList.add('theme-forest-aurora');
          localStorage.setItem('portfolio-theme', 'forest-aurora');
          output = <p className="text-emerald-400">Applied Emerald Aurora theme.</p>;
        } else {
          output = (
            <p className="text-red-400">
              Invalid theme. Available options: <span className="font-semibold">space</span>, <span className="font-semibold">cyber</span>, <span className="font-semibold">forest</span>.
            </p>
          );
        }
        // Notify any components using this
        window.dispatchEvent(new Event('storage'));
        break;

      case 'matrix':
        output = (
          <div className="font-mono text-emerald-400 leading-none overflow-hidden h-24 select-none relative bg-black/40 p-2 rounded border border-emerald-950">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none z-10" />
            <div className="animate-grid-travel flex justify-between text-[8px] whitespace-nowrap">
              {Array.from({ length: 8 }).map((_, col) => (
                <div key={col} className="flex flex-col animate-pulse duration-1000" style={{ animationDelay: `${col * 150}ms` }}>
                  {Array.from({ length: 15 }).map((_, char) => (
                    <span key={char}>
                      {String.fromCharCode(33 + Math.floor(Math.random() * 93))}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <p className="absolute bottom-1 right-2 text-[10px] text-emerald-500 font-bold z-20">SYSTEM ACCESS ENGAGED</p>
          </div>
        );
        break;

      case 'sudo':
        output = (
          <p className="text-red-400 font-semibold italic">
            Permission Denied: Nice try, but the sandbox controls are active.
          </p>
        );
        break;

      default:
        output = (
          <p className="text-red-400 text-xs">
            Command not found: <span className="font-bold">{command}</span>. Type <span className="underline font-semibold text-accent">help</span> to view all commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  const clearScreen = () => {
    setHistory([]);
    setInput('');
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 border border-primary/40 text-primary shadow-2xl hover:scale-105 transition-transform"
      >
        <Terminal className="h-5 w-5 animate-pulse" />
        <span className="text-xs font-semibold font-mono">Open Interactive Terminal</span>
      </button>
    );
  }

  return (
    <div 
      onClick={focusInput}
      className="glass-panel rounded-xl overflow-hidden shadow-2xl border border-border/80 terminal-scanlines transition-all duration-300 hover:border-primary/40 flex flex-col h-[380px] w-full font-mono text-foreground"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/65 border-b border-border/85 select-none">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors cursor-pointer" onClick={() => setIsMinimized(true)} />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 cursor-pointer" onClick={() => setIsMinimized(true)} />
          <span className="h-3 w-3 rounded-full bg-green-500/80 cursor-pointer" onClick={clearScreen} />
          <span className="text-[11px] text-muted-foreground ml-3 font-semibold flex items-center gap-1.5">
            <Terminal className="h-3 w-3" /> rohit@arya-dev-terminal: ~
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <button onClick={clearScreen} title="Clear Screen" className="hover:text-foreground transition-colors p-0.5">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setIsMinimized(true)} title="Minimize" className="hover:text-foreground transition-colors p-0.5">
            <Minimize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Outputs */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            {item.command && (
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-primary font-semibold">guest@rohitarya.dev:~$</span>
                <span>{item.command}</span>
              </div>
            )}
            <div className="pl-2 border-l border-primary/10 py-0.5">
              {item.output}
            </div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompter */}
      <div className="p-3 bg-muted/30 border-t border-border/50 flex items-center gap-2">
        <span className="text-primary font-bold text-xs sm:text-sm">guest@rohitarya.dev:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' to begin..."
          className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm font-mono text-foreground caret-primary w-full p-0 focus:ring-0 focus:border-none focus:outline-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
