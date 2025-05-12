-- DropForeignKey
ALTER TABLE "ChurchIncome" DROP CONSTRAINT "ChurchIncome_incomeCodeId_fkey";

-- DropForeignKey
ALTER TABLE "ChurchIncomeHistory" DROP CONSTRAINT "ChurchIncomeHistory_incomeCodeId_fkey";

-- DropForeignKey
ALTER TABLE "ChurchSpending" DROP CONSTRAINT "ChurchSpending_spendingCodeId_fkey";

-- DropForeignKey
ALTER TABLE "ChurchSpendingHistory" DROP CONSTRAINT "ChurchSpendingHistory_spendingCodeId_fkey";

-- DropForeignKey
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncome" ADD CONSTRAINT "ChurchIncome_incomeCodeId_fkey" FOREIGN KEY ("incomeCodeId") REFERENCES "ChurchIncomeCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeHistory" ADD CONSTRAINT "ChurchIncomeHistory_incomeCodeId_fkey" FOREIGN KEY ("incomeCodeId") REFERENCES "ChurchIncomeCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpending" ADD CONSTRAINT "ChurchSpending_spendingCodeId_fkey" FOREIGN KEY ("spendingCodeId") REFERENCES "ChurchSpendingCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingHistory" ADD CONSTRAINT "ChurchSpendingHistory_spendingCodeId_fkey" FOREIGN KEY ("spendingCodeId") REFERENCES "ChurchSpendingCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
