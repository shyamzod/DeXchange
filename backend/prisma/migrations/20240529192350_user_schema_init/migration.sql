-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "UserName" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "PhoneNo" BIGINT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");
