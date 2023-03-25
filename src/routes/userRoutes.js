import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/userSchema.js";
import {
  signUp,
  login,
  logout,
  
  getUserByUsername,
  getUserByPieceUsername,
  canFollow,
  setFollow,
  showButton,
  checkFollowers,
  // showTextFollowing,
} from "../controllers/userController.js";
import { authValidation } from "../middlewares/authValidation.js";

const userRoutes = Router();

userRoutes.post("/signup", validateSchema(userSchema), signUp);
userRoutes.post("/signin", validateSchema(loginSchema), login);
userRoutes.get("/user/piecename/:username", authValidation, getUserByPieceUsername);
// userRoutes.get("/user/piecename/:username/showfollowing", authValidation,showTextFollowing);
userRoutes.get("/user/name/:username", authValidation,getUserByUsername);
userRoutes.get("/user/:id/follow", authValidation, setFollow); // sprint 2
userRoutes.get("/user/:id/unfollow", authValidation, setFollow); // sprint 2
userRoutes.get("/user/:id/status", authValidation, canFollow)
userRoutes.get("/user/:id/showbutton", authValidation, showButton)
userRoutes.get("/user/showfollows", authValidation,checkFollowers)
userRoutes.delete("/logout", logout);

export default userRoutes;
