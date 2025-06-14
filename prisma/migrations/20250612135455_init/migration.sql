/*
  Warnings:

  - You are about to drop the `Mst_User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Mst_User";

-- CreateTable
CREATE TABLE "mst_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mst_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mst_user_email_key" ON "mst_user"("email");
