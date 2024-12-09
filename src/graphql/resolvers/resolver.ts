import {
  searchByUrl,
  searchLibrary,
  stringMatchGithubUrl,
} from "../../services/octokitService";
import {
  UserRepository,
  Repository,
  UserRepositoriesRepository,
} from "../../repositories";

const resolvers = {
  Query: {
    async users() {
      return await UserRepository.getAllUsers();
    },
    async user(_: unknown, args: { id: string }) {
      return await UserRepository.getUserById(args.id);
    },
    async repositories() {
      return await Repository.getAllRepositories();
    },
    async repository(_: unknown, args: { id: string }) {
      return await Repository.getRepositoryById(args.id);
    },
    async searchRepository(_: unknown, args: { search: string }) {
      let searchRepo = await Repository.searchRepositoryByName(args.search);
      if (!searchRepo?.length) {
        if (stringMatchGithubUrl(args.search)) {
          searchRepo = await searchByUrl(args.search);
        } else {
          searchRepo = await searchLibrary(args.search);
        }

        if (searchRepo?.length) {
          await Promise.all(
            searchRepo.map(async (repo) => {
              await Repository.addRepository(repo);
            })
          );
        }
        console.log("searchRepo", searchRepo);
      }
      return searchRepo;
    },
    async userRepositoriesByUserId(_: unknown, args: { user_id: string }) {
      return await UserRepositoriesRepository.getUserRepositoriesByUserId(
        args.user_id
      );
    },
    async userRepository(_: unknown, args: { id: string }) {
      return await UserRepositoriesRepository.getUserRepositoryById(args.id);
    },
  },
  UserRepository: {
    async user(parent: any) {
      return await UserRepository.getUserById(parent.user_id);
    },
    async repository(parent: any) {
      return await Repository.getRepositoryById(parent.repository_id);
    },
  },
  Mutation: {
    async deleteRepository(_: unknown, args: { id: string }) {
      return await Repository.deleteRepository(args.id);
    },
    async deleteUserRepository(_: unknown, args: { id: string }) {
      return await UserRepositoriesRepository.deleteUserRepository(args.id);
    },
    async addRepository(_: unknown, args: { repo: any }) {
      return await Repository.addRepository(args.repo);
    },
    async addUserRepository(_: unknown, args: { userRepo: any }) {
      return await UserRepositoriesRepository.addUserRepository(args.userRepo);
    },
    async removeUserRepository(_: unknown, args: { userRepo: any }) {
      return await UserRepositoriesRepository.removeUserRepository(
        args.userRepo
      );
    },
    async addUser(_: unknown, args: { user: any }) {
      return await UserRepository.addUser(args.user);
    },
    async updateRepository(_: unknown, args: { id: string; edits: any }) {
      return await Repository.updateRepository(args.id, args.edits);
    },
  },
};

export default resolvers;
