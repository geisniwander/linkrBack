import { getFollowedPostsRepository } from "../repositories/postUpdatesRepository.js";
import { addMetaData } from "../util/metaDataCache.js";

export async function getUpdatedPostsController(req, res) {
  try {
    const { user_id } = res.locals.session;
    const { limit, postIdAfter, postIdBefore } = req.query;
    const posts = await getFollowedPostsRepository({
      userId: user_id,
      limit,
      postIdAfter,
      postIdBefore,
    });
    await addMetaData(posts);
    return res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
