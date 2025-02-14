import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER, // Set these in .env
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

export default pool;
