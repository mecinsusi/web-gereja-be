// handling all business logic for income related
import {
  createChurchIncome,
  updateChurchIncome,
  deleteChurchIncome,
  getAllChurchIncome,
  patchChurchIncome,
  getChurchIncome,
} from "../repository/churchIncome";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import {
  ChurchIncomeCreateParams,
  ChurchIncomeUpdateParams,
} from "../types/churchIncome";
import {
  checkIcomeCodeName,
  createChurchIncomeCode,
  getChurchIncomeCode,
} from "../repository/churchIncomeCode";
import { getAllChurchSpending } from "../repository/churchSpending";

export const createChurchIncomeService = async (
  income: ChurchIncomeCreateParams,
) => {
  let incomeCode;
  const existsIncomeCode = await checkIcomeCodeName({
    incomeCodeName: income.incomeCodeName,
  });

  if (existsIncomeCode) {
    incomeCode = await getChurchIncomeCode(income.incomeCodeId);
  } else {
    incomeCode = await createChurchIncomeCode({
      id: income.incomeCodeId,
      incomeCodeName: income.incomeCodeName,
      description: income.description,
      code: income.code,
    });
  }

  if (!incomeCode || !incomeCode.id) {
    throw new Error("Failed to retrieve or create a valid income code");
  }

  try {
    const newIncomeCode = await createChurchIncome({
      ...income,
      incomeCodeId: incomeCode.id,
      createdBy: income.createdBy,
    });
    return newIncomeCode;
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const updateChurchIncomeService = async (
  incomeId: bigint,
  income: ChurchIncomeUpdateParams,
) => {
  const updatedIncome = await updateChurchIncome(incomeId, income);
  return updatedIncome;
};

export const patchChurchIncomeService = async (
  incomeId: bigint,
  operation: {
    op: string;
    path: string;
    value: string;
  },
) => {
  const { op, path, value } = operation;
  const field = path.split("/").pop();
  if (field === undefined) {
    throw new Error("Invalid field");
  }
  try {
    const patchedInventory = await patchChurchIncome(
      incomeId,
      op,
      field,
      value,
    );
    return patchedInventory;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const deleteChurchIncomeService = async (incomeId: bigint) => {
  const deletedIncome = await deleteChurchIncome(incomeId);
  console.log(`DELETE_CHURCH_INCOME`);
  return deletedIncome;
};

export const getChurchIncomeService = async (incomeId: bigint) => {
  const income = await getChurchIncome(incomeId);
  return income;
};

export const getAllChurchIncomeService = async () => {
  const allIncome = await getAllChurchIncome();
  console.log(`ALL_CHURCH_INCOME`, allIncome);
  return allIncome;
};

export const getAllFinanceService = async () => {
  const [income, spending] = await Promise.all([
    getAllChurchIncome(),
    getAllChurchSpending(),
  ]);
  console.log(income);
  console.log(spending);

  const incomeFormatted = income.map((item) => ({
    id: `income-${item.id}`,
    date: item.date,
    type: "income",
    detail: item.detail,
    amount: item.funds,
    category: item.churchIncomeCodeIdRel?.incomeCodeName || "-",
    code: item.churchIncomeCodeIdRel?.code || "-",
  }));

  const spendingFormatted = spending.map((item) => ({
    id: `spending-${item.id}`,
    date: item.date,
    type: "spending",
    detail: item.detail,
    amount: -item.funds,
    category: item.churchSpendingCodeIdRel?.spendingCodeName || "-",
    code: item.churchSpendingCodeIdRel?.code || "-",
  }));

  const combined = [...incomeFormatted, ...spendingFormatted].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return combined;
};
