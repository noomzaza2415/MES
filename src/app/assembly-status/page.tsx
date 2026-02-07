"use client";

import { TopNav } from "@/components/layout/topnav";
import { Button } from "@/components/ui/button";
import { NGSelector } from "@/components/dashboard/ngselector";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Layers, ChevronRight } from "lucide-react";
import { DatePickerWithRange } from "@/components/dashboard/datefilter";

export default function AssemblyStatusPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-slate-200">
      <TopNav />

      <main className="p-4 space-y-4">
        {/* Filter Bar - อ้างอิงจากแถวบนของ Screenshot 194731 */}
        <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-400">วันที่ค้นหา</span>
            <DatePickerWithRange />
          </div>
          <div className="h-8 w-[1px] bg-slate-800 mx-2" />
          <div className="flex gap-2">
            {["D1-A", "D1-B", "D2-A", "D2-B"].map((line) => (
              <Button
                key={line}
                variant="outline"
                size="sm"
                className={line === "D1-A" ? "bg-yellow-400 text-black border-yellow-400 font-bold" : "border-slate-700 text-slate-400"}
              >
                {line}
              </Button>
            ))}
          </div>
          <Button className="ml-auto bg-blue-600 hover:bg-blue-500">
            <Search className="w-4 h-4 mr-2" /> ค้นหา (Search)
          </Button>
        </div>

        {/* ตารางรายการผลิต (Production Selection) */}
        <div className="bg-slate-900/20 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <Layers className="w-4 h-4" />
              <span>รายการล็อตการผลิตที่เลือก</span>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="text-slate-500">จำนวนแผนผลิตรวม: <span className="text-white font-mono">1,198</span></span>
              <span className="text-slate-500">จำนวนงาน NG รวม: <span className="text-rose-500 font-bold font-mono">62</span></span>
            </div>
          </div>
          <Table>
            <TableHeader className="bg-slate-950/50">
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-xs">ล็อต LG</TableHead>
                <TableHead className="text-xs">Model Suffix</TableHead>
                <TableHead className="text-xs">TOOL</TableHead>
                <TableHead className="text-xs">เลขรายการผลิต</TableHead>
                <TableHead className="text-xs text-right">แผนผลิต</TableHead>
                <TableHead className="text-xs text-right">ผลิตจริง</TableHead>
                <TableHead className="text-xs text-right text-rose-400">NG</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Mock Data ตาม Screenshot 194731 */}
              <TableRow className="border-slate-800 bg-blue-500/5 hover:bg-blue-500/10 cursor-pointer transition-colors">
                <TableCell className="font-bold text-blue-400">6A1F1121</TableCell>
                <TableCell className="text-slate-300">T13X2EFNTX.AKOR</TableCell>
                <TableCell className="text-slate-500">-</TableCell>
                <TableCell className="text-slate-400">ACQ30063445</TableCell>
                <TableCell className="text-right font-mono">792</TableCell>
                <TableCell className="text-right font-mono text-emerald-400">792</TableCell>
                <TableCell className="text-right font-mono text-rose-500 font-bold">19</TableCell>
                <TableCell><ChevronRight className="w-4 h-4 text-slate-700" /></TableCell>
              </TableRow>
              <TableRow className="border-slate-800 hover:bg-slate-800/40 cursor-pointer">
                <TableCell className="font-bold">6AMG0173</TableCell>
                <TableCell className="text-slate-300">T11V1NDHTC.ABWEEC</TableCell>
                <TableCell className="text-slate-500">WB25VBT</TableCell>
                <TableCell className="text-slate-400">ACQ30611616</TableCell>
                <TableCell className="text-right font-mono">306</TableCell>
                <TableCell className="text-right font-mono text-emerald-400">306</TableCell>
                <TableCell className="text-right font-mono text-rose-500 font-bold">3</TableCell>
                <TableCell><ChevronRight className="w-4 h-4 text-slate-700" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* ส่วนวิเคราะห์ชิ้นส่วน (Component Defect Analysis) - ใช้ NGSelector ที่เราสร้างไว้ */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-4 bg-yellow-400 rounded-full" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
              รายละเอียดงานเสียรายชิ้นส่วน (Component Defect Analysis)
            </h3>
          </div>
          <NGSelector />
        </div>
      </main>
    </div>
  );
}