"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const PARTS = [
  { id: "top", name: "Top Cover", thai: "ท็อป โคเวอร์", ngCount: 12 },
  { id: "front", name: "Front Panel", thai: "ฟรอน พาแนล", ngCount: 8 },
  { id: "pcb", name: "PCB Assy", thai: "พีซีบี แอสแซมบี้", ngCount: 0 },
];

export function NGSelector() {
  const [selected, setSelected] = useState("top");

  return (
    <div className="grid grid-cols-12 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/20 h-[400px]">
      <div className="col-span-4 border-r border-slate-800 bg-slate-950/40">
        <ScrollArea className="h-full">
          {PARTS.map((part) => (
            <button
              key={part.id}
              onClick={() => setSelected(part.id)}
              className={cn(
                "w-full flex justify-between items-center p-4 text-left border-b border-slate-800/50 transition-all",
                selected === part.id ? "bg-blue-600/20 border-r-4 border-r-blue-500" : "opacity-60"
              )}
            >
              <div>
                <p className="font-bold text-slate-100">{part.name}</p>
                <p className="text-xs text-slate-500">{part.thai}</p>
              </div>
              {part.ngCount > 0 && (
                <Badge variant="destructive" className="rounded-full">{part.ngCount}</Badge>
              )}
            </button>
          ))}
        </ScrollArea>
      </div>

      <div className="col-span-8 bg-black/20 p-4">
        <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-tighter">NG Details: {selected}</h4>
        <Table>
          <TableBody>
            {/* ตัวอย่างรายการความผิดปกติจากภาพที่ 4 */}
            <TableRow className="border-slate-800">
              <TableCell className="text-slate-300">จุดดำ (Black Spot)</TableCell>
              <TableCell className="text-right font-bold text-rose-500">5</TableCell>
            </TableRow>
            <TableRow className="border-slate-800">
              <TableCell className="text-slate-300">รอยขีดข่วน (Scratch)</TableCell>
              <TableCell className="text-right font-bold text-rose-500">7</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}