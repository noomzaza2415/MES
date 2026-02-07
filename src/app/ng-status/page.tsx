
"use client";

import { useState, useMemo } from "react";
import { TopNav } from "@/components/layout/topnav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Trash2, XCircle, Trash, Filter, RotateCcw } from "lucide-react";
import { DatePickerWithRange } from "@/components/dashboard/datefilter";
import { cn } from "@/lib/utils";

const REAL_NG_DATA = [
  { id: 1, time: "01-13 22:45", lot: "6A1F1121", model: "T13X2EFNTX.AKOR", tool: "", prodNo: "ACQ30063445", prodName: "Cover Assembly,Top", part: "ฟร้อน พาแนล", defect: "อื่นๆ", qty: 1, change: 1, rework: 0 },
  { id: 2, time: "01-13 22:42", lot: "6A1F1121", model: "T13X2EFNTX.AKOR", tool: "", prodNo: "ACQ30063445", prodName: "Cover Assembly,Top", part: "ฟร้อน พาแนล", defect: "สกปรก/ขยะ", qty: 1, change: 0, rework: 1 },
  { id: 3, time: "01-13 22:38", lot: "6A1F1121", model: "T13X2EFNTX.AKOR", tool: "", prodNo: "ACQ30063445", prodName: "Cover Assembly,Top", part: "ฟร้อน พาแนล", defect: "ไฟย้อน", qty: 1, change: 0, rework: 1 },
  { id: 4, time: "01-13 22:12", lot: "6A1F1121", model: "T13X2EFNTX.AKOR", tool: "", prodNo: "ACQ30063445", prodName: "Cover Assembly,Top", part: "ฟร้อน พาแนล", defect: "จุดดำ", qty: 1, change: 0, rework: 1 },
  { id: 5, time: "01-13 22:00", lot: "6A1F1121", model: "T13X2EFNTX.AKOR", tool: "", prodNo: "ACQ30063445", prodName: "Cover Assembly,Top", part: "ลิด แอสแซมบี้", defect: "แตก", qty: 1, change: 1, rework: 0 },
  { id: 6, time: "01-13 21:10", lot: "6A2F0023", model: "T11V1NDQT2B.ABMPETH", tool: "WB25VBT", prodNo: "ACQ30611605", prodName: "Cover Assembly,Top", part: "ฟร้อน พาแนล", defect: "ปุ่มแข็ง", qty: 1, change: 0, rework: 1 },
  { id: 7, time: "01-13 21:05", lot: "6A2F0023", model: "T11V1NDQT2B.ABMPETH", tool: "WB25VBT", prodNo: "ACQ30611605", prodName: "Cover Assembly,Top", part: "คอนโทรล พาแนล", defect: "ปูด", qty: 1, change: 1, rework: 0 },
  { id: 8, time: "01-13 20:47", lot: "6A1F1121", model: "T13X2EFNTX.AKOR", tool: "", prodNo: "ACQ30063445", prodName: "Cover Assembly,Top", part: "ท็อป โคเวอร์", defect: "อื่นๆ", qty: 1, change: 1, rework: 0 },
];

