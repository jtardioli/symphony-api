import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import Session from "express-session";

import * as dotenv from "dotenv";
import "source-map-support/register";

import releasesRouter from "./features/releases/releases.routes";
import uploadsRouter from "./features/uploads/uploads.route";
import genresRouter from "./features/genres/genres.routes";
import authRouter from "./features/auth/auth.routes";
import usersRouter from "./features/users/users.routes";

const app = express();
dotenv.config();
const PORT = Number(process.env.PORT);

/* 
  Middlware 
*/
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use(
  Session({
    name: "siwe-quickstart",
    secret: "siwe-quickstart-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);

/* 
  Routes
*/
app.use("/api/auth", authRouter);
app.use("/api/genres", genresRouter);
app.use("/api/releases", releasesRouter);
app.use("/api/uploads", uploadsRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`[server] Application Running at http://localhost:${PORT}`);
});
