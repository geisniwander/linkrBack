import {
  getAllHashtags,
  getPostsByHashtags,
} from "../repositories/hashtagsRepositories.js";

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
    return res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
