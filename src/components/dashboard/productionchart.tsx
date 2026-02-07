"use client";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { time: "08:00", actual: 280, target: 300 },
  { time: "09:00", actual: 295, target: 300 },
  { time: "10:00", actual: 250, target: 300 },
  { time: "11:00", actual: 310, target: 300 },
  { time: "13:00", actual: 290, target: 300 },
  { time: "14:00", actual: 276, target: 300 },
];

export function ProductionChart() {
  return (
    <div className="h-[250px] w-full bg-slate-900/20 p-4 rounded-xl border border-slate-800">
      <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">
        Hourly Production Output (Actual vs Target)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis
            dataKey="time"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b" }}
            itemStyle={{ color: "#f8fafc" }}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorActual)"
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#94a3b8"
            strokeDasharray="5 5"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}