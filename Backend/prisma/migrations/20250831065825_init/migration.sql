-- CreateEnum
CREATE TYPE "taskmate_schema"."oauthProvider" AS ENUM ('GOOGLE', 'GITHUB');

-- DropIndex
DROP INDEX "taskmate_schema"."Users_phoneno_key";

-- AlterTable
ALTER TABLE "taskmate_schema"."Users" ADD COLUMN     "oauthId" TEXT,
ADD COLUMN     "oauthProvider" "taskmate_schema"."oauthProvider",
ALTER COLUMN "password" DROP NOT NULL;
