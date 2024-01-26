import * as dotenv from "dotenv";
dotenv.config();

import { ExpressAdapter } from "../../infra/http/express-adapter";
import { UserController } from "../../application/controllers/user";
import { CreateUserService, ListUsersService } from "../../application/services";
import { UserRepository } from "../../data/repositories";
import { RouteController } from "../../application/controllers/route";

const httpServer = new ExpressAdapter()
const userRepository = new UserRepository()
const listUsersService = new ListUsersService(userRepository)
const createUserService = new CreateUserService(userRepository)

new UserController(httpServer, listUsersService, createUserService)
new RouteController(httpServer);

httpServer.listen(8080)