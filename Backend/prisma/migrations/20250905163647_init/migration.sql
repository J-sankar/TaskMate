/*
  Warnings:

  - Added the required column `deviceId` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "taskmate_schema"."RefreshTokens" ADD COLUMN     "deviceId" TEXT NOT NULL,
ALTER COLUMN "hashToken" SET DATA TYPE TEXT;
