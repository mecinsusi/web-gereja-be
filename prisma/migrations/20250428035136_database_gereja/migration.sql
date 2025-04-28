-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CHURCH', 'STORE', 'FARM');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "userName" VARCHAR(100) NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "phoneNumber" CHAR(14) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "oldData" JSONB NOT NULL,
    "newData" JSONB NOT NULL,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchIncome" (
    "id" BIGSERIAL NOT NULL,
    "incomeCodeId" BIGINT NOT NULL,
    "detail" TEXT,
    "funds" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "bill" VARCHAR(200),
    "billNumber" VARCHAR(100),
    "fundsType" "Type" NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchIncome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchIncomeHistory" (
    "revId" BIGSERIAL NOT NULL,
    "id" BIGINT NOT NULL,
    "incomeCodeId" BIGINT NOT NULL,
    "detail" TEXT,
    "funds" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "bill" VARCHAR(200),
    "billNumber" VARCHAR(100),
    "fundsType" "Type" NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchIncomeHistory_pkey" PRIMARY KEY ("revId")
);

-- CreateTable
CREATE TABLE "ChurchIncomeCode" (
    "id" BIGSERIAL NOT NULL,
    "incomeCodeName" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchIncomeCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchSpending" (
    "id" BIGSERIAL NOT NULL,
    "spendingCodeId" BIGINT NOT NULL,
    "detail" TEXT,
    "funds" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "bill" VARCHAR(200),
    "billNumber" VARCHAR(100),
    "fundsType" "Type" NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchSpending_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchSpendingHistory" (
    "revId" BIGSERIAL NOT NULL,
    "id" BIGINT NOT NULL,
    "spendingCodeId" BIGINT NOT NULL,
    "detail" TEXT,
    "funds" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "bill" VARCHAR(200) NOT NULL,
    "billNumber" VARCHAR(100) NOT NULL,
    "fundsType" "Type" NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchSpendingHistory_pkey" PRIMARY KEY ("revId")
);

-- CreateTable
CREATE TABLE "ChurchSpendingCode" (
    "id" BIGSERIAL NOT NULL,
    "spendingCodeName" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" BIGINT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" BIGINT,

    CONSTRAINT "ChurchSpendingCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncome" ADD CONSTRAINT "ChurchIncome_incomeCodeId_fkey" FOREIGN KEY ("incomeCodeId") REFERENCES "ChurchIncomeCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncome" ADD CONSTRAINT "ChurchIncome_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncome" ADD CONSTRAINT "ChurchIncome_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeHistory" ADD CONSTRAINT "ChurchIncomeHistory_incomeCodeId_fkey" FOREIGN KEY ("incomeCodeId") REFERENCES "ChurchIncomeCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeHistory" ADD CONSTRAINT "ChurchIncomeHistory_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeHistory" ADD CONSTRAINT "ChurchIncomeHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeCode" ADD CONSTRAINT "ChurchIncomeCode_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchIncomeCode" ADD CONSTRAINT "ChurchIncomeCode_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpending" ADD CONSTRAINT "ChurchSpending_spendingCodeId_fkey" FOREIGN KEY ("spendingCodeId") REFERENCES "ChurchSpendingCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpending" ADD CONSTRAINT "ChurchSpending_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpending" ADD CONSTRAINT "ChurchSpending_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingHistory" ADD CONSTRAINT "ChurchSpendingHistory_spendingCodeId_fkey" FOREIGN KEY ("spendingCodeId") REFERENCES "ChurchSpendingCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingHistory" ADD CONSTRAINT "ChurchSpendingHistory_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingHistory" ADD CONSTRAINT "ChurchSpendingHistory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingCode" ADD CONSTRAINT "ChurchSpendingCode_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpendingCode" ADD CONSTRAINT "ChurchSpendingCode_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
