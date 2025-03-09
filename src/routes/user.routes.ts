import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../users/users.controller";
import { validateSchema } from "../users/user.validation";
import { createUserSchema, updateUserSchema } from "../users/user.validation";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateSchema(createUserSchema), createUser);
router.put("/:id", validateSchema(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;
