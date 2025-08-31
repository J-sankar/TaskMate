/*
  Warnings:

  - You are about to drop the column `googlerefreshtoken` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "taskmate_schema"."Users" DROP COLUMN "googlerefreshtoken",
ADD COLUMN     "oauthRefreshtoken" TEXT;
