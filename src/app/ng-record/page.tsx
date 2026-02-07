// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import { TopNav } from "@/components/layout/topnav";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Search, Layers, RotateCcw, Save, Loader2, AlertCircle } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { DatePickerWithRange } from "@/components/dashboard/datefilter";

// // นำเข้า Service ที่เราเขียนไว้
// import { CategoryResult, DefectResult, defectService } from "../../../services/defect-service";

// export default function ModernNGRecordPage() {
//   // --- States ---
//   const [scannedRecords, setScannedRecords] = useState<any[]>([]);
//   const [selectedId, setSelectedId] = useState<string | null>(null); 
//   const [selectedComp, setSelectedComp] = useState<string>("");
//   const [activeGroup, setActiveGroup] = useState<"ST" | "ND" | "RD">("ST");

//   const [, setLoading] = useState(true);
//   const [scanLoading, setScanLoading] = useState(false);
//   const [isDefectLoading, setIsDefectLoading] = useState(false);

//   // States สำหรับเก็บข้อมูล API
//   const [groupSt, setGroupSt] = useState<CategoryResult[]>([]);
//   const [groupNd, setGroupNd] = useState<CategoryResult[]>([]);
//   const [groupRd, setGroupRd] = useState<CategoryResult[]>([]);
//   const [defectsFromApi, setDefectsFromApi] = useState<DefectResult[]>([]);

//   // 1. Initial Fetch: ดึงหมวดหมู่ฝั่งซ้าย 3 คอลัมน์
//   useEffect(() => {
//     const loadAllCategories = async () => {
//       setLoading(true);
//       try {
//         const [resSt, resNd, resRd] = await Promise.all([
//           defectService.getCategorySt(),
//           defectService.getCategoryNd(),
//           defectService.getCategoryRd()
//         ]);

//         if (resSt.isSuccess) setGroupSt(resSt.result);
//         if (resNd.isSuccess) setGroupNd(resNd.result);
//         if (resRd.isSuccess) setGroupRd(resRd.result);

//         // เลือกตัวแรกเป็น Default
//         const first = resSt.result?.[0] || resNd.result?.[0];
//         if (first) {
//           setSelectedComp(first.codeId);
//           setActiveGroup("ST");
//         }
//       } catch (error) {
//         console.error("Fetch Categories Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadAllCategories();
//   }, []);

//   // 2. Scan Handler: ดึงข้อมูล Work Order ลงตาราง
//   const handleScan = async (labelId: string) => {
//     if (!labelId) return;
//     setScanLoading(true);
//     try {
//       const response = await defectService.getWorkOrder("D01", labelId);
//       if (response.isSuccess && response.result?.length > 0) {
//         const data = response.result[0];
//         if (scannedRecords.find(r => r.labelId === data.labelId)) return alert("สแกนไปแล้ว");

//         const newEntry = {
//           ...data,
//           actual: 0,
//           totalNG: 0,
//           counts: {} // เก็บ { defectCodeId: value }
//         };
//         setScannedRecords(prev => [newEntry, ...prev]);
//         setSelectedId(data.labelId);
//       } else {
//         alert("ไม่พบข้อมูล Work Order");
//       }
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       alert("API Error");
//     } finally {
//       setScanLoading(false);
//     }
//   };

//   // 3. Effect: ดึงรายการ Defect ฝั่งขวา (ยิง API St, Nd หรือ Rd ตามกลุ่มที่เลือก)
//   useEffect(() => {
//     const fetchDefects = async () => {
//       const currentRecord = scannedRecords.find(r => r.labelId === selectedId);

//       // เงื่อนไข: ต้องมีพาร์ทที่เลือก (selectedComp) และมีเลข Work Order (noWkOrd)
//       if (selectedComp && currentRecord?.noWkOrd) {
//         setIsDefectLoading(true);
//         try {
//           let res;
//           // เลือกเรียก API ตามกลุ่มหมวดหมู่ที่ User คลิก
//           if (activeGroup === "ST") {
//             res = await defectService.getDefectsSt(selectedComp, currentRecord.noWkOrd);
//           } else if (activeGroup === "ND") {
//             res = await defectService.getDefectsNd(selectedComp, currentRecord.noWkOrd);
//           } else {
//             res = await defectService.getDefectsRd(selectedComp, currentRecord.noWkOrd);
//           }

