import { Request, Response } from "express";
import { pool } from "../config/db.config";

export const handleCreateRelease = async (req: Request, res: Response) => {
  try {
    const { release } = req.body;
    const { description, isDeployed } = release;
    const newRelease = await pool.query(
      `INSERT INTO releases (description, is_deployed) VALUES($1, $2) RETURNING *`,
      [description, isDeployed]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
