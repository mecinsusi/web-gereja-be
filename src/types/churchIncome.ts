import { Type } from "@prisma/client";

export interface ChurchIncomeCreateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  date: Date;
  incomeCodeId: bigint;
  incomeCodeName: string;
  description: string;
  code: string;
  bill: string | null;
  billNumber: string | null;
  fundsType: Type;
  createdAt: Date;
  createdBy: undefined;
}

export interface ChurchIncomeUpdateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  date: Date;
  incomeCodeId: bigint;
  incomeCodeName: string;
  description: string;
  code: string;
  bill: string | null;
  billNumber: string | null;
  fundsType: Type;
  updatedAt: Date;
  updatedBy: bigint;
}
