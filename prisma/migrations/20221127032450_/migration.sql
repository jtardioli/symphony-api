/*
  Warnings:

  - You are about to alter the column `mintEndDateTime` on the `Release` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `mintStartDateTime` on the `Release` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Release" ALTER COLUMN "mintEndDateTime" SET DATA TYPE INTEGER,
ALTER COLUMN "mintStartDateTime" SET DATA TYPE INTEGER;
