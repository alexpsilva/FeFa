/*
  Warnings:

  - You are about to drop the column `city` on the `Pacient` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Pacient` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Pacient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pacient" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "state",
ADD COLUMN     "note" TEXT;
