import { Request, Response } from "express";
import { prisma } from "../../config/prisma.config";

export const handleCreateUser = async (req: Request, res: Response) => {
  try {
    const { name, address, email } = req.body;
    const user = await prisma.user.create({ data: { name, address, email } });
    console.log("handleCreateUser():: User Created:", user);
    res.send(user);
  } catch (error: any) {
    console.log("handleCreateUser():: User Creation Failed:", error.message);
    res.sendStatus(500);
  }
};
