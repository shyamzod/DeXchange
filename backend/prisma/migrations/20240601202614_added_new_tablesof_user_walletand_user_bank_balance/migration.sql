/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "Id",
ADD COLUMN     "UserId" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("UserId");

-- CreateTable
CREATE TABLE "UserWallet" (
    "UserWalletId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "BTCBalance" INTEGER NOT NULL,
    "USDTBalance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserWallet_pkey" PRIMARY KEY ("UserWalletId")
);

-- CreateTable
CREATE TABLE "userBankBalance" (
    "Id" SERIAL NOT NULL,
    "Branch" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "BankBalance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "userBankBalance_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_username_key" ON "UserWallet"("username");

-- CreateIndex
CREATE UNIQUE INDEX "userBankBalance_username_key" ON "userBankBalance"("username");

-- AddForeignKey
ALTER TABLE "UserWallet" ADD CONSTRAINT "UserWallet_UserWalletId_fkey" FOREIGN KEY ("UserWalletId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
