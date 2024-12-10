import {
  searchByRepositoryId,
  searchByUrl,
  searchLibrary,
  stringMatchGithubUrl,
} from "../../services/octokitService";
import {
  UserRepository,
  RepositoriesRepository,
  UserRepositoriesRepository,
} from "../../repositories";
import { Repository as RepositoryType } from "../../repositories/Repository";

const resolvers = {
  Query: {
    async users() {
      return await UserRepository.getAllUsers();
    },
    async user(_: unknown, args: { id: string }) {
      return await UserRepository.getUserById(args.id);
    },
    async repositories() {
      return await RepositoriesRepository.getAllRepositories();
    },
    async repository(_: unknown, args: { id: string }) {
      return await RepositoriesRepository.getRepositoryById(args.id);
    },
    async searchRepository(_: unknown, args: { search: string }) {
      let searchRepo = await RepositoriesRepository.searchRepositoryByName(
        args.search
      );
      if (!searchRepo?.length) {
        if (stringMatchGithubUrl(args.search)) {
          searchRepo = await searchByUrl(args.search);
        } else {
          searchRepo = await searchLibrary(args.search);
        }

        if (searchRepo?.length) {
          await Promise.all(
            searchRepo.map(async (repo: RepositoryType) => {
              await RepositoriesRepository.addRepository(repo);
            })
          );
        }
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
      return await RepositoriesRepository.getRepositoryById(
        parent.repository_id
      );
    },
  },
  Mutation: {
    async deleteRepository(_: unknown, args: { id: string }) {
      return await RepositoriesRepository.deleteRepository(args.id);
    },
    async deleteUserRepository(_: unknown, args: { id: string }) {
      return await UserRepositoriesRepository.deleteUserRepository(args.id);
    },
    async addRepository(_: unknown, args: { repo: any }) {
      return await RepositoriesRepository.addRepository(args.repo);
    },
    async addUserRepository(_: unknown, args: { userRepo: any }) {
      return await UserRepositoriesRepository.addUserRepository(args.userRepo);
    },
    async updateUserRepository(_: unknown, args: { id: string; edits: any }) {
      return await UserRepositoriesRepository.updateUserRepository(
        args.id,
        args.edits
      );
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
      return await RepositoriesRepository.updateRepository(args.id, args.edits);
    },
    async updateRepositoryById(_: unknown, args: { id: string }) {
      const latestRepo = await searchByRepositoryId(args.id);
      const currentRepo = await RepositoriesRepository.getRepositoryById(
        args.id
      );
      if (currentRepo.version !== latestRepo.version) {
        await await RepositoriesRepository.updateRepository(
          args.id,
          latestRepo
        );
      }
      return latestRepo;
    },
  },
};

export default resolvers;
