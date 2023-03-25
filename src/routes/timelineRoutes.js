import { Router } from "express";
import {
  getAvatar,
  getTimeline,
  postPublish,
  getLikes,
  postLikes,
  deleteLikes,
  getUserProfile,
  putPublish,
  deletePublish,
  postComments,
  getComments
} from "../controllers/timelineController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema, likeSchema, putSchema, postComment } from "../schemas/timelineSchema.js";

const timelineRoutes = Router();

timelineRoutes.use(authValidation);
timelineRoutes.get("/avatar", getAvatar);
timelineRoutes.get("/timeline", getTimeline);
timelineRoutes.get("/likes/:post_id", getLikes);
timelineRoutes.get("/user/:id", getUserProfile);
timelineRoutes.post("/likes", validateSchema(likeSchema), postLikes);
timelineRoutes.delete("/likes/:post_id", deleteLikes);
timelineRoutes.post("/publish", validateSchema(postSchema), postPublish);
timelineRoutes.put("/publish", validateSchema(putSchema), putPublish);
timelineRoutes.delete("/publish/:post_id", deletePublish);
timelineRoutes.post("/comments", validateSchema(postComment), postComments);
timelineRoutes.get("/comments/:post_id", getComments);



export default timelineRoutes;
