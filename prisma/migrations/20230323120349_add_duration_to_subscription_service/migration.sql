-- AlterTable
ALTER TABLE "subscription_service" ADD COLUMN     "day" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "month" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "year" INTEGER NOT NULL DEFAULT 0;
