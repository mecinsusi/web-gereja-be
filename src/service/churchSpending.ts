import {
  createChurchSpending,
  updateChurchSpending,
  deleteChurchSpending,
  getAllChurchSpending,
  getChurchSpending,
  patchChurchSpending,
} from "../repository/churchSpending";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
const BASE_URL = process.env.BASE_URL || "http://localhost:5000"

import {
  checkSpendingCodeName,
  createChurchSpendingCode,
  getChurchSpendingCode,
} from "../repository/churchSpendingCode";
import {
  ChurchSpendingCreateParams,
  ChurchSpendingUpdateParams,
} from "../types/churchSpending";

export const createChurchSpendingService = async (
  spending: ChurchSpendingCreateParams,
) => {
  let spendingCode;
  const existsSpendingCode = await checkSpendingCodeName({
    spendingCodeName: spending.spendingCodeName,
  });
  if (existsSpendingCode) {
    spendingCode = await getChurchSpendingCode(spending.spendingCodeId);
  } else {
    spendingCode = await createChurchSpendingCode({
      id: spending.spendingCodeId,
      spendingCodeName: spending.spendingCodeName,
      description: spending.description,
      code: spending.code,
    });
  }
  if (!spendingCode || !spendingCode.id) {
    throw new Error("Failed to retrieve or create a valid spending code");
  }
  try {
    const newSpendingCode = await createChurchSpending({
      ...spending,
      spendingCodeId: spendingCode.id,
    });
    return newSpendingCode;
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      const message = error.message.split("\n");
      throw new Error(message[message.length - 1]);
    }
    throw new Error("Internal server error");
  }
};

export const updateChurchSpendingService = async (
  spendingId: bigint,
  spending: ChurchSpendingUpdateParams,
) => {
  const updatedSpending = await updateChurchSpending(spendingId, spending);
  return updatedSpending;
};

export const patchChurchSpendingService = async (
  spendingId: bigint,
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
    const patchedInventory = await patchChurchSpending(
      spendingId,
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

export const deleteChurchSpendingService = async (spendingId: bigint) => {
  const deletedSpending = await deleteChurchSpending(spendingId);
  console.log(`DELETE_CHURCH_SPENDING`);
  return deletedSpending;
};

export const getChurchSpendingService = async (spendingId: bigint) => {
  const spending = await getChurchSpending(spendingId);
  return spending;
};

export const getAllChurchSpendingService = async () => {
  const allSpending = await getAllChurchSpending();
  const updatedSpending = allSpending.map((item) => ({
    ...item,
    bill: item.bill ? `${BASE_URL}/uploads/${item.bill}` : null,
  }));
  console.log(`ALL_CHURCH_SPENDING`, allSpending);
  return updatedSpending;
};
