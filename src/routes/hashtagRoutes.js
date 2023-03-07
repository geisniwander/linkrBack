import { Router } from "express";
import {
  getAllHashtagsController,
  getPostsByHashtagsController,
} from "../controllers/hashtagControllers.js";

const hashtagsRoutes = Router();

hashtagsRoutes.get("/hashtags", getAllHashtagsController);
hashtagsRoutes.get("/hashtags/:hashtag/posts", getPostsByHashtagsController);

export default hashtagsRoutes;
