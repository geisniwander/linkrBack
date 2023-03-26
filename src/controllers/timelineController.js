import urlMetadata from "url-metadata";
import {
  postPublishRepository,
  getHashtagsByNameRepository,
  postHashtagsByNameRepository,
  getPostByUserIdRepository,
  getAvatarByUserIdRepository,
  getTimelineRepository,
  getLikesByIdRepository,
  postLikesByPostIdRepository,
  deleteLikesByPostIdRepository,
  postPostsHashtagsRepository,
  getTimelineByUserIdRepository,
  putPublishRepository,
  deletePublishByPostIdRepository,
  postCommentRepository,
  getCommentRepository,
  getRepostsByIdRepository,
  postRepostsByPostIdRepository,
} from "../repositories/timelineRepositories.js";
import {
  getUserByIdRepository,
  getUserIdRepository,
} from "../repositories/userRepository.js";
import { addMetaData } from "../util/metaDataCache.js"; 

export async function getAvatar(req, res) {
  try {
    const session = res.locals.session;
    const url = await getAvatarByUserIdRepository(session.user_id);

    res.send(url.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getTimeline(req, res) {
  const { limit, postIdAfter, postIdBefore, repostIdAfter } = req.query;

  const { user_id } = res.locals.session;
  try {
    const posts = await getTimelineRepository({
      userId: user_id,
      limit,
      postIdAfter,
      postIdBefore,
      repostIdAfter
    });
    await addMetaData(posts.rows);
    
    return res.status(200).send(posts.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function postPublish(req, res) {
  const { link, description } = req.body;

  try {
    const session = res.locals.session;

    await postPublishRepository(link, description, session.user_id);

    if (description.includes("#")) {
      const array = description.split(" ");
      const hashtags = array.filter((i) => i.includes("#"));

      hashtags.forEach(async (element) => {
        const hashtag = await getHashtagsByNameRepository(element);
        if (hashtag.rowCount === 0) {
          await postHashtagsByNameRepository(element);
        }
        const hashtagId = await getHashtagsByNameRepository(element);
        const postId = await getPostByUserIdRepository(session.user_id);
        await postPostsHashtagsRepository(
          postId.rows[0].id,
          hashtagId.rows[0].id
        );
      });
    }

    return res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function putPublish(req, res) {
  const { post_id, description } = req.body;

  try {
    const session = res.locals.session;

    await putPublishRepository(description, post_id, session.user_id);

    if (description.includes("#")) {
      const array = description.split(" ");
      const hashtags = array.filter((i) => i.includes("#"));

      hashtags.forEach(async (element) => {
        const hashtag = await getHashtagsByNameRepository(element);
        if (hashtag.rowCount === 0) {
          await postHashtagsByNameRepository(element);
        }
        const hashtagId = await getHashtagsByNameRepository(element);
        const postId = await getPostByUserIdRepository(session.user_id);
        await postPostsHashtagsRepository(
          postId.rows[0].id,
          hashtagId.rows[0].id
        );
      });
    }

    return res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deletePublish(req, res) {
  const { post_id } = req.params;

  try {
    const session = res.locals.session;

    await deletePublishByPostIdRepository(Number(post_id), session.user_id);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getLikes(req, res) {
  const { post_id } = req.params;
  try {
    const likes = await getLikesByIdRepository(Number(post_id));

    return res.send(likes.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function postLikes(req, res) {
  const { post_id } = req.body;
  try {
    const session = res.locals.session;

    await postLikesByPostIdRepository(post_id, session.user_id);

    return res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteLikes(req, res) {
  const { post_id } = req.params;

  try {
    const session = res.locals.session;

    await deleteLikesByPostIdRepository(Number(post_id), session.user_id);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUserProfile(req, res) {
  const { id } = req.params;

  try {
    const profile = await getTimelineByUserIdRepository(id);

    if (profile.rowCount === 0) {
      return res.sendStatus(404);
    }

    try {
      for (const post of profile.rows[0].user.user_posts) {
        const meta = await urlMetadata(post.url);
        post.title = meta.title;
        post.image = meta.image;
        post.description = meta.description;
      }
    } catch (error) {
      console.log(error);
    }

    const userPosts = profile.rows[0];

    return res.status(200).send(userPosts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function postComments(req, res) {
  const { text, post_id } = req.body;

  try {
    const session = res.locals.session;

    await postCommentRepository(text, session.user_id, post_id);

    return res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getComments(req, res) {
  const { post_id } = req.params;

  try {
    const session = res.locals.session;

    const comments = await getCommentRepository(
      Number(post_id),
      session.user_id
    );

    return res.send(comments.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getReposts(req, res) {
  const { post_id } = req.params;
  try {
    const reposts = await getRepostsByIdRepository(Number(post_id));

    return res.send(reposts.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function postReposts(req, res) {
  const { post_id } = req.body;
  try {
    const session = res.locals.session;

    await postRepostsByPostIdRepository(post_id, session.user_id);

    return res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
