import { prisma } from "../../config/prisma.config";
import { Request, Response } from "express";
import { Release, Track } from "@prisma/client";

interface IRelease extends Release {
  tracks: Track[];
}

export const handleCreateRelease = async (req: Request, res: Response) => {
  try {
    const release: IRelease = req.body.release;

    const {
      title,
      releaseType,
      artistName,
      description,
      maxNumMints,
      mintPrice,
      royaltyPercentage,
      tracks,
    } = release;

    await prisma.release.deleteMany();

    const createdRelease = await prisma.release.create({
      data: {
        description,
        ownerId: "44bd6780-4ea5-431e-9ce4-1175888cd28e",
        artistName,
        maxNumMints,
        mintPrice,
        releaseType,
        title,
        royaltyPercentage,
        tracks: {
          createMany: {
            data: tracks,
          },
        },
      },
    });

    console.log(
      `releases.controller::handleCreateRelease() - Created release ${JSON.stringify(
        createdRelease
      )}`
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
