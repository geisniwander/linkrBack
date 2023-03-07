import { db } from "../database/database.js";

export async function getAllHashtags() {
  const hashtags = await db.query(`SELECT * from hashtags`);
  return hashtags.rows;
}

export async function getPostsByHashtags(hashtag) {
  const posts = await db.query(
    `
    SELECT posts.id, posts.text, posts.user_id, picture_url as user_picture, username,
    (SELECT COUNT(*) from likes WHERE likes.post_id = posts.id) as likes
    FROM posts
    JOIN users ON user_id = users.id
    JOIN posts_hashtags on posts_hashtags.post_id = posts.id
    JOIN hashtags ON hashtags.id = posts_hashtags.hashtag_id
    WHERE hashtags.name = $1 OR hashtags.name = $2
  `,
    [hashtag, `#${hashtag}`]
  );

  return posts.rows;
}