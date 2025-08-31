-- AlterTable
ALTER TABLE "taskmate_schema"."Users" ADD COLUMN     "googlerefreshtoken" TEXT,
ADD COLUMN     "refreshtokens" TEXT[];
