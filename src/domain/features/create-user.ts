export interface CreateUser {
  execute(input: CreateUser.Input): Promise<CreateUser.Output>
};

export namespace CreateUser {
  export type Input = {
    name: string;
    email: string;
    phone: string;
  }
  export type Output = void | Error
};