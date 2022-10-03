import { NextFunction, Request, Response } from "express";

export const createReleaseValidations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body) {
      console.log(req.body);
      if ("release" in req.body) {
        next();
        return;
      }
    }

    res.sendStatus(400);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
