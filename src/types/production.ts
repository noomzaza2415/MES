export type ProductionStatus = 'IN PROGRESS' | 'COMPLETED' | 'IDLE' | 'STOPPED';

export interface ProductionLog {
  lotLg: string;
  modelSuffix: string;
  plan: number;
  actual: number;
  ng: number;
  status: ProductionStatus;
}

export interface DefectDetail {
  id: string;
  name: string;
  nameThai: string;
  qty: number;
}