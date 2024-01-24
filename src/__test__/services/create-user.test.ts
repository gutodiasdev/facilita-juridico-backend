import { IsEmailAlreadyRegisteredRepository } from "../../data/contracts";
import { CreateUser } from "../../domain/features";
import { validateEmail } from "../../domain/utils";

export class CreateUserService implements CreateUser {
  constructor(readonly database: IsEmailAlreadyRegisteredRepository) {}

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    const isEmailValid = validateEmail(input.email);
    if (!isEmailValid) throw new Error("Email inválido")
    const isUserAlreadyRegistered = await this.database.isEmailAlreadyRegistered(input.email);
    if (isUserAlreadyRegistered) throw new Error("Email já cadastrado")

    return {
      id: "any_id",
      name: input.name,
      email: input.email,
      phone: input.phone
    }
  }
}

describe("Create User Suite", function () {
  const input = {
    name: "any_name",
    email: "any_email@email.com",
    phone: "any_phone"
  }

  test("it should create user with correct params", async function () {
    const databaseMock: IsEmailAlreadyRegisteredRepository = {
      isEmailAlreadyRegistered: jest.fn().mockReturnValue(false)
    }
    const sut = new CreateUserService(databaseMock);
    const result = await sut.execute(input);
    expect(result).toHaveProperty("id"),
    expect(result.name).toBe("any_name");
    expect(result.email).toBe("any_email@email.com");
    expect(result.phone).toBe("any_phone");
  });

  test("it should throw an error if email is invalid", async function () {
    const databaseMock: IsEmailAlreadyRegisteredRepository = {
      isEmailAlreadyRegistered: jest.fn().mockReturnValue(false)
    }
    const sut = new CreateUserService(databaseMock);
    const result = sut.execute({
      name: "any_name",
      email: "any_email",
      phone: "any_phone"
    });
    await expect(result).rejects.toThrow("Email inválido");
  });
  
  test("it should throw an error if email is already in use", async function () {
    const databaseMock: IsEmailAlreadyRegisteredRepository = {
      isEmailAlreadyRegistered: jest.fn().mockReturnValue(true)
    }
    const sut = new CreateUserService(databaseMock);
    await expect(sut.execute(input)).rejects.toThrow();
  });
});