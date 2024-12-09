import { getClient } from "./db";

export const createTables = async () => {
  const client = await getClient();
  try {
    console.log("Checking and creating tables if not exist...");

    // SQL queries to create tables
    const createRepositoriesTable = `
      CREATE TABLE IF NOT EXISTS repositories (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        version VARCHAR(50),
        description TEXT,
        release_notes TEXT,
        status VARCHAR(50) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;

    const createUserRepositoriesTable = `
      CREATE TABLE IF NOT EXISTS user_repositories (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        repository_id VARCHAR(255) REFERENCES repositories(id),
        user_repository_version VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
    `;

    const createUserSessionTable = `
    CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    status  VARCHAR(10) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE')) DEFAULT 'ACTIVE'
);
    `;

    // Execute table creation queries
    await client.query(createRepositoriesTable);
    await client.query(createUsersTable);
    await client.query(createUserRepositoriesTable);
    await client.query(createUserSessionTable);

    console.log("All tables checked and created if not present.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    client.end();
  }
};
