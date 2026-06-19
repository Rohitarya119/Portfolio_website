'use client';

import { FileText, Cpu, CheckCircle, Database, GitBranch, ArrowRight, ShieldCheck, Cpu as ChipIcon, MessageSquare } from 'lucide-react';

interface ProjectVisualizerProps {
  projectKey: 'resume-analyser' | 'quiz-app' | 'chat-pdf';
}

export default function ProjectVisualizer({ projectKey }: ProjectVisualizerProps) {
  if (projectKey === 'resume-analyser') {
    return (
      <div className="w-full bg-slate-950/40 rounded-xl p-4 border border-border/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 select-none">
        {/* Node 1 */}
        <div className="flex flex-col items-center p-3 rounded-lg bg-card/60 border border-border w-full md:w-32 text-center relative z-10 glass-panel">
          <FileText className="h-6 w-6 text-primary mb-1 animate-pulse" />
          <span className="text-[11px] font-bold">Resume Upload</span>
          <span className="text-[9px] text-muted-foreground">PDF / DOCX Format</span>
        </div>

        {/* Connector 1 */}
        <div className="flex flex-col items-center justify-center relative w-full md:w-auto md:flex-1 h-8 md:h-auto">
          <div className="w-0.5 md:w-full h-8 md:h-0.5 bg-gradient-to-r from-primary via-accent to-primary relative overflow-hidden">
            <div className="absolute top-0 md:top-auto left-0 h-full md:h-full w-2 md:w-8 bg-white/80 rounded animate-grid-travel" style={{ animationDuration: '2.5s' }} />
          </div>
          <span className="text-[9px] text-accent font-semibold mt-1">REST API (Java)</span>
        </div>

        {/* Node 2 */}
        <div className="flex flex-col items-center p-3 rounded-lg bg-card/60 border border-border w-full md:w-36 text-center relative z-10 glass-panel">
          <Cpu className="h-6 w-6 text-accent mb-1" />
          <span className="text-[11px] font-bold">Spring Boot</span>
          <span className="text-[9px] text-muted-foreground">Skill Extraction Engine</span>
        </div>

        {/* Connector 2 */}
        <div className="flex flex-col items-center justify-center relative w-full md:w-auto md:flex-1 h-8 md:h-auto">
          <div className="w-0.5 md:w-full h-8 md:h-0.5 bg-gradient-to-r from-accent via-primary to-emerald-500 relative overflow-hidden">
            <div className="absolute top-0 md:top-auto left-0 h-full md:h-full w-2 md:w-8 bg-white/80 rounded animate-grid-travel" style={{ animationDuration: '3s' }} />
          </div>
          <span className="text-[9px] text-primary font-semibold mt-1">Gemini AI Stream</span>
        </div>

        {/* Node 3 */}
        <div className="flex flex-col items-center p-3 rounded-lg bg-card/60 border border-emerald-500/40 w-full md:w-32 text-center relative z-10 glass-panel">
          <CheckCircle className="h-6 w-6 text-emerald-400 mb-1" />
          <span className="text-[11px] font-bold">ATS Scoring</span>
          <span className="text-[9px] text-emerald-400/80">95% Match Output</span>
        </div>
      </div>
    );
  }

  if (projectKey === 'quiz-app') {
    return (
      <div className="w-full bg-slate-950/40 rounded-xl p-4 border border-border/40 relative overflow-hidden flex flex-col items-center gap-4 select-none">
        <div className="text-[11px] font-bold text-muted-foreground border border-border/40 px-2 py-0.5 rounded bg-muted/30">
          Docker Distributed Deployment Topology
        </div>
        
        {/* Core Gateway */}
        <div className="w-full max-w-sm flex flex-col items-center p-3 rounded-lg bg-card/60 border border-primary/40 text-center glass-panel">
          <ShieldCheck className="h-5 w-5 text-primary mb-1" />
          <span className="text-[11px] font-bold">API Gateway (Spring Cloud Route)</span>
          <span className="text-[9px] text-muted-foreground">JWT Authentication & Rate Limiting</span>
        </div>

        {/* Multi microservice lanes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <div className="flex flex-col items-center p-2.5 rounded-lg bg-card/40 border border-border/50 text-center glass-panel hover:border-accent/40 transition-all">
            <GitBranch className="h-4.5 w-4.5 text-accent mb-1" />
            <span className="text-[10px] font-semibold">User Service</span>
            <span className="text-[8px] text-muted-foreground">Auth & profiles</span>
            <span className="text-[8px] text-accent/80 mt-1 font-mono">Port: 8081</span>
          </div>

          <div className="flex flex-col items-center p-2.5 rounded-lg bg-card/40 border border-border/50 text-center glass-panel hover:border-accent/40 transition-all">
            <GitBranch className="h-4.5 w-4.5 text-accent mb-1" />
            <span className="text-[10px] font-semibold">Quiz Service</span>
            <span className="text-[8px] text-muted-foreground">Session orchestration</span>
            <span className="text-[8px] text-accent/80 mt-1 font-mono">Port: 8082</span>
          </div>

          <div className="flex flex-col items-center p-2.5 rounded-lg bg-card/40 border border-border/50 text-center glass-panel hover:border-accent/40 transition-all">
            <GitBranch className="h-4.5 w-4.5 text-accent mb-1" />
            <span className="text-[10px] font-semibold">Q&A Service</span>
            <span className="text-[8px] text-muted-foreground">Bank & validation</span>
            <span className="text-[8px] text-accent/80 mt-1 font-mono">Port: 8083</span>
          </div>
        </div>

        {/* Database Layer */}
        <div className="w-full max-w-xs flex items-center justify-center gap-3 p-2 bg-muted/20 border border-border rounded-lg text-xs">
          <Database className="h-4 w-4 text-emerald-400" />
          <span className="font-semibold text-[10px]">PostgreSQL Replication Database Cluster</span>
        </div>
      </div>
    );
  }

  // Chat with PDF
  return (
    <div className="w-full bg-slate-950/40 rounded-xl p-4 border border-border/40 relative overflow-hidden flex flex-col gap-4 select-none">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center text-center">
        
        {/* Document Upload */}
        <div className="flex flex-col items-center p-2 rounded bg-card/50 border border-border glass-panel">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-[9px] font-bold mt-1">PDF Doc</span>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center text-muted-foreground text-xs font-bold md:rotate-0 rotate-90">
          <ArrowRight className="h-4 w-4 text-primary animate-pulse" />
        </div>

        {/* Vector DB chunker */}
        <div className="flex flex-col items-center p-2 rounded bg-card/50 border border-border glass-panel">
          <Database className="h-5 w-5 text-accent" />
          <span className="text-[9px] font-bold mt-1">ChromaDB Store</span>
          <span className="text-[7px] text-muted-foreground">Embeddings Chunking</span>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center text-muted-foreground text-xs font-bold md:rotate-0 rotate-90">
          <ArrowRight className="h-4 w-4 text-primary animate-pulse" />
        </div>

        {/* LangChain Agent */}
        <div className="flex flex-col items-center p-2 rounded bg-card/50 border border-emerald-500/40 glass-panel">
          <ChipIcon className="h-5 w-5 text-emerald-400" />
          <span className="text-[9px] font-bold mt-1">LangChain RAG</span>
          <span className="text-[7px] text-emerald-400">Gemini LLM Query</span>
        </div>

      </div>

      <div className="bg-muted/10 border border-border/40 p-2.5 rounded-lg flex items-center gap-2">
        <div className="p-1 rounded bg-accent/20 text-accent">
          <MessageSquare className="h-4 w-4" />
        </div>
        <p className="text-[10px] text-muted-foreground leading-snug">
          <span className="text-foreground font-semibold">RAG Pipeline Optimization:</span> Semantic chunking and vector validation increases retrieval relevance by 50% and reduces AI hallucination by 35%.
        </p>
      </div>
    </div>
  );
}
