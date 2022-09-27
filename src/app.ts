import express from "express";
import helmet from "helmet";

import releasesRouter from "./routes/releases.route";

const app = express();

/* 
  Middlware 
*/
app.use(helmet());
app.use(express.json());

/* 
  Routes
*/
app.use("/api/releases", releasesRouter);

app.listen(5555, () => {
  console.log("Application Running at http://localhost:5555");
});
