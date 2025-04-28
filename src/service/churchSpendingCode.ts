import { ChurchSpendingCodeCreateParams } from "../types/churchSpendingCode";
import {
  createChurchSpendingCode,
  deleteChurchSpendingCode,
  getChurchSpendingCode,
  updateChurchSpendingCode,
  getAllChurchSpendingCode,
} from "../repository/churchSpendingCode";

export const createChurchSpendingCodeService = async (
  spendingCode: ChurchSpendingCodeCreateParams,
) => {
  const newSpendingCode = await createChurchSpendingCode(spendingCode);
  return newSpendingCode;
};

export const updateChurchSpendingCodeService = async (
  spendingCodeId: bigint,
  spendingCode: any,
) => {
  const updatedSpendingCode = await updateChurchSpendingCode(
    spendingCodeId,
    spendingCode,
  );
  return updatedSpendingCode;
};

export const deleteChurchSpendingCodeService = async (
  spendingCodeId: bigint,
) => {
  const deletedSpendingCode = await deleteChurchSpendingCode(spendingCodeId);
  return deletedSpendingCode;
};

export const getChurchSpendingCodeService = async (spendingCodeId: bigint) => {
  const spendingCode = await getChurchSpendingCode(spendingCodeId);
  return spendingCode;
};

export const getAllChurchSpendingCodeService = async () => {
  const allSpendingCode = await getAllChurchSpendingCode();
  return allSpendingCode.sort((a, b) => {
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
