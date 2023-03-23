import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/userSchema.js";
import {
  signUp,
  login,
  logout,
  getUserById,
  getUserByUsername,
  getUserByPieceUsername,
  statusFollow,
} from "../controllers/userController.js";
import { authValidation } from "../middlewares/authValidation.js";

const userRoutes = Router();

userRoutes.post("/signup", validateSchema(userSchema), signUp);
userRoutes.post("/signin", validateSchema(loginSchema), login);
userRoutes.get("/user/piecename/:username", getUserByPieceUsername);
userRoutes.get("/user/name/:username", getUserByUsername);
userRoutes.get("/user/:id/follow", authValidation, statusFollow); // sprint 2
userRoutes.get("/user/:id/unfollow", authValidation, statusFollow); // sprint 2
userRoutes.delete("/logout", logout);

export default userRoutes;
