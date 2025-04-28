import prisma from "../configuration/db";
import {
  ChurchIncomeCreateParams,
  ChurchIncomeUpdateParams,
} from "../types/churchIncome";

export const createChurchIncome = async (
  churchIncome: ChurchIncomeCreateParams,
) => {
  const newChurchIncome = await prisma.$transaction(async (prisma) => {
    const createChurchIncome = await prisma.churchIncome.create({
      data: {
        id: churchIncome.id,
        detail: churchIncome.detail,
        funds: churchIncome.funds,
        date: churchIncome.date,
        bill: churchIncome.bill,
        billNumber: churchIncome.billNumber,
        fundsType: churchIncome.fundsType,
        createAt: churchIncome.createdAt,
        createBy: churchIncome.createdBy,
        churchIncomeCodeIdRel: {
          connectOrCreate: {
            where: {
              id: churchIncome.incomeCodeId,
            },
            create: {
              incomeCodeName: churchIncome.incomeCodeName,
              code: churchIncome.code,
              description: churchIncome.description,
            },
          },
        },
      },
    });
    return createChurchIncome;
  });
  return newChurchIncome;
};

export const updateChurchIncome = async (
  churchIncomeId: bigint,
  churchIncome: ChurchIncomeUpdateParams,
) => {
  const newUpdatedChurchIncome = await prisma.$transaction(async (prisma) => {
    const currentChurchIncome = await prisma.churchIncome.findUnique({
      where: { id: churchIncomeId },
      include: {
        churchIncomeCodeIdRel: true,
      },
    });
    if (!currentChurchIncome) {
      throw new Error("ChurchIncome not found.");
    }
    const updatedChurchIncome = await prisma.churchIncome.update({
      where: { id: churchIncomeId },
      data: {
        id: churchIncome.id,
        detail: churchIncome.detail,
        funds: churchIncome.funds,
        date: churchIncome.date,
        bill: churchIncome.bill,
        billNumber: churchIncome.billNumber,
        fundsType: churchIncome.fundsType,
        churchIncomeCodeIdRel: {
          update: {
            data: {
              incomeCodeName: churchIncome.incomeCodeName,
              description: churchIncome.description,
              code: churchIncome.code,
            },
          },
        },
      },
    });
    await prisma.churchIncomeHistory.create({
      data: {
        id: currentChurchIncome.id,
        detail: currentChurchIncome.detail,
        funds: currentChurchIncome.funds,
        date: currentChurchIncome.date,
        bill: currentChurchIncome.bill,
        billNumber: currentChurchIncome.billNumber,
        fundsType: currentChurchIncome.fundsType,
        incomeCodeId: currentChurchIncome.incomeCodeId,
        createAt: currentChurchIncome.createAt,
        updatedAt: new Date(),
      },
    });
    return updatedChurchIncome;
  });
  return newUpdatedChurchIncome;
};

export const patchChurchIncome = async (
  churchIncomeId: bigint,
  op: string,
  field: string,
  value: string,
) => {
  const patchedChurchIncome = await prisma.churchIncome.update({
    where: { id: churchIncomeId },
    data: { [field]: op === "add" || op === "replace" ? value : null },
  });
  return patchedChurchIncome;
};

export const deleteChurchIncome = async (churchIncomeId: bigint) => {
  const deletedChurchIncome = await prisma.churchIncome.delete({
    where: { id: churchIncomeId },
  });
  console.log(`DELETE_INCOME_`, deletedChurchIncome);
  return deletedChurchIncome;
};

export const getChurchIncome = async (churchIncomeId: bigint) => {
  const churchIncome = await prisma.churchIncome.findUnique({
    where: { id: churchIncomeId },
    include: {
      churchIncomeCodeIdRel: true,
    },
  });
  return churchIncome;
};

export const getAllChurchIncome = async () => {
  const where: any = { deleted: false };

  return await prisma.churchIncome.findMany({
    where,
    include: { churchIncomeCodeIdRel: true },
    orderBy: {
      date: "desc",
    },
  });
};
