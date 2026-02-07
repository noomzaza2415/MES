"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2026, 0, 13),
    to: new Date(2026, 0, 13),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              // ปรับปุ่มกดเป็นสีขาว (bg-white) และเส้นขอบสี slate-200
              "w-[260px] justify-start text-left font-medium bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 shadow-sm transition-all",
              !date && "text-muted-foreground"
            )}
          >
            {/* ไอคอนสีฟ้าสดใสขึ้น */}
            <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd")} ~{" "}
                  {format(date.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd")
              )
            ) : (
              <span>เลือกวันที่</span>
            )}
          </Button>
        </PopoverTrigger>
        
        {/* Popover Content สีขาว สะอาดตา */}
        <PopoverContent 
          className="w-auto p-0 bg-white border border-slate-200 shadow-xl rounded-xl z-[100]" 
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            // เพิ่มสไตล์เพื่อให้ตัวเลขในปฏิทินมองเห็นชัดเจนขึ้นบนพื้นขาว
            className="bg-white text-slate-900 rounded-xl"
            classNames={{
              day_selected: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-600",
              day_today: "bg-slate-100 text-slate-900",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}