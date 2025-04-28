import { ChurchIncomeCodeCreateParams } from "../types/churchIncomeCode";
import prisma from "../configuration/db";

export const createChurchIncomeCode = async (
  churchIncomeCode: ChurchIncomeCodeCreateParams,
) => {
  const newChurchIncomeCode = await prisma.$transaction(async (prisma) => {
    const createChurchIncomeCode = await prisma.churchIncomeCode.create({
      data: {
        id: churchIncomeCode.id,
        incomeCodeName: churchIncomeCode.incomeCodeName,
        code: churchIncomeCode.code,
        description: churchIncomeCode.description,
      },
    });
    return createChurchIncomeCode;
  });
  return newChurchIncomeCode;
};

export const patchChurchIncomeCode = async (
  churchIncomeCodeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedChurchIncomeCode = await prisma.churchIncomeCode.update({
    where: { id: churchIncomeCodeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedChurchIncomeCode;
};
export const updateChurchIncomeCode = async (
  incomeCodeId: bigint,
  incomeCode: any,
) => {
  const updatedIncomeCode = await prisma.churchIncomeCode.update({
    where: { id: incomeCodeId },
    data: {
      incomeCodeName: incomeCode?.incomeCodeName,
      code: incomeCode?.code,
      description: incomeCode?.description,
    },
  });
  return updatedIncomeCode;
};

export const deleteChurchIncomeCode = async (churchIncomeCodeId: bigint) => {
  const deletedChurchIncomeCode = await prisma.churchIncomeCode.delete({
    where: { id: churchIncomeCodeId },
  });
  console.log(`DELETE_INCOME_`, deletedChurchIncomeCode);
  return deletedChurchIncomeCode;
};

export const getChurchIncomeCode = async (churchIncomeCodeId: bigint) => {
  const churchIncomeCode = await prisma.churchIncomeCode.findUnique({
    where: { id: churchIncomeCodeId },
  });
  return churchIncomeCode;
};

export const getAllChurchIncomeCode = async () => {
  const where: any = { deleted: false };
  return await prisma.churchIncomeCode.findMany({
    where,
  });
};

export const checkIcomeCodeName = async (incomeCode: {
  incomeCodeName: string;
}) => {
  const newIncomeCode = await prisma.churchIncomeCode.findFirst({
    where: {
      incomeCodeName: incomeCode.incomeCodeName,
    },
  });
  return newIncomeCode;
};

export const checkIncomeCodeExists = async (
  incomeCodeId: bigint,
): Promise<boolean> => {
  const count = await prisma.churchIncomeCode.count({
    where: {
      id: incomeCodeId,
    },
  });
  return count > 0;
};
