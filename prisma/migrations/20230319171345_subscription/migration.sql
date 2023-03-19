-- CreateEnum
CREATE TYPE "SubscriptionService" AS ENUM ('PROJECT_MANAGEMENT', 'SKIL_MANAGEMENT');

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "service" "SubscriptionService" NOT NULL,
    "expiredDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_userId_organizationId_service_key" ON "subscription"("userId", "organizationId", "service");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
