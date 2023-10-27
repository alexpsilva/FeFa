-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_pacientId_fkey";

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
