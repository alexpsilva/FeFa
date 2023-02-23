-- CreateTable
CREATE TABLE "Pacient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "addressStreet" TEXT,
    "addressNumber" TEXT,

    CONSTRAINT "Pacient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pacientId" INTEGER NOT NULL,
    "label" TEXT,
    "number" TEXT NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
