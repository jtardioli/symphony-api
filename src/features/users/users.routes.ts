import express, { Request, Response } from "express";
import { prisma } from "../../config/prisma.config";
import { handleCreateUser } from "./users.controllers";

const router = express.Router();

// Create user
router.post("/", handleCreateUser);

// Get individual user
router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: { releases: true },
  });

  res.send(user);
});

export default router;
