// src/components/dashboard/kpicards.tsx
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface KPICardProps {
  label: string;
  value: string | number;
  subValue?: string;
  variant?: "default" | "warning" | "danger" | "success";
  icon?: ReactNode;
}

export function KPICard({ label, value, subValue, variant = "default", icon }: KPICardProps) {
  const textColor = {
    default: "text-blue-600",
    warning: "text-amber-500",
    danger: "text-rose-600",
    success: "text-emerald-600",
  }[variant];

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
          {icon && <div className="text-slate-400">{icon}</div>}
        </div>
        <div className="flex flex-col">
          <p className={`text-2xl font-black tracking-tight ${textColor}`}>{value}</p>
          {subValue && <p className="text-[10px] text-slate-400 font-medium">{subValue}</p>}
        </div>
      </CardContent>
    </Card>
  );
}