import { query } from "../db/db";

export interface Repository {
  id: string;
  name: string;
  version: string;
  description: string;
  release_notes: string;
  status: "ACTIVE" | "INACTIVE";
}

const repositoryService = {
  async addRepository(repo: Repository) {
    const { id, name, version, description, release_notes, status } = repo;
    const existingRepo = await query(
      "SELECT * FROM repositories WHERE name = $1",
      [name]
    );

    if (existingRepo.length > 0) {
      return existingRepo[0];
    }

    const result = await query(
      "INSERT INTO repositories (id, name, version, description, release_notes, status) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *",
      [id, name, version, description, release_notes, status || "ACTIVE"]
    );
    return result[0];
  },
  async getAllRepositories() {
    const res: Repository[] = await query("SELECT * FROM repositories");
    return res;
  },
  async getRepositoryById(id: string): Promise<Repository> {
    const res = await query("SELECT * FROM repositories WHERE id = $1", [id]);

    return res[0] as Repository;
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
      "UPDATE repositories SET name = $1, version = $2, description = $3, release_notes = $4, status = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *",
      [name, version, description, release_notes, status, id]
    );
    return res[0];
  },
  async deleteRepository(id: string) {
    return await query("DELETE FROM repositories WHERE id = $1", [id]);
  },
};

export default repositoryService;
