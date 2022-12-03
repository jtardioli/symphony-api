import express from "express";
import { handleCreateRelease } from "./releases.controllers";

const router = express.Router();

// Create
router.post("/", handleCreateRelease);

export default router;