//           if (res?.isSuccess) {
//             setDefectsFromApi(res.result || []);
//           } else {
//             setDefectsFromApi([]); // ถ้าไม่สำเร็จให้ล้างค่าเป็นอาเรย์ว่าง
//           }
//         } catch (error) {
//           console.error("Defect API Error:", error);
//           setDefectsFromApi([]);
//         } finally {
//           setIsDefectLoading(false);
//         }
//       } else {
//         // ถ้าเงื่อนไขไม่ครบ (เช่นยังไม่เลือกแถว) ให้ล้างตารางฝั่งขวา
//         setDefectsFromApi([]);
//       }
//     };

//     fetchDefects();
//     // dependencies: เมื่อเปลี่ยนพาร์ท, เปลี่ยนแถวที่เลือก, หรือเปลี่ยนกลุ่ม (ST/ND/RD)
//   }, [selectedComp, selectedId, activeGroup, scannedRecords]);

//   // --- Handlers ---
//   const updateCount = (defectCodeId: string, delta: number) => {
//     if (!selectedId) return alert("กรุณาเลือกรายการในตารางก่อน");

//     setScannedRecords(prev => prev.map(record => {
//       if (record.labelId === selectedId) {
//         const currentVal = record.counts[defectCodeId] || 0;
//         const newVal = Math.max(0, currentVal + delta);
//         const newCounts = { ...record.counts, [defectCodeId]: newVal };
//         const newTotal = Object.values(newCounts).reduce((sum: any, val: any) => sum + val, 0);
//         return { ...record, counts: newCounts, totalNG: newTotal };
//       }
//       return record;
//     }));
//   };

//   const currentSelectedRecord = scannedRecords.find(r => r.labelId === selectedId);
//   const displayCounts = currentSelectedRecord?.counts || {};

//   const renderPartButton = (item: CategoryResult, group: "ST" | "ND" | "RD") => (
//     <button
//       key={item.codeId}
//       onClick={() => { setSelectedComp(item.codeId); setActiveGroup(group); }}
//       className={cn(
//         "relative w-full mb-2 p-3 rounded-xl border flex items-center gap-3 transition-all",
//         selectedComp === item.codeId
//           ? "bg-blue-600 border-blue-600 text-white shadow-md scale-[1.02]"
//           : "bg-white border-slate-200 text-slate-700 hover:bg-blue-50"
//       )}
//     >
//       <Layers className="w-4 h-4 shrink-0" />
//       <div className="flex flex-col items-start overflow-hidden">
//         <span className="text-[9px] font-black uppercase truncate w-full">{item.codeName_ENG}</span>
//         <span className={cn("text-[11px] font-bold truncate w-full", selectedComp === item.codeId ? "text-blue-100" : "text-slate-500")}>
//           {item.codeName_TR}
//         </span>
//       </div>
//     </button>
//   );

//   return (
//     <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
//       <TopNav />
//       <main className="flex-1 flex flex-col p-3 gap-3 min-h-0">

//         {/* 1. Toolbar */}
//         <div className="bg-white rounded-2xl border p-2 flex items-center justify-between shadow-sm">
//           <div className="flex items-center gap-3">
//             <DatePickerWithRange />
//             <div className="relative">
//               {scanLoading ? <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" /> : <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
//               <input 
//                 type="text" placeholder="SCAN LABEL ID..."
//                 className="h-11 w-80 pl-10 bg-slate-50 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500/20 outline-none"
//                 onKeyDown={(e) => { if (e.key === 'Enter') { handleScan(e.currentTarget.value.trim()); e.currentTarget.value = ""; } }}
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center bg-rose-500 rounded-xl overflow-hidden shadow-sm text-white">
//               <span className="px-4 py-2 text-[11px] font-bold border-r border-white/20">TOTAL NG</span>
//               <span className="px-5 text-xl font-black">{scannedRecords.reduce((acc, c) => acc + c.totalNG, 0)}</span>
//             </div>
//             <Button className="h-11 bg-emerald-600 hover:bg-emerald-700 font-bold gap-2 rounded-xl px-8">
//               <Save className="w-4 h-4" /> SAVE DATA
//             </Button>
//           </div>
//         </div>

