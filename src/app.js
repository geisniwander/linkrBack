import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import hashtagsRoutes from "./routes/hashtagRoutes.js";
import followedPostsRouter from "./routes/postUpdatesRoutes.js";


const server = express();
server.use(express.json());
server.use(cors());



server.use([userRoutes, timelineRoutes, hashtagsRoutes, followedPostsRouter]);
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})