import { prisma } from "../../config/prisma.config";
import { Request, Response } from "express";

import { Release } from "../../interfaces/release";

export const handleCreateRelease = async (req: Request, res: Response) => {
  try {
    const release: Release = req.body.release;

    const {
      title,
      releaseType,
      artistName,
      ownerId,
      description,
      maxNumMints,
      mintPrice,
      royaltyPercentage,
      tracks,
      genres,
    } = release;

    await prisma.release.deleteMany();

    const createdRelease = await prisma.release.create({
      data: {
        description,
        ownerId,
        artistName,
        maxNumMints,
        mintPrice,
        releaseType,
        title,
        royaltyPercentage,
        tracks: {
          createMany: {
            data: tracks!,
          },
        },
        genres: { connect: genres },
      },
    });

    console.log(
      "releases.controller::handleCreateRelease() - Created release:",
      createdRelease
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
