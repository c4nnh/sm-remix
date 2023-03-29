/*
  Warnings:

  - You are about to drop the column `projectRoleId` on the `skill_in_project` table. All the data in the column will be lost.
  - Added the required column `skillId` to the `skill_in_project` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "skill_in_project" DROP CONSTRAINT "skill_in_project_projectRoleId_fkey";

-- AlterTable
ALTER TABLE "skill_in_project" DROP COLUMN "projectRoleId",
ADD COLUMN     "skillId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "autoPay" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "skill_in_project" ADD CONSTRAINT "skill_in_project_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
