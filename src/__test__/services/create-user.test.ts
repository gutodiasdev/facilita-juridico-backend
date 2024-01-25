import { CreateUserService } from "../../application/services/create-user";
import { IsEmailAlreadyRegisteredRepository, SaveUserRepository } from "../../data/contracts";

describe("Create User Suite", function () {
  let databaseMock: IsEmailAlreadyRegisteredRepository & SaveUserRepository;
  const input = {
    name: "any_name",
    email: "any_email@email.com",
    phone: "any_phone"
  };

  beforeEach(() => {
    databaseMock = {
      isEmailAlreadyRegistered: jest.fn().mockReturnValue(false),
      save: jest.fn().mockImplementation(() => Promise.resolve())
    }
  })

  test("it should create user with correct params", async function () {
    const sut = new CreateUserService(databaseMock);
    const result = await sut.execute(input);
    expect(result).toHaveProperty("id"),
      expect(result.name).toBe("any_name");
    expect(result.email).toBe("any_email@email.com");
    expect(result.phone).toBe("any_phone");
  });


  test("it should throw an error if email is already in use", async function () {
    databaseMock = {
      ...databaseMock,
      isEmailAlreadyRegistered: jest.fn().mockReturnValue(true)
    }
    const sut = new CreateUserService(databaseMock);
    await expect(sut.execute(input)).rejects.toThrow(new Error("Email already registered"));
  });
});