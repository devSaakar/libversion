import { RepositoriesRepository } from "../repositories";
import { searchByRepositoryId } from "./octokitService";

export async function updateRepositoryData() {
  try {
    const repositories = await RepositoriesRepository.getAllRepositories();

    for (const currentRepo of repositories) {
      const { id, name } = currentRepo;

      try {
        const release = await searchByRepositoryId(id);
        console.log("new Latest Release", release, id);

        if (currentRepo.version !== release.version) {
          await RepositoriesRepository.updateRepository(id, release);
        }

        console.log(`Updated: ${name} (${release.tag_name})`);
      } catch (error) {
        if (error.status === 404) {
          console.log(`No releases found for Repository Id: ${id}`);
        } else {
          console.error(`Error updating Repository Id ${id}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error("Error updating repository data:", error);
  }
}
