import { ChurchIncomeCodeCreateParams } from "../types/churchIncomeCode";
import {
  createChurchIncomeCode,
  deleteChurchIncomeCode,
  getChurchIncomeCode,
  updateChurchIncomeCode,
  getAllChurchIncomeCode,
} from "../repository/churchIncomeCode";

export const createChurchIncomeCodeService = async (
  incomeCode: ChurchIncomeCodeCreateParams,
) => {
  const newIncomeCode = await createChurchIncomeCode(incomeCode);
  return newIncomeCode;
};

export const updateChurchIncomeCodeService = async (
  incomeCodeId: bigint,
  incomeCode: any,
) => {
  const updatedIncomeCode = await updateChurchIncomeCode(
    incomeCodeId,
    incomeCode,
  );
  return updatedIncomeCode;
};

export const deleteChurchIncomeCodeService = async (incomeCodeId: bigint) => {
  const deletedIncomeCode = await deleteChurchIncomeCode(incomeCodeId);
  return deletedIncomeCode;
};

export const getChurchIncomeCodeService = async (incomeCodeId: bigint) => {
  const incomeCode = await getChurchIncomeCode(incomeCodeId);
  return incomeCode;
};

export const getAllChurchIncomeCodeService = async () => {
  const allIncomeCode = await getAllChurchIncomeCode();

  return allIncomeCode.sort((a, b) => {
    const aParts = a.code.split(".").map(Number);
    const bParts = b.code.split(".").map(Number);
    const len = Math.max(aParts.length, bParts.length);
    for (let i = 0; i < len; i++) {
      const aVal = aParts[i] ?? 0;
      const bVal = bParts[i] ?? 0;
      if (aVal !== bVal) return aVal - bVal;
    }
    return 0;
  });
};
