-- CreateEnum
CREATE TYPE "taskmate_schema"."Role" AS ENUM ('ADMIN', 'EMPLOYEE', 'MANAGER', 'GUEST');

-- CreateEnum
CREATE TYPE "taskmate_schema"."userStatus" AS ENUM ('ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "taskmate_schema"."taskStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'COMPLETED');

-- CreateEnum
CREATE TYPE "taskmate_schema"."UserTasksROle" AS ENUM ('ASSIGNEE', 'OWNER', 'RIVIEWER');

-- CreateTable
CREATE TABLE "taskmate_schema"."Users" (
    "userId" SERIAL NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phoneno" TEXT,
    "password" VARCHAR(50) NOT NULL,
    "role" "taskmate_schema"."Role" NOT NULL DEFAULT 'EMPLOYEE',
    "status" "taskmate_schema"."userStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "taskmate_schema"."Tasks" (
    "taskId" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "status" "taskmate_schema"."taskStatus" NOT NULL DEFAULT 'PENDING',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "taskmate_schema"."UserTask" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "role" "taskmate_schema"."UserTasksROle" NOT NULL DEFAULT 'ASSIGNEE',

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "taskmate_schema"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phoneno_key" ON "taskmate_schema"."Users"("phoneno");

-- CreateIndex
CREATE UNIQUE INDEX "UserTask_userId_taskId_key" ON "taskmate_schema"."UserTask"("userId", "taskId");

-- AddForeignKey
ALTER TABLE "taskmate_schema"."UserTask" ADD CONSTRAINT "UserTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "taskmate_schema"."Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskmate_schema"."UserTask" ADD CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "taskmate_schema"."Tasks"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;
