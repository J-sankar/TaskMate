/*
  Warnings:

  - Changed the type of `hashToken` on the `RefreshTokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "taskmate_schema"."RefreshTokens" DROP COLUMN "hashToken",
ADD COLUMN     "hashToken" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_hashToken_key" ON "taskmate_schema"."RefreshTokens"("hashToken");
