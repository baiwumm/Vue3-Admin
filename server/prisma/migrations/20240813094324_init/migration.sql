-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "zhCN" TEXT,
    "enUS" TEXT,
    "jaJP" TEXT,
    "zhTW" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;
