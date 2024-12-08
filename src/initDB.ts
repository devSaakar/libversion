import { Pool } from "pg";
import { getClient } from "./db";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const createTables = async () => {
  const client = await getClient();
  try {
    console.log("Checking and creating tables if not exist...");

    // SQL queries to create tables
    const createRepositoriesTable = `
      CREATE TABLE IF NOT EXISTS repositories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        version VARCHAR(50),
        description TEXT,
        release_notes TEXT,
        status VARCHAR(50) DEFAULT 'ACTIVE'
      );
    `;

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL
      );
    `;

    const createUserRepositoriesTable = `
      CREATE TABLE IF NOT EXISTS user_repositories (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        repository_id INTEGER REFERENCES repositories(id)
      );
    `;

    // Execute table creation queries
    await client.query(createRepositoriesTable);
    await client.query(createUsersTable);
    await client.query(createUserRepositoriesTable);

    console.log("All tables checked and created if not present.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    client.end();
  }
};
