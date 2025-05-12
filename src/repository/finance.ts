import prisma from "../configuration/db";

export const getAllIncomeCodesWithTotal = async (
  startDate?: string,
  endDate?: string,
) => {
  const incomeCodes = await prisma.churchIncomeCode.findMany({
    where: { deleted: false },
    include: {
      churchIncomeCodeIdRel: {
        where: {
          deleted: false,
          ...(startDate && { createAt: { gte: new Date(startDate) } }),
          ...(endDate && { createAt: { lte: new Date(endDate) } }),
        },
        select: { funds: true, createAt: true },
      },
    },
  });

  return incomeCodes.map((code) => ({
    id: code.id,
    code: code.code,
    name: code.incomeCodeName,
    totalIncome: code.churchIncomeCodeIdRel.reduce(
      (sum, i) => sum + BigInt(i.funds),
      BigInt(0),
    ),
    date: code.churchIncomeCodeIdRel.map((rel) => rel.createAt), // can include date if needed
  }));
};

export const getAllSpendingCodesWithTotal = async (
  startDate?: string,
  endDate?: string,
) => {
  const spendingCodes = await prisma.churchSpendingCode.findMany({
    where: { deleted: false },
    include: {
      churchSpendingCodeIdRel: {
        where: {
          deleted: false,
          ...(startDate && { createAt: { gte: new Date(startDate) } }), // assuming createAt here too
          ...(endDate && { createAt: { lte: new Date(endDate) } }),     // assuming createAt here too
        },
        select: { funds: true, createAt: true },
      },
    },
  });

  return spendingCodes.map((code) => ({
    id: code.id,
    code: code.code,
    name: code.spendingCodeName,
    totalSpending: code.churchSpendingCodeIdRel.reduce(
      (sum, s) => sum + BigInt(s.funds),
      BigInt(0),
    ),
    date: code.churchSpendingCodeIdRel.map((rel) => rel.createAt),
  }));
};

