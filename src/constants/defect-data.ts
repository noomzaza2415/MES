import { ReactNode } from "react";
import { Key } from "readline";

export interface DefectItem {
  codeName_ENG: ReactNode;
  codeName_TR: ReactNode;
  codeId: Key | null | undefined;
  id: string;
  eng: string;
  thai: string;
}

export interface GroupItem {
  id: string;
  name: string;
  thai: string;
}

export const MASTER_DEFECTS: Record<string, DefectItem> = {
  // --- หมวดหมู่ข้อมูล (Master) ---
  front_lighting_not_full: {
    id: "D001",
    eng: "Front lighting not full",
    thai: "ไฟไม่เต็ม",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  front_lighting_overlap: {
    id: "D002",
    eng: "Front lighting overlap",
    thai: "ไฟซ้อน",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  front_lighting_through_hole: {
    id: "D003",
    eng: "Front Lighting Through hole",
    thai: "ไฟทะลุ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  lighting_ng: {
    id: "D004",
    eng: "Lighting NG",
    thai: "ไฟมีปัญหา",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  screen_ng: {
    id: "D005",
    eng: "Screen NG",
    thai: "สกรีนไม่ดี",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  film_display: {
    id: "D006",
    eng: "Film Display",
    thai: "ฟิล์มหน้าจอ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  film_ng: {
    id: "D007",
    eng: "Film NG",
    thai: "ฟิล์มเสีย",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  pcb_different_color: {
    id: "D008",
    eng: "PCB Different Color",
    thai: "สีแตกต่าง",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  color_streak: {
    id: "D009",
    eng: "Color Streak",
    thai: "ริ้วสี",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  scratch: {
    id: "D010",
    eng: "Scratch",
    thai: "รอยขีดข่วน",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  white_mark: {
    id: "D011",
    eng: "White Mark",
    thai: "รอยขาว",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  white_dot: {
    id: "D012",
    eng: "White dot",
    thai: "จุดขาว",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  black_dot: {
    id: "D013",
    eng: "Black Dot",
    thai: "จุดดำ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  dirty: {
    id: "D014",
    eng: "Dirty",
    thai: "สกปรก/ขยะ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  glue_stains: {
    id: "D015",
    eng: "Glue Stains",
    thai: "คราบกาว",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  burn_mark: {
    id: "D016",
    eng: "Burn Mark",
    thai: "รอยไหม้",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  rust: {
    id: "D017",
    eng: "Rust",
    thai: "สนิม",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  button_bad_operate: {
    id: "D018",
    eng: "Button bad Operate",
    thai: "ปุ่มไม่ทำงาน",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  button_hard: {
    id: "D019",
    eng: "Button Hard",
    thai: "ปุ่มแข็ง",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  button_deep: {
    id: "D020",
    eng: "Button Deep",
    thai: "ปุ่มลึก",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  touch_screen_difficult: {
    id: "D021",
    eng: "Touch screen difficult",
    thai: "กดติดยาก",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  function_error: {
    id: "D022",
    eng: "Function Error",
    thai: "เทสฟังก์ชั่นไม่ผ่าน",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  function_error_pe: {
    id: "D023",
    eng: "Function Error PE",
    thai: "เทสฟังก์ชั่นไม่ผ่าน PE",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  function_error_de: {
    id: "D024",
    eng: "Function Error DE",
    thai: "เทสฟังก์ชั่นไม่ผ่าน DE",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  function_error_dl: {
    id: "D025",
    eng: "Function Error DL",
    thai: "เทสฟังก์ชั่นไม่ผ่าน DL",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  flash: {
    id: "D026",
    eng: "Flash",
    thai: "เป็นครีบ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  broken: {
    id: "D027",
    eng: "Broken",
    thai: "แตก",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  deform: {
    id: "D028",
    eng: "Deform",
    thai: "เสียรูป",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  swell: {
    id: "D029",
    eng: "Swell",
    thai: "ปูด",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  gap: {
    id: "D030",
    eng: "Gap",
    thai: "ปัญหาระยะช่องว่าง",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  gap_no_balance: {
    id: "D031",
    eng: "Gap No Balance",
    thai: "ช่องว่างไม่เสมอ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  weld_line: {
    id: "D032",
    eng: "Weld Line",
    thai: "รอยประสาน",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  overlapping: {
    id: "D033",
    eng: "Overlapping",
    thai: "เพยอเผยอ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  overlap_film: {
    id: "D034",
    eng: "Overlap Film",
    thai: "ทับฟิล์ม",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  not_lock: {
    id: "D035",
    eng: "Not Lock",
    thai: "ไม่ล็อค",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  not_completely_closed: {
    id: "D036",
    eng: "Not Completely Closed",
    thai: "ลูบไม่สนิท",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  not_peeling: {
    id: "D037",
    eng: "Not Peeling",
    thai: "ไม่ถูกลอก",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  missing: {
    id: "D038",
    eng: "Missing",
    thai: "ขาดหายไป",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  dumper_missing: {
    id: "D039",
    eng: "Dumper Missing",
    thai: "ลูกยางหาย",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  dumper_reverse: {
    id: "D040",
    eng: "Dumper reverse",
    thai: "ลูกยางกลับด้าน",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  push_pull_over: {
    id: "D041",
    eng: "Push-Pull Over Spec",
    thai: "ดัน-ดึง เกินกว่าสเปค",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  push_pull_lower: {
    id: "D042",
    eng: "Push-Pull Lower Spec",
    thai: "ดัน-ดึง ต่ำกว่าสเปค",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  short_shot: {
    id: "D043",
    eng: "Short Shot",
    thai: "ฉีดไม่เต็ม",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  over_cutting: {
    id: "D044",
    eng: "Over Cutting",
    thai: "ตัดเข้าเนื้อ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  open_close_difficult: {
    id: "D045",
    eng: "Open-close Difficult",
    thai: "เปิด-ปิดยาก",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  not_smooth: {
    id: "D046",
    eng: "Not Smooth",
    thai: "ฝืด ไม่ลื่น",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  noise: {
    id: "D047",
    eng: "Noise",
    thai: "มีเสียง",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  pigment: {
    id: "D048",
    eng: "Pigment",
    thai: "ปัญหาเม็ดสี",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  shock_Line: {
    id: "D049",
    eng: "Shock Line",
    thai: "เส้นดำ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  Dent: {
    id: "D050",
    eng: "Dent",
    thai: "ยุบ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  Dirty_Mark: {
    id: "D051",
    eng: "Dirty Mark",
    thai: "เลอะมาร์ค",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  Gas_Mark: {
    id: "D052",
    eng: "Gas Mark",
    thai: "รอยแก๊ส",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  Spray_NG: {
    id: "D053",
    eng: "Spray NG",
    thai: "สเปรย์ไม่ดี",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  Screw_Missing: {
    id: "D054",
    eng: "Screw Missing",
    thai: "ไม่มีสกรู",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  Over_lap: {
    id: "D055",
    eng: "Over Lap",
    thai: "เพจปืน",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  Glass_high: {
    id: "D056",
    eng: "Glass High",
    thai: "กระจกสูง",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  No_information_found: {
    id: "D057",
    eng: "No information found",
    thai: "조회된 자료가 없습니다.",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
  etc: {
    id: "D999",
    eng: "Etc",
    thai: "อื่นๆ",
    codeName_ENG: undefined,
    codeName_TR: undefined,
    codeId: undefined
  },
};
// 조회된 자료가 없습니다.

// จัดกลุ่มตามรูปภาพ (Mapping)
export const ITEM_DEFECT_MAP: Record<string, DefectItem[]> = {
  top: [
    MASTER_DEFECTS.scratch,
    MASTER_DEFECTS.pigment,
    MASTER_DEFECTS.deform,
    MASTER_DEFECTS.white_mark,
    MASTER_DEFECTS.rust,
    MASTER_DEFECTS.broken,
    MASTER_DEFECTS.dirty,
    MASTER_DEFECTS.weld_line,
    MASTER_DEFECTS.shock_Line,
    MASTER_DEFECTS.black_dot,
    MASTER_DEFECTS.Dent,
    MASTER_DEFECTS.Dirty_Mark,
    MASTER_DEFECTS.Gas_Mark,
    MASTER_DEFECTS.short_shot,
    MASTER_DEFECTS.Spray_NG,
    MASTER_DEFECTS.over_cutting,
    MASTER_DEFECTS.burn_mark,
    MASTER_DEFECTS.flash,
    MASTER_DEFECTS.Screw_Missing,
    MASTER_DEFECTS.color_streak,
    MASTER_DEFECTS.swell,
    MASTER_DEFECTS.etc,
  ],
  front: [
    MASTER_DEFECTS.front_lighting_not_full,
    MASTER_DEFECTS.white_mark,
    MASTER_DEFECTS.front_lighting_overlap,
    MASTER_DEFECTS.scratch,
    MASTER_DEFECTS.black_dot,
    MASTER_DEFECTS.front_lighting_through_hole,
    MASTER_DEFECTS.button_bad_operate,
    MASTER_DEFECTS.Over_lap,
    MASTER_DEFECTS.pcb_different_color,
    MASTER_DEFECTS.flash,
    MASTER_DEFECTS.gap,
    MASTER_DEFECTS.button_hard,
    MASTER_DEFECTS.dirty,
    MASTER_DEFECTS.over_cutting,
    MASTER_DEFECTS.button_deep,
    MASTER_DEFECTS.touch_screen_difficult,
    MASTER_DEFECTS.glue_stains,
    MASTER_DEFECTS.function_error,
    MASTER_DEFECTS.not_lock,
    MASTER_DEFECTS.screen_ng,
    MASTER_DEFECTS.pigment,
    MASTER_DEFECTS.etc,
  ],
  lid: [
    MASTER_DEFECTS.scratch,
    MASTER_DEFECTS.white_mark,
    MASTER_DEFECTS.dirty,
    MASTER_DEFECTS.not_lock,
    MASTER_DEFECTS.gap,
    MASTER_DEFECTS.film_ng,
    MASTER_DEFECTS.broken,
    MASTER_DEFECTS.color_streak,
    MASTER_DEFECTS.Glass_high,
    MASTER_DEFECTS.dumper_missing,
    MASTER_DEFECTS.flash,
    MASTER_DEFECTS.dumper_reverse,
    MASTER_DEFECTS.noise,
    MASTER_DEFECTS.glue_stains,
    MASTER_DEFECTS.etc,
    MASTER_DEFECTS.No_information_found,
  ],
  control: [
    MASTER_DEFECTS.swell,
    MASTER_DEFECTS.screen_ng,
    MASTER_DEFECTS.gap_no_balance,
    MASTER_DEFECTS.glue_stains,
    MASTER_DEFECTS.scratch,
    MASTER_DEFECTS.Over_lap,
    MASTER_DEFECTS.not_completely_closed,
    MASTER_DEFECTS.white_mark,
    MASTER_DEFECTS.broken,
    MASTER_DEFECTS.gap,
    MASTER_DEFECTS.etc,
    MASTER_DEFECTS.No_information_found,
  ],
  dtbox: [
    MASTER_DEFECTS.push_pull_over,
    MASTER_DEFECTS.short_shot,
    MASTER_DEFECTS.flash,
    MASTER_DEFECTS.scratch,
    MASTER_DEFECTS.white_mark,
    MASTER_DEFECTS.gap_no_balance,
    MASTER_DEFECTS.open_close_difficult,
    MASTER_DEFECTS.over_cutting,
    MASTER_DEFECTS.push_pull_lower,
    MASTER_DEFECTS.etc,
    MASTER_DEFECTS.No_information_found,
  ],
  window: [
    MASTER_DEFECTS.scratch,
    MASTER_DEFECTS.film_display,
    MASTER_DEFECTS.not_lock,
    MASTER_DEFECTS.missing,
    MASTER_DEFECTS.broken,
    MASTER_DEFECTS.touch_screen_difficult,
    MASTER_DEFECTS.lighting_ng,
    MASTER_DEFECTS.screen_ng,
    MASTER_DEFECTS.dirty,
    MASTER_DEFECTS.white_mark,
    MASTER_DEFECTS.white_dot,
    MASTER_DEFECTS.rust,
    MASTER_DEFECTS.black_dot,
    MASTER_DEFECTS.short_shot,
    MASTER_DEFECTS.etc,
    MASTER_DEFECTS.No_information_found,
  ],
  knob: [
    MASTER_DEFECTS.not_smooth,
    MASTER_DEFECTS.noise,
    MASTER_DEFECTS.missing,
    MASTER_DEFECTS.etc,
    MASTER_DEFECTS.No_information_found,
  ],
  ring: [
    MASTER_DEFECTS.burn_mark,
    MASTER_DEFECTS.black_dot,
    MASTER_DEFECTS.white_mark,
    MASTER_DEFECTS.lighting_ng,
    MASTER_DEFECTS.flash,
    MASTER_DEFECTS.dirty,
    MASTER_DEFECTS.pcb_different_color,
    MASTER_DEFECTS.missing,
    MASTER_DEFECTS.broken,
    MASTER_DEFECTS.not_lock,
    MASTER_DEFECTS.scratch,
    MASTER_DEFECTS.rust,
    MASTER_DEFECTS.etc,
    MASTER_DEFECTS.No_information_found,
  ],
  back: [
    MASTER_DEFECTS.scratch,
    MASTER_DEFECTS.gap,
    MASTER_DEFECTS.overlap_film,
    MASTER_DEFECTS.flash,
    MASTER_DEFECTS.not_lock,
    MASTER_DEFECTS.etc,
    MASTER_DEFECTS.No_information_found,
  ],
  pcb: [
    MASTER_DEFECTS.deform,
    MASTER_DEFECTS.function_error_pe,
    MASTER_DEFECTS.not_lock,
    MASTER_DEFECTS.film_display,
    MASTER_DEFECTS.scratch,
    MASTER_DEFECTS.screen_ng,
    MASTER_DEFECTS.not_peelin,
    MASTER_DEFECTS.function_error_de,
    MASTER_DEFECTS.function_error_dl,
    MASTER_DEFECTS.etc,
    MASTER_DEFECTS.No_information_found,
  ],
  custom1: [
    MASTER_DEFECTS.etc,
    MASTER_DEFECTS.No_information_found,
  ],
};

export const GROUP_A: GroupItem[] = [
  { id: "top", name: "Top Cover", thai: "ท็อป โคเวอร์" },
  { id: "front", name: "Front Panel", thai: "ฟรอน พาแนล" },
  { id: "lid", name: "Lid Assembly", thai: "ลิด แอสแซมบี้" },
  { id: "control", name: "Control Plate", thai: "คอนโทล พาแนล" },
  { id: "dtbox", name: "DT. Box", thai: "ดีที บล็อก" },
  { id: "window", name: "Window Display", thai: "หน้าจอ" },
  { id: "knob", name: "Knob Assembly", thai: "น็อบ/ลูกบิด" },
  { id: "ring", name: "Window Ring", thai: "วินโดว์ ริง" },
  { id: "back", name: "Back Panel", thai: "แบ็ค พาแนล" },
];

export const GROUP_B: GroupItem[] = [
  { id: "pcb", name: "PCB Assembly", thai: "พีซีบี แอสแซมบี้" },
];

export const GROUP_C: GroupItem[] = [
  { id: "custom1", name: "조회된 자료가 없습니다.", thai: "ไม่พบข้อมูล" },
];
