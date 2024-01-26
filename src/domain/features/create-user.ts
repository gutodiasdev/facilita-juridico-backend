import { User } from "../@types";

export interface CreateUser {
  execute(input: CreateUser.Input): Promise<CreateUser.Output>
};

export namespace CreateUser {
  export type Input = {
    name: string;
    email: string;
    phone: string;
    x_axis: string,
    y_axis: string,
  }
  export type Output = {
    id: string;
    name: string;
    email: string;
    phone: string;
  }
};