import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import * as dotenv from "dotenv";
dotenv.config();

const { AWS_ACCES_KEY_ID, AWS_ACCESS_SECRET } = process.env;

export const s3 = new S3Client({
  region: "ca-central-1",
  credentials: {
    accessKeyId: AWS_ACCES_KEY_ID as string,
    secretAccessKey: AWS_ACCESS_SECRET as string,
  },
});
