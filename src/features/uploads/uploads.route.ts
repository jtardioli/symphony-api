import express, { Request, Response } from "express";
const router = express.Router();
import multer, { memoryStorage } from "multer";
import { handleUploadReleaseFiles } from "./uploads.controllers";
import { uploadToS3 } from "./uploads.services";

const upload = multer({ storage: memoryStorage() });

// Create
router.post("/", upload.any(), handleUploadReleaseFiles);

export default router;
