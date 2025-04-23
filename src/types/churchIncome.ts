export interface ChurchIncomeCreateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  date: Date;
  incomeTypeId: bigint;
  incomeTypeName: string;
  description: string;
  code: string;
  bill: string | null;
  billNumber: string | null;
  createdAt: Date;
  createdBy: undefined;
}

export interface ChurchIncomeUpdateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  date: Date;
  incomeTypeId: bigint;
  incomeTypeName: string;
  description: string;
  code: string;
  bill: string | null;
  billNumber: string | null;
  updatedAt: Date;
  updatedBy: bigint;
}
