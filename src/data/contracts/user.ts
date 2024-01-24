export interface IsEmailAlreadyRegisteredRepository {
  isEmailAlreadyRegistered(email: IsEmailAlreadyRegisteredRepository.Input): Promise<IsEmailAlreadyRegisteredRepository.Output>
};

export namespace IsEmailAlreadyRegisteredRepository {
  export type Input = string
  export type Output = boolean
};

export interface SaveUserRepository {
  save(input: SaveUserRepository.Input): Promise<SaveUserRepository.Output>
}

export namespace SaveUserRepository {
  export type Input = {
    id: string;
    name: string;
    email: string;
    phone: string;
  }
  export type Output = void
}