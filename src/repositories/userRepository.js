import { db } from "../database/database.js";

export async function getUserByIdRepository(id) {
    return db.query(
      `SELECT json_build_object(
          'id', users.id,
          'email', users.email,
          'username', users.username,
          'picture_url', users.picture_url
        )
        FROM users WHERE id = $1`,
      [id]
    );
  }

export async function getUserByPieceUsernameRepository(username) {
    return db.query(
      `SELECT json_build_object(
          'id', users.id,
          'email', users.email,
          'username', users.username,
          'picture_url', users.picture_url
        )
        FROM users WHERE username LIKE $1::text`,
      [`${username}%`]
    );
  }

  export async function getUserByUsernameRepository(username) {
    return db.query(
      `SELECT json_build_object(
          'id', users.id,
          'email', users.email,
          'username', users.username,
          'picture_url', users.picture_url
        )
        FROM users WHERE username = $1`,
      [username]
    );
  }

  ///sprint 2
  export function followUser(user_followed, user_id){
    return db.query(
      ` INSERT INTO follows (user_followed, user_id)
      VALUES($1, $2)`,
      [user_followed, user_id]
    );
  }

  export function unfollowUser(user_followed, user_id){
    return db.query(
      `DELETE FROM followers WHERE user_followed=$1 AND follower_id=$2`,
      [user_followed, user_id]
    );
  }

  export function getUser(token){
    return db.query(
      `SELECT user_id FROM sessions WHERE token =$1`,
      [token]
    );
  }