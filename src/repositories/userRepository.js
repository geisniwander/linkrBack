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