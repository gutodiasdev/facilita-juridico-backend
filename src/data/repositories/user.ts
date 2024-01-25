import {
  DeleteUserRepository,
  IsEmailAlreadyRegisteredRepository,
  ListUsersRepository,
  SaveUserRepository
} from "../contracts";
import pgp from "pg-promise";

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
      const users = await this.db.query("SELECT id, name, email, phone FROM users");
      return users
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      await this.db.$pool.end();
    }
  }
  
  async save(input: SaveUserRepository.Input): Promise<void> {
    try {
      return await this.db.query("INSERT INTO users(id, name, email, phone) VALUES($1, $2, $3, $4)", [input.id, input.name, input.email, input.phone]);
    } catch(error: any) {
      throw new Error(error.message);
    } finally {
      await this.db.$pool.end();
    }
  }
  
  async isEmailAlreadyRegistered(email: string): Promise<boolean> {
    try {
      const [user] = await this.db.query("SELECT id, name, email, phone FROM users WHERE email = $1", email);
      if (user) return true
      return false
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      await this.db.$pool.end();
    }
  }

  async delete(input: DeleteUserRepository.Input): Promise<DeleteUserRepository.Output> {
    try {
      return await this.db.query("DELETE FROM users WHERE id = $1", input.id);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      await this.db.$pool.end();
    }
  }
}