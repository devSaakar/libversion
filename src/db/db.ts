import { Client, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

export async function getClient() {
  const client = new Client(process.env.SQL_CONNECTION);
  await client.connect();
  return client;
}
export async function query<T>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  const client = await getClient();
  try {
    const result: QueryResult<T> = await client.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    await client.end();
  }
}
