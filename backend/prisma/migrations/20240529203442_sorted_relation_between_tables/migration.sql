/*
  Warnings:

  - The primary key for the `UserStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `UserStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserStatus" DROP CONSTRAINT "UserStatus_pkey",
DROP COLUMN "Id";
