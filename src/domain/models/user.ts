import crypto from "crypto";

type CreateUserInput = {
  name: string;
  email: string;
  phone: string;
}

type CreateUserOutput = {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default class User {
  constructor(readonly name: string, readonly email: string, readonly phone: string, readonly id: string) {
    this.validateEmail()
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  validateEmail() {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.email.match(pattern)) throw new Error("Invalid email")
  }

  static create(input: CreateUserInput): CreateUserOutput {
    const id = crypto.randomUUID()
    return new User(input.name, input.email, input.phone, id);
  }
}