import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validateBody =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error!.issues.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(error); // Pass other errors to the next error handler
    }
  };
