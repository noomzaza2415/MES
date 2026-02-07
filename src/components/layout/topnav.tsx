/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Power, Database, Monitor,
  ChevronDown, ChevronUp, ChevronsUp, ChevronsDown, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const PRODUCTION_LINES = [
  "D1 Line Top Cover", "D2 Line Top Cover", "D3 Line Top Cover",
  "D4 Line Air Con.", "S1 Line Selant", "S2 Line Selant",
  "D99 임시 조립", "사출 1호기", "사출 2호기", "사출 3호기",
  "사출 4호기", "사출 5호기", "사출 6호기", "사출 7호기",
  "사출 8호기", "사출 9호기", "사출 10호기", "사출 11호기",
  "사출 12호기", "사출 13호기", "사출 14호기", "사출 15호기",
  "사출 16호기", "사출 17호기", "사출 18호기", "사출 19호기",
  "사출 20호기", "사출 21호기", "사출 22호기", "사출 23호기",
  "사출 24호기"
];

const MENU_ITEMS = [
  { name: "สถานะการผลิต", href: "/productionstatus" },
  { name: "หยุดเครื่อง", href: "/downtime" },
  { name: "ประวัติข้อมูล", href: "/history" },
  { name: "สถานะงานประกอบ", href: "/assembly-status" },
  { name: "บันทึกงาน NG", href: "/ng-record" },
  { name: "เปลี่ยน/รีเวิร์ค", href: "/rework" },
  { name: "สถานะงาน NG", href: "/ng-status" },
];

function QuickBtn({ icon, onClick }: { icon: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-12 w-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-blue-500 hover:text-blue-600 text-slate-400 transition-all rounded-xl shadow-sm active:scale-90"
    >
      {icon}
    </button>
  );
}

