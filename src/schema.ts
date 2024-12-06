// export const typeDefs = `#graphql
//   type User {
//     id: ID!
//     name: String!
//     verified: Boolean!
//   }
//   type UserRepository {
//     id: ID!
//     repository_id: ID!
//     user_id: ID!
//     user: User!
//     repository: Repository!
//     status: String!
//   }
//   type Repository {
//     id: ID!
//     name: String!
//     description: String!
//     releaseNotes: String!
//     version: String!
//     status: String!
//   }
//   type Query {
//     user(id:ID!): User
//     users: [User]
//     repository(id:ID!): Repository
//     repositories: [Repository]
//     userRepository(id:ID!): UserRepository
//     seachRepository(search:String!): [Repository!]
//     userRepositoriesByUserId(user_id:ID!): [UserRepository]
//   }
//   type Mutation {
//     addRepository(repo: AddRepositoryInput!): Repository
//     updateRepository(id: ID!,edits:EditRepositoryInput!): Repository
//     deleteRepository(id: ID!): [Repository]
//     deleteUserRepository(id: ID!): [UserRepository!]
//   }
//   input AddRepositoryInput {
//     name: String!,
//     version: String!
//   }
//   input EditRepositoryInput {
//     version: String!
//   }
// `;

// import { gql } from "apollo-server";

export const typeDefs = `#graphql
  type Repository {
    id: ID!
    name: String!
    version: String
    description: String
    releaseNotes: String
    status: String
  }

  type User {
    id: ID!
    username: String!
  }

  type UserRepository {
    id: ID!
    user: User!
    repository: Repository!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    repositories: [Repository]
    repository(id: ID!): Repository
    seachRepository(search: String!): [Repository]
    userRepositoriesByUserId(user_id: ID!): [UserRepository]
    userRepository(id: ID!): UserRepository
  }

  type Mutation {
    addRepository(repo: AddRepositoryInput): Repository
    updateRepository(id: ID!, edits: UpdateRepositoryInput): Repository
    deleteRepository(id: ID!): [Repository]
    deleteUserRepository(id: ID!): [UserRepository]
  }

  input AddRepositoryInput {
    name: String!
    version: String
    description: String
    releaseNotes: String
    status: String
  }

  input UpdateRepositoryInput {
    name: String
    version: String
    description: String
    releaseNotes: String
    status: String
  }
`;
