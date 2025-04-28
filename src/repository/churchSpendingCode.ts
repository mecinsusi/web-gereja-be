import { ChurchSpendingCodeCreateParams } from "../types/churchSpendingCode";
import prisma from "../configuration/db";

export const createChurchSpendingCode = async (
  churchSpendingCode: ChurchSpendingCodeCreateParams,
) => {
  const newChurchSpendingCode = await prisma.$transaction(async (prisma) => {
    const createChurchSpendingCode = await prisma.churchSpendingCode.create({
      data: {
        id: churchSpendingCode.id,
        spendingCodeName: churchSpendingCode.spendingCodeName,
        code: churchSpendingCode.code,
        description: churchSpendingCode.description,
      },
    });
    return createChurchSpendingCode;
  });
  return newChurchSpendingCode;
};

export const updateChurchSpendingCode = async (
  incomeCodeId: bigint,
  incomeCode: any,
) => {
  const updatedIncomeCode = await prisma.churchSpendingCode.update({
    where: { id: incomeCodeId },
    data: {
      spendingCodeName: incomeCode?.spendingCodeName,
      code: incomeCode?.code,
      description: incomeCode?.description,
    },
  });
  return updatedIncomeCode;
};

export const patchChurchSpendingCode = async (
  churchSpendingCodeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedChurchSpendingCode = await prisma.churchIncomeCode.update({
    where: { id: churchSpendingCodeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedChurchSpendingCode;
};

export const deleteChurchSpendingCode = async (
  churchSpendingCodeId: bigint,
) => {
  const deletedChurchSpendingCode = await prisma.churchSpendingCode.delete({
    where: { id: churchSpendingCodeId },
  });
  console.log(`DELETE_SPENDING_`, deletedChurchSpendingCode);
  return deletedChurchSpendingCode;
};

export const getChurchSpendingCode = async (churchSpendingCodeId: bigint) => {
  const churchSpendingCode = await prisma.churchSpendingCode.findUnique({
    where: { id: churchSpendingCodeId },
  });
  return churchSpendingCode;
};

export const getAllChurchSpendingCode = async () => {
  const where: any = { deleted: false };
  return await prisma.churchSpendingCode.findMany({
    where,
  });
};

export const checkSpendingCodeName = async (spendingType: {
  spendingCodeName: string;
}) => {
  const newSpendingCode = await prisma.churchSpendingCode.findFirst({
    where: {
      spendingCodeName: spendingType.spendingCodeName,
    },
  });
  return newSpendingCode;
};

export const checkSpendingCodeExists = async (
  spendingCodeId: bigint,
): Promise<boolean> => {
  const count = await prisma.churchSpendingCode.count({
    where: {
      id: spendingCodeId,
    },
  });
  return count > 0;
};
