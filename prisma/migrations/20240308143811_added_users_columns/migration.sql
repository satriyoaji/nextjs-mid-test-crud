/*
  Warnings:

  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "password" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
