
"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/topnav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Save,
  Settings2,
  ChevronRight,
  Clock
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DowntimeReasonDialog } from "@/components/dashboard/downtime-dialog";

const MOCK_DOWNTIME = [
  {
    id: 1,
    detail: "รถเข็นขาดแคลน",
    date: "2026-01-14",
    lot: "6A2F0023",
    part: "ACQ30611605",
    tool: "WB25VBT",
    start: "10:04:20",
    end: "10:08:12",
    duration: "00:03:51",
    actionPlan: "จัดหารถเข็นเพิ่มเติมจากหน่วยงานกลาง"
  },
];

export default function ModernDowntimePage() {
  const [reason, setReason] = useState("");
  const [actionPlan, setActionPlan] = useState("");

  return (
    // เปลี่ยนพื้นหลังเป็นสี slate-50 เพื่อความนวลตา และเปลี่ยน text เป็น slate-900
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <TopNav />

      <main className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">

        {/* --- Toolbar --- ปรับเป็นพื้นหลังขาว มีเงาละมุน (Soft Shadow) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5 flex-1 min-w-[240px]">
            <label className="text-[11px] font-bold text-blue-600 uppercase tracking-wider ml-1 flex items-center gap-2">
              <Settings2 className="w-3.5 h-3.5" />เหตุผลการหยุดเครื่อง
            </label>
            {/* ปรับสี Dialog ภายในให้เป็นแนวสว่าง */}
            <DowntimeReasonDialog value={reason} onSelect={(val) => setReason(val)} />
          </div>

          <div className="flex flex-col gap-1.5 flex-[2] min-w-[300px]">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5" />แผนการแก้ไข
            </label>
            <input
              type="text"
              value={actionPlan}
              onChange={(e) => setActionPlan(e.target.value)}
              placeholder="กรอกแผนการดำเนินงาน..."
              className="w-full h-11 bg-slate-50 border border-slate-200 text-slate-900 px-4 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition-all shadow-inner"
            />
          </div>

          <div className="flex items-end gap-3 h-11 shrink-0">
            <Button variant="outline" className="h-full border-slate-200 hover:bg-slate-50 text-slate-600 px-5 font-semibold rounded-xl text-xs">
              <Search className="w-4 h-4 mr-2" />ค้นหา
            </Button>
            <Button className="h-full bg-blue-600 hover:bg-blue-700 text-white px-8 font-bold rounded-xl shadow-lg shadow-blue-200 text-xs transition-all active:scale-95">
              <Save className="w-4 h-4 mr-2" />บันทึกเหตุผล
            </Button>
          </div>
        </div>

        {/* --- Table Container --- เปลี่ยนเป็นขาวสะอาดตา */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl shadow-slate-200/50">
          <Table>
            <TableHeader>
              {/* เปลี่ยน Gradient จากแดงเข้ม เป็นโทนน้ำเงิน-ฟ้า หรือ Slate เข้มเพื่อให้ดูแพงในโหมดขาว */}
              <TableRow className="border-none bg-blue-600 hover:bg-blue-700 transition-none">
                <TableHead className="text-white font-semibold text-[13px] uppercase text-center border-r border-white/10 px-4 py-4">รายละเอียด</TableHead>
                <TableHead className="text-white font-semibold text-[13px] uppercase text-center border-r border-white/10 px-2">วันที่</TableHead>
                <TableHead className="text-white font-semibold text-[13px] uppercase text-center border-r border-white/10 px-2">ล็อตการผลิต</TableHead>
                <TableHead className="text-white font-semibold text-[13px] uppercase text-center border-r border-white/10 px-2">ชื่อชิ้นงาน</TableHead>
                <TableHead className="text-white font-semibold text-[13px] uppercase text-center border-r border-white/10 px-2">TOOL</TableHead>
                <TableHead className="text-white font-semibold text-[13px] uppercase text-center border-r border-white/10 px-2">เวลาเริ่ม</TableHead>
                <TableHead className="text-white font-semibold text-[13px] uppercase text-center border-r border-white/10 px-2">เวลาสิ้นสุด</TableHead>
                <TableHead className="text-white font-semibold text-[13px] uppercase text-center border-r border-white/10 px-2">เวลาที่หยุดเครื่อง</TableHead>
                <TableHead className="text-white font-semibold text-[13px] uppercase text-center px-4">แผนการแก้ไข</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {MOCK_DOWNTIME.map((row) => (
                <TableRow key={row.id} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
                  <TableCell className="text-center font-bold text-blue-600 text-sm px-4">{row.detail}</TableCell>
                  <TableCell className="text-center text-slate-500 font-mono text-sm px-2">{row.date}</TableCell>
                  <TableCell className="text-center font-bold font-mono text-slate-800 text-sm px-2">{row.lot}</TableCell>
                  <TableCell className="text-center text-slate-600 text-sm font-mono px-2">{row.part}</TableCell>
                  <TableCell className="text-center px-2">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none hover:bg-slate-200 font-mono">
                      {row.tool}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-mono text-sm text-slate-400 px-2">{row.start}</TableCell>
                  <TableCell className="text-center font-mono text-sm text-slate-400 px-2">{row.end}</TableCell>
                  <TableCell className="text-center px-2">
                    <div className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1 rounded-md border border-rose-100">
                      <Clock className="w-3 h-3" />
                      <span className="font-bold font-mono text-sm">
                        {row.duration}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-4">
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-medium italic">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{row.actionPlan}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}