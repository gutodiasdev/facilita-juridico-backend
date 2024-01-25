import { DeleteUserRepository, IsEmailAlreadyRegisteredRepository, ListUsersRepository, SaveUserRepository } from "../../../data/contracts";
import { UserRepository } from "../../../data/repositories";
import User from "../../../domain/models/user";
import crypto from "crypto";

describe("UserRepository Suite", () => {
  let userRepository: IsEmailAlreadyRegisteredRepository & SaveUserRepository & ListUsersRepository & DeleteUserRepository;
  const id = crypto.randomUUID();
  beforeEach(() => {
    userRepository = new UserRepository()
  });

  test("should list users from the database", async function () {
    const userList = await userRepository.list();
    expect(userList.length).toBeGreaterThan(0);
  });

  test("should save a new user at database", async function () {
    const user = new User("Test User", `${crypto.randomInt(100)}@example.com`, "5591999123456", id)
    await expect(userRepository.save(user)).resolves.toBeTruthy();
  });

  test("should throw an error when trying to create a user with same id", async function () {
    const user = new User("Test User", "test@example.com", "5591999123456", "test-id")
    await expect(userRepository.save(user)).rejects.toThrow(new Error("duplicate key value violates unique constraint \"users_pkey\""))
  });

  test("should delete a user at database", async function () {
    await expect(userRepository.delete({ id: id })).resolves.toBeTruthy();
  });

});