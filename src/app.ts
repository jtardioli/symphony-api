import express from "express";
import helmet from "helmet";
import * as dotenv from "dotenv";

import releasesRouter from "./routes/releases.route";

const app = express();
dotenv.config();
const PORT = Number(process.env.PORT);

/* 
  Middlware 
*/
app.use(helmet());
app.use(express.json());

/* 
  Routes
*/
app.use("/api/releases", releasesRouter);

app.listen(PORT, () => {
  console.log(`[server] Application Running at http://localhost:${PORT}`);
});
