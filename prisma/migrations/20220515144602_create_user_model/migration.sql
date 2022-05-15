/*
  Warnings:

  - You are about to drop the column `bankAccout` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bankAccout",
ADD COLUMN     "bankAccount" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "apiKeyCreateTime" DROP NOT NULL;
