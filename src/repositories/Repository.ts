import { query } from "../db/db";
const repositoryService = {
  async addRepository(repo: any) {
    const { id, name, version, description, release_notes, status } = repo;
    console.log("REPO", repo);
    // Check if the repository already exists by name
    const existingRepo = await query(
      "SELECT * FROM repositories WHERE name = $1",
      [name]
    );

    if (existingRepo.length > 0) {
      // Return the existing repository if found
      return existingRepo[0];
    }

    // If repository doesn't exist, create a new one
    const result = await query(
      "INSERT INTO repositories (id, name, version, description, release_notes, status) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *",
      [id, name, version, description, release_notes, status || "ACTIVE"]
    );
    return result[0];
  },
  async getAllRepositories() {
    const res = await query("SELECT * FROM repositories");
    return res;
  },
  async getRepositoryById(id: string) {
    const res = await query("SELECT * FROM repositories WHERE id = $1", [id]);

    console.log("res getRepositoryById", res);
    return res[0];
  },
  async searchRepositoryByName(search: string) {
    const res = await query(
      "SELECT * FROM repositories WHERE LOWER(name) LIKE LOWER($1)",
      [`%${search}%`]
    );
    return res;
  },

  async updateRepository(id: string, edits: any) {
    const { name, version, description, release_notes, status } = edits;
    const res = await query(
      "UPDATE repositories SET name = $1, version = $2, description = $3, release_notes = $4, status = $5 WHERE id = $6 RETURNING *",
      [name, version, description, release_notes, status, id]
    );
    return res[0];
  },
  async deleteRepository(id: string) {
    return await query("DELETE FROM repositories WHERE id = $1", [id]);
  },
};

export default repositoryService;
