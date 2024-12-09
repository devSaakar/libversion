import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema";
import resolvers from "./resolver";
import { createTables } from "./initDB";

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async (): Promise<void> => {
  createTables()
    .then(() => {
      console.log("Database initialized successfully.");
    })
    .catch((err) => {
      console.error("Failed to initialize database:", err);
    });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at: ${url}`);
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
