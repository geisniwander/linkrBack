import {Router} from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/userSchema.js";
import { signUp, login, logout } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/signup", validateSchema(userSchema), signUp)
userRoutes.post("/signin", validateSchema(loginSchema), login)
userRoutes.delete("/logout", logout)

export default userRoutes;