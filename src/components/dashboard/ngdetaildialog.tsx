"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

// 1. เพิ่ม count เข้าไปใน Interface เพื่อให้ TypeScript รู้จัก
interface NGDetailDialogProps {
  lotNo?: string;
  partName?: string;
  defectType?: string;
  qty?: number;
  count?: number; // <-- เพิ่มบรรทัดนี้เพื่อรองรับการเรียกใช้แบบ count={...}
}

// 2. รับค่า count มาด้วย
export function NGDetailDialog({
  lotNo,
  partName,
  defectType,
  qty,
  count,
}: NGDetailDialogProps) {
  // 3. สร้างตัวแปรกลางเพื่อเลือกว่าจะใช้ค่าไหน (ถ้าส่ง count มาก็ใช้ count)
  const finalQty = qty !== undefined ? qty : count !== undefined ? count : 1;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Info className="h-4 w-4 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-950 border-slate-800 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            รายละเอียดงานเสีย (NG Detail)
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            ข้อมูลการตรวจสอบชิ้นส่วนที่มีปัญหาในล็อตการผลิต
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 border-b border-slate-800 pb-2">
            <span className="text-sm font-medium text-slate-500">Lot No:</span>
            <span className="col-span-3 font-mono text-blue-400">
              {lotNo || "6A2F0025"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4 border-b border-slate-800 pb-2">
            <span className="text-sm font-medium text-slate-500">Part:</span>
            <span className="col-span-3 text-slate-200">
              {partName || "Top Cover"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4 border-b border-slate-800 pb-2">
            <span className="text-sm font-medium text-slate-500">Defect:</span>
            <Badge variant="destructive" className="w-fit">
              {defectType || "จุดดำ (Black Spot)"}
            </Badge>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium text-slate-500">
              Quantity:
            </span>
            {/* 4. แสดงผลโดยใช้ค่า finalQty */}
            <span className="col-span-3 text-xl font-bold text-rose-500">
              {finalQty} PCS
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="border-slate-700">
            ปิดหน้าต่าง
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500">
            พิมพ์เอกสาร NG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
