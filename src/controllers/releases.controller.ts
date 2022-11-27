import { prisma } from "../config/prisma.config";
import { Request, Response } from "express";

export const handleCreateRelease = async (req: Request, res: Response) => {
  try {
    const { release } = req.body;

    const { mintEndDateTime, mintStartDateTime, title, releaseType } = release;

    console.log(title);

    const createdRelease = await prisma.release.create({
      data: {
        ownerId: "44bd6780-4ea5-431e-9ce4-1175888cd28e",
        mintEndDateTime,
        mintStartDateTime,
        releaseType,
        title,
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
