-- CreateEnum
CREATE TYPE "ReleaseType" AS ENUM ('ALBUM', 'EP', 'SINGLE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Release" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "credits" TEXT,
    "description" TEXT,
    "image" TEXT,
    "isDeployed" BOOLEAN NOT NULL DEFAULT false,
    "maxNumMints" INTEGER,
    "mintEndDateTime" BIGINT,
    "mintStartDateTime" BIGINT,
    "mintPrice" DECIMAL(65,30),
    "royaltyPercentage" DOUBLE PRECISION,
    "releaseType" "ReleaseType",
    "title" TEXT,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "releaseId" TEXT,
    "wavFile" BYTEA,
    "ownerId" TEXT NOT NULL,
    "artistName" TEXT,
    "title" TEXT,
    "hidden" BOOLEAN NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenreToRelease" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToRelease_AB_unique" ON "_GenreToRelease"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToRelease_B_index" ON "_GenreToRelease"("B");

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToRelease" ADD CONSTRAINT "_GenreToRelease_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToRelease" ADD CONSTRAINT "_GenreToRelease_B_fkey" FOREIGN KEY ("B") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;
