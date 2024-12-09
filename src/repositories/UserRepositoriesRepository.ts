import { query } from "../db/db";
const userRepositoriesRepository = {
  async getUserRepositoriesByUserId(user_id: string) {
    const res = await query(
      "SELECT * FROM user_repositories WHERE user_id = $1",
      [user_id]
    );
    return res;
  },
  async getUserRepositoryById(id: string) {
    const res = await query("SELECT * FROM user_repositories WHERE id = $1", [
      id,
    ]);
    return res[0];
  },
  async deleteUserRepository(id: string) {
    await query("DELETE FROM user_repositories WHERE id = $1", [id]);
  },
  async addUserRepository(userRepo: any) {
    const { user_id, repository_id, user_repository_version } = userRepo;
    // Check if the repository already exists by name

    const existingRepo = await query(
      "SELECT * FROM user_repositories WHERE user_id = $1 AND repository_id = $2",
      [user_id, repository_id]
    );

    if (existingRepo.length > 0) {
      return existingRepo[0];
    }

    // If repository doesn't exist, create a new one
    const result = await query(
      "INSERT INTO user_repositories (user_id,repository_id,user_repository_version) VALUES ($1, $2,$3) RETURNING *",
      [user_id, repository_id, user_repository_version]
    );
    return result[0];
  },
  async updateUserRepository(id: string, edits: any) {
    const { user_repository_version } = edits;
    const res = await query(
      "UPDATE user_repositories SET user_repository_version = $1 WHERE id = $2 RETURNING *",
      [user_repository_version, id]
    );
    return res[0];
  },
  async removeUserRepository(userRepo: any) {
    const { user_id, repository_id } = userRepo;

    // Check if the repository exists for the user
    const existingRepo = await query(
      "SELECT * FROM user_repositories WHERE user_id = $1 AND repository_id = $2",
      [user_id, repository_id]
    );

    if (existingRepo.length === 0) {
      // If repository doesn't exist, return a message or null
      return { message: "Repository not found for this user" };
    }

    // If repository exists, delete it
    const result = await query(
      "DELETE FROM user_repositories WHERE user_id = $1 AND repository_id = $2 RETURNING *",
      [user_id, repository_id]
    );

    // Return the deleted entry or any relevant information
    return result[0] || { message: "No rows affected" };
  },
  async getAllUserRepositories() {
    const res = await query("SELECT * FROM user_repositories");
    return res;
  },
};

export default userRepositoriesRepository;
