"use client";

import { useState, useRef } from "react"; // เพิ่ม useRef
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
  MousePointer2,
} from "lucide-react";

const DOWNTIME_REASONS = [
  { id: "A00", label: "เวลาพัก" },
  { id: "A01", label: "ฝึกอบรม" },
  { id: "A02", label: "คุณภาพภายในบริษัท" },
  { id: "A03", label: "สินค้าภายในบริษัทหมด" },
  { id: "A04", label: "คุณภาพของบริษัทคู่ค้า" },
  { id: "A05", label: "สินค้าของบริษัทคู่ค้าหมด" },
  { id: "A06", label: "การทำงานซ้ำ" },
  { id: "A07", label: "อุปกรณ์และ Tool" },
  { id: "A08", label: "การเปลี่ยนโมเดล" },
  { id: "A09", label: "อื่นๆ" },
  { id: "A10", label: "มื้อกลางวันและมื้อเย็น" },
  { id: "A11", label: "การเปลี่ยนของใช้สิ้นเปลือง" },
  { id: "A12", label: "การระงับแผนการ" },
  { id: "A13", label: "รถเข็นขาดแคลน" },
  { id: "A99", label: "หยุดชั่วคราว" },
];

interface DowntimeReasonDialogProps {
  value: string;
  onSelect: (reason: string) => void;
}

export function DowntimeReasonDialog({
  value,
  onSelect,
}: DowntimeReasonDialogProps) {
  const [tempSelected, setTempSelected] = useState<string>("");

  // 1. สร้าง Ref สำหรับอ้างอิง ScrollArea
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // 2. ฟังก์ชันสำหรับการเลื่อน (Scroll)
  const handleScroll = (offset: number) => {
    if (scrollAreaRef.current) {
      // ค้นหา viewport ภายใน ScrollArea ของ Shadcn เพื่อสั่งเลื่อน
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollBy({ top: offset, behavior: "smooth" });
      }
    }
  };

  // 3. ฟังก์ชันเลื่อนไปบนสุดหรือล่างสุด
  const scrollToEdge = (direction: "top" | "bottom") => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTo({
          top: direction === "top" ? 0 : viewport.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  const handleConfirm = () => {
    const selected = DOWNTIME_REASONS.find((r) => r.id === tempSelected);
    if (selected) {
      onSelect(`${selected.id} - ${selected.label}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full h-11 justify-start border border-dashed transition-all
      ${value
              ? "border-white/50 bg-white-500/5 text-blue-400 font-semibold"
              : "border-white-800 bg-white-950/50 text-slate-500 italic hover:border-white-700"
            }`}
        >
          <MousePointer2
            className={`w-3.5 h-3.5 mr-2 ${value ? "text-blue-500" : "text-slate-600"
              }`}
          />
          <span className="truncate">{value || "คลิกเลือกแผนการแก้ไข..."}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl bg-white p-0 overflow-hidden border-none shadow-2xl rounded-lg">
        <DialogHeader className="bg-slate-50 p-3 border-b border-slate-200">
          <DialogTitle className="text-[14px] font-bold flex items-center gap-2 text-slate-800 uppercase tracking-tight">
            <span className="text-blue-600 text-lg">☁</span> 무작업 선택
            (เลือกเหตุผลหยุดเครื่อง)
          </DialogTitle>
        </DialogHeader>

        <div className="flex bg-white">
          <div className="flex-1">
            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 font-bold text-[12px] text-slate-500 uppercase">
              <div className="col-span-3 p-3 border-r border-slate-200 text-center tracking-tighter">
                เลขที่หยุดเครื่อง
              </div>
              <div className="col-span-9 p-3 text-center tracking-tighter">
                หัวข้อการหยุดเครื่อง
              </div>
            </div>

            {/* 4. ใส่ ref ให้กับ ScrollArea */}
            <ScrollArea ref={scrollAreaRef} className="h-[450px]">
              {DOWNTIME_REASONS.map((reason) => (
                <div
                  key={reason.id}
                  onClick={() => setTempSelected(reason.id)}
                  className={`grid grid-cols-12 border-b border-slate-100 cursor-pointer transition-all duration-150 ${tempSelected === reason.id
                    ? "bg-blue-600 text-white shadow-lg scale-[1.01] z-10"
                    : "hover:bg-blue-50 text-slate-700"
                    }`}
                >
                  <div
                    className={`col-span-3 p-3 border-r border-slate-100 text-center font-mono font-bold text-sm`}
                  >
                    {reason.id}
                  </div>
                  <div className="col-span-9 p-3 pl-6 font-semibold text-sm">
                    {reason.label}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* ปุ่มควบคุมด้านข้าง */}
          <div className="w-14 bg-slate-50 border-l border-slate-200 flex flex-col items-center py-4 gap-2 px-1">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-full bg-white shadow-sm border-slate-200 active:bg-slate-100"
              onClick={() => scrollToEdge("top")}
            >
              {/* เปลี่ยนเป็น text-black หรือสีเข้มที่ต้องการ */}
              <ChevronsUp className="h-4 w-4 text-black stroke-[3px]" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-full bg-white shadow-sm border-slate-200 active:bg-slate-100"
              onClick={() => handleScroll(-100)}
            >
              <ChevronUp className="h-4 w-4 text-black stroke-[3px]" />
            </Button>

            <div className="flex-1" />

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-full bg-white shadow-sm border-slate-200 active:bg-slate-100"
              onClick={() => handleScroll(100)}
            >
              <ChevronDown className="h-4 w-4 text-black stroke-[3px]" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-full bg-white shadow-sm border-slate-200 active:bg-slate-100"
              onClick={() => scrollToEdge("bottom")}
            >
              <ChevronsDown className="h-4 w-4 text-black stroke-[3px]" />
            </Button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <Button
            variant="outline"
            className="bg-white border-slate-300 text-slate-600 h-9 px-6 font-semibold"
            onClick={() => setTempSelected("")} // ตัวอย่างการใช้งานปุ่มทั้งหมด (รีเซ็ตการเลือก)
          >
            전체 (ทั้งหมด)
          </Button>
          <DialogClose asChild>
            <Button
              onClick={handleConfirm}
              className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-10 font-bold shadow-lg shadow-blue-500/20"
            >
              선택 (เลือก)
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-white border-slate-300 text-slate-500 h-9 px-6"
            >
              닫기 (ปิด)
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
