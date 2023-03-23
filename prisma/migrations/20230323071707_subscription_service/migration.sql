/*
  Warnings:

  - You are about to drop the column `service` on the `subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[membershipId,subscriptionServiceId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subscriptionServiceId` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionServiceType" AS ENUM ('PROJECT_MANAGEMENT', 'SKIL_MANAGEMENT');

-- DropIndex
DROP INDEX "subscription_membershipId_service_key";

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "service",
ADD COLUMN     "subscriptionServiceId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "SubscriptionService";

-- CreateTable
CREATE TABLE "subscription_service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "SubscriptionServiceType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_service_type_key" ON "subscription_service"("type");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_membershipId_subscriptionServiceId_key" ON "subscription"("membershipId", "subscriptionServiceId");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_subscriptionServiceId_fkey" FOREIGN KEY ("subscriptionServiceId") REFERENCES "subscription_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
