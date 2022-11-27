import express, { Request, Response } from "express";
const router = express.Router();
import multer, { memoryStorage } from "multer";
import { uploadToS3 } from "../config/s3.config";

const upload = multer({ storage: memoryStorage() });

// Create
router.post("/", upload.any(), async (req: Request, res: Response) => {
  try {
    const files: any = req.files;

    const keys = [];
    for (const file of files) {
      keys.push(await uploadToS3(file, "1234134"));
    }

    res.send(keys);
  } catch (err: any) {
    console.log(`Route: /api/uploads - ${err.message}`);
    res.send(500);
  }
});

export default router;
