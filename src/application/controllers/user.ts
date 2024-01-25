import { ListUsers } from "../../domain/features";
import { HttpServer } from "../../infra/http/http-server";

export class UserController {
  constructor(
    httpServer: HttpServer,
    listUsers: ListUsers
  ) {
    httpServer.on("get", "/users", [], async function (params: any, body: any) {
      const { term } = params.query
      const output = await listUsers.execute({ term })
      return output;
    });
  }
}