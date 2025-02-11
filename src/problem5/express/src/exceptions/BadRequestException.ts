import { HttpException } from "./HttpException";

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
    this.name = "Bad Request";
  }
}
