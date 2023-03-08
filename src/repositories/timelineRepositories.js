import { db } from "../database/database.js";

export async function postPublishRepository(link, description, user_id) {
    await db.query(`
        INSERT INTO posts (url, text, user_id)
        VALUES ($1, $2, $3);
    `, [link, description, user_id])
}

export async function getHashtagsByNameRepository(name) {
    return await db.query(`SELECT id FROM hashtags WHERE name=$1;`, [name])
}

export async function postHashtagsByNameRepository(name) {
    await db.query(`INSERT INTO hashtags (name) VALUES ($1);`, [name])
}

export async function getPostByUserIdRepository(user_id) {
    return await db.query(`SELECT id from posts WHERE user_id=$1 order by id desc limit 1;`, [user_id])
}

export async function postPostsHashtagsRepository(postId, hashtagId) {
    await db.query(`INSERT INTO posts_hashtags (post_id, hashtag_id) VALUES ($1, $2);`, [postId, hashtagId])
}

export async function getAvatarByUserIdRepository(user_id) {
    return await db.query(`SELECT picture_url FROM users WHERE id=$1;`, [user_id])
}

export async function getPostsRepository() {
    return await db.query(`SELECT posts.id, posts.text, posts.url, users.picture_url, users.username FROM posts JOIN users ON users.id = posts.user_id ORDER BY posts.id DESC LIMIT 20;`)
}

export async function getLikesRepository() {
    return await db.query(`select users.username, likes.post_id from likes join users on likes.user_id = users.id;`)
}

export async function postLikesByPostIdRepository(postId, userId) {
    await db.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`, [postId, userId])
}

export async function deleteLikesByPostIdRepository(postId, userId) {
    await db.query(`delete from likes where post_id = $1 AND user_id = $2;`, [postId, userId])
}