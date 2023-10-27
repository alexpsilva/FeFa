/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `AuthToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_value_key" ON "AuthToken"("value");
