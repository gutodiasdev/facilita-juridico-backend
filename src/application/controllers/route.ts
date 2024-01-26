import { HttpServer } from "../../infra/http";

export class RouteController {
  constructor(httpServer: HttpServer) {
    httpServer.on("post", "/route/calculate", [], async function (params: any, body: any) {
      function calculateDistance(pointA: any, pointB: any) {
        return Math.sqrt(Math.pow(pointA.x_axis - pointB.x_axis, 2) + Math.pow(pointA.y_axis - pointB.y_axis, 2));
      }
      const company = { name: "Empresa", x_axis: 0, y_axis: 0 };
      const route = [...body.customers].sort((a, b) => calculateDistance(company, a) - calculateDistance(company, b));
      const finalRoute = [company, ...route, company]
      return finalRoute
    });
  }
}