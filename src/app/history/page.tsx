"use client";

import { useState, useMemo, useCallback } from "react";
import { TopNav } from "@/components/layout/topnav";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Save,
  CalendarDays,
  Box,
  Filter,
  RotateCcw,
  Plus,
  Minus,
  Search,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/dashboard/datefilter";
import { cn } from "@/lib/utils";

const INITIAL_HISTORY = [
  { id: 1, lot: "6AMG0180", model: "T11V1NDHTCA.ABWEECD", part: "ACQ30611612", tool: "WB25VBT", plan: 133, actual: 133, pending: 0, ng: 1, rework: 0, planDate: "2026-01-12 18:44:00", orderNo: "WO2601134C7C355", remark: "รออะไหล่" },
  { id: 2, lot: "6A2F0023", model: "T11V1NDQT2B.ABMPETH", part: "ACQ30611605", tool: "WB25VBT", plan: 595, actual: 403, pending: 192, ng: 7, rework: 2, planDate: "2026-01-13 17:45:00", orderNo: "WO260113AD3DFE2", remark: "รออะไหล่" },
];

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState(INITIAL_HISTORY);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const MAX_ROWS = 50;

  // Format planDate in a locale-safe way
  const formatDate = useCallback((dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit"
      }).format(d);
    } catch {
      return dateStr;
    }
  }, []);

  const handleReworkChange = (id: number, delta: number) => {
    setHistoryData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rework: Math.max(0, item.rework + delta) } : item
      )
    );
  };

  const filteredData = useMemo(() => {
    return historyData.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || [item.lot, item.model, item.orderNo].some(val =>
        String(val).toLowerCase().includes(searchLower)
      );
      const matchesFilters = Object.entries(selectedFilters).every(([key, values]) => {
        if (!values || values.length === 0) return true;
        return values.includes(String(item[key as keyof typeof item] || "-"));
      });
      return matchesSearch && matchesFilters;
    });
  }, [historyData, searchTerm, selectedFilters]);

  const displayData = useMemo(() => filteredData.slice(0, MAX_ROWS), [filteredData]);

  const clearAllFilters = () => {
    setSelectedFilters({});
    setSearchTerm("");
  };

  const FilterableHeader = ({ label, columnKey, className }: { label: string; columnKey: string; className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");

    const uniqueValues = useMemo(() => {
      const vals = Array.from(new Set(INITIAL_HISTORY.map(item => String(item[columnKey as keyof typeof item] || "-"))));
      return vals.sort((a, b) => (!isNaN(Number(a)) && !isNaN(Number(b))) ? Number(a) - Number(b) : a.localeCompare(b));
    }, [columnKey]);

    const displayValues = uniqueValues.filter(v => v.toLowerCase().includes(filterSearch.toLowerCase()));
    const currentSelected = selectedFilters[columnKey] || [];
    const handleApply = (vals: string[]) => setSelectedFilters(prev => ({ ...prev, [columnKey]: vals }));

    return (
      <TableHead className={cn("text-white font-bold text-[11px] uppercase py-4 px-4 border-r border-white/20 text-center whitespace-nowrap", className)}>
        <div className="flex items-center justify-center gap-2">
          <span className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{label}</span>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`กรองข้อมูล ${label}`}
                className={cn("h-7 w-7 rounded-md transition-all border", currentSelected.length > 0 ? "bg-yellow-400 text-slate-950 border-yellow-500 hover:bg-yellow-500" : "text-white border-transparent hover:bg-white/25")}
              >
                <Filter className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 bg-white rounded-2xl overflow-hidden z-[100] shadow-2xl">
              <div className="flex items-center justify-between bg-slate-50 px-4 py-3 border-b border-slate-100">
                <span className="text-[12px] font-black text-slate-800 uppercase">กรอง {label}</span>
                <button onClick={() => { handleApply([]); setIsOpen(false); }} className="text-[10px] font-black text-rose-500 bg-rose-50 px-2.5 py-1 rounded-lg hover:bg-rose-100 transition-colors">ล้างค่า</button>
              </div>
              <div className="p-3 space-y-3">
                <Input
                  placeholder="ค้นหา…"
                  className="h-9 text-[12px]"
                  value={filterSearch}
                  autoComplete="off"
                  onChange={(e) => setFilterSearch(e.target.value)}
                />
                <ScrollArea className="h-48">
                  <div role="group" aria-label={`ตัวเลือกสำหรับ ${label}`}>
                    {displayValues.map(val => (
                      <label key={val} className="flex items-center space-x-2.5 py-2 px-2 hover:bg-blue-50 rounded-xl cursor-pointer group">
                        <Checkbox
                          checked={currentSelected.includes(val)}
                          onCheckedChange={() => handleApply(currentSelected.includes(val) ? currentSelected.filter(v => v !== val) : [...currentSelected, val])}
                        />
                        <span className="text-[12px] font-bold text-slate-600 truncate flex-1 group-hover:text-blue-700">{val}</span>
                      </label>
                    ))}
                  </div>
                </ScrollArea>
                <Button onClick={() => setIsOpen(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">ตกลง</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </TableHead>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <TopNav />
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only p-2 bg-white text-blue-600 rounded">Skip to main content</a>
      <main id="main-content" className="p-6 space-y-6 max-w-[1920px] mx-auto w-full">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap items-end gap-5">
            <div className="space-y-2">
              <label id="date-range-label" className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" /> ช่วงเวลาการผลิต
              </label>
              <div className="bg-slate-50 rounded-md border border-slate-200 shadow-inner" aria-labelledby="date-range-label">
                <DatePickerWithRange />
              </div>
            </div>

            <div className="flex items-end gap-3 h-11">
              <Button aria-label="ค้นหา" className="h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold shadow-md active:scale-95 transition-all">
                <Search className="w-4 h-4 mr-2" aria-hidden="true" /> ค้นหา
              </Button>
            </div>

            <div className="flex gap-2 h-11 items-end">
              {(Object.keys(selectedFilters).length > 0 || searchTerm) && (
                <Button onClick={clearAllFilters} variant="ghost" className="h-11 text-rose-500 hover:text-rose-600 hover:bg-rose-50" aria-label="ล้างการกรอง">
                  <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" /> ล้างการกรอง
                </Button>
              )}
              <Button aria-label="บันทึกประวัติ" className="h-11 bg-emerald-600 hover:bg-emerald-700 text-white px-6 font-bold rounded-xl shadow-lg active:scale-95 transition-all">
                <Save className="w-4 h-4 mr-2" aria-hidden="true" /> บันทึกประวัติ
              </Button>
            </div>
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden h-14 shadow-sm">
            <div className="px-5 flex flex-col justify-center border-r border-slate-100">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Results Found</span>
              <span className="text-xs font-bold text-slate-600">รายการที่พบ</span>
            </div>
            <div className="bg-blue-600 px-6 h-full flex items-center min-w-[80px] justify-center" aria-live="polite">
              <span className="text-3xl font-black text-white font-variant-numeric: tabular-nums">{filteredData.length}</span>
            </div>
          </div>
        </div>

        {filteredData.length > MAX_ROWS && (
          <div className="p-3 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-xl">
            แสดงเฉพาะ {MAX_ROWS} รายการแรก กรุณาใช้ตัวกรองเพิ่มเติมเพื่อความแม่นยำ
          </div>
        )}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl min-w-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[1450px]">
              <TableHeader>
                <TableRow className="border-none bg-blue-600 hover:bg-blue-600">
                  <FilterableHeader label="ล็อตการผลิต" columnKey="lot" />
                  <FilterableHeader label="Model Suffix" columnKey="model" />
                  <FilterableHeader label="รายการผลิต" columnKey="part" />
                  <FilterableHeader label="TOOL" columnKey="tool" />
                  <FilterableHeader label="จำนวนแพลน" columnKey="plan" />
                  <FilterableHeader label="จำนวนผลิต" columnKey="actual" />
                  <FilterableHeader label="จำนวนงานค้าง" columnKey="pending" className="text-amber-200" />
                  <FilterableHeader label="จำนวนงานเสีย" columnKey="ng" className="text-rose-200" />
                  <TableHead className="text-yellow-200 font-bold uppercase text-center border-r border-white/20 text-xs">จำนวนงานรีเวิร์ค</TableHead>
                  <FilterableHeader label="วันที่ตามแพลน" columnKey="planDate" />
                  <FilterableHeader label="หมายเลขคำสั่ง" columnKey="orderNo" />
                  <TableHead className="text-white font-bold text-[12px] uppercase text-center px-4">หมายเหตุ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((row) => (
                  <TableRow key={row.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                    <TableCell className="text-center font-mono font-bold text-blue-600 py-4 border-r border-slate-50 text-xs">
                      <div className="flex items-center justify-center gap-2">
                        <Box className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" /> {row.lot}
                      </div>
                    </TableCell>
                    <TableCell className="text-center border-r border-slate-50 text-slate-700 font-semibold text-xs truncate min-w-0">{row.model}</TableCell>
                    <TableCell className="text-center text-slate-500 font-medium border-r border-slate-50 text-xs">{row.part}</TableCell>
                    <TableCell className="text-center border-r border-slate-50 text-slate-400 font-mono text-xs">{row.tool}</TableCell>
                    <TableCell className="text-center font-mono font-bold text-slate-400 border-r border-slate-50 text-xs tabular-nums">{row.plan}</TableCell>
                    <TableCell className="text-center border-r border-slate-50 text-xs tabular-nums">
                      <span className={cn("font-black", row.actual >= row.plan ? 'text-emerald-600' : 'text-amber-600')}>{row.actual}</span>
                    </TableCell>
                    <TableCell className="text-center border-r border-slate-50 text-amber-600 font-mono font-bold text-xs tabular-nums">{row.pending}</TableCell>
                    <TableCell className="text-center border-r border-slate-50 text-rose-600 font-mono font-black text-xs tabular-nums">{row.ng}</TableCell>

                    <TableCell className="text-center border-r border-slate-50 p-2">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          onClick={() => handleReworkChange(row.id, -1)}
                          aria-label="ลดจำนวนงานรีเวิร์ค"
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </Button>
                        <span className="w-8 text-yellow-600 font-bold text-sm tabular-nums">{row.rework}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          onClick={() => handleReworkChange(row.id, 1)}
                          aria-label="เพิ่มจำนวนงานรีเวิร์ค"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="text-center font-mono text-xs text-slate-400 border-r border-slate-50 tabular-nums">{formatDate(row.planDate)}</TableCell>
                    <TableCell className="text-center text-blue-500 font-mono text-xs border-r border-slate-50 truncate min-w-0">{row.orderNo}</TableCell>
                    <TableCell className="text-center text-slate-400 italic text-xs px-4 truncate min-w-0">{row.remark || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}