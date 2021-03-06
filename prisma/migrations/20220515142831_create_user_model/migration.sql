/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `LastUpdate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apiKeyCreateTime` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saltPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "LastUpdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "apiKey" TEXT,
ADD COLUMN     "apiKeyCreateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "bankAccout" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "planTier" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'user',
ADD COLUMN     "saltPassword" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
