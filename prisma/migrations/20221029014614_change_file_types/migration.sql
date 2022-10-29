/*
  Warnings:

  - You are about to drop the column `wavFile` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "wavFile",
ADD COLUMN     "audio" TEXT;
