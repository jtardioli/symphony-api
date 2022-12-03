import { PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

import { v4 as uuidv4 } from "uuid";
import { s3 } from "../../config/s3.config";

dotenv.config();
const { AWS_BUCKET } = process.env;

export const uploadToS3 = async (file: any, userId: string) => {
  try {
    const key = `${userId}/${uuidv4()}`;

    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    console.log(
      `Route:/api/uploads::uploadTos3() - Uploading file "${file.originalname}" to s3`
    );
    await s3.send(command);

    const fieldname = file.fieldname;
    return { fieldname, key };
  } catch (err: any) {
    console.log(`Route:/api/uploads::uploadTos3() - ${err.message}`);
    throw new Error();
  }
};
