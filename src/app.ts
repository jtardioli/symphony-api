import express, { Request, Response } from "express";
import routes from "./routes";
import helmet from "helmet";

const app = express();

app.use(helmet());

app.use(express.json());

routes(app);

app.listen(5555, () => {
  console.log("Application Running at http://localhost:5555");
});
