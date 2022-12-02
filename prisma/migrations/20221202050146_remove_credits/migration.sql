/*
  Warnings:

  - You are about to drop the column `credits` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `mintEndDateTime` on the `Release` table. All the data in the column will be lost.
  - You are about to drop the column `mintStartDateTime` on the `Release` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Release" DROP COLUMN "credits",
DROP COLUMN "mintEndDateTime",
DROP COLUMN "mintStartDateTime";
