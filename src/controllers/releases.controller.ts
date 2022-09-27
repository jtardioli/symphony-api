import { Request, Response } from "express";

export const createReleaseHandler = (req: Request, res: Response) => {
  res.send("hi");
};
