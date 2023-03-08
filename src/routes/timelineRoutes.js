import {Router} from "express";
import { getAvatar, getTimeline, postPublish, getLikes, postLikes, deleteLikes } from "../controllers/timelineController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema, likeSchema } from "../schemas/timelineSchema.js";

const timelineRoutes = Router();

timelineRoutes.use(authValidation);
timelineRoutes.get("/avatar", getAvatar);
timelineRoutes.get("/timeline", getTimeline);
timelineRoutes.get("/likes", getLikes);
timelineRoutes.post("/likes", validateSchema(likeSchema),postLikes);
timelineRoutes.delete("/likes/:post_id", deleteLikes);
timelineRoutes.post("/publish", validateSchema(postSchema), postPublish);

export default timelineRoutes;