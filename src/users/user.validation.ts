import Joi from "joi";
import { Role } from "../_helpers/role"; // Import Role from role.ts
import { Request, Response, NextFunction, RequestHandler } from "express";

// Schema for user creation
export const createUserSchema = Joi.object({
  title: Joi.string().required().messages({ "string.empty": "Title is required" }),
  firstName: Joi.string().required().messages({ "string.empty": "First name is required" }),
  lastName: Joi.string().required().messages({ "string.empty": "Last name is required" }),
  role: Joi.string().valid(Role.Admin, Role.User).required().messages({
    "any.only": "Role must be either 'Admin' or 'User'",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Must be a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords must match" }),
});

// Schema for user update (optional fields)
export const updateUserSchema = Joi.object({
  title: Joi.string().optional().allow(""),
  firstName: Joi.string().optional().allow(""),
  lastName: Joi.string().optional().allow(""),
  role: Joi.string().valid(Role.Admin, Role.User).optional().allow(""),
  email: Joi.string().email().optional().allow(""),
  password: Joi.string().min(6).optional().allow(""),
  confirmPassword: Joi.string().valid(Joi.ref("password")).optional().allow(""),
}).with("password", "confirmPassword");

// Middleware to validate request
export const validateSchema = (schema: Joi.Schema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { error } = schema.validate(req.body, { abortEarly: false });
  
      if (error) {
        res.status(400).json({
          message: "Validation error",
          details: error.details.map((err) => err.message),
        });
        return; 
      }
  
      next();
    };
  };
