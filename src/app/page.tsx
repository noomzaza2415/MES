"use client";

import { TopNav } from "@/components/layout/topnav";
import { KPICard } from "@/components/dashboard/kpicards";
import { Badge } from "@/components/ui/badge";
import { NGSelector } from "@/components/dashboard/ngselector";
import { ProductionChart } from "@/components/dashboard/productionchart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/dashboard/datefilter";
import { NGDetailDialog } from "@/components/dashboard/ngdetaildialog";
import { Activity, History, PieChart } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-slate-200">
      <TopNav />

      <main className="p-4 space-y-6">
        {/* 1. Production Hero Status */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity size={140} />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">Active Work Order</p>
                <h2 className="text-4xl font-black text-yellow-400 tracking-tighter">
                  6A2F0025 WB25VBT
                </h2>
                <p className="text-xl text-slate-400 font-medium">T11V1NDQTGA.ASFPETH</p>
              </div>
              <Badge className="bg-emerald-500 text-black hover:bg-emerald-400 text-sm font-bold px-4 py-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                RUNNING
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-8 mt-10 border-t border-slate-800/50 pt-6">
              <div>
                <p className="text-slate-500 text-[10px] uppercase font-bold">UPH Target</p>
                <p className="text-3xl font-mono font-bold">300</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase font-bold">UPH Actual</p>
                <p className="text-3xl font-mono font-bold text-blue-400">276</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase font-bold">Cycle Time</p>
                <p className="text-3xl font-mono font-bold text-emerald-400 underline decoration-emerald-500/30">10.20s</p>
              </div>
              <div>
                <p className="text-rose-500/80 text-[10px] uppercase font-bold">Idle Time</p>
                <p className="text-3xl font-mono font-bold text-rose-500">177T 35M</p>
              </div>
            </div>
          </div>

          {/* 2. KPI Summary Cards */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-3">
            <KPICard label="Daily Plan" value="3,593" variant="default" />
            <KPICard label="Total NG" value="62" variant="danger" />
            <KPICard label="Actual" value="770" variant="success" />
            <KPICard label="Progress" value="21%" variant="warning" />
          </div>
        </div>

        {/* 3. Analysis Section */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 px-1">
              <PieChart className="w-4 h-4 text-blue-500" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Production Trend (Hourly)</h3>
            </div>
            <div className="bg-slate-900/20 border border-slate-800 rounded-xl p-4 h-[350px]">
              <ProductionChart />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 px-1">
              <History className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Defect Analysis</h3>
            </div>
            <NGSelector />
          </div>
        </div>

        {/* 4. Bottom Section: Production History Log */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
          <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap justify-between items-center bg-slate-900/60 gap-4">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-slate-200 uppercase text-sm tracking-tight">Production History Log</h3>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Line D1-A</Badge>
            </div>
            <div className="flex items-center gap-4">
              <DatePickerWithRange />
              <div className="flex gap-2">
                <Badge variant="outline" className="border-slate-700 bg-slate-950 px-3">Yield: 94%</Badge>
                <Badge variant="outline" className="border-slate-700 bg-slate-950 px-3 text-rose-400">Def: 1%</Badge>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader className="bg-slate-950/50">
              <TableRow className="hover:bg-transparent border-slate-800">
                <TableHead className="text-[11px] uppercase text-slate-500 font-bold">Lot LG</TableHead>
                <TableHead className="text-[11px] uppercase text-slate-500 font-bold">Model Suffix</TableHead>
                <TableHead className="text-[11px] uppercase text-slate-500 font-bold text-right">Plan</TableHead>
                <TableHead className="text-[11px] uppercase text-slate-500 font-bold text-right">Actual</TableHead>
                <TableHead className="text-[11px] uppercase text-slate-500 font-bold text-right">NG (Details)</TableHead>
                <TableHead className="text-[11px] uppercase text-slate-500 font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-slate-800 hover:bg-blue-500/5 transition-colors">
                <TableCell className="font-bold text-blue-400 font-mono">6A1F1121</TableCell>
                <TableCell className="text-slate-300">T13X2EFNTX.AKOR</TableCell>
                <TableCell className="text-right font-mono text-slate-400">792</TableCell>
                <TableCell className="text-right font-mono text-blue-400 font-bold">792</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <span className="text-rose-500 font-bold font-mono">19</span>
                    <NGDetailDialog count={19} lotNo="6A1F1121" />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Completed</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}