/*
  Warnings:

  - You are about to drop the column `approval` on the `Leave` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('pending', 'approved');

-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "approval",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'pending';
