/*
  Warnings:

  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_parentId_fkey";

-- DropTable
DROP TABLE "Language";

-- CreateTable
CREATE TABLE "Internalization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "zhCN" TEXT,
    "enUS" TEXT,
    "jaJP" TEXT,
    "zhTW" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Internalization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Internalization_name_key" ON "Internalization"("name");

-- AddForeignKey
ALTER TABLE "Internalization" ADD CONSTRAINT "Internalization_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Internalization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
