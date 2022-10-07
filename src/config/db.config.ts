import { Pool } from "pg";

export const pool = new Pool({
  user: "josht",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "symphony",
});
