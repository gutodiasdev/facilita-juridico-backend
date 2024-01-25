import { ListUsersRepository } from "../../data/contracts";
import { ListUsers } from "../../domain/features";

export default class ListUsersService implements ListUsers {
  constructor(readonly listUserRepository: ListUsersRepository) { }

  async execute(input: ListUsers.Input): Promise<ListUsers.Output> {
    if (input.term !== "") {
      const result = await this.listUserRepository.list(input);
      const output = result.filter(user => {
        return Object.values(user).some(value => {
          return value.toLocaleLowerCase().includes(input.term!.toLowerCase())
        })
      })
      return output
    }
    const output = await this.listUserRepository.list(input);
    return output
  }
}

describe("List Users Suite", function () {
  const result = [
    {
      id: "any_id",
      name: "any_name",
      email: "any_email",
      phone: "any_phone"
    }
  ]

  test("it should list all users", async function () {
    const repositoryMock: ListUsersRepository = {
      list: jest.fn().mockResolvedValue([
        {
          id: "any_id",
          name: "any_name",
          email: "any_email",
          phone: "any_phone"
        }
      ])
    }
    const sut = new ListUsersService(repositoryMock);
    const output = await sut.execute({ term: "" });
    expect(output).toEqual(result);
  });

  test("it should filter user by email", async function () {
    const repositoryMock: ListUsersRepository = {
      list: jest.fn().mockResolvedValue([
        {
          id: "1",
          name: "any_name",
          email: "email01@example.com",
          phone: "any_phone"
        },
        {
          id: "2",
          name: "any_name",
          email: "email02@example.com",
          phone: "any_phone"
        },
        {
          id: "3",
          name: "any_name",
          email: "email11@example.com",
          phone: "any_phone"
        }
      ])
    }
    const sut = new ListUsersService(repositoryMock);
    const output = await sut.execute({ term: "email0" });
    expect(output).toEqual([
      {
        id: "1",
        name: "any_name",
        email: "email01@example.com",
        phone: "any_phone"
      },
      {
        id: "2",
        name: "any_name",
        email: "email02@example.com",
        phone: "any_phone"
      }
    ]);
  });

  test("it should filter user by name", async function () {
    const repositoryMock: ListUsersRepository = {
      list: jest.fn().mockResolvedValue([
        {
          id: "1",
          name: "John Doe",
          email: "any_email",
          phone: "any_phone"
        },
        {
          id: "2",
          name: "Johnathan Smith",
          email: "any_email",
          phone: "any_phone"
        },
        {
          id: "3",
          name: "Victor Santos",
          email: "any_email",
          phone: "any_phone"
        }
      ])
    }
    const sut = new ListUsersService(repositoryMock);
    const output = await sut.execute({ term: "john" });
    expect(output).toEqual([
      {
        id: "1",
        name: "John Doe",
        email: "any_email",
        phone: "any_phone"
      },
      {
        id: "2",
        name: "Johnathan Smith",
        email: "any_email",
        phone: "any_phone"
      }
    ]);
  });

  test("it should filter user by phone", async function () {
    const repositoryMock: ListUsersRepository = {
      list: jest.fn().mockResolvedValue([
        {
          id: "1",
          name: "John Doe",
          email: "email01@example.com",
          phone: "11999623050"
        },
        {
          id: "2",
          name: "Johnathan Smith",
          email: "email02@example.com",
          phone: "11998623050"
        },
        {
          id: "3",
          name: "Victor Santos",
          email: "email03@example.com",
          phone: "11999623051"
        }
      ])
    }
    const sut = new ListUsersService(repositoryMock);
    const output = await sut.execute({ term: "119996" });
    expect(output).toEqual([
      {
        id: "1",
        name: "John Doe",
        email: "email01@example.com",
        phone: "11999623050"
      },
      {
        id: "3",
        name: "Victor Santos",
        email: "email03@example.com",
        phone: "11999623051"
      }
    ]);
  });
});