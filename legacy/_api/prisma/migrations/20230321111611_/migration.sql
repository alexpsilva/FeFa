/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `AuthToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AuthToken" DROP COLUMN "expiredAt",
ADD COLUMN     "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
