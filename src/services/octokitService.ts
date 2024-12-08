import { graphql } from "@octokit/graphql";
import * as dotenv from "dotenv";
import { Repository } from "../_db";
dotenv.config();

const token = process.env.GITHUB_TOKEN;

const octokit = (graphql as any).defaults({
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

const convertRepositoryData = (data: any, index: number): Repository => {
  const { node } = data;

  // Extracting relevant fields from the node object
  const id = node.id;
  const name = node.name;
  const description = node.description;
  const version =
    node.releases.nodes.length > 0
      ? node.releases.nodes[0].tagName // If releases exist, set version to the latest release's name
      : "N/A"; // If no releases, set version to "N/A"
  const releaseNotes =
    node.releases.nodes.length > 0
      ? node.releases.nodes[0].description || "No release notes available"
      : "No release notes available"; // If no releases, set default release notes message
  const status = "ACTIVE";

  return { id, name, version, description, releaseNotes, status };
};

export const searchLibrary = async (libraryName: string): Promise<any[]> => {
  const gqlQuery = `
    query($searchQuery: String!) {
      search(query: $searchQuery, type: REPOSITORY, first: 5) {
        repositoryCount
        edges {
          node {
            ... on Repository {
              id
              name
              description
              url
              stargazerCount
              forkCount
              owner {
                login
              }
              createdAt
              updatedAt
              releases(first: 1, orderBy: { field: CREATED_AT, direction: DESC }) {
                nodes {
                  name
                  tagName
                  description
                  publishedAt
                }
              }
              refs(refPrefix: "refs/tags/", first: 1, orderBy: { field: TAG_COMMIT_DATE, direction: DESC }) {
                nodes {
                  name
                  target {
                    ... on Commit {
                      committedDate
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const client = await octokit;
    const searchQuery = `${libraryName} sort:stars-desc`;
    const response = await client(gqlQuery, { searchQuery });

    if (response.search.repositoryCount === 0) {
      console.log(`No repositories found for query: "${libraryName}"`);
      return;
    } else {
      console.log(
        "response.search.edges",
        JSON.stringify(response.search.edges)
      );
      const repositories = response.search.edges.map(convertRepositoryData);
      return repositories;
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};
