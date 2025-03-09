import { Request, Response, NextFunction } from "express";

export const validateRequest = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        errors.push(`${field} is required`);
      }
    });

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    next();
  };
};