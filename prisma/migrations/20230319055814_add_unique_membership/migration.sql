/*
  Warnings:

  - A unique constraint covering the columns `[userId,organizationId]` on the table `membership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "membership_userId_organizationId_key" ON "membership"("userId", "organizationId");
