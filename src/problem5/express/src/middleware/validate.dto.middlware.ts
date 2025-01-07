import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateRequest = <T extends ClassConstructor<any>>(
  dtoClass: T
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dtoInstance = plainToInstance(dtoClass, req.body);

      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        const errorMessages = errors.map(
          (err) =>
            `${err.property} - ${Object.values(err.constraints || {}).join(
              ", "
            )}`
        );
        res.status(400).json({
          statusCode: 400,
          message: "Bad Request",
          errors: errorMessages,
        });
      }
      req.body = dtoInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
};
