/*
  Warnings:

  - You are about to drop the column `addressNumber` on the `Pacient` table. All the data in the column will be lost.
  - You are about to drop the column `addressStreet` on the `Pacient` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `Pacient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pacient" DROP COLUMN "addressNumber",
DROP COLUMN "addressStreet",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "state" TEXT;

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "pacientId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
