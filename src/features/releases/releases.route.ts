import express from "express";
import { handleCreateRelease } from "./releases.controller";

const router = express.Router();

// Create
router.post("/", handleCreateRelease);

export default router;
