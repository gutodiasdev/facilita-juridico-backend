import { User } from "../../domain/@types"

export interface IsEmailAlreadyRegisteredRepository {
  isEmailAlreadyRegistered(email: IsEmailAlreadyRegisteredRepository.Input): Promise<IsEmailAlreadyRegisteredRepository.Output>
};

export namespace IsEmailAlreadyRegisteredRepository {
  export type Input = string
  export type Output = boolean
};

export interface SaveUserRepository {
  save(input: SaveUserRepository.Input): Promise<SaveUserRepository.Output>
};

export namespace SaveUserRepository {
  export type Input = {
    id: string;
    name: string;
    email: string;
    phone: string;
    x_axis: string;
    y_axis: string;
  }
  export type Output = void
};

export interface ListUsersRepository {
  list(): Promise<ListUsersRepository.Output>
};

export namespace ListUsersRepository {
  export type Output = User[]
};

export interface DeleteUserRepository {
  delete(input: DeleteUserRepository.Input): Promise<DeleteUserRepository.Output>
};

export namespace DeleteUserRepository {
  export type Input = { id: string; };
  export type Output = void;
};