export function TopNav() {
  const pathname = usePathname();
  const [selectedLine, setSelectedLine] = useState("D1 Line Top Cover");
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (action: 'up' | 'down' | 'top' | 'bottom') => {
    const viewport = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!viewport) return;
    const step = 160;
    switch (action) {
      case 'up': viewport.scrollBy({ top: -step, behavior: 'smooth' }); break;
      case 'down': viewport.scrollBy({ top: step, behavior: 'smooth' }); break;
      case 'top': viewport.scrollTo({ top: 0, behavior: 'smooth' }); break;
      case 'bottom': viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' }); break;
    }
  };

  return (
    <nav className="flex flex-col w-full border-b border-slate-300 bg-white shadow-md">
      {/* Upper Section: Main Dashboard Bar */}
      <div className="flex h-16 items-stretch overflow-hidden bg-white">

        {/* ส่วนที่ 1: Logo และชื่อบริษัท */}
        <div className="flex items-center pl-3 pr-13 bg-white min-w-[10%] shrink-0 relative z-2 shadow-[inset_10px_0_15px_-10px_rgba(0,0,0,0.1)]">
          <img src="/logo.png" alt="Logo" className="h-20 w-20 object-contain mr-3" />
          <span className="text-2xl font-black text-slate-600 tracking-tighter whitespace-nowrap">
            (주)동진테크윈
          </span>

          {/* เส้นโค้งกั้น (SVG Curve) */}
          <div className="absolute right-[-50px] top-0 h-full w-[100px] pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-white">
              <path d="M0,0 L50,0 C80,0 100,40 100,100 L0,100 Z" />
            </svg>
          </div>
        </div>

        {/* ส่วนที่ 2: Production Line Display (สีฟ้า) */}
        <div className="flex-1 bg-blue-500 flex items-center justify-center relative pl-8 ">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              {/* ปุ่ม Line Name ที่ดูมีมิติเหมือนปุ่มกดจริง */}
              <button className="text-4xl font-black text-white  tracking-tighter uppercase hover:scale-105 active:scale-95 transition-all drop-shadow-md">
                {selectedLine}
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-[700px] p-0 bg-white border-none shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden rounded-[2rem]">
              {/* Header สไตล์ Glass Header */}
              <DialogHeader className="p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <DialogTitle className="text-2xl font-black flex items-center gap-4">
                  <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/40">
                    <Monitor className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-blue-400 tracking-[0.2em] font-bold">SYSTEM CONTROL</span>
                    <span>SELECT PRODUCTION LINE</span>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="flex p-6 gap-6 bg-slate-50">
                {/* Main Selection Area */}
                <div className="flex-1 rounded-[1.5rem] border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <ScrollArea ref={scrollRef} className="h-[450px]">
                    {/* ปรับเป็น Grid 2 คอลัมน์เพื่อให้เลือกง่ายขึ้น */}
                    <div className="grid grid-cols-2 p-4 gap-3">
                      {PRODUCTION_LINES.map((line, idx) => (
                        <button
                          key={line}
                          onClick={() => { setSelectedLine(line); setOpen(false); }}
                          className={cn(
                            "relative group text-left px-5 py-4 rounded-2xl transition-all border-2 flex flex-col gap-1 overflow-hidden",
                            selectedLine === line
                              ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200"
                              : "bg-white border-slate-100 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50"
                          )}
                        >
                          {/* พื้นหลังตัวเลขลำดับจางๆ */}
                          <span className={cn(
                            "absolute right-2 bottom-[-10px] text-5xl font-black opacity-5 italic transition-all group-hover:scale-110",
                            selectedLine === line ? "opacity-10" : ""
                          )}>
                            {idx + 1}
                          </span>

                          <div className="flex justify-between items-start z-10">
                            <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Station {idx + 1}</span>
                            {selectedLine === line && <Check className="w-4 h-4" />}
                          </div>
                          <span className="text-sm font-black z-10 uppercase">{line}</span>

                          {/* Status Dot */}
                          <div className="flex items-center gap-1.5 mt-1 z-10">
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", selectedLine === line ? "bg-white" : "bg-emerald-500")} />
                            <span className="text-[9px] font-bold opacity-60">READY / ONLINE</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Quick Navigation Sidebar */}
                <div className="flex flex-col gap-3 w-14 py-2">
                  <div className="bg-white rounded-2xl p-1 shadow-sm border border-slate-100 flex flex-col gap-2">
                    <QuickBtn onClick={() => handleScroll('top')} icon={<ChevronsUp className="w-5 h-5" />} />
                    <QuickBtn onClick={() => handleScroll('up')} icon={<ChevronUp className="w-5 h-5" />} />
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center gap-1">
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="w-1 h-8 bg-slate-200 rounded-full" />
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  </div>

                  <div className="bg-white rounded-2xl p-1 shadow-sm border border-slate-100 flex flex-col gap-2">
                    <QuickBtn onClick={() => handleScroll('down')} icon={<ChevronDown className="w-5 h-5" />} />
                    <QuickBtn onClick={() => handleScroll('bottom')} icon={<ChevronsDown className="w-5 h-5" />} />
                  </div>
                </div>
              </div>

              {/* Footer ที่ดูสะอาดตา */}
              <div className="px-8 py-6 bg-white border-t border-slate-100 flex justify-end items-center gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-black text-sm uppercase tracking-widest transition-colors"
                >
                  Close
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-blue-500 flex items-center shrink-0 ">
          <div className="bg-blue-500 flex items-center gap-2 shrink-0">
            <div className="flex items-center rounded-sm overflow-hidden border border-white/40 shadow-sm h-10">
              <div className="bg-[#ff8000] text-black text-xs font-black px-3 h-full flex items-center border-r border-white/20 whitespace-nowrap uppercase">
                Scan Type
              </div>

              <div className="relative bg-white h-full flex items-center">
                <select
                  className="bg-transparent text-black text-lg font-black focus:outline-none appearance-none cursor-pointer min-w-[180px]"
                  defaultValue=""
                >
                  <option value="" disabled hidden></option>
                  <option value="WT000">WT000</option>
                  <option value="WT001">WT001 T/C제판이미지용</option>
                  <option value="WT002">WT002 SpecSheet이미지용</option>
                  <option value="WT003">WT003 T/C입력/재투입용</option>
                  <option value="WT004">WT004 수리처리용</option>
                  <option value="WT005">WT005 Knob QR 매칭</option>
                  <option value="WT006">WT006 Label QR 매칭</option>
                  <option value="WT007">WT007 CKD 투입품 체크</option>
                </select>
              </div>
            </div>

            {/* ปุ่ม Power สไตล์ 3D */}
            <button className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-slate-100 to-slate-400 shadow-[0_4px_10px_rgba(0,0,0,0.4)] border-2 border-slate-600 group active:scale-90 transition-all flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-t from-red-800 to-red-500 flex items-center justify-center border border-black/30 shadow-[inset_0_2px_5px_rgba(255,255,255,0.4)]">
                <Power className="w-6 h-6 text-white drop-shadow-md" strokeWidth={3} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs / Menu Section */}
      <div className="flex items-center justify-between px-2 pt-1 gap-1 overflow-x-auto no-scrollbar bg-slate-100/50">
        <div className="flex gap-1.5">
          {MENU_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <button className={cn(
                "px-6 py-2.5 text-xs font-black transition-all border-t border-x rounded-t-xl min-w-[130px] shadow-sm uppercase tracking-tight",
                pathname === item.href
                  ? "bg-blue-600 text-white border-blue-600 relative z-10 scale-105 origin-bottom shadow-lg"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-blue-50 hover:text-blue-600"
              )}>
                {item.name}
              </button>
            </Link>
          ))}
        </div>
        <div className="pb-1.5 px-3">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-[15px] h-10 px-10 font-black uppercase rounded-lg shadow-lg active:scale-95 transition-transform">
            เสร็จสิ้น
          </Button>
        </div>
      </div>

      {/* Status Footer Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[10px] text-slate-500 font-black z-50">
        <div className="flex items-center gap-6">
          <span className="text-slate-400 font-mono tracking-tighter">v1.0.0.66</span>
          <div className="flex items-center gap-2 text-emerald-600">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            SCANNER CONNECTED
          </div>
          <div className="w-[1px] h-3 bg-slate-200" />
          <div className="flex items-center gap-2 uppercase tracking-tight">CONVEYOR: <span className="text-blue-600">ONLINE</span></div>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-slate-400 tracking-tight">IP: 192.168.2.246:8459</span>
          <div className="flex items-center gap-2 text-slate-600">
            <Database className="w-3.5 h-3.5 text-blue-800" /> MES_DB CONNECTED
          </div>
        </div>
      </div>
    </nav>
  );
}