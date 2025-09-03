/*
  Warnings:

  - Changed the type of `refreshtokens` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "taskmate_schema"."Users" DROP COLUMN "refreshtokens",
ADD COLUMN     "refreshtokens" JSONB NOT NULL;
