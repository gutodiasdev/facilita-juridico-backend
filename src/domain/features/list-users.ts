import { User } from "../@types"

export interface ListUsers {
  execute(input: ListUsers.Input): Promise<ListUsers.Output>
}

export namespace ListUsers {
  export type Input = {
    term: string;
  }
  export type Output = User[]
}