import { Type } from "@prisma/client";

export interface ChurchSpendingCreateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  date: Date;
  spendingCodeId: bigint;
  spendingCodeName: string;
  description: string;
  code: string;
  bill: string | null;
  billNumber: string | null;
  userName: string;
  fundsType: Type;
  createdBy: bigint;
  createdAt: Date;
}

export interface ChurchSpendingUpdateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  date: Date;
  spendingCodeId: bigint;
  spendingCodeName: string;
  description: string;
  code: string;
  bill: string | null;
  billNumber: string | null;
  fundsType: Type;
  updatedAt: Date;
  updatedBy: bigint;
}
