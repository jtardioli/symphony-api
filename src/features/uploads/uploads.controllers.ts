import { Request, Response } from "express";
import { uploadToS3 } from "./uploads.services";

export const handleUploadReleaseFiles = async (req: Request, res: Response) => {
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
};
