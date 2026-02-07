/* eslint-disable @typescript-eslint/no-explicit-any */
// const BASE_URL = "http://192.168.2.5:9029/api/v1/Ng";

// export interface CategoryResult {
//   codeId: string;
//   cMaType1: string; // คีย์ที่ API ส่งกลับมา
//   codeName_TR: string;
//   codeName_ENG: string;
// }

// export interface ApiResponse<T> {
//   statusCode: number;
//   isSuccess: boolean;
//   errorMessages: string[];
//   result: T;
// }

// export interface WorkOrder {
//   labelId: string;
//   dtLabel: string;
//   labelState: string;
//   noWkOrd: string;
//   cdGItem: string;
//   cdEquip: string;
//   modelSuffix: string;
//   itemMat: string;
//   lgLine: string;
//   labelQty: number;
//   lgNo: string;
// }

// export interface DefectResult {
//   codeId: string;
//   cMaType2: string;
//   codeName_TR: string;
//   codeName_ENG: string;
//   badQty: number;
// }

// export const defectService = {
//   // ดึงข้อมูลกลุ่มที่ 1 (St)
//   getCategorySt: async (): Promise<ApiResponse<CategoryResult[]>> => {
//     // ล็อค cMaType=QM01 ไปใน URL เลย
//     const res = await fetch(`${BASE_URL}/GetCategoryStAsync?cMaType=QM01`);
//     return res.json();
//   },

//   // ดึงข้อมูลกลุ่มที่ 2 (Nd)
//   getCategoryNd: async (): Promise<ApiResponse<CategoryResult[]>> => {
//     const res = await fetch(`${BASE_URL}/GetCategoryNdAsync?cMaType=QM01`);
//     return res.json();
//   },

//   // ดึงข้อมูลกลุ่มที่ 3 (Rd)
//   getCategoryRd: async (): Promise<ApiResponse<CategoryResult[]>> => {
//     const res = await fetch(`${BASE_URL}/GetCategoryRdAsync?cMaType=QM01`);
//     return res.json();
//   },

//   getWorkOrder: async (
//     cdEquip: string,
//     labelId: string,
//   ): Promise<ApiResponse<WorkOrder[]>> => {
//     const res = await fetch(
//       `${BASE_URL.replace("/Ng", "/WorkOrder")}/GetWorkOrderByLabelIdAsync?cdEquip=${cdEquip}&labelId=${labelId}`,
//     );
//     return res.json();
//   },

//   getDefects: async (cMaType: string, noWkOrd: string): Promise<ApiResponse<DefectResult[]>> => {
//     const res = await fetch(`${BASE_URL}/Ng/GetDefectStAsync?cMaType=${cMaType}&noWkOrd=${noWkOrd}`);
//     return res.json();
//   },

//   getDefectsNd: async (cMaType: string, noWkOrd: string): Promise<ApiResponse<DefectResult[]>> => {
//     const res = await fetch(`${BASE_URL}/Ng/GetDefectNdAsync?cMaType=${cMaType}&noWkOrd=${noWkOrd}`);
//     return res.json();
//   }
// };

// ปรับ BASE_URL ให้เป็น Prefix หลัก (ตัด /Ng ออกจากตัวแปรหลักเพื่อป้องกันการซ้อน)
const BASE_URL = "http://192.168.2.5:9029/api/v1";

export interface CategoryResult {
  codeId: string;
  cMaType1: string; // คีย์ที่ API ส่งกลับมา
  codeName_TR: string;
  codeName_ENG: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: T;
}

export interface WorkOrder {
  labelId: string;
  dtLabel: string;
  labelState: string;
  noWkOrd: string;
  cdGItem: string;
  cdEquip: string;
  modelSuffix: string;
  itemMat: string;
  lgLine: string;
  labelQty: number;
  lgNo: string;
}

export interface DefectResult {
  codeId: string;
  cMaType2: string;
  codeName_TR: string;
  codeName_ENG: string;
  badQty: number;
}

export interface SaveNgPayload {
  labelId: string;
  noWkOrd: string;
  cdEquip: string;
  items: {
    defectCode: string;
    qty: number;
    categoryGroup: "ST" | "ND" | "RD"; // เพื่อให้ฝั่ง DB รู้ว่ามาจากกลุ่มไหน
  }[];
}

// เพิ่ม options ใน safeFetch เพื่อรองรับ POST
async function safeFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      return {
        isSuccess: false,
        result: [] as any,
        statusCode: res.status,
        errorMessages: ["API Connection Error"],
      };
    }

    const text = await res.text();
    if (!text)
      return {
        isSuccess: true,
        result: {} as T,
        statusCode: 204,
        errorMessages: [],
      };

    return JSON.parse(text);
  } catch (error) {
    return {
      isSuccess: false,
      result: [] as any,
      statusCode: 500,
      errorMessages: [String(error)],
    };
  }
}

export const defectService = {
  getCategorySt: () =>
    safeFetch<CategoryResult[]>(
      `${BASE_URL}/Ng/GetCategoryStAsync?cMaType=QM01`,
    ),
  getCategoryNd: () =>
    safeFetch<CategoryResult[]>(
      `${BASE_URL}/Ng/GetCategoryNdAsync?cMaType=QM01`,
    ),
  getCategoryRd: () =>
    safeFetch<CategoryResult[]>(
      `${BASE_URL}/Ng/GetCategoryRdAsync?cMaType=QM01`,
    ),

  getWorkOrder: (cdEquip: string, labelId: string) =>
    safeFetch<WorkOrder[]>(
      `${BASE_URL}/WorkOrder/GetWorkOrderByLabelIdAsync?cdEquip=${cdEquip}&labelId=${labelId}`,
    ),

  // แก้ไข URL ให้มี /Ng เพียงอันเดียว และแยกฟังก์ชันให้ชัดเจน
  getDefectsSt: (cMaType: string, noWkOrd: string) =>
    safeFetch<DefectResult[]>(
      `${BASE_URL}/Ng/GetDefectStAsync?cMaType=${cMaType}&noWkOrd=${noWkOrd}`,
    ),

  getDefectsNd: (cMaType: string, noWkOrd: string) =>
    safeFetch<DefectResult[]>(
      `${BASE_URL}/Ng/GetDefectNdAsync?cMaType=${cMaType}&noWkOrd=${noWkOrd}`,
    ),

  getDefectsRd: (cMaType: string, noWkOrd: string) =>
    safeFetch<DefectResult[]>(
      `${BASE_URL}/Ng/GetDefectRdAsync?cMaType=${cMaType}&noWkOrd=${noWkOrd}`,
    ),

  // เพิ่มฟังก์ชันสำหรับ Save
  saveNgRecord: (payload: SaveNgPayload[]) =>
    safeFetch<any>(`${BASE_URL}/Ng/SaveNgAsync`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
