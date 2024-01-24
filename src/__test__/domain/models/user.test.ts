import User from "../../../domain/models/user";

describe("User Model Suite", function () {
  let input = {
    name: "any_name",
    email: "any_email@email.com",
    phone: "any_phone"
  };

  test("it should create an user with correct params", async function () {
    const sut =  User.create(input)
   
    expect(sut).toHaveProperty("id"),
    expect(sut.name).toBe("any_name");
    expect(sut.email).toBe("any_email@email.com");
    expect(sut.phone).toBe("any_phone");
  });
  
  test("it should throw an error if email is invalid", async function () {
    input = {
      name: "any_name",
      email: "invalid_email",
      phone: "any_phone"
    };
    const sut = () => User.create(input)
    expect(sut).toThrow("Invalid email");
  });
});