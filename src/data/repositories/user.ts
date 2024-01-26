import {
  DeleteUserRepository,
  IsEmailAlreadyRegisteredRepository,
  ListUsersRepository,
  SaveUserRepository
} from "../contracts";
import pgp from "pg-promise";
import crypto from "crypto";

export class UserRepository implements
  IsEmailAlreadyRegisteredRepository,
  SaveUserRepository,
  ListUsersRepository,
  DeleteUserRepository {
  readonly db: any;

  constructor() {
    this.db = pgp()("postgres://facilita:facilita@localhost:5432/default")
  }

  async list(): Promise<ListUsersRepository.Output> {
    try {
      const users = await this.db.query(`
        SELECT users.id, users.name, users.email, users.phone, positions.x_axis, positions.y_axis 
        FROM users
        LEFT JOIN positions ON users.id = positions.user_id
      `);
      return users
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async save(input: SaveUserRepository.Input): Promise<void> {
    console.log(input);
    try {
      return await this.db.query(`
      WITH  inserted_user AS (
        INSERT INTO users(id, name, email, phone) VALUES('${input.id}', '${input.name}', '${input.email}', '${input.phone}') RETURNING id
      )
      INSERT INTO positions (id, x_axis, y_axis, user_id) 
      VALUES ('${crypto.randomUUID()}', '${input.x_axis}', '${input.y_axis}', (SELECT id FROM inserted_user)) 
      `);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async isEmailAlreadyRegistered(email: string): Promise<boolean> {
    try {
      const [user] = await this.db.query("SELECT id, name, email, phone FROM users WHERE email = $1", email);
      if (user) return true
      return false
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(input: DeleteUserRepository.Input): Promise<DeleteUserRepository.Output> {
    try {
      return await this.db.query("DELETE FROM users WHERE id = $1", input.id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}