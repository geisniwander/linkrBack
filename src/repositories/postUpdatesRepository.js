import { db } from "../database/database.js";

export async function getFollowedPostsRepository({
  userId,
  limit = 10,
  postIdAfter = 0,
  postIdBefore = 0,
}) {
  const posts = await db.query(
    `SELECT posts.id as post_id, posts.text, posts.url, users.picture_url, users.username, users.id as user_id 
        FROM posts JOIN users ON users.id = posts.user_id 
        WHERE 
        posts.id > $1
        AND
        ((posts.id < $2) OR ($2 = 0))
        AND 
        (posts.user_id IN ( SELECT user_followed FROM follows WHERE follows.user_id = $3  ) OR posts.user_id = $3 )  
        ORDER BY posts.created_at DESC, posts.id DESC
        LIMIT $4;`,
    [postIdAfter, postIdBefore, userId, limit]
  );
  return posts.rows;
}
