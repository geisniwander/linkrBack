import { db } from "../database/database.js";

export async function postPublishRepository(link, description, user_id) {
  await db.query(
    `
        INSERT INTO posts (url, text, user_id)
        VALUES ($1, $2, $3);
    `,
    [link, description, user_id]
  );
}

export async function getHashtagsByNameRepository(name) {
  return await db.query(`SELECT id FROM hashtags WHERE name=$1;`, [name]);
}

export async function postHashtagsByNameRepository(name) {
  await db.query(`INSERT INTO hashtags (name) VALUES ($1);`, [name]);
}

export async function getPostByUserIdRepository(user_id) {
  return await db.query(
    `SELECT id from posts WHERE user_id=$1 order by id desc limit 1;`,
    [user_id]
  );
}

export async function postPostsHashtagsRepository(postId, hashtagId) {
  await db.query(
    `INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1, $2);`,
    [postId, hashtagId]
  );
}

export async function getAvatarByUserIdRepository(user_id) {
  return await db.query(
    `SELECT picture_url, username FROM users WHERE id=$1;`,
    [user_id]
  );
}

export async function getTimelineRepository({
  userId,
  limit = 10,
  postIdAfter = 0,
  postIdBefore = 2 ** 31 - 1, // maximum postgres integer value
  repostIdAfter = 0,
  repostIdBefore = 2 ** 31 - 1,
}) {
  return await db.query(
    `SELECT null as reposted_by, posts.id as post_id, posts.text, posts.url, users.picture_url, users.username, users.id as user_id, posts.created_at as created_at,
      null as repost_id
      FROM posts
      JOIN follows ON follows.user_followed = posts.user_id
      JOIN users ON users.id = posts.user_id
      WHERE (follows.user_id = $1 OR users.id = $1) AND (posts.id > $2) AND (posts.id < $4)
    UNION
    SELECT ur.username as reposted_by, posts.id as post_id, posts.text, posts.url, u.picture_url, u.username, u.id as user_id, reposts.created_at as created_at,
      reposts.id as repost_id
      from reposts 
      JOIN follows ON follows.user_followed = reposts.user_id 
      JOIN posts ON reposts.post_id = posts.id
      JOIN users u ON u.id = posts.user_id
      JOIN users ur ON ur.id = reposts.user_id
      WHERE (follows.user_id = $1 OR ur.id = $1) AND (reposts.id > $3) AND (reposts.id < $5)
      ORDER BY created_at DESC LIMIT 10`,
    [userId, postIdAfter, repostIdAfter, postIdBefore, repostIdBefore]
  );
}

export async function getLikesByIdRepository(postId) {
  return await db.query(
    `select users.username from likes join users on likes.user_id = users.id where post_id = $1;`, [
    postId
  ]);
}

export async function postLikesByPostIdRepository(postId, userId) {
  await db.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`, [
    postId,
    userId,
  ]);
}

export async function deleteLikesByPostIdRepository(postId, userId) {
  await db.query(`delete from likes where post_id = $1 AND user_id = $2;`, [
    postId,
    userId
  ]);
}

export async function getTimelineByUserIdRepository(user_id) {
  return await db.query(
    `
      SELECT json_build_object(
        'id', users.id,
        'username', users.username,
        'picture_url', users.picture_url,
        'user_posts', json_agg(
          json_build_object(
            'post_id', posts.id,
            'user_id', posts.user_id,
            'username', users.username,
            'picture_url', users.picture_url,
            'text', posts.text,
            'url', posts.url
          )
        )
      ) AS user
      FROM users, posts
      WHERE users.id = $1 AND users.id = posts.user_id
      GROUP BY users.id;
    `,
    [user_id]
  );
}

export async function putPublishRepository(description, postId, userId) {
  await db.query(`UPDATE posts SET "text"=$1 WHERE id = $2 AND user_id = $3;`, [
    description, postId, userId
  ]);
}

export async function deletePublishByPostIdRepository(postId, userId) {
  await db.query(`delete from likes where post_id = $1;`, [
    postId
  ]);
  await db.query(`delete from posts_hashtags where post_id = $1;`, [
    postId
  ]);
  await db.query(`delete from comments where post_id = $1;`, [
    postId
  ]);
  await db.query(`delete from reposts where post_id = $1;`, [
    postId
  ]);
  await db.query(`delete from posts where id = $1 AND user_id = $2;`, [
    postId,
    userId
  ]);
}

export async function postCommentRepository(text, user_id, post_id) {
  await db.query(
    `
        INSERT INTO comments (text, user_id, post_id)
        VALUES ($1, $2, $3);
    `,
    [text, user_id, post_id]
  );
}

export async function getCommentRepository(post_id) {
  return await db.query(
    ` SELECT comments.id as comment_id, comments.text, users.picture_url, users.username, users.id as user_id,
    posts.user_id as post_author
    FROM comments
    JOIN users ON users.id = comments.user_id
    JOIN posts ON posts.id = comments.post_id
    WHERE comments.post_id = $1
    ORDER BY comments.id DESC
  `,
    [post_id]

  );
}

export async function getRepostsByIdRepository(postId) {
  return await db.query(
    `select users.username from reposts join users on reposts.user_id = users.id where post_id = $1;`, [
    postId
  ]);
}
export async function postRepostsByPostIdRepository(postId, userId) {
  await db.query(`INSERT INTO reposts (post_id, user_id) VALUES ($1, $2);`, [
    postId,
    userId,
  ]);
}