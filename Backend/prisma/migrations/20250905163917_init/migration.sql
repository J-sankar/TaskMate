/*
  Warnings:

  - A unique constraint covering the columns `[hashToken,deviceId]` on the table `RefreshTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_hashToken_deviceId_key" ON "taskmate_schema"."RefreshTokens"("hashToken", "deviceId");
