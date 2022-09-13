import { Express, Request, Response } from "express";
import { getBookHandler } from "./controllers/books.controller";

const routes = (app: Express) => {
  app.get("/api/books/bookId", getBookHandler);
};

export default routes;
