import {
  getAllHashtags,
  getPostsByHashtags,
} from "../repositories/hashtagsRepositories.js";
import urlMetadata from "url-metadata";

export async function getAllHashtagsController(_, res) {
  try {
    const hashtags = await getAllHashtags();
    return res.status(200).send(hashtags);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getPostsByHashtagsController(req, res) {
  const { hashtag } = req.params;
  try {
    const posts = await getPostsByHashtags(hashtag);
    for (const post of posts) {
      const meta = await urlMetadata(post.url);
      post.title = meta.title;
      post.image = meta.image;
      post.description = meta.description;
    }

    return res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
