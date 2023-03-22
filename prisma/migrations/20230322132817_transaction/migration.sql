/*
  Warnings:

  - You are about to drop the column `organizationId` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[membershipId,service]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `membershipId` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PspType" AS ENUM ('STRIPE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENDITURE');

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_userId_fkey";

-- DropIndex
DROP INDEX "subscription_userId_organizationId_service_key";

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "organizationId",
DROP COLUMN "userId",
ADD COLUMN     "membershipId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "payment_customer" (
    "id" TEXT NOT NULL,
    "pspId" TEXT NOT NULL,
    "pspType" "PspType" NOT NULL,
    "paymentMethodPspId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "payment_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT,
    "date" DATE NOT NULL,
    "type" "TransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "membershipId" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_customer_pspId_key" ON "payment_customer"("pspId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_membershipId_service_key" ON "subscription"("membershipId", "service");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_customer" ADD CONSTRAINT "payment_customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
