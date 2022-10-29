import { Request, Response } from "express";

export const handleCreateRelease = async (req: Request, res: Response) => {
  try {
    const { release } = req.body;

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
