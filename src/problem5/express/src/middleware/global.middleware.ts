import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../core/helper/responseHelper";
import { HttpStatus } from "../constants/http.status";
import { HttpException } from "../exceptions";

export const globalErrorHandlerMiddlware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack); // Log the error stack
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      error: err.name,
      message: err.message,
    });
  } else {
    res.status(500).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR.code,
      error: HttpStatus.INTERNAL_SERVER_ERROR.message,
      message: err.message,
    });
  }
};
