import { repositoryService } from "./repositoryService";

const resolvers = {
  Query: {
    async users() {
      return await repositoryService.getAllUsers();
    },
    async user(_: unknown, args: { id: string }) {
      return await repositoryService.getUserById(args.id);
    },
    async repositories() {
      return await repositoryService.getAllRepositories();
    },
    async repository(_: unknown, args: { id: string }) {
      return await repositoryService.getRepositoryById(args.id);
    },
    async seachRepository(_: unknown, args: { search: string }) {
      return await repositoryService.searchRepositoryByName(args.search);
    },
    async userRepositoriesByUserId(_: unknown, args: { user_id: string }) {
      return await repositoryService.getUserRepositoriesByUserId(args.user_id);
    },
    async userRepository(_: unknown, args: { id: string }) {
      return await repositoryService.getUserRepositoryById(args.id);
    },
  },
  UserRepository: {
    async user(parent: any) {
      return await repositoryService.getUserById(parent.user_id);
    },
    async repository(parent: any) {
      return await repositoryService.getRepositoryById(parent.repository_id);
    },
  },
  Mutation: {
    async deleteRepository(_: unknown, args: { id: string }) {
      await repositoryService.deleteRepository(args.id);
      return await repositoryService.getAllRepositories();
    },
    async deleteUserRepository(_: unknown, args: { id: string }) {
      await repositoryService.deleteUserRepository(args.id);
      return await repositoryService.getAllUserRepositories();
    },
    async addRepository(_: unknown, args: { repo: any }) {
      return await repositoryService.addRepository(args.repo);
    },
    async updateRepository(_: unknown, args: { id: string; edits: any }) {
      return await repositoryService.updateRepository(args.id, args.edits);
    },
  },
};

export default resolvers;
