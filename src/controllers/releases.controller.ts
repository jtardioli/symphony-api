import { Request, Response } from "express";
import { createReleaseValidations } from "../validations/releases.validations";

export const handleCreateRelease = (req: Request, res: Response) => {
  try {
    const { release } = req.body;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
