export const typeDefs = `#graphql
  type Repository {
    id: ID!
    name: String!
    version: String
    description: String
    release_notes: String
    status: String
  }

  type User {
    id: ID!
    username: String!
    email_id: String!
  }

  type UserRepository {
    id: ID!
    user: User!
    repository: Repository!
    user_repository_version: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    repositories: [Repository]
    repository(id: ID!): Repository
    searchRepository(search: String!): [Repository]
    userRepositoriesByUserId(user_id: ID!): [UserRepository]
    userRepository(id: ID!): UserRepository
  }

  type Mutation {
    addRepository(repo: AddRepositoryInput): Repository!
    addUserRepository(userRepo: AddUserRepositoryInput): UserRepository!
    updateUserRepository(id: ID!,edits: EditUserRepositoryInput!): UserRepository!
    updateRepositoryById(id: ID!): Repository
    removeUserRepository(userRepo: RemoveUserRepositoryInput): UserRepository!
    addUser(user: AddUserInput): User!
    updateRepository(id: ID!, edits: UpdateRepositoryInput): Repository
    deleteRepository(id: ID!): String
    deleteUserRepository(id: ID!): String
  }

  input AddRepositoryInput {
    name: String!
    version: String!
    description: String!
    release_notes: String!
    status: String!
  }

  input AddUserRepositoryInput {
    repository_id: ID!
    user_id: ID!
    user_repository_version: String!
  }
  input EditUserRepositoryInput {
    user_repository_version: String!
  }

  input RemoveUserRepositoryInput {
    repository_id: ID!
    user_id: ID!
  }

  input AddUserInput {
    id: ID!
    email_id: String!
    username: String!
  }

  input UpdateRepositoryInput {
    name: String
    version: String
    description: String
    release_notes: String
    status: String
  }
`;
