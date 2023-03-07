import {Router} from "express";
import { getInfos, postPublish } from "../controllers/timelineController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from "../schemas/postSchema.js";

const timelineRoutes = Router();

timelineRoutes.use(authValidation);
timelineRoutes.get("/timeline", getInfos);
timelineRoutes.post("/publish", validateSchema(postSchema), postPublish);

export default timelineRoutes;