//         {/* 2. Table Area */}
//         <div className="bg-white border rounded-2xl shadow-sm flex-[0.4] overflow-hidden">
//           <ScrollArea className="h-full">
//             <Table>
//               <TableHeader className="bg-blue-600 sticky top-0 z-10">
//                 <TableRow>
//                   {["ล็อต LG", "Date plan", "Model Suffix", "Material", "เลขรายการผลิต", "ชื่อ Work Order", "Plan Qty", "NG Count"].map(h => (
//                     <TableHead key={h} className="text-white font-bold text-[10px] text-center">{h}</TableHead>
//                   ))}
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {scannedRecords.length > 0 ? scannedRecords.map(record => (
//                   <TableRow key={record.labelId} onClick={() => setSelectedId(record.labelId)} className={cn("cursor-pointer", selectedId === record.labelId && "bg-blue-50")}>
//                     <TableCell className="text-center font-bold">{record.lgNo}</TableCell>
//                     <TableCell className="text-center">{record.dtLabel}</TableCell>
//                     <TableCell className="text-center text-[11px]">{record.modelSuffix}</TableCell>
//                     <TableCell className="text-center text-blue-600 font-bold">{record.itemMat}</TableCell>
//                     <TableCell className="text-center font-mono">{record.cdGItem}</TableCell>
//                     <TableCell className="text-center">{record.noWkOrd}</TableCell>
//                     <TableCell className="text-center font-bold">{record.labelQty}</TableCell>
//                     <TableCell className="text-center">
//                       <span className={cn("px-4 py-1 rounded-full font-black", record.totalNG > 0 ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400")}>{record.totalNG}</span>
//                     </TableCell>
//                   </TableRow>
//                 )) : (
//                   <TableRow><TableCell colSpan={8} className="h-32 text-center text-slate-400"><AlertCircle className="inline w-5 h-5 mr-2"/>กรุณาสแกนบาร์โค้ด</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </ScrollArea>
//         </div>

//         {/* 3. Input Area */}
//         <div className="h-[380px] grid grid-cols-12 gap-3">
//           <div className="col-span-5 grid grid-cols-3 gap-2">
//             <ScrollArea className="bg-white/50 border border-dashed rounded-xl p-1">{groupSt.map(i => renderPartButton(i, "ST"))}</ScrollArea>
//             <ScrollArea className="bg-white/50 border border-dashed rounded-xl p-1">{groupNd.map(i => renderPartButton(i, "ND"))}</ScrollArea>
//             <ScrollArea className="bg-white/50 border border-dashed rounded-xl p-1">{groupRd.map(i => renderPartButton(i, "RD"))}</ScrollArea>
//           </div>

//           <div className="col-span-7 flex flex-col bg-white rounded-2xl border shadow-sm overflow-hidden">
//             <div className="bg-blue-600 p-3 flex justify-between items-center px-6 text-white font-bold">
//               <span>DEFECT LIST: {selectedComp}</span>
//               <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)} className="h-8 hover:bg-white/10"><RotateCcw className="w-4 h-4 mr-2"/>RESET</Button>
//             </div>
//             <ScrollArea className="flex-1">
//               {isDefectLoading ? <div className="p-10 text-center"><Loader2 className="animate-spin inline mr-2"/>Loading...</div> : (
//                 <div className="grid grid-cols-2 p-2 gap-2">
//                   {defectsFromApi.map((defect) => {
//                     const count = displayCounts[defect.codeId] || 0;
//                     return (
//                       <div key={defect.codeId} className="flex h-16 bg-white border rounded-xl overflow-hidden shadow-sm">
//                         <div className="flex-1 flex flex-col justify-center px-3 bg-slate-50">
//                           <span className="text-[8px] text-slate-400 font-bold uppercase">{defect.codeName_ENG}</span>
//                           <span className="text-[12px] font-bold text-slate-700">{defect.codeName_TR}</span>
//                         </div>
//                         <div className="flex items-center border-l">
//                           <button onClick={() => updateCount(defect.codeId, -1)} className="w-10 h-full hover:bg-rose-50 hover:text-rose-500 text-2xl border-r text-slate-300">−</button>
//                           <div className={cn("w-12 text-center font-black text-xl", count > 0 ? "text-blue-600" : "text-slate-200")}>{count}</div>
//                           <button onClick={() => updateCount(defect.codeId, 1)} className="w-10 h-full hover:bg-emerald-50 hover:text-emerald-500 text-2xl text-slate-300">+</button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </ScrollArea>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }







/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { TopNav } from "@/components/layout/topnav";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Layers, RotateCcw, Save, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "@/components/dashboard/datefilter";

// นำเข้า Service ที่เราเขียนไว้
import { CategoryResult, DefectResult, defectService } from "../../../services/defect-service";

export default function ModernNGRecordPage() {
  // --- States ---
  const [scannedRecords, setScannedRecords] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedComp, setSelectedComp] = useState<string>("");
  const [activeGroup, setActiveGroup] = useState<"ST" | "ND" | "RD">("ST");

  const [, setLoading] = useState(true);
  const [scanLoading, setScanLoading] = useState(false);
  const [isDefectLoading, setIsDefectLoading] = useState(false);

  // States สำหรับเก็บข้อมูล API
  const [groupSt, setGroupSt] = useState<CategoryResult[]>([]);
  const [groupNd, setGroupNd] = useState<CategoryResult[]>([]);
  const [groupRd, setGroupRd] = useState<CategoryResult[]>([]);
  const [defectsFromApi, setDefectsFromApi] = useState<DefectResult[]>([]);

  // 1. Initial Fetch: ดึงหมวดหมู่ฝั่งซ้าย 3 คอลัมน์
  useEffect(() => {
    const loadAllCategories = async () => {
      setLoading(true);
      try {
        const [resSt, resNd, resRd] = await Promise.all([
          defectService.getCategorySt(),
          defectService.getCategoryNd(),
          defectService.getCategoryRd()
        ]);

        if (resSt.isSuccess) setGroupSt(resSt.result);
        if (resNd.isSuccess) setGroupNd(resNd.result);
        if (resRd.isSuccess) setGroupRd(resRd.result);

        // เลือกตัวแรกเป็น Default
        const first = resSt.result?.[0] || resNd.result?.[0];
        if (first) {
          setSelectedComp(first.codeId);
          setActiveGroup("ST");
        }
      } catch (error) {
        console.error("Fetch Categories Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAllCategories();
  }, []);

  // 2. Scan Handler: ดึงข้อมูล Work Order ลงตาราง
  const handleScan = async (labelId: string) => {
    if (!labelId) return;
    setScanLoading(true);
    try {
      const response = await defectService.getWorkOrder("D01", labelId);
      if (response.isSuccess && response.result?.length > 0) {
        const data = response.result[0];
        if (scannedRecords.find(r => r.labelId === data.labelId)) return alert("สแกนไปแล้ว");

        const newEntry = {
          ...data,
          actual: 0,
          totalNG: 0,
          counts: {} // เก็บ { defectCodeId: value }
        };
        setScannedRecords(prev => [newEntry, ...prev]);
        setSelectedId(data.labelId);
      } else {
        alert("ไม่พบข้อมูล Work Order");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("API Error");
    } finally {
      setScanLoading(false);
    }
  };

  // 3. Effect: ดึงรายการ Defect ฝั่งขวา (ยิง API St, Nd หรือ Rd ตามกลุ่มที่เลือก)
  useEffect(() => {
    const fetchDefects = async () => {
      const currentRecord = scannedRecords.find(r => r.labelId === selectedId);

      // เงื่อนไข: ต้องมีพาร์ทที่เลือก (selectedComp) และมีเลข Work Order (noWkOrd)
      if (selectedComp && currentRecord?.noWkOrd) {
        setIsDefectLoading(true);
        try {
          let res;
          // เลือกเรียก API ตามกลุ่มหมวดหมู่ที่ User คลิก
          if (activeGroup === "ST") {
            res = await defectService.getDefectsSt(selectedComp, currentRecord.noWkOrd);
          } else if (activeGroup === "ND") {
            res = await defectService.getDefectsNd(selectedComp, currentRecord.noWkOrd);
          } else {
            res = await defectService.getDefectsRd(selectedComp, currentRecord.noWkOrd);
          }

          if (res?.isSuccess) {
            setDefectsFromApi(res.result || []);
          } else {
            setDefectsFromApi([]); // ถ้าไม่สำเร็จให้ล้างค่าเป็นอาเรย์ว่าง
          }
        } catch (error) {
          console.error("Defect API Error:", error);
          setDefectsFromApi([]);
        } finally {
          setIsDefectLoading(false);
        }
      } else {
        // ถ้าเงื่อนไขไม่ครบ (เช่นยังไม่เลือกแถว) ให้ล้างตารางฝั่งขวา
        setDefectsFromApi([]);
      }
    };

    fetchDefects();
    // dependencies: เมื่อเปลี่ยนพาร์ท, เปลี่ยนแถวที่เลือก, หรือเปลี่ยนกลุ่ม (ST/ND/RD)
  }, [selectedComp, selectedId, activeGroup, scannedRecords]);

  // --- Handlers ---
  const updateCount = (defectCodeId: string, delta: number) => {
    if (!selectedId) return alert("กรุณาเลือกรายการในตารางก่อน");

    setScannedRecords(prev => prev.map(record => {
      if (record.labelId === selectedId) {
        const currentVal = record.counts[defectCodeId] || 0;
        const newVal = Math.max(0, currentVal + delta);
        const newCounts = { ...record.counts, [defectCodeId]: newVal };
        const newTotal = Object.values(newCounts).reduce((sum: any, val: any) => sum + val, 0);
        return { ...record, counts: newCounts, totalNG: newTotal };
      }
      return record;
    }));
  };

  const currentSelectedRecord = scannedRecords.find(r => r.labelId === selectedId);
  const displayCounts = currentSelectedRecord?.counts || {};

  // --- ปุ่มฝั่งซ้ายแบบมีกล่องตัวเลขด้านขวาตามรูป ---
  const renderPartButton = (item: CategoryResult, group: "ST" | "ND" | "RD") => {
    // ดึงยอด NG ของพาร์ทนี้จาก Record ที่เลือกอยู่
    const ngOnPart = currentSelectedRecord?.partTotals?.[item.codeId] || 0;
    const isActive = selectedComp === item.codeId;

    return (
      <button
        key={item.codeId}
        onClick={() => { setSelectedComp(item.codeId); setActiveGroup(group); }}
        className={cn(
          "relative w-full mb-2 h-14 rounded-xl border flex items-center overflow-hidden transition-all shadow-sm",
          isActive
            ? "border-blue-500 ring-1 ring-blue-500 bg-white"
            : "border-slate-200 bg-white hover:border-blue-300"
        )}
      >
        {/* ส่วนเนื้อหา (ไอคอน + ชื่อ) */}
        <div className="flex-1 flex items-center gap-2.5 px-3 overflow-hidden text-left">
          <Layers className={cn("w-4 h-4 shrink-0", isActive ? "text-blue-600" : "text-slate-400")} />
          <div className="flex flex-col overflow-hidden">
            <span className="text-[9px] font-black text-slate-800 uppercase truncate leading-tight">
              {item.codeName_ENG}
            </span>
            <span className="text-[11px] font-bold text-slate-500 truncate">
              {item.codeName_TR}
            </span>
          </div>
        </div>

        {/* ส่วนช่องตัวเลข (Badge) ด้านขวาสุด */}
        <div className={cn(
          "w-12 h-full flex items-center justify-center text-lg font-bold transition-colors",
          ngOnPart > 0
            ? "bg-blue-600 text-white"   // ถ้ามีค่า NG ให้เป็นสีน้ำเงินเด่นแบบรูป 1
            : "bg-slate-50 text-slate-300" // ถ้าเป็น 0 ให้เป็นสีเทาจางแบบรูป 2
        )}>
          {ngOnPart}
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <TopNav />
      <main className="flex-1 flex flex-col p-3 gap-3 min-h-0">

        {/* 1. Toolbar */}
        <div className="bg-white rounded-2xl border p-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <DatePickerWithRange />
            <div className="relative">
              {scanLoading ? <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" /> : <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
              <input
                type="text" placeholder="SCAN LABEL ID..."
                className="h-11 w-80 pl-10 bg-slate-50 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500/20 outline-none"
                onKeyDown={(e) => { if (e.key === 'Enter') { handleScan(e.currentTarget.value.trim()); e.currentTarget.value = ""; } }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-rose-500 rounded-xl overflow-hidden shadow-sm text-white">
              <span className="px-4 py-2 text-[11px] font-bold border-r border-white/20">TOTAL NG</span>
              <span className="px-5 text-xl font-black">{scannedRecords.reduce((acc, c) => acc + c.totalNG, 0)}</span>
            </div>
            <Button className="h-11 bg-emerald-600 hover:bg-emerald-700 font-bold gap-2 rounded-xl px-8">
              <Save className="w-4 h-4" /> SAVE DATA
            </Button>
          </div>
        </div>

        {/* 2. Table Area */}
        <div className="bg-white border rounded-2xl shadow-sm flex-[0.4] overflow-hidden">
          <ScrollArea className="h-full">
            <Table>
              <TableHeader className="bg-blue-600 sticky top-0 z-10">
                <TableRow>
                  {["ล็อต LG", "Date plan", "Model Suffix", "Tool", "เลขรายการผลิต", "ชื่อรายการผลิต", "จำนวนแพลนการผลิต", "จำนวนการผลิต", "จำนวนงาน NG"].map(h => (
                    <TableHead key={h} className="text-white font-bold text-[10px] text-center">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {scannedRecords.length > 0 ? scannedRecords.map(record => (
                  <TableRow key={record.labelId} onClick={() => setSelectedId(record.labelId)} className={cn("cursor-pointer", selectedId === record.labelId && "bg-blue-50")}>
                    <TableCell className="text-center font-bold">{record.lgNo}</TableCell>
                    <TableCell className="text-center">{record.dtLabel}</TableCell>
                    <TableCell className="text-center text-[11px]">{record.modelSuffix}</TableCell>
                    <TableCell className="text-center text-blue-600 font-bold">{record.itemMat}</TableCell>
                    <TableCell className="text-center font-mono">{record.cdGItem}</TableCell>
                    <TableCell className="text-center">{record.noWkOrd}</TableCell>
                    <TableCell className="text-center font-bold">{record.labelQty}</TableCell>
                    <TableCell className="text-center font-bold">{record.labelId}</TableCell>
                    <TableCell className="text-center">
                      <span className={cn("px-4 py-1 rounded-full font-black", record.totalNG > 0 ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400")}>{record.totalNG}</span>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={8} className="h-32 text-center text-slate-400"><AlertCircle className="inline w-5 h-5 mr-2" />กรุณาสแกนบาร์โค้ด</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* 3. Input Area */}
        <div className="h-[380px] grid grid-cols-12 gap-3">
          <div className="col-span-5 grid grid-cols-3 gap-2">
            <ScrollArea className="bg-white/50 border border-dashed rounded-xl p-1">{groupSt.map(i => renderPartButton(i, "ST"))}</ScrollArea>
            <ScrollArea className="bg-white/50 border border-dashed rounded-xl p-1">{groupNd.map(i => renderPartButton(i, "ND"))}</ScrollArea>
            <ScrollArea className="bg-white/50 border border-dashed rounded-xl p-1">{groupRd.map(i => renderPartButton(i, "RD"))}</ScrollArea>
          </div>

          <div className="col-span-7 flex flex-col bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-blue-600 p-3 flex justify-between items-center px-6 text-white font-bold">
              <span>DEFECT LIST: {selectedComp}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)} className="h-8 hover:bg-white/10"><RotateCcw className="w-4 h-4 mr-2" />RESET</Button>
            </div>
            <ScrollArea className="flex-1">
              {isDefectLoading ? <div className="p-10 text-center"><Loader2 className="animate-spin inline mr-2" />Loading...</div> : (
                <div className="grid grid-cols-2 p-2 gap-2">
                  {defectsFromApi.map((defect) => {
                    const count = displayCounts[defect.codeId] || 0;
                    return (
                      <div key={defect.codeId} className="flex h-16 bg-white border rounded-xl overflow-hidden shadow-sm">
                        <div className="flex-1 flex flex-col justify-center px-3 bg-slate-50">
                          <span className="text-[8px] text-slate-400 font-bold uppercase">{defect.codeName_ENG}</span>
                          <span className="text-[12px] font-bold text-slate-700">{defect.codeName_TR}</span>
                        </div>
                        <div className="flex items-center border-l">
                          <button onClick={() => updateCount(defect.codeId, -1)} className="w-10 h-full hover:bg-rose-50 hover:text-rose-500 text-2xl border-r text-slate-300">−</button>
                          <div className={cn("w-12 text-center font-black text-xl", count > 0 ? "text-blue-600" : "text-slate-200")}>{count}</div>
                          <button onClick={() => updateCount(defect.codeId, 1)} className="w-10 h-full hover:bg-emerald-50 hover:text-emerald-500 text-2xl text-slate-300">+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}