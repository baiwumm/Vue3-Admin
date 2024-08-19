/*
  Warnings:

  - A unique constraint covering the columns `[permission]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Menu_permission_key" ON "Menu"("permission");
