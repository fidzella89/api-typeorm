import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();

    if (users.length === 0) {
      res.status(404).json({ message: "No users found in data." });
      return;
    }

    res.json({ message: "All users data fetched successfully", users });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error occurred while fetching users", 
      error: error.message || "Unknown error"
    });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    if (!userId || typeof userId !== "string") {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: `User ID ${userId} not found.` });
      return;
    }

    res.json({ message: "User found successfully.", user });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error retrieving user", 
      error: error.message || "Unknown error"
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: "Error creating user",
      error: error.message || "Unknown error",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updatedUser = await userService.updateUser(userId, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(400).json({
      message: "Error updating user",
      error: error.message || "Unknown error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    if (!userId || typeof userId !== "string") {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const success = await userService.deleteUser(userId);
    if (!success) {
      res.status(404).json({ message: `User ID ${userId} not found in data.` });
      return;
    }

    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error deleting user", 
      error: error.message || "Unknown error" 
    });
  }
};