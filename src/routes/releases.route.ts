import express from "express";
import { handleCreateRelease } from "../controllers/releases.controller";
import { createReleaseValidations } from "../validations/releases.validations";

const router = express.Router();

// Create
router.post("/", createReleaseValidations, handleCreateRelease);

export default router;