export default function NGStatusPage() {
  const [selectedRows] = useState<number[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const filteredData = useMemo(() => {
    return REAL_NG_DATA.filter((item) => {
      return Object.entries(selectedFilters).every(([key, values]) => {
        if (!values || values.length === 0) return true;
        return values.includes(String(item[key as keyof typeof item] || "-"));
      });
    });
  }, [selectedFilters]);

  const clearAllFilters = () => setSelectedFilters({});

  const FilterableHeader = ({ label, columnKey, className }: { label: string; columnKey: string; className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
    const uniqueValues = Array.from(new Set(REAL_NG_DATA.map(item => String(item[columnKey as keyof typeof item] || "-"))));
    const displayValues = uniqueValues.filter(v => v.toLowerCase().includes(filterSearch.toLowerCase()));
    const currentSelected = selectedFilters[columnKey] || [];

    const handleApply = (vals: string[]) => {
      setSelectedFilters(prev => ({ ...prev, [columnKey]: vals }));
    };

    return (
      <TableHead className={cn("text-white font-bold text-[11px] uppercase py-4 px-4 border-r border-white/20 text-center whitespace-nowrap", className)}>
        <div className="flex items-center justify-center gap-2">
          {/* Label หลักใช้สีขาวสว่างและเพิ่ม Drop Shadow เล็กน้อยให้อ่านง่าย */}
          <span className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{label}</span>

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button className={cn(
                "p-1.5 rounded-md transition-all duration-200 outline-none border",
                // ถ้ามีการเลือก (Filter active) ให้เปลี่ยนเป็นสีเหลืองทองชัดเจน 
                // ถ้ายังไม่เลือก ให้เป็นสีขาวเข้มสว่าง (text-white)
                currentSelected.length > 0
                  ? "bg-yellow-400 text-slate-950 border-yellow-500 shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                  : "text-white border-transparent hover:bg-white/25 hover:border-white/40"
              )}>
                {/* ปรับเส้น Filter ให้หนาขึ้น (strokeWidth={3}) เพื่อความคมชัดแบบขาวเข้ม */}
                <Filter className="w-3.5 h-3.5 drop-shadow-sm" strokeWidth={3} />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-0 bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden z-[100]">
              {/* ส่วนหัว Popover ปรับสีให้อ่านง่ายแบบมืออาชีพ */}
              <div className="flex items-center justify-between bg-slate-50 px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-3 h-3 text-blue-600" strokeWidth={3} />
                  <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight">กรอง {label}</span>
                </div>
                <button
                  onClick={() => { handleApply([]); setIsOpen(false); }}
                  className="text-[10px] font-black text-rose-500 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg transition-colors"
                >
                  ล้างค่า
                </button>
              </div>

              <div className="p-3 space-y-3">
                <div className="relative">
                  <Input
                    placeholder="ค้นหาข้อมูล..."
                    className="h-9 text-[12px] bg-slate-50 border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                  />
                </div>

                <ScrollArea className="h-48 pr-2">
                  <div className="space-y-0.5">
                    {displayValues.map(val => (
                      <div
                        key={val}
                        className="flex items-center space-x-2.5 py-2 px-2 hover:bg-blue-50 rounded-xl transition-all group cursor-pointer"
                        onClick={() => {
                          const newVals = currentSelected.includes(val)
                            ? currentSelected.filter(v => v !== val)
                            : [...currentSelected, val];
                          handleApply(newVals);
                        }}
                      >
                        <Checkbox
                          id={`${columnKey}-${val}`}
                          className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-[4px]"
                          checked={currentSelected.includes(val)}
                          onCheckedChange={(checked) => {
                            const newVals = checked ? [...currentSelected, val] : currentSelected.filter(v => v !== val);
                            handleApply(newVals);
                          }}
                        />
                        <label
                          htmlFor={`${columnKey}-${val}`}
                          className="text-[12px] font-bold text-slate-600 cursor-pointer truncate flex-1 group-hover:text-slate-900 transition-colors"
                        >
                          {val}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full h-10 text-[12px] font-black bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                >
                  ตกลง
                </Button>
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
      <main className="p-4 md:p-6 space-y-4 max-w-[1800px] mx-auto w-full">

        {/* Toolbar */}
        <div className="w-full bg-white p-2 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 h-11">
              <span className="text-[11px] font-bold text-slate-500 mr-3 whitespace-nowrap uppercase tracking-wider">วันที่ค้นหา</span>
              <DatePickerWithRange />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 font-bold rounded-xl transition-all shadow-md shadow-blue-500/10">
              <Search className="w-4 h-4 mr-2" /> ค้นหา
            </Button>

            {Object.keys(selectedFilters).length > 0 && (
              <Button onClick={clearAllFilters} variant="ghost" className="h-11 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl">
                <RotateCcw className="w-4 h-4 mr-2" /> ล้าง Filter
              </Button>
            )}

            {selectedRows.length > 0 && (
              <Button className="bg-rose-500 hover:bg-rose-600 text-white h-11 px-6 font-bold rounded-xl animate-in fade-in zoom-in-95 shadow-md shadow-rose-500/10">
                <Trash className="w-4 h-4 mr-2" /> ลบที่เลือก ({selectedRows.length})
              </Button>
            )}
          </div>

          <div className="flex items-center bg-white border border-rose-200 rounded-xl overflow-hidden h-11 shadow-sm">
            <div className="px-4 flex flex-col justify-center bg-rose-50 h-full">
              <span className="text-[14px] font-bold text-rose-600 whitespace-nowrap">งานค้าง NG</span>
            </div>
            <div className="bg-rose-500 px-5 h-full flex items-center">
              <span className="text-2xl font-black text-white tracking-tighter">{filteredData.length}</span>
              <span className="ml-1 text-[9px] font-bold text-rose-100 uppercase self-end mb-1.5">Unit</span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-blue-600 hover:bg-blue-600 transition-none">
                <FilterableHeader label="เวลา" columnKey="time" />
                <FilterableHeader label="เลขล็อต LG" columnKey="lot" />
                <FilterableHeader label="Model Suffix" columnKey="model" />
                <FilterableHeader label="TOOL" columnKey="tool" />
                <FilterableHeader label="เลขรายการผลิต" columnKey="prodNo" />
                <FilterableHeader label="ชื่อรายการผลิต" columnKey="prodName" />
                <FilterableHeader label="ชิ้นส่วนที่ NG" columnKey="part" />
                <FilterableHeader label="ประเภทงาน NG" columnKey="defect" />
                <FilterableHeader label="จำนวน(NG)" columnKey="qty" />
                <TableHead className="text-white font-bold text-[10px] uppercase py-4 px-2 border-r border-white/10 text-center">จำนวน(เปลี่ยน)</TableHead>
                <TableHead className="text-white font-bold text-[10px] uppercase py-4 px-2 border-r border-white/10 text-center">จำนวน(รีเวิร์ค)</TableHead>
                <TableHead className="text-white font-bold text-[10px] uppercase py-4 px-2 border-r border-white/10 text-center">ลบงาน(เปลี่ยน)</TableHead>
                <TableHead className="text-white font-bold text-[10px] uppercase py-4 px-2 text-center">ลบงาน NG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <TableRow key={row.id} className={cn(
                    "border-b border-slate-100 hover:bg-slate-50 transition-colors group",
                    selectedRows.includes(row.id) && "bg-blue-50/50"
                  )}>
                    
                    <TableCell className="text-[10px] font-mono text-slate-400 text-center">{row.time}</TableCell>
                    <TableCell className="font-bold text-slate-700 text-center text-[12px]">{row.lot}</TableCell>
                    <TableCell className="text-[11px] text-slate-500 font-mono text-center">{row.model}</TableCell>
                    <TableCell className="text-[11px] text-blue-600 font-bold text-center">{row.tool || "-"}</TableCell>
                    <TableCell className="text-[11px] text-slate-500 font-mono text-center">{row.prodNo}</TableCell>
                    <TableCell className="text-[11px] text-slate-600 text-center truncate max-w-[120px]">{row.prodName}</TableCell>
                    <TableCell className="text-[11px] text-blue-500 font-medium text-center">{row.part}</TableCell>
                    <TableCell className={cn("text-[11px] text-center font-bold", (row.defect === 'ปูด' || row.defect === 'แตก') ? 'text-rose-600' : 'text-slate-500')}>
                      {row.defect}
                    </TableCell>
                    <TableCell className="text-center font-mono font-bold text-[13px] text-rose-600">{row.qty}</TableCell>
                    <TableCell className="text-center font-mono text-blue-600 font-bold">{row.change || "0"}</TableCell>
                    <TableCell className="text-center font-mono text-emerald-600 font-bold">{row.rework || "0"}</TableCell>
                    <TableCell className="px-2 text-center border-r border-slate-50">
                      <Button variant="outline" size="sm" className="h-8 w-full text-[10px] border-slate-200 bg-green-400 text-white hover:bg-green-600 hover:text-white hover:border-blue-600 font-bold transition-all rounded-lg">
                        <Trash2 className="w-3 h-3 mr-1.5" /> กดเปลี่ยน
                      </Button>
                    </TableCell>
                    <TableCell className="px-2 text-center">
                      <Button variant="outline" size="sm" className="h-8 w-full text-[10px] border-slate-200 bg-rose-400 text-white hover:bg-rose-600 hover:text-white hover:border-rose-600 font-bold transition-all rounded-lg">
                        <XCircle className="w-3 h-3 mr-1.5" /> กดลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14} className="h-32 text-center text-slate-400 italic">
                    ไม่พบข้อมูลที่ค้นหา...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}