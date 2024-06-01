/*
  Warnings:

  - A unique constraint covering the columns `[UserWalletId]` on the table `UserWallet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserWallet" ALTER COLUMN "UserWalletId" DROP DEFAULT;
DROP SEQUENCE "UserWallet_UserWalletId_seq";

-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_UserWalletId_key" ON "UserWallet"("UserWalletId");
