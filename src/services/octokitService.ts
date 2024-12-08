// import { graphql } from "@octokit/graphql";
// import { graphql as gql } from "@octokit/graphql/dist-types/types";

// import * as dotenv from "dotenv";

// dotenv.config();

// const token = process.env.GITHUB_TOKEN;
// console.log("token octokitService", token);

// const octokit = (graphql as gql).defaults({
//   headers: {
//     authorization: `Bearer ${token}`,
//   },
// });

// // Define a type for the GraphQL response
// interface Release {
//   name: string;
//   tagName: string;
//   description: string | null;
//   publishedAt: string;
// }

// interface Ref {
//   name: string;
//   target: {
//     committedDate: string;
//   };
// }

// interface Repository {
//   name: string;
//   description: string | null;
//   url: string;
//   stargazerCount: number;
//   forkCount: number;
//   owner: {
//     login: string;
//   };
//   createdAt: string;
//   updatedAt: string;
//   releases: {
//     nodes: Release[];
//   };
//   refs: {
//     nodes: Ref[];
//   };
// }

// interface SearchResponse {
//   search: {
//     repositoryCount: number;
//     edges: Array<{
//       node: Repository;
//     }>;
//   };
// }

export const searchLibrary = (search: string) => {
  search;
};

// export const searchLibrary = async (libraryName: string): Promise<void> => {
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
//     const response: SearchResponse = await octokit(gqlQuery, {
//       searchQuery: libraryName,
//     });

//     if (response.search.repositoryCount === 0) {
//       console.log(`No repositories found for query: "${libraryName}"`);
//       return;
//     }

//     const repo = response.search.edges[0].node;
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
//   } catch (error: any) {
//     console.error(`Error: ${error.message}`);
//   }
// };
