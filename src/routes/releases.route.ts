import express from "express";
import { createReleaseHandler } from "../controllers/releases.controller";

const router = express.Router();

// Create
router.post("/", createReleaseHandler);

export default router;
