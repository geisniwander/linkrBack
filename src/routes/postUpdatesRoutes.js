import { Router } from "express";
import { getUpdatedPostsController } from "../controllers/postUpdatesController.js";
import { authValidation } from "../middlewares/authValidation.js";

const followedPostsRouter = Router();

followedPostsRouter.use(authValidation);
followedPostsRouter.get("/followedposts", getUpdatedPostsController);

export default followedPostsRouter;
