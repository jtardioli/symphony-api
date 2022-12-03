import express from "express";
import { handleGetGenres } from "./genres.controllers";

const router = express.Router();

// Index
router.get("/", handleGetGenres);

export default router;
