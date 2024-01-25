import { IsEmailAlreadyRegisteredRepository, SaveUserRepository } from "../../data/contracts";
import { CreateUser } from "../../domain/features";
import User from "../../domain/models/user";

export class CreateUserService implements CreateUser {
  constructor(readonly database: IsEmailAlreadyRegisteredRepository & SaveUserRepository) { }

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    const isUserAlreadyRegistered = await this.database.isEmailAlreadyRegistered(input.email);
    if (isUserAlreadyRegistered) throw new Error("Email already registered")
    const user = User.create(input)
    await this.database.save(user);

    return user
  }
}