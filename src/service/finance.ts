import {
  getAllIncomeCodesWithTotal,
  getAllSpendingCodesWithTotal,
} from "../repository/finance";

export const getFinanceReport = async (
  startDate?: string,
  endDate?: string,
) => {
  const incomes = await getAllIncomeCodesWithTotal(startDate, endDate);
  const spendings = await getAllSpendingCodesWithTotal(startDate, endDate);

  return { incomes, spendings };
};
