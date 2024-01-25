import { ListUsersRepository } from "../../data/contracts";
import { ListUsers } from "../../domain/features";

export class ListUsersService implements ListUsers {
  constructor(readonly listUserRepository: ListUsersRepository) { }

  async execute(input: ListUsers.Input): Promise<ListUsers.Output> {
    if (input.term !== "") {
      const result = await this.listUserRepository.list();
      const output = result.filter(user => {
        return Object.values(user).some(value => {
          return value.toLocaleLowerCase().includes(input.term!.toLowerCase())
        })
      })
      return output
    }
    const output = await this.listUserRepository.list();
    return output
  }
}
