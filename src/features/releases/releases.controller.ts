import { prisma } from "../../config/prisma.config";
import { Request, Response } from "express";
import { Release } from "@prisma/client";

export const handleCreateRelease = async (req: Request, res: Response) => {
  try {
    const release: Release = req.body.release;

    const {
      title,
      releaseType,
      artistName,
      description,
      maxNumMints,
      mintPrice,
      royaltyPercentage,
    } = release;

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
