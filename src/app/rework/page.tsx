/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { TopNav } from "@/components/layout/topnav";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, RotateCcw, Wrench, 
  RefreshCw, Layers, ChevronRight, 
  CheckCircle2, AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Mock Data ---
import { GROUP_A, ITEM_DEFECT_MAP, MASTER_DEFECTS } from "@/constants/defect-data";

export default function PremiumReworkPage() {
  const [activeMode, setActiveMode] = useState<"replace" | "rework">("replace");
  const [selectedComp, setSelectedComp] = useState("top");
  const [counts, setCounts] = useState<Record<string, number>>({});

  const currentDefects = useMemo(() => {
    return ITEM_DEFECT_MAP[selectedComp] || Object.values(MASTER_DEFECTS);
  }, [selectedComp]);

  const handleUpdateCount = (id: string, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const totalSelected = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col h-screen bg-[#F1F5F9] text-slate-900 font-sans antialiased overflow-hidden">
      <TopNav />

      <main className="flex-1 flex p-6 gap-6 overflow-hidden">
        
        {/* --- LEFT SIDEBAR: Premium Glass Design --- */}
        <div className="w-72 flex flex-col gap-4 shrink-0">
          <div className="flex items-center gap-2 px-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="font-black text-slate-800 tracking-tight uppercase">Components</h2>
          </div>
          
          <ScrollArea className="flex-1 -mr-2 pr-2">
            <div className="flex flex-col gap-2">
              {GROUP_A.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedComp(item.id)}
                  className={cn(
                    "group relative w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-300 border",
                    selectedComp === item.id
                      ? "bg-white border-blue-100 shadow-[0_10px_20px_-5px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/10"
                      : "bg-white/50 border-transparent hover:bg-white hover:border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                      selectedComp === item.id ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-200/50 text-slate-500"
                    )}>
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                      <span className={cn("text-xs font-black uppercase tracking-wide", selectedComp === item.id ? "text-blue-600" : "text-slate-700")}>
                        {item.name}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">{item.thai}</span>
                    </div>
                  </div>
                  {selectedComp === item.id && <ChevronRight className="w-4 h-4 text-blue-600 animate-pulse" />}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* --- RIGHT CONTENT: Interface --- */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* HEADER ACTION BAR */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input 
                className="w-full h-14 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm font-mono tracking-wider" 
                placeholder="SCAN BARCODE (UNIT S/N)..."
              />
            </div>

            {/* Premium Toggle Switch */}
            <div className="flex bg-slate-200/50 p-1.5 rounded-[22px] border border-slate-200/60 shadow-inner w-80">
              <button
                onClick={() => setActiveMode("replace")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-[18px] font-black text-xs transition-all duration-300",
                  activeMode === "replace" 
                    ? "bg-white text-blue-600 shadow-md ring-1 ring-black/5 scale-[1.02]" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Wrench className="w-4 h-4" /> REPLACE
              </button>
              <button
                onClick={() => setActiveMode("rework")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-[18px] font-black text-xs transition-all duration-300",
                  activeMode === "rework" 
                    ? "bg-white text-emerald-600 shadow-md ring-1 ring-black/5 scale-[1.02]" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <RefreshCw className="w-4 h-4" /> REWORK
              </button>
            </div>
          </div>

          {/* MAIN GRID AREA */}
          <div className="flex-1 bg-white rounded-[32px] border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
            {/* Table Header */}
            <div className={cn(
              "p-5 flex justify-between items-center px-8 transition-colors duration-500",
              activeMode === 'replace' ? "bg-blue-600" : "bg-emerald-600"
            )}>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm tracking-widest uppercase">
                    {selectedComp} <span className="mx-2 opacity-40">|</span> DEFECT LIST
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setCounts({})}
                className="bg-black/10 hover:bg-black/20 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black transition-all active:scale-95"
              >
                <RotateCcw className="w-3 h-3" /> RESET ALL
              </button>
            </div>

            {/* Grid Items */}
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentDefects.map((defect: any) => (
                  <div 
                    key={defect.id} 
                    className={cn(
                      "group flex h-20 rounded-2xl border transition-all duration-300",
                      counts[defect.id] > 0 
                        ? "bg-blue-50/50 border-blue-200 shadow-sm" 
                        : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-md"
                    )}
                  >
                    <div className="flex-1 px-5 flex flex-col justify-center min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{defect.eng}</span>
                      <span className="text-sm font-black text-slate-700 truncate">{defect.thai}</span>
                    </div>

                    {/* Stepper controls */}
                    <div className="flex items-center gap-3 px-4 bg-slate-50/50 rounded-r-2xl border-l border-slate-100">
                      <button 
                        onClick={() => handleUpdateCount(defect.id, -1)}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all active:scale-90"
                      >
                        -
                      </button>
                      <span className={cn(
                        "w-6 text-center font-mono font-black text-lg",
                        counts[defect.id] > 0 ? "text-blue-600 animate-in zoom-in" : "text-slate-300"
                      )}>
                        {counts[defect.id] || 0}
                      </span>
                      <button 
                        onClick={() => handleUpdateCount(defect.id, 1)}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white transition-all active:scale-90 shadow-lg",
                          activeMode === 'replace' ? "bg-blue-600 shadow-blue-100 hover:bg-blue-700" : "bg-emerald-600 shadow-emerald-100 hover:bg-emerald-700"
                        )}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* FOOTER ACTIONS */}
            <div className="p-6 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Units</span>
                  <span className="text-2xl font-black text-slate-800">{totalSelected}</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="ghost" className="rounded-2xl font-bold h-14 px-8 text-slate-400 hover:text-slate-600">
                  DISCARD
                </Button>
                <Button className={cn(
                  "rounded-2xl font-black h-14 px-12 shadow-2xl transition-all duration-300 active:scale-95 flex gap-3 text-base",
                  activeMode === 'replace' 
                    ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200" 
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                )}>
                  <CheckCircle2 className="w-5 h-5" />
                  SUBMIT {activeMode.toUpperCase()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}