import { ListUsersRepository } from "../../data/contracts";
import { ListUsers } from "../../domain/features";

export class ListUsersService implements ListUsers {
  constructor(private readonly userRepository: ListUsersRepository) { }

  async execute(input: ListUsers.Input): Promise<ListUsers.Output> {
    const output = await this.userRepository.list();
    return output
  }
}
