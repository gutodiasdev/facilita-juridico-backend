import { HttpStatusCode } from "./http-status-code";


export type ErrorHandlerParams = {
  statusCode: HttpStatusCode;
  status?: string
  message: string;
  name: string;
}

export class ErrorHandler extends Error {
  public statusCode: HttpStatusCode;
  public status: string;
  public name: string;

  constructor ({ statusCode, message, name, status }: ErrorHandlerParams) {
    super();
    this.status = status || "error";
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
  }
}