import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import * as dotenv from "dotenv";
import "source-map-support/register";

import releasesRouter from "./features/releases/releases.routes";
import uploadsRouter from "./features/uploads/uploads.route";
import genresRouter from "./features/genres/genres.routes";

const app = express();
dotenv.config();
const PORT = Number(process.env.PORT);

/* 
  Middlware 
*/
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

/* 
  Routes
*/
app.use("/api/genres", genresRouter);
app.use("/api/releases", releasesRouter);
app.use("/api/uploads", uploadsRouter);

app.listen(PORT, () => {
  console.log(`[server] Application Running at http://localhost:${PORT}`);
});
