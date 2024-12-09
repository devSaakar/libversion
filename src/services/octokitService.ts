import { graphql } from "@octokit/graphql";
import * as dotenv from "dotenv";
import { Repository } from "../_db";
dotenv.config();

const octokit = (graphql as any).defaults({
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

const convertRepositoryData = (data: any): Repository => {
  // const { node } = data;

  // Extracting relevant fields from the node object
  const id = data.id;
  const name = data.name;
  const description = data.description;
  const version =
    data.releases.nodes.length > 0
      ? data.releases.nodes[0].tagName // If releases exist, set version to the latest release's name
      : "N/A"; // If no releases, set version to "N/A"
  const releaseNotes =
    data.releases.nodes.length > 0
      ? data.releases.nodes[0].description || "No release notes available"
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

    if (response?.search?.repositoryCount === 0) {
      console.log(`No repositories found for query: "${libraryName}"`);
      return;
    } else {
      console.log(
        "response.search.edges",
        JSON.stringify(response.search.edges)
      );
      const repositories = response.search.edges.map((data: any) =>
        convertRepositoryData(data.node)
      );
      return repositories;
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

export function stringMatchGithubUrl(repoUrl: string): RegExpMatchArray {
  const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
  const match = repoUrl.match(regex);
  return match;
}

function extractRepoDetails(repoUrl: string): { owner: string; name: string } {
  const match = stringMatchGithubUrl(repoUrl);
  if (match) {
    return { owner: match[1], name: match[2] };
  }
  throw new Error("Invalid GitHub repository URL");
}

export const searchByUrl = async (repoUrl: string): Promise<any[]> => {
  const gqlQuery = `
  query($owner: String!,$name: String!) {
    repository(owner: $owner, name: $name) {
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
`;

  try {
    const client = await octokit;
    const { owner, name } = extractRepoDetails(repoUrl);
    const response = await client(gqlQuery, {
      owner,
      name,
    });

    console.log("response", response);

    if (!response?.repository) {
      return;
    } else {
      const repositories = convertRepositoryData(response.repository);
      return [repositories];
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};
