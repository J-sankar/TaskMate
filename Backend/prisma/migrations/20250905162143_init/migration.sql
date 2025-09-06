/*
  Warnings:

  - The `role` column on the `UserTask` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `refreshtokens` on the `Users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "taskmate_schema"."UserTasksRole" AS ENUM ('ASSIGNEE', 'OWNER', 'RIVIEWER');

-- AlterTable
ALTER TABLE "taskmate_schema"."UserTask" DROP COLUMN "role",
ADD COLUMN     "role" "taskmate_schema"."UserTasksRole" NOT NULL DEFAULT 'ASSIGNEE';

-- AlterTable
ALTER TABLE "taskmate_schema"."Users" DROP COLUMN "refreshtokens",
ADD COLUMN     "teamId" INTEGER;

-- DropEnum
DROP TYPE "taskmate_schema"."UserTasksROle";

-- CreateTable
CREATE TABLE "taskmate_schema"."Teams" (
    "teamId" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "managerId" INTEGER NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "taskmate_schema"."RefreshTokens" (
    "tokenId" SERIAL NOT NULL,
    "hashToken" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshTokens_pkey" PRIMARY KEY ("tokenId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teams_managerId_key" ON "taskmate_schema"."Teams"("managerId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_hashToken_key" ON "taskmate_schema"."RefreshTokens"("hashToken");

-- AddForeignKey
ALTER TABLE "taskmate_schema"."Users" ADD CONSTRAINT "Users_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "taskmate_schema"."Teams"("teamId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskmate_schema"."Teams" ADD CONSTRAINT "Teams_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "taskmate_schema"."Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskmate_schema"."RefreshTokens" ADD CONSTRAINT "RefreshTokens_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "taskmate_schema"."Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
