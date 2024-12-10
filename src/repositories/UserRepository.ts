import { query } from "../db/db";

const userRepository = {
  async addUser(user: any) {
    const { id, username, email_id } = user;
    const existingRepo = await query("SELECT * FROM users WHERE id = $1", [id]);

    if (existingRepo.length > 0) {
      return existingRepo[0];
    }

    const result = await query(
      "INSERT INTO users (id,username,email_id) VALUES ($1,$2,$3) RETURNING *",
      [id, username, email_id]
    );
    return result[0];
  },
  async getAllUsers() {
    const res = await query("SELECT * FROM users");
    return res;
  },
  async getUserById(id: string) {
    const res = await query("SELECT * FROM users WHERE id = $1", [id]);
    return res[0];
  },
};

export default userRepository;
