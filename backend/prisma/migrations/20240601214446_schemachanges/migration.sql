/*
  Warnings:

  - The primary key for the `UserStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[UserId]` on the table `UserStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserId]` on the table `UserWallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserId` to the `UserStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `UserWallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserStatus" DROP CONSTRAINT "UserStatus_UserName_fkey";

-- DropForeignKey
ALTER TABLE "UserWallet" DROP CONSTRAINT "UserWallet_UserWalletId_fkey";

-- DropIndex
DROP INDEX "UserWallet_UserWalletId_key";

-- AlterTable
ALTER TABLE "UserStatus" DROP CONSTRAINT "UserStatus_pkey",
ADD COLUMN     "UserId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserStatus_pkey" PRIMARY KEY ("id");

-- AlterTable
CREATE SEQUENCE userwallet_userwalletid_seq;
ALTER TABLE "UserWallet" ADD COLUMN     "UserId" INTEGER NOT NULL,
ALTER COLUMN "UserWalletId" SET DEFAULT nextval('userwallet_userwalletid_seq');
ALTER SEQUENCE userwallet_userwalletid_seq OWNED BY "UserWallet"."UserWalletId";

-- CreateIndex
CREATE UNIQUE INDEX "UserStatus_UserId_key" ON "UserStatus"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_UserId_key" ON "UserWallet"("UserId");

-- AddForeignKey
ALTER TABLE "UserStatus" ADD CONSTRAINT "UserStatus_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWallet" ADD CONSTRAINT "UserWallet_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
