import {Router} from "express";
import { getInfos } from "../controllers/timelineController.js";
import { authValidation } from "../middlewares/authValidation.js";

const timelineRoutes = Router();

timelineRoutes.use(authValidation);
timelineRoutes.get("/timeline", getInfos)

export default timelineRoutes;