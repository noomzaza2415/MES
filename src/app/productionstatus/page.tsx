"use client";

import { TopNav } from "@/components/layout/topnav";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProductionChart } from "@/components/dashboard/productionchart";
import {
  Activity,
  Target,
  CheckCircle2,
  AlertCircle,
  Clock,
  BarChart3
} from "lucide-react";
import { KPICard } from "@/components/dashboard/kpicards";

export default function ProductionStatusPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200">
      <TopNav />

      <main className="p-6 space-y-6">
        {/* Header Section พร้อมสถานะเครื่องจักร */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Production Overview</h2>
            <p className="text-slate-400">D1 Line Top Cover - Real-time Monitoring</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-4 py-1">
              <Activity className="w-4 h-4 mr-2" /> Line Running
            </Badge>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase font-semibold">Current Time</p>
              <p className="text-sm font-mono text-blue-400">2026-01-14 11:19:22</p>
            </div>
          </div>
        </div>

        {/* ส่วนสรุปตัวเลขสำคัญ (Top KPI Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Daily Plan"
            value="3,593"
            icon={<Target className="w-4 h-4" />}
          />
          <KPICard
            label="Actual Result"
            value="774"
            variant="success"
            icon={<CheckCircle2 className="w-4 h-4" />}
          />
          <KPICard
            label="Total NG"
            value="19"
            variant="danger"
            icon={<AlertCircle className="w-4 h-4" />}
          />
          <KPICard
            label="Progress"
            value="21%"
            variant="warning"
            subValue="Achievement: 92%"
            icon={<BarChart3 className="w-4 h-4" />}
          />
        </div>

        {/* ส่วนแสดง Model ปัจจุบัน และ กราฟ */}
        <div className="grid grid-cols-12 gap-6">
          {/* Main Monitor (เหมือน Screenshot 2) */}
          <div className="col-span-12 lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="text-[120px] font-bold text-white/5 absolute -top-10 -right-5 select-none">RUN</span>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <Clock className="w-3 h-3" /> In Progress
              </div>
              <div>
                <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Current Work Order</h3>
                <h4 className="text-4xl font-black text-yellow-400 mt-1">6A2F0025 WB25VBT</h4>
                <p className="text-xl text-slate-300 font-medium">T11V1NDQTGA.ASFPETH</p>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-6 border-t border-slate-800">
                <div>
                  <p className="text-slate-500 text-xs uppercase mb-1">UPH (T/R)</p>
                  <p className="text-2xl font-bold text-white">300 / <span className="text-blue-400">276</span></p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase mb-1">Cycle Time</p>
                  <p className="text-2xl font-bold text-white">10.20s</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase mb-1">Idle Time</p>
                  <p className="text-2xl font-bold text-rose-500">177T 35M</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graph Section */}
          <div className="col-span-12 lg:col-span-5">
            <ProductionChart />
          </div>
        </div>

        {/* Progress Detailed (Achievement Section) */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-200">Achievement Details</h3>
            <span className="text-sm text-blue-400 font-mono">Target: 835 units</span>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-slate-400">Achievement Rate</span>
                <span className="text-emerald-400 font-bold">92%</span>
              </div>
              <Progress value={92} className="h-3 bg-slate-800" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-3 bg-black/20 rounded-lg">
                <p className="text-xs text-slate-500">Good Quality</p>
                <p className="text-lg font-bold text-emerald-500">755</p>
              </div>
              <div className="p-3 bg-black/20 rounded-lg">
                <p className="text-xs text-slate-500">Defect Count</p>
                <p className="text-lg font-bold text-rose-500">19</p>
              </div>
              <div className="p-3 bg-black/20 rounded-lg">
                <p className="text-xs text-slate-500">Lot Quantity</p>
                <p className="text-lg font-bold text-white">408</p>
              </div>
              <div className="p-3 bg-black/20 rounded-lg">
                <p className="text-xs text-slate-500">Result (Current Lot)</p>
                <p className="text-lg font-bold text-blue-400">12</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}