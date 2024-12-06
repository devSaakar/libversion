import { query } from "./db";

export const repositoryService = {
  async getAllUsers() {
    const res = await query("SELECT * FROM users");
    return res.rows;
  },
  async getUserById(id: string) {
    const res = await query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
  },
  async getAllRepositories() {
    const res = await query("SELECT * FROM repositories");
    return res.rows;
  },
  async getRepositoryById(id: string) {
    const res = await query("SELECT * FROM repositories WHERE id = $1", [id]);
    return res.rows[0];
  },
  async searchRepositoryByName(search: string) {
    const res = await query(
      "SELECT * FROM repositories WHERE LOWER(name) LIKE LOWER($1)",
      [`%${search}%`]
    );
    return res.rows;
  },
  async getUserRepositoriesByUserId(user_id: string) {
    const res = await query(
      "SELECT * FROM user_repositories WHERE user_id = $1",
      [user_id]
    );
    return res.rows;
  },
  async getUserRepositoryById(id: string) {
    const res = await query("SELECT * FROM user_repositories WHERE id = $1", [
      id,
    ]);
    return res.rows[0];
  },
  async deleteRepository(id: string) {
    await query("DELETE FROM repositories WHERE id = $1", [id]);
  },
  async deleteUserRepository(id: string) {
    await query("DELETE FROM user_repositories WHERE id = $1", [id]);
  },
  async addRepository(repo: any) {
    const { name, version, description, releaseNotes, status } = repo;
    console.log("REPO", repo);
    // Check if the repository already exists by name
    const existingRepo = await query(
      "SELECT * FROM repositories WHERE name = $1",
      [name]
    );

    if (existingRepo.rows.length > 0) {
      // Return the existing repository if found
      return existingRepo.rows[0];
    }

    // If repository doesn't exist, create a new one
    const result = await query(
      "INSERT INTO repositories (name, version, description, release_notes, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, version, description, releaseNotes, status || "ACTIVE"]
    );
    return result.rows[0];
  },
  async updateRepository(id: string, edits: any) {
    const { name, version, description, releaseNotes, status } = edits;
    const res = await query(
      "UPDATE repositories SET name = $1, version = $2, description = $3, release_notes = $4, status = $5 WHERE id = $6 RETURNING *",
      [name, version, description, releaseNotes, status, id]
    );
    return res.rows[0];
  },
  async getAllUserRepositories() {
    const res = await query("SELECT * FROM user_repositories");
    return res.rows;
  },
};
