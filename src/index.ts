import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema";
import resolvers from "./resolver";
import { createTables, pool } from "./initDB";

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async (): Promise<void> => {
  createTables()
    .then(() => {
      console.log("Database initialized successfully.");
      pool.end();
    })
    .catch((err) => {
      console.error("Failed to initialize database:", err);
      pool.end();
    });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at: ${url}`);
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});

// import { graphql } from "@octokit/graphql";
// import * as dotenv from "dotenv";

// dotenv.config();

// const token = process.env.GITHUB_TOKEN;

// const octokit = graphql.defaults({
//   headers: {
//     authorization: `Bearer ${token}`,
//   },
// });

// async function getLatestVersion(owner, repo) {
//   try {
//     const query = `
//       query($owner: String!, $repo: String!) {
//         repository(owner: $owner, name: $repo) {
//           releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
//             nodes {
//               name
//               tagName
//               publishedAt
//             }
//           }
//         }
//       }
//     `;

//     const variables = { owner, repo };

//     const response = await graphql(query, {
//       ...variables,
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });

//     const release = response.repository.releases.nodes[0];

//     if (release) {
//       console.log("response.repository", response.repository.releases.nodes);
//       console.log(`Latest version of ${repo}:`, release);
//       console.log(`Name: ${release.name}`);
//       console.log(`Tag: ${release.tagName}`);
//       console.log(`Published At: ${release.publishedAt}`);
//     } else {
//       console.log(`No releases found for ${repo}`);
//     }
//   } catch (error) {
//     console.error(`Error fetching the latest version: ${error.message}`);
//   }
// }

// getLatestVersion("facebook", "react");

// const searchLibrary = async (libraryName) => {
//   const gqlQuery = `
//     query($searchQuery: String!) {
//       search(query: $searchQuery, type: REPOSITORY, first: 10) {
//         repositoryCount
//         edges {
//           node {
//             ... on Repository {
//               name
//               description
//               url
//               stargazerCount
//               forkCount
//               owner {
//                 login
//               }
//               createdAt
//               updatedAt
//               releases(first: 1, orderBy: { field: CREATED_AT, direction: DESC }) {
//                 nodes {
//                   name
//                   tagName
//                   description
//                   publishedAt
//                 }
//               }
//               refs(refPrefix: "refs/tags/", first: 1, orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
//                 nodes {
//                   name
//                   target {
//                     ... on Commit {
//                       committedDate
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `;

//   try {
//     const response = await octokit(gqlQuery, {
//       searchQuery: libraryName,
//     });

//     if (response.search.repositoryCount === 0) {
//       console.log(`No repositories found for query: "${libraryName}"`);
//       return;
//     }

//     const repo = response.search.edges[0].node;
//     // console.log(
//     //   "response.search.edges[0]",
//     //   JSON.stringify(response.search.edges)
//     // );
//     console.log(`Repository: ${repo.name} by ${repo.owner.login}`);
//     console.log(`Description: ${repo.description || "No description"}`);
//     console.log(`URL: ${repo.url}`);
//     console.log(`Stars: ${repo.stargazerCount} | Forks: ${repo.forkCount}`);
//     console.log(
//       `Created At: ${repo.createdAt} | Updated At: ${repo.updatedAt}`
//     );

//     if (repo.releases.nodes.length > 0) {
//       const latestRelease = repo.releases.nodes[0];
//       console.log(`\nLatest Release: ${latestRelease.name || "Unnamed"}`);
//       console.log(`Tag: ${latestRelease.tagName}`);
//       console.log(`Published At: ${latestRelease.publishedAt}`);
//       console.log(
//         `Release Notes: ${
//           latestRelease.description || "No release notes available."
//         }`
//       );
//     } else if (repo.refs.nodes.length > 0) {
//       const latestTag = repo.refs.nodes[0];
//       console.log(`\nLatest Tag: ${latestTag.name}`);
//       console.log(`Tag Commit Date: ${latestTag.target.committedDate}`);
//     } else {
//       console.log(`\nNo releases or tags found for this repository.`);
//     }
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//   }
// };

// // Replace "react" with the library name you want to search for
// searchLibrary("spring boot");
