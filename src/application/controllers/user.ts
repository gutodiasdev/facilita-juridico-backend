import { CreateUser, ListUsers } from "../../domain/features";
import { HttpServer } from "../../infra/http/http-server";

export class UserController {
  constructor(
    httpServer: HttpServer,
    listUsers: ListUsers,
    createUser: CreateUser
  ) {
    httpServer.on("get", "/users", [], async function (params: any, body: any) {
      const { term } = params.query
      const output = await listUsers.execute({ term });
      return output;
    });

    httpServer.on("post", "/users", [], async function (params: any, body: any) {
      const output = await createUser.execute(body);
      return output;
    });
  }
}