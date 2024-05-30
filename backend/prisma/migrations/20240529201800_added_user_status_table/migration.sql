-- CreateTable
CREATE TABLE "UserStatus" (
    "Id" INTEGER NOT NULL,
    "UserName" TEXT NOT NULL,
    "Status" BOOLEAN NOT NULL,

    CONSTRAINT "UserStatus_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStatus_UserName_key" ON "UserStatus"("UserName");

-- AddForeignKey
ALTER TABLE "UserStatus" ADD CONSTRAINT "UserStatus_UserName_fkey" FOREIGN KEY ("UserName") REFERENCES "User"("UserName") ON DELETE RESTRICT ON UPDATE CASCADE;
