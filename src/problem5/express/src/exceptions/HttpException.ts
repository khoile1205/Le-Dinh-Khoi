export class HttpException extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "Http Exception";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
