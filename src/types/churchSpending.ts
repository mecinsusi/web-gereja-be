export interface ChurchSpendingCreateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  date: Date;
  spendingTypeId: bigint;
  spendingTypeName: string;
  description: string;
  code: string;
  bill: string | null;
  billNumber: string | null;
  createdBy: string;
  createdAt: Date;
}

export interface ChurchSpendingUpdateParams {
  id: bigint;
  detail: string;
  funds: bigint;
  date: Date;
  spendingTypeId: bigint;
  spendingTypeName: string;
  description: string;
  code: string;
  bill: string | null;
  billNumber: string | null;
  updatedAt: Date;
  updatedBy: bigint;
